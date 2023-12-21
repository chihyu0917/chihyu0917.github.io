function loadXMLDoc(filename) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", filename, false);
    xhttp.send("");
    return xhttp.responseXML;
}

function displayResult() {
    var xml = loadXMLDoc("output.xml");
    
    if (xml) {
        try {
            var xmlDoc = xml;   
            console.log(xmlDoc);

            var orders = xmlDoc.getElementsByTagName("Order");
            var cartHtml = "<ul>";
            for (var i = 0; i < orders.length; i++) {
                cartHtml += "<li>" + 
                    "<h2>" + orders[i].getElementsByTagName("Singer")[0].textContent + "</h2>" +
                    orders[i].getElementsByTagName("AlbumName")[0].textContent + "<br>" + 
                    "<image src='" + orders[i].getElementsByTagName("AlbumImageURL")[0].textContent + "' width='300px'>" + "<br>" +
                    "<h2>" + orders[i].getElementsByTagName("AlbumPrice")[0].textContent + "</h2>" +
                    "</li>";
            }
            cartHtml += "</ul>";

            document.getElementById("xmllist").innerHTML = cartHtml;
            console.log(cartHtml);

        } catch (e) {
            console.error("Error during XSLT processing:", e);
        }
    } else {
        // console.error("Failed to load XML.");
    }
}


function init() {
    displayResult();
}

function viewsrc() {
    alert(document.body.innerHTML);
}

// function addInstance() {
//     var formHtml = "<h2>新增專輯</h2>" +
//                 "<form id='newOrderForm'>" +
//                 "<label for='Singer'>Singer:</label><br>" +
//                 "<input type='text' id='Singer' name='Singer'><br>" +
//                 "<label for='AlbumName'>Album Name:</label><br>" +
//                 "<input type='text' id='AlbumName' name='AlbumName'><br>" +
//                 "<label for='AlbumPrice'>Album Price:</label><br>" +
//                 "<input type='text' id='AlbumPrice' name='AlbumPrice'><br>" +
//                 "<label for='AlbumImageUrl'>Album Image URL:</label><br>" +
//                 "<input type='text' id='AlbumImageUrl' name='AlbumImageUrl'><br>" +
//                 "<input type='button' value='新增' onclick='submitNewAlbum();'><br>" +
//                 "</form>";
//     document.getElementById("xform").innerHTML = formHtml;
// }

// function submitNewAlbum() {
//     var singer = document.getElementById('Singer').value;
//     var albumName = document.getElementById('AlbumName').value;
//     var albumPrice = document.getElementById('AlbumPrice').value;
//     var albumImageUrl = document.getElementById('AlbumImageUrl').value;

//     var xmlData = '<Order>' +
//                     '<Singer>' + escapeHtml(singer) + '</Singer>' +
//                     '<AlbumName>' + escapeHtml(albumName) + '</AlbumName>' +
//                     '<AlbumPrice>' + escapeHtml(albumPrice) + '</AlbumPrice>' +
//                     '<AlbumImageURL>' + escapeHtml(albumImageUrl) + '</AlbumImageURL>' +
//                 '</Order>';

//     var xhttp = new XMLHttpRequest();
//     xhttp.open("POST", "http://127.0.0.1:5000/updateXML", true);
//     xhttp.setRequestHeader("Content-type", "application/xml");
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log("Response received: ", this.responseText);
//             // Reload or update the page content as needed
//         }
//     };
//     xhttp.send("newOrder=" + encodeURIComponent(xmlData));
// }

// function escapeHtml(unsafe) {
//     return unsafe
//         .replace(/&/g, "&amp;")
//         .replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;")
//         .replace(/"/g, "&quot;")
//         .replace(/'/g, "&#039;");
// }


function deleteDisplay() { 
    var xml = loadXMLDoc("output.xml");
    
    if (xml) {
        try {
            var xmlDoc = xml;
            var orders = xmlDoc.getElementsByTagName("Order");
            var cartHtml = "<ul>";
            for (var i = 0; i < orders.length; i++) {
                var orderID = orders[i].getAttribute("id"); // 获取 Order 元素的 id 属性
                cartHtml += "<li>" + 
                    "<h2>" + orders[i].getElementsByTagName("Singer")[0].textContent + "</h2>" +
                    orders[i].getElementsByTagName("AlbumName")[0].textContent + "<br>" + 
                    "<image src='" + orders[i].getElementsByTagName("AlbumImageURL")[0].textContent + "' width='300px'>" + "<br>" +
                    "<h2>" + orders[i].getElementsByTagName("AlbumPrice")[0].textContent + "</h2>" +
                    "<input type='button' value='刪除' onclick='deleteData(\"" + orderID + "\");'><br>" + // 使用 orderID
                    "</li>";
            }
            cartHtml += "</ul>";

            document.getElementById("xmllist").innerHTML = cartHtml;
        } catch (e) {
            console.error("Error during XSLT processing:", e);
        }
    } else {
        console.error("Failed to load XML.");
    }
}


