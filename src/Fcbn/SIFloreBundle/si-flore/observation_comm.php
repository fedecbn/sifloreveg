<?php
$dbconn = pg_connect("host=94.23.218.10 port=5432 dbname=si_flore_national_v3 user='".$_SERVER['PHP_AUTH_USER']."' password=pUErwasrvIDMrUa");
$requete = "--observation_comm
select * from exploitation.obs_commune obs, exploitation.taxref_v5_new tax
	WHERE obs.cd_ref=tax.cd_ref and (tax.cd_ref='".$_GET['cd_ref']."' or tax.cd_taxsup='".$_GET['cd_ref']."' or tax.cd_taxsup2='".$_GET['cd_ref']."' or tax.cd_taxsup3='".$_GET['cd_ref']."' ) and insee_comm= '".$_GET['id_obj']."'
 ;
";
$result = pg_query($dbconn,$requete);
while ($row = pg_fetch_object($result)) {
$json_rows[] = $row;
}
$header = '{success: true, rows: ';
$footer = '}';
echo $header . json_encode($json_rows) . $footer;
?>
