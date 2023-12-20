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


function deleteInstance() {
    
}

function submitForm() {
    var formData = {
        Singer: document.getElementById('Singer').value,
        AlbumName: document.getElementById('AlbumName').value,
        AlbumImageURL: document.getElementById('AlbumImageURL').value,
        AlbumPrice: document.getElementById('AlbumPrice').value
    };

    // call the backend API to update the data
    updateData(formData);
}


function updateData(data) {
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
