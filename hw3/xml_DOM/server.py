from flask import Flask, request
from flask_cors import cross_origin
import json
import xml.etree.ElementTree as ET

app = Flask(__name__)

@app.route('/addOrder', methods=['POST'])
@cross_origin() # 解決CORS問題
def add_order():
    data = json.loads(request.data)
    tree = ET.parse('output.xml')
    root = tree.getroot()

    order = ET.SubElement(root, "Order")
    for key, value in data.items():
        child = ET.SubElement(order, key)
        child.text = value

    tree.write('output.xml', encoding='utf-8', xml_declaration=True)
    return "Order added successfully"

if __name__ == '__main__':
    app.run(debug=True)
