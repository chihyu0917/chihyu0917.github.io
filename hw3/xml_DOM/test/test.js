let fileContent = ''; // 用于存储读取的文件内容

function readFile() {
    var input = document.getElementById('fileInput');
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
        // 将 CSV 数据转换为 JSON
        var json = csvToJson(fileContent);
        // document.getElementById('json-content').innerText = JSON.stringify(json, null, 4);
    } catch (e) {
        console.error("Error converting", e);
        // document.getElementById('json-content').innerText = 'Error converting to JSON';
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

    // return result; // 返回 JSON 对象
    generateXML(result);
}

// function submitForm() {
//     var formData = {
//         Singer: document.getElementById('Singer').value,
//         AlbumName: document.getElementById('AlbumName').value,
//         AlbumImageURL: document.getElementById('AlbumImageURL').value,
//         AlbumPrice: document.getElementById('AlbumPrice').value
//     };

//     // call the backend API to update the data
//     addData(formData);
// }


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