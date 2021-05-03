# Documentation on: https://docs.ckan.org/en/2.9/extensions/adding-custom-fields.html?highlight=validators#custom-validators

from ckantoolkit import missing as MISSING
import ckan.lib.navl.dictization_functions as df
from ckanext.scheming.validation import scheming_validator
import json

def _get_type(key, data):
    k = list(key)
    k[-1] = "resource_type"
    type_ = data.get(tuple(k))
    SUPPORTED_TYPES = ("bdm_table", "external_link", "lai_request")
    if type_ not in SUPPORTED_TYPES:
        return None
        # raise Exception( f'Resource Type invalid! Found {type_!r}, but we only accept types: {SUPPORTED_TYPES!r}\n{locals()}')
    return type_


def required_on_types(*types):
    def validator(key, data, errors, con):
        type_ = _get_type(key, data)
        if type_ == None:
            errors[key].append(f"resource_type not supported.")
            return
        has_data = data[key] != MISSING and data[key]
        if type_ in types and not has_data:
            errors[key].append(f"Field required for {type_} resources")

    return validator


def only_on_types(*types):
    def validator(key, data, errors, con):
        type_ = _get_type(key, data)
        if type_ == None:
            errors[key].append(f"resource_type not supported.")
            return
        has_data = data[key] != MISSING and data[key]
        if type_ not in types and has_data:
            errors[key].append(
                f"Field only available for {types} resources. This resource is of type {type_}"
            )

    return validator


@scheming_validator
def list_of_dicts(field, schema):
    def validator(key, data, errors, context):
        # if there was an error before calling our validator
        # don't bother with our validation
        if errors[key]:
            return

        data_dict = df.unflatten(data[('__junk',)])
        value = data_dict[key[0]]
        if value is not MISSING:
            if isinstance(value, str):
                value = [value]
            elif not isinstance(value, list):
                errors[key].append(_('expecting list of strings, got "%s"') % str(value) )
                return
        else:
            value = []

        if not errors[key]:
            data[key] = json.dumps(value)

        # remove from junk
        del data_dict[key[0]]
        data[('__junk',)] = df.flatten_dict(data_dict)

    return validator

def bdm_table_columns_metadata_validator(key, data, errors, con):
    from ckanext.basedosdados.bdm_table_column_metadata_validator import (
        column_validator,
    )

    print("KEY: ", key, "\n")
    print("DATA: ", data, "\n")
    print("TYPE: ", type(data), "\n")
    for key, value in data.items():
        print(key, value)

    print(
        "########################## V A L I D A T I N G C O L U M N S ##################################"
    )
    validated = column_validator.validate_columns_from_dict({"columns": data[key]})
    if validated:
        errors[key].append(str(validated))

    return data


def bdm_table_columns_name_validator(key, data, errors, con):
    from ckanext.basedosdados.bdm_table_column_metadata_validator import (
        column_validator,
    )

    # print("KEY: ", key)
    print("DATA: ", data)
    print("TYPE: ", type(data))
    print(
        "########################## V A L I D A T I N G N A M E S ##################################"
    )

    validated = column_validator.validate_name({"name": data[key]})
    if validated:
        errors[key].append(str(validated))

    return data


def bdm_table_columns_description_validator(key, data, errors, con):
    from ckanext.basedosdados.bdm_table_column_metadata_validator import (
        column_validator,
    )

    print(
        "########################## V A L I D A T I N G D E S C R I P T I O N ##################################"
    )

    validated = column_validator.validate_description({"description": data[key]})
    if not validated:
        errors[key].append(validated)

    return data