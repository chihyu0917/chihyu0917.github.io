from flask import Flask, request, make_response
from flask_cors import cross_origin
import xml.etree.ElementTree as ET

app = Flask(__name__)

@app.route('/add_order', methods=['POST'])
@cross_origin()  # Enable CORS for this route
def add_order():
    # Load the existing XML
    tree = ET.parse('output.xml')
    root = tree.getroot()

    # Create a new order element
    new_order = ET.SubElement(root, 'Order')
    ET.SubElement(new_order, 'Singer').text = request.form['Singer']
    ET.SubElement(new_order, 'AlbumName').text = request.form['AlbumName']
    ET.SubElement(new_order, 'AlbumPrice').text = request.form['AlbumPrice']
    ET.SubElement(new_order, 'AlbumImageURL').text = request.form['AlbumImageUrl']

    # Save the updated XML
    tree.write('output.xml')

    response = make_response('Order added successfully')
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

if __name__ == '__main__':
    app.run(debug=True)
