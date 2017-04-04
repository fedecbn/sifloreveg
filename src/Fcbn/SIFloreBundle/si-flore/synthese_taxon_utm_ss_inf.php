<?php
$dbconn = pg_connect("host=94.23.218.10 port=5432 dbname=si_flore_national_v3 user='".$_SERVER['PHP_AUTH_USER']."' password=pUErwasrvIDMrUa");
$requete = "SELECT ind.cd_ref, ind.nom_complet, count(*) AS nb_obs, count(
        CASE
            WHEN date_fin_obs >= '1500-01-01'::date AND date_fin_obs < '1980-01-01'::date THEN 1
            ELSE NULL::integer
        END) AS nb_obs_1500_1980, count(
        CASE
            WHEN date_fin_obs >= '1980-01-01'::date AND date_fin_obs < '2000-01-01'::date THEN 1
            ELSE NULL::integer
        END) AS nb_obs_1981_2000, count(
        CASE
            WHEN date_fin_obs >= '2000-01-01'::date THEN 1
            ELSE NULL::integer
        END) AS nb_obs_2001_2013, count(*)  AS nb_obs_averee, 0 AS nb_obs_interpretee, min(date_debut_obs) AS date_premiere_obs, max(date_fin_obs) AS date_derniere_obs
    FROM observation_reunion.observation_taxon_reunion obs, observation_reunion.index_reunion ind
    WHERE obs.code_taxon=ind.code_taxon and ind.cd_ref='".$_GET['cd_ref']."'
    group by cd_ref,nom_complet;";
$result = pg_query($dbconn,$requete);
while ($row = pg_fetch_object($result)) {
$json_rows[] = $row;
}
$header = '{success: true, rows: ';
$footer = '}';
echo $header . json_encode($json_rows) . $footer;
?>