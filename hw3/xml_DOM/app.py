from flask import Flask, request, render_template, send_from_directory, current_app
from flask_cors import cross_origin
import json
import xml.etree.ElementTree as ET

app = Flask(__name__)


@app.route('/getDatabase')
def get_database():
    return send_from_directory(current_app.root_path, 'database.txt')

@app.route('/getDatabase2')
def get_database2():
    return send_from_directory(current_app.root_path, 'database2.txt')

@app.route('/getOutputXML')
def get_output_xml():
    return send_from_directory(current_app.root_path, 'output.xml')

@app.route('/getTemplateXML')
def get_template_xml():
    return send_from_directory(current_app.root_path, 'template.xml')


@app.route('/')
@cross_origin() # 解決CORS問題
def index():
    return render_template('index.html')

@app.route('/upload')
@cross_origin() # 解決CORS問題
def upload_file():
    return render_template('upload.html')

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
    # tree.write('../output.xml', encoding='utf-8', xml_declaration=True)
    return "Order added successfully"

@app.route('/add')
@cross_origin() # 解決CORS問題
def addItem():
    return render_template('generate.html')

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

@app.route('/delete')
@cross_origin() # 解決CORS問題
def deleteItem():
    return render_template('delete.html')

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

@app.route('/modify')
@cross_origin() # 解決CORS問題
def modifyItem():
    return render_template('modify.html')

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

@app.route('/query')
@cross_origin() # 解決CORS問題
def queryItem():
    return render_template('query.html')

if __name__ == '__main__':
    app.run(debug=True)
