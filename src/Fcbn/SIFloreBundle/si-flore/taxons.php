<?php
$dbconn = pg_connect("host=94.23.218.10 port=5432 dbname=si_flore_national_v3 user='".$_SERVER['PHP_AUTH_USER']."' password=pUErwasrvIDMrUa");
$requete = "SELECT cd_ref, nom_complet FROM exploitation.taxons where (rang ='".$_GET['rang']."' or '".$_GET['rang']."' ='') and (type ='".$_GET['type']."' or '".$_GET['type']."' ='') order by nom_complet;";
$result = pg_query($dbconn,$requete);
while ($row = pg_fetch_object($result)) {
$json_rows[] = $row;
}
$header = '{success: true, rows: ';
$footer = '}';
echo $header . json_encode($json_rows) . $footer;
?>
