<?php
$dbconn = pg_connect("host=94.23.218.10 port=5432 dbname=si_flore_national_v3 user='".$_SERVER['PHP_AUTH_USER']."' password=pUErwasrvIDMrUa");
$requete = "--synthese_taxon_utm
SELECT recur.cd_ref, recur.nom_complet, count(*) AS nb_obs, count(
        CASE
            WHEN obs.date_fin_obs >= '1500-01-01'::date AND obs.date_fin_obs < '1980-01-01'::date THEN 1
            ELSE NULL::integer
        END) AS nb_obs_1500_1980, count(
        CASE
            WHEN obs.date_fin_obs >= '1980-01-01'::date AND obs.date_fin_obs < '2000-01-01'::date THEN 1
            ELSE NULL::integer
        END) AS nb_obs_1981_2000, count(
        CASE
            WHEN obs.date_fin_obs >= '2000-01-01'::date THEN 1
            ELSE NULL::integer
        END) AS nb_obs_2001_2013, count(*) as nb_obs_averee, 0 AS nb_obs_interpretee, min(obs.date_debut_obs) AS date_premiere_obs, max(obs.date_fin_obs) AS date_derniere_obs
    FROM observation_reunion.observation_taxon_reunion obs, observation_reunion.index_reunion ind, (WITH RECURSIVE hierarchie(cd_ref, nom_complet, cd_taxsup) AS (
  SELECT cd_ref, nom_complet, cd_taxsup
    FROM observation.taxref_v5 WHERE cd_ref = '".$_GET['cd_ref']."'
  UNION ALL
  SELECT e.cd_ref, e.nom_complet, e.cd_taxsup
    FROM hierarchie AS h, observation.taxref_v5 AS e 
    WHERE h.cd_ref = e.cd_taxsup
)
SELECT cd_ref, nom_complet FROM hierarchie) recur
    WHERE obs.code_taxon=ind.code_taxon and ind.cd_ref=recur.cd_ref
    group by recur.cd_ref, recur.nom_complet;";
$result = pg_query($dbconn,$requete);
while ($row = pg_fetch_object($result)) {
$json_rows[] = $row;
}
$header = '{success: true, rows: ';
$footer = '}';
echo $header . json_encode($json_rows) . $footer;
?>