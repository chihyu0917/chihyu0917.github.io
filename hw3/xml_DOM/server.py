from flask import Flask, request
from flask_cors import cross_origin
import json
import xml.etree.ElementTree as ET

app = Flask(__name__)

@app.route('/generateXML', methods=['POST'])
@cross_origin() # 解決CORS問題
def generateXML():
    data = json.loads(request.data)
    tree = ET.parse('template.xml')
    root = tree.getroot()

    root.clear()

    for order_data in data:
        # 創建新 Order，並添加 ID
        order_id = str(len(root.findall('Order')))
        order = ET.SubElement(root, "Order")
        order.set('id', order_id)  # 設置 ID 屬性
        for key, value in order_data.items():
            child = ET.SubElement(order, key)
            child.text = value

    tree.write('output.xml', encoding='utf-8', xml_declaration=True)
    return "Order added successfully"

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

    # 創建新 Order，並添加 ID
    order_id = str(len(root.findall('Order')))
    order = ET.SubElement(root, "Order")
    order.set('id', order_id)  # 設置 ID 屬性
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
        if order.get('id') == str(order_id):  # 檢查 ID 屬性
            root.remove(order)
            found = True
            break

    if found:
        tree.write('output.xml', encoding='utf-8', xml_declaration=True)
        return "Order deleted successfully"
    else:
        return "Order not found"

@app.route('/modifyOrder', methods=['POST'])
@cross_origin()  # 解決CORS問題
def update_order():
    data = json.loads(request.data)
    order_id = data['id']
    tree = ET.parse('output.xml')
    root = tree.getroot()

    found = False
    for order in root.findall('Order'):
        if order.get('id') == order_id:  # 檢查 ID 屬性
            order.find('Singer').text = data['Singer']
            order.find('AlbumName').text = data['AlbumName']
            order.find('AlbumPrice').text = data['AlbumPrice']
            order.find('AlbumImageURL').text = data['AlbumImageURL']
            found = True
            break

    if found:
        tree.write('output.xml', encoding='utf-8', xml_declaration=True)
        return "Order updated successfully"
    else:
        return "Order not found"



if __name__ == '__main__':
    app.run(debug=True)
