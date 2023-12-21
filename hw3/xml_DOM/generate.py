import xml.etree.ElementTree as ET

def parse_txt_to_list(txt_path):
    with open(txt_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    
    orders = []
    headers = lines[0].strip().split(',')
    for line in lines[1:]:
        values = line.strip().split(',')
        order = dict(zip(headers, values))
        orders.append(order)
    
    return orders

def generate_xml_from_list(template_path, orders, output_path):
    tree = ET.parse(template_path)
    root = tree.getroot()
    
    root.clear()

    for order_data in orders:
        # 创建新 Order，并添加 ID
        order_id = str(len(root.findall('Order')))
        order = ET.SubElement(root, "Order")
        order.set('id', order_id)  # 设置 ID 属性
        for key, value in order_data.items():
            child = ET.SubElement(order, key)
            child.text = value

    tree.write(output_path, encoding='utf-8', xml_declaration=True)

# 使用範例
template_path = 'template.xml'
txt_path = 'database.txt'
output_path = 'output.xml'

orders = parse_txt_to_list(txt_path)
generate_xml_from_list(template_path, orders, output_path)


