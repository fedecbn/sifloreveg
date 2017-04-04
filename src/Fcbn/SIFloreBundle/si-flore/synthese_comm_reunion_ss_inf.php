<?php
$dbconn = pg_connect("host=94.23.218.10 port=5432 dbname=si_flore_national_v3 user='".$_SERVER['PHP_AUTH_USER']."' password=pUErwasrvIDMrUa");
$requete = "--synthese_comm_reunion_ss_inf
SELECT mai.code_insee as insee_comm, mai.nom as nom_comm, ind.cd_ref ,count(*) AS nb_obs, count(
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
            WHEN lien.type_localisation_commune = 'A'::bpchar THEN 1
            ELSE NULL::integer
        END) AS nb_obs_averee, count(
        CASE
            WHEN lien.type_localisation_commune = 'I'::bpchar THEN 1
            ELSE NULL::integer
        END) AS nb_obs_interpretee, string_agg(distinct ind.nom_taxon, '|') as noms_taxon,1 as nb_tax,100 as nb_tax_visu, 1 as nb_tax_n1, 0 as nb_tax_n2,min(obs.date_debut_obs) AS date_premiere_obs, max(obs.date_fin_obs) AS date_derniere_obs, ST_ASGeoJSON(mai.geom) as lieu
    FROM observation_reunion.observation_commune_reunion lien, observation_reunion.communes_bdtopo_reunion mai, observation_reunion.observation_taxon_reunion obs, observation_reunion.index_reunion ind
    WHERE  mai.code_insee::text = lien.code_insee::text and lien.id_flore_fcbn=obs.id_flore_fcbn and obs.code_taxon=ind.code_taxon and ind.cd_ref='".$_GET['cd_ref']."'
    group by mai.code_insee, mai.code_insee, cd_ref,geom order by nb_obs desc;";
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