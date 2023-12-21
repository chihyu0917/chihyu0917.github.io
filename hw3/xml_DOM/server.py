from flask import Flask, request
from flask_cors import cross_origin
import json
import xml.etree.ElementTree as ET

app = Flask(__name__)

# @app.route('/addOrder', methods=['POST'])
# @cross_origin() # 解決CORS問題
# def add_order():
#     data = json.loads(request.data)
#     tree = ET.parse('output.xml')
#     root = tree.getroot()

#     order = ET.SubElement(root, "Order")
#     for key, value in data.items():
#         child = ET.SubElement(order, key)
#         child.text = value

#     tree.write('output.xml', encoding='utf-8', xml_declaration=True)
#     return "Order added successfully"

@app.route('/addOrder', methods=['POST'])
@cross_origin() # 解決CORS問題
def add_order():
    data = json.loads(request.data)
    tree = ET.parse('output.xml')
    root = tree.getroot()

    # 创建新 Order，并添加 ID
    order_id = str(len(root.findall('Order')))
    order = ET.SubElement(root, "Order")
    order.set('id', order_id)  # 设置 ID 属性
    for key, value in data.items():
        child = ET.SubElement(order, key)
        child.text = value

    tree.write('output.xml', encoding='utf-8', xml_declaration=True)
    return "Order added successfully"

@app.route('/deleteOrder', methods=['POST'])
@cross_origin() # 解決CORS問題
def delete_order():
    data = json.loads(request.data)
    order_id = data['index']  # 使用 ID 而不是索引
    tree = ET.parse('output.xml')
    root = tree.getroot()

    found = False
    for order in root.findall('Order'):
        if order.get('id') == str(order_id):  # 检查 ID 属性
            root.remove(order)
            found = True
            break

    if found:
        tree.write('output.xml', encoding='utf-8', xml_declaration=True)
        return "Order deleted successfully"
    else:
        return "Order not found"



if __name__ == '__main__':
    app.run(debug=True)
