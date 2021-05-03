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
    """Remove field contents from the ('__junk') key and make it into a field inside the resource"""
    def validator(key, data, errors, context):
        # if there was an error before calling our validator
        # don't bother with our validation
        if errors[key]:
            return
        # Unflatten the field contents, e.g. take it back to the original yaml structure
        data_dict = df.unflatten(data[('__junk',)])
        if not errors[key]:
            #Put field contents into the right key
            data[key] = data_dict[key[0]]
        # remove from junk
        del data_dict[key[0]]
        data[('__junk',)] = df.flatten_dict(data_dict)

    return validator

def bdm_table_columns_metadata_validator(key, data, errors, con):
    from ckanext.basedosdados.bdm_table_column_metadata_validator import (
        column_validator,
    )
    print(
        "########################## V A L I D A T I N G C O L U M N S ##################################"
    )
    # At this point the variable data[key][0] should be a dict for the cerberus validation to work
    # The call order of validators in the field schema matter!
    validation_errors = column_validator.validate_columns_from_dict(data[key][0])
    if validation_errors:
        errors[key].append(str(validation_errors))

    return data
