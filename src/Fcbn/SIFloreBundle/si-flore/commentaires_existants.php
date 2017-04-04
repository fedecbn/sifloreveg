<?php
$dbconn = pg_connect("host=94.23.218.10 port=5432 dbname=si_flore_national_v3 user='".$_SERVER['PHP_AUTH_USER']."' password=pUErwasrvIDMrUa");
$requete = "--commentaires_existants
SELECT * FROM exploitation.commentaires WHERE cd_ref = '".$_GET['cd_ref']."' and (id_obj='".$_GET['id_obj']."' or '".$_GET['id_obj']."'='') and (id_flore_fcbn='".$_GET['id_flore_fcbn']."' or '".$_GET['id_flore_fcbn']."'='');";
$result = pg_query($dbconn,$requete);
while ($row = pg_fetch_object($result)) {
$json_rows[] = $row;
}
$header = '{success: true, rows: ';
$footer = '}';
echo $header . json_encode($json_rows) . $footer;
?>

