<?php
$tableName = 'SPREAD';
$jsonFile = './weekOfSpreads.json';
$jsonData = json_decode(file_get_contents($jsonFile), true);

foreach ($jsonData as $id=>$row) {
    $insertPairs = array();
    foreach ($row as $key=>$val) {
        $insertPairs[addslashes($key)] = addslashes($val);
    }
    $insertKeys = '`' . implode('`,`', array_keys($insertPairs)) . '`';
    $insertVals = '"' . implode('","', array_values($insertPairs)) . '"';

    echo "INSERT INTO `{$tableName}` ({$insertKeys}) VALUES ({$insertVals});" . "\n";
}
?>