function deleteData(index) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:5000/deleteOrder", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Response received: ", this.responseText);
            // Reload or update the page content as needed
            deleteDisplay();  
        }
    }
    xhttp.send(JSON.stringify({"index": index}));
}

function modifyDisplay() { 
    var xml = loadXMLDoc("output.xml");
    
    if (xml) {
        try {
            var xmlDoc = xml;
            var orders = xmlDoc.getElementsByTagName("Order");
            var cartHtml = "<ul>";
            for (var i = 0; i < orders.length; i++) {
                var order = orders[i];
                var orderInfo = {
                    id: order.getAttribute("id"),
                    singer: order.getElementsByTagName("Singer")[0].textContent,
                    albumName: order.getElementsByTagName("AlbumName")[0].textContent,
                    albumImageURL: order.getElementsByTagName("AlbumImageURL")[0].textContent,
                    albumPrice: order.getElementsByTagName("AlbumPrice")[0].textContent
                };
                cartHtml += "<li>" +
                    "<h2>" + orderInfo.singer + "</h2>" +
                    orderInfo.albumName + "<br>" + 
                    "<image src='" + orderInfo.albumImageURL + "' width='300px'>" + "<br>" +
                    "<h2>" + orderInfo.albumPrice + "</h2>" +
                    "<input type='button' value='修改' onclick='modifyForm(" + JSON.stringify(orderInfo) + ");'><br>" +
                    "</li>";
            }
            cartHtml += "</ul>";

            document.getElementById("xmllist").innerHTML = cartHtml;
        } catch (e) {
            console.error("Error during XSLT processing:", e);
        }
    } else {
        console.error("Failed to load XML.");
    }
}

function modifyForm(orderInfo) {
    var formHtml = "<h3>修改專輯 " + orderInfo.id + " 內容</h3><br>" +
                "<form id='modifyOrderForm'>" +
                "<label for='Singer'>Singer:</label><br>" +
                "<input type='text' id='Singer' name='Singer' value='" + orderInfo.singer + "'><br>" +
                "<label for='AlbumName'>Album Name:</label><br>" +
                "<input type='text' id='AlbumName' name='AlbumName' value='" + orderInfo.albumName + "'><br>" +
                "<label for='AlbumPrice'>Album Price:</label><br>" +
                "<input type='text' id='AlbumPrice' name='AlbumPrice' value='" + orderInfo.albumPrice + "'><br>" +
                "<label for='AlbumImageURL'>Album Image URL:</label><br>" +
                "<input type='text' id='AlbumImageURL' name='AlbumImageURL' value='" + orderInfo.albumImageURL + "'><br>" +
                "<input type='button' value='修改' onclick='submitModifyAlbum(\"" + orderInfo.id + "\");'><br>" +
                "</form>";
    document.getElementById("xform").innerHTML = formHtml;
}

function submitModifyAlbum(index) {
    var orderData = {
        id: index,
        Singer: document.getElementById('Singer').value,
        AlbumName: document.getElementById('AlbumName').value,
        AlbumPrice: document.getElementById('AlbumPrice').value,
        AlbumImageURL: document.getElementById('AlbumImageURL').value
    };

    // call the backend API to update the data
    submitModifyData(orderData);
}

function submitModifyData(orderData) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:5000/modifyOrder", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Response received: ", this.responseText);
            modifyDisplay();  // 重新加载显示更新后的 XML 数据
        }
    };
    xhttp.send(JSON.stringify(orderData));
}



function submitForm() {
    var formData = {
        Singer: document.getElementById('Singer').value,
        AlbumName: document.getElementById('AlbumName').value,
        AlbumImageURL: document.getElementById('AlbumImageURL').value,
        AlbumPrice: document.getElementById('AlbumPrice').value
    };

    // call the backend API to update the data
    addData(formData);
}


function addData(data) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:5000/addOrder", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Response received: ", this.responseText);
            // Reload or update the page content as needed
            displayResult();  
        }
    };
    xhttp.send(JSON.stringify(data));
}


// 加载并显示数据
function init() {
    // 加载并显示原始数据
    // ...
}
