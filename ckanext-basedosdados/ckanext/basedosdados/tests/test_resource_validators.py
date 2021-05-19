from ckanext.basedosdados.validator.package import Package
from ckanext.basedosdados.validator.resource import Resource, BdmTable, ExternalLink
import jsonschema
import pytest

from . import data


def jsonify(data):
    from pydantic.json import pydantic_encoder
    import json

    return json.loads(json.dumps(data, default=pydantic_encoder))


def test_resource():
    data = {
        "id": "2251834b-0359-49d1-b2e2-ce791d75bdd1",
        "name": "Baixar",
        "description": "",
        "spatial_coverage": "spatial",
        "temporal_coverage": 2001,
        "update_frequency": "Second",
    }

    out = Resource.validate(data)
    out = out.dict(exclude={"action__"})
    out = jsonify(out)
    jsonschema.validate(jsonify(data), Resource.schema())
    for k, v in data.items():  # assert data is a subsed of out.dict()
        assert out[k] == v


def test_bdm_table():
    data = {
        "id": "2251834b-0359-49d1-b2e2-ce791d75bdd1",
        "name": "Baixar",
        "description": "",
        "spatial_coverage": "spatial",
        "temporal_coverage": 2001,
        "update_frequency": "Second",
        "table_id": 10,
        "auxiliary_files_url": "www.files.com.br/files-test",
        "observation_level": ["Dam", "Gun", "Age"],
        "columns": "",
        "primary_keys": "jasdiasd",
        "version": "3.0.0",
        "publisher": "Test",
        "publisher_email": "test@teste.com",
        "publisher_github": "",
        "publisher_website": "www.teste.com.br",
        "resource_type": "bdm_table",
    }

    out = BdmTable.validate(data)
    out = out.dict(exclude={"action__"})
    out = jsonify(out)
    jsonschema.validate(jsonify(data), BdmTable.schema())
    for k, v in data.items():  # assert data is a subsed of out.dict()
        assert out[k] == v


def test_external_link():
    data = {
        "id": "2251834b-0359-49d1-b2e2-ce791d75bdd1",
        "name": "Baixar",
        "description": "",
        "url": "www.teste.com.br",
        "spatial_coverage": "spatial",
        "temporal_coverage": 2001,
        "update_frequency": "Second",
        "language": ["German", "Bahasa", "Urdu"],
        "has_api": "yes",
        "free": "no",
        "signup_needed": "yes",
        "availability": "online",
        "brazilian_ip": "no",
        "license_type": "MIT",
        "resource_type": "external_link",
    }

    out = ExternalLink.validate(data)
    out = out.dict(exclude={"action__"})
    out = jsonify(out)
    jsonschema.validate(jsonify(data), ExternalLink.schema())
    for k, v in data.items():  # assert data is a subsed of out.dict()
        assert out[k] == v


@pytest.mark.skip()
def test_ok(data):
    data["resources"] = [
        {
            "resource_type": "external_link",
            "id": "13",
            "name": "linkzao",
            "url": "fgdfg",
        }
    ]
    out = Package.validate(data)
    out = out.dict(exclude={"action__"})
    out = jsonify(out)
    jsonschema.validate(jsonify(data), Package.schema())
    for k, v in data.items():  # assert data is a subsed of out.dict()
        assert out[k] == v