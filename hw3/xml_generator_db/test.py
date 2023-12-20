import json
import xml.etree.ElementTree as ET

def generate_xml_from_json(template_path, json_path, output_path):
    
    with open(json_path, 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)

   
    tree = ET.parse(template_path)
    root = tree.getroot()

    
    root.clear()

    
    for order_data in data["Order"]:
        order = ET.SubElement(root, "Order")
        for key, value in order_data.items():
            child = ET.SubElement(order, key)
            child.text = value

    tree.write(output_path, encoding='utf-8', xml_declaration=True)

template_path = 'template.xml'
json_path = 'database.json'
output_path = 'output.xml'

generate_xml_from_json(template_path, json_path, output_path)
