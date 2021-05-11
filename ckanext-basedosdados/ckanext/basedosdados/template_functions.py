import more_itertools
import stringcase

def separate_bdm_and_links_resources(resources):
    links, bdm =  more_itertools.partition(is_bdm, resources)
    return list(bdm), list(links)

def is_bdm(r):
    return r.get('is_bdm') or 'bd+' in r.get('formato', '') or '(BD+)' in r['name']

def is_bdm_one_click_download(r):
    size = r.get('bdm_file_size')
    return size != 'Unavailable' and type(size) == int and size > 10

def make_example_bq_query(resource, package):
    return f'''SELECT * FROM `basedosdados.{get_package_bdm_schema_name(package)}.{resource['name']}` LIMIT 100'''
    
def make_example_python_query(resource, package):
    return f'''import basedosdados as bd
# Para carregar o dado direto no pandas
df = bd.read_table(dataset_id='{get_package_bdm_schema_name(package)}', 
            table_id='{resource['name']}',
            billing_project_id=<YOUR_PROJECT_ID>)'''

def make_example_r_query(resource, package):
    return f'''if (!require("basedosdados")) install.packages("basedosdados")
library("basedosdados")
# Defina o seu projeto no Google Cloud
set_billing_id("<YOUR_PROJECT_ID>")
# Para carregar o dado direto no R
query <- "SELECT * FROM `basedosdados.{get_package_bdm_schema_name(package)}.{resource['name']}`"
df <- read_sql(query)
    '''
def get_package_bdm_schema_name(package):
    return stringcase.snakecase(package['name'])

def get_resource_bdm_table_name(resource):
    return resource['name']
