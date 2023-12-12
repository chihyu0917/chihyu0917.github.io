<?php
// Check if the request is a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Extract data from POST variables
    $singer = $_POST['singer'];
    $albumName = $_POST['albumName'];
    $albumPrice = $_POST['albumPrice'];
    $albumImageUrl = $_POST['albumImageUrl'];

    // Load the XML file
    $xml = simplexml_load_file('output.xml');

    // Create a new order element and add it to the XML
    $newOrder = $xml->addChild('Order');
    $newOrder->addChild('Singer', $singer);
    $newOrder->addChild('AlbumName', $albumName);
    $newOrder->addChild('AlbumPrice', $albumPrice);
    $newOrder->addChild('AlbumImageURL', $albumImageUrl);

    // Save the updated XML
    $xml->asXML('output.xml');

    echo "New album added successfully";
} else {
    echo "Invalid request";
}
?>
