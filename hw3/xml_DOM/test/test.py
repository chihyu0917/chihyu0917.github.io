# from flask import Flask, request, render_template
# from flask_cors import cross_origin

# app = Flask(__name__)
# @cross_origin() # 解決CORS問題

# @app.route("/")
# @app.route("/upload", methods=['GET', 'POST'])
# # def hello():
# #     return "Hello, World!"
# def upload_file():
#     if request.method == 'POST':
#         f = request.files['file']
#         # 可以在这里处理上传的文件，例如保存文件或进一步处理
#         f.save('uploaded_file.txt')
#         return 'File uploaded successfully'
#     return render_template('upload.html')

# if __name__ == '__main__':
#     app.run()

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

    # # 创建新 Order，并添加 ID
    # order_id = str(len(root.findall('Order')))
    # order = ET.SubElement(root, "Order")
    # order.set('id', order_id)  # 设置 ID 属性

    # for i in range(len(data)):
    #     for key, value in data[i].items():
    #         child = ET.SubElement(order, key)
    #         child.text = value

    root.clear()

    for order_data in data:
        # 创建新 Order，并添加 ID
        order_id = str(len(root.findall('Order')))
        order = ET.SubElement(root, "Order")
        order.set('id', order_id)  # 设置 ID 属性
        for key, value in order_data.items():
            child = ET.SubElement(order, key)
            child.text = value

    tree.write('test.xml', encoding='utf-8', xml_declaration=True)
    return "Order added successfully"

if __name__ == '__main__':
    app.run(debug=True)