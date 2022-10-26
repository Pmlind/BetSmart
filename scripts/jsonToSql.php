<?php
$spreadFile = 'resources/weekOfSpreads.json';
$totalFile = 'resources/weekOfTotals.json';
$moneylineFile = 'resources/weekOfMoneylines.json';
$spreadData = json_decode(file_get_contents($spreadFile, true));
$totalData = json_decode(file_get_contents($totalFile, true));
$moneylineData = json_decode(file_get_contents($moneylineFile, true));
$tables = array();
$tables[0] = $spreadData;
$tables[1] = $totalData;
$tables[2] = $moneylineData;

foreach ($tables as $index=>$t) {
  foreach ($t as $id=>$row) {
      $insertPairs = array();
      foreach ($row as $key=>$val) {
          $insertPairs[addslashes($key)] = addslashes($val);
      }
      $insertKeys = '`' . implode('`,`', array_keys($insertPairs)) . '`';
      $insertVals = '"' . implode('","', array_values($insertPairs)) . '"';
      $tableName = 'SPREAD';
      if($index === 1) {
        $tableName = 'TOTAL';
      }
      else if($index === 2) {
        $tableName = 'MONEYLINE';
      }
  
      echo "INSERT INTO `{$tableName}` ({$insertKeys}) VALUES ({$insertVals});" . "\n";
  }
}
?>
