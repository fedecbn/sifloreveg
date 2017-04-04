<?php
$dbconn = pg_connect("host=94.23.218.10 port=5432 dbname=si_flore_national_v3 user='".$_SERVER['PHP_AUTH_USER']."' password=pUErwasrvIDMrUa");
$requete = "--synthese fr10 ss inf
SELECT cd_sig, cd_ref,count(*) AS nb_obs, count(
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
        END) AS nb_obs_2001_2013, count(
        CASE
            WHEN libelle_type_localisation = 'Averée' THEN 1
            ELSE NULL::integer
        END) AS nb_obs_averee, count(
        CASE
            WHEN libelle_type_localisation = 'Interpretée' THEN 1
            ELSE NULL::integer
        END) AS nb_obs_interpretee, string_agg(distinct nom_complet, '|') as noms_taxon,1 as nb_tax,100 as nb_tax_visu, 1 as nb_tax_n1, 0 as nb_tax_n2,min(date_debut_obs) AS date_premiere_obs, max(date_fin_obs) AS date_derniere_obs, ST_ASGeoJSON(geom) as lieu
    FROM exploitation.obs_maille_fr10
    WHERE cd_ref='".$_GET['cd_ref']."'
    group by cd_sig, cd_ref,geom order by nb_obs desc;";
$result = pg_query($dbconn,$requete);
while ($row = pg_fetch_assoc($result)) {
$type = '"type": "Feature"';
$geometry = '"geometry": ' . $row['lieu'];
unset($row['lieu']);
$properties = '"properties": ' . json_encode($row);
$feature[] = '{' . $type . ', ' . $geometry . ', ' .
$properties . '}';
}
$header = '{"type": "FeatureCollection", "features": [';
$footer = ']}';
echo $header . implode(', ', $feature) . $footer;
?>