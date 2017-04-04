<?php
$dbconn = pg_connect("host=94.23.218.10 port=5432 dbname=si_flore_national_v3 user='".$_SERVER['PHP_AUTH_USER']."' password=pUErwasrvIDMrUa");
$requete = "
select * from exploitation.obs_maille_fr10 obs, (WITH RECURSIVE hierarchie(cd_ref, nom_complet, cd_taxsup) AS (
  SELECT cd_ref, nom_complet, cd_taxsup
    FROM observation.taxref_v5 WHERE cd_ref = '".$_GET['cd_ref']."'
  UNION ALL
  SELECT e.cd_ref, e.nom_complet, e.cd_taxsup
    FROM hierarchie AS h, observation.taxref_v5 AS e 
    WHERE h.cd_ref = e.cd_taxsup
)
SELECT cd_ref FROM hierarchie) recur
	WHERE obs.cd_ref= recur.cd_ref and cd_sig= '".$_GET['id_obj']."'
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
