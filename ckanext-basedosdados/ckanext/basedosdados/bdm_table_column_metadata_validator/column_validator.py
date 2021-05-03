import yaml
import sys
from pathlib import Path
import json
from cerberus import Validator
from importlib import resources
import ckanext.basedosdados.bdm_table_column_metadata_validator


BD_STD_COLUMNS = resources.open_text(ckanext.basedosdados.bdm_table_column_metadata_validator, "bd_std_columns.yaml")
BD_STD_COLUMNS = yaml.safe_load(BD_STD_COLUMNS)
BD_STD_COLUMNS_BY_NAME = {column["name"]: column for column in BD_STD_COLUMNS}
# "duplicated columns defined as standard columns"
assert len(BD_STD_COLUMNS_BY_NAME) == len(BD_STD_COLUMNS)


class ColumnMetadataValidator(Validator):
    ### Checks must be prefixed with _check_with for using it within the check_with schema keyword
    def _check_with_lowercase(self, field, value):
        if not value.islower():
            self._error(field, "Must be named all lowercase")

    def _check_with_nospaces(self, field, value):
        if " " in value:
            self._error(field, "Cannot have spaces")

    def _check_with_abbreviation(self, field, value):
        not_allowed_abbrev = ["qt", "tp", "cd"]
        for a in not_allowed_abbrev:
            if a in value:
                self._error(field, f"cannot contain abbreviations {not_allowed_abbrev}")

    def _check_with_standard_columns(self, field, value):
        print(self.document)
        print(self.root_document)
        std_col = BD_STD_COLUMNS_BY_NAME.get(self.document["name"])
        if std_col and value != std_col["description"]:
            self._error(field, "Standard column does not have standard description")

SCHEMA = yaml.safe_load("""
columns:
  type: list
  schema:
    type: dict
    schema:
      name:
        type: string
        required: True
        empty: False
        check_with: [lowercase, nospaces, abbreviation]
      description:
        type: string
        required: True
        empty: False
        check_with: standard_columns
      is_in_staging:
        type: boolean
      is_partition:
        type: boolean
""")
VALIDATOR = ColumnMetadataValidator(schema=SCHEMA)

def validate_columns_from_dict(column_dict):
    validate = VALIDATOR.validate(column_dict)
    return VALIDATOR.errors
