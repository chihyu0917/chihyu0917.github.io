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
            console.error("Error: ", e);
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

function conditionDisplay() {
    var xml = loadXMLDoc("output.xml");
    
    if (xml) {
        try {
            var xmlDoc = xml;
            var orders = xmlDoc.getElementsByTagName("Order");

            var priceRange = document.getElementById("AlbumPrice").value;
            var cartHtml = "<ul>";
            for (var i = 0; i < orders.length; i++) {
                // var orderID = orders[i].getAttribute("id"); // 獲取 Order 元素的 id 屬性
                if (orders[i].getElementsByTagName("AlbumPrice")[0].textContent > priceRange) {
                    cartHtml += "<li>" + 
                        "<h2>" + orders[i].getElementsByTagName("Singer")[0].textContent + "</h2>" +
                        orders[i].getElementsByTagName("AlbumName")[0].textContent + "<br>" + 
                        "<image src='" + orders[i].getElementsByTagName("AlbumImageURL")[0].textContent + "' width='300px'>" + "<br>" +
                        "<h2>" + orders[i].getElementsByTagName("AlbumPrice")[0].textContent + "</h2>" +
                        "</li>";
                }
            }
            cartHtml += "</ul>";

            document.getElementById("xmllist").innerHTML = cartHtml;
        } catch (e) {
            console.error("Error: ", e);
        }
    } else {
        console.error("Failed to load XML.");
    }
}    


function deleteDisplay() { 
    var xml = loadXMLDoc("output.xml");
    
    if (xml) {
        try {
            var xmlDoc = xml;
            var orders = xmlDoc.getElementsByTagName("Order");
            var cartHtml = "<ul>";
            for (var i = 0; i < orders.length; i++) {
                var orderID = orders[i].getAttribute("id"); // 獲取 Order 元素的 id 屬性
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
            console.error("Error:", e);
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
            console.error("Error:", e);
        }
    } else {
        console.error("Failed to load XML.");
    }
}

function modifyForm(orderInfo) {
    var formHtml = "<h3>修改專輯內容</h3><br>" +
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
    if (document.getElementById('Singer').value == "" || document.getElementById('AlbumName').value == "" || document.getElementById('AlbumImageURL').value == "" || document.getElementById('AlbumPrice').value == "") {
        alert("請填寫完整資料");
        return;
    }
    else if (document.getElementById('AlbumImageURL').value.indexOf("http") == -1) {
        alert("請輸入正確的圖片網址");
        return;
    }
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
            modifyDisplay();  // Reload or update the page content as needed
        }
    };
    xhttp.send(JSON.stringify(orderData));
}

function submitForm() {
    if (document.getElementById('Singer').value == "" || document.getElementById('AlbumName').value == "" || document.getElementById('AlbumImageURL').value == "" || document.getElementById('AlbumPrice').value == "") {
        alert("請填寫完整資料");
        return;
    }
    else if (document.getElementById('AlbumImageURL').value.indexOf("http") == -1) {
        alert("請輸入正確的圖片網址");
        return;
    }
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


let fileContent = ''; // 讀取的檔案內容

function readFile() {
    var input = document.getElementById('fileInput');

    // 檢查是否為txt檔
    if (!input.files[0].name.endsWith('.txt')) {
        alert('請上傳txt檔');
        return;
    }

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            fileContent = e.target.result;
            document.getElementById('file-content').innerText = fileContent;
        };

        reader.readAsText(input.files[0]);
    }
}

function convertToJson() {
    try {
        
        var json = csvToJson(fileContent);
        
    } catch (e) {
        console.error("Error converting", e);
        
    }
}

function csvToJson(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = currentline[j].trim();
        }

        result.push(obj);
    }

    generateXML(result);
}

function generateXML(result) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:5000/generateXML", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Response received: ", this.responseText);
            // Reload or update the page content as needed
            // displayResult();  
        }
    };
    xhttp.send(JSON.stringify(result));
}

