<?php
$dbconn = pg_connect("host=94.23.218.10 port=5432 dbname=si_flore_national_v3 user='".$_SERVER['PHP_AUTH_USER']."' password=pUErwasrvIDMrUa");
$requete = "
select nom_complet, cd_ref, nom_taxon_mere, bd_mere, date_debut_obs, date_fin_obs from exploitation.observation_taxon_all
	WHERE cd_ref= '".$_GET['cd_ref']."' limit 1000
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
