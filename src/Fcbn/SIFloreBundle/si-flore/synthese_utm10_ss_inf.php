<?php
$dbconn = pg_connect("host=94.23.218.10 port=5432 dbname=si_flore_national_v3 user='".$_SERVER['PHP_AUTH_USER']."' password=pUErwasrvIDMrUa");
$requete = "--synthese_utm10_ss_inf
SELECT mai.cd_sig, ind.cd_ref ,count(*) AS nb_obs, count(
        CASE
            WHEN obs.date_fin_obs >= '1500-01-01'::date AND date_fin_obs < '1980-01-01'::date THEN 1
            ELSE NULL::integer
        END) AS nb_obs_1500_1980, count(
        CASE
            WHEN obs.date_fin_obs >= '1980-01-01'::date AND date_fin_obs < '2000-01-01'::date THEN 1
            ELSE NULL::integer
        END) AS nb_obs_1981_2000, count(
        CASE
            WHEN obs.date_fin_obs >= '2000-01-01'::date THEN 1
            ELSE NULL::integer
        END) AS nb_obs_2001_2013, count(
        CASE
            WHEN lien.type_localisation_maille_utm10 = 'A'::bpchar THEN 1
            ELSE NULL::integer
        END) AS nb_obs_averee, count(
        CASE
            WHEN lien.type_localisation_maille_utm10 = 'I'::bpchar THEN 1
            ELSE NULL::integer
        END) AS nb_obs_interpretee, string_agg(distinct ind.nom_taxon, '|') as noms_taxon,1 as nb_tax,100 as nb_tax_visu, 1 as nb_tax_n1, 0 as nb_tax_n2,min(obs.date_debut_obs) AS date_premiere_obs, max(obs.date_fin_obs) AS date_derniere_obs, ST_ASGeoJSON(mai.geom) as lieu
    FROM observation_reunion.observation_maille_utm10 lien, observation_reunion.grille_10km_zee_974 mai, observation_reunion.observation_taxon_reunion obs, observation_reunion.index_reunion ind
    WHERE  mai.cd_sig::text = lien.cd_sig::text and lien.id_flore_fcbn=obs.id_flore_fcbn and obs.code_taxon=ind.code_taxon and ind.cd_ref='".$_GET['cd_ref']."'
    group by mai.cd_sig, cd_ref,geom order by nb_obs desc;";
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