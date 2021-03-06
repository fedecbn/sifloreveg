<?php
$dbconn = pg_connect("host=94.23.218.10 port=5432 dbname=si_flore_national_v3 user='".$_SERVER['PHP_AUTH_USER']."' password=pUErwasrvIDMrUa");
$requete = "--synthese_comm_reunion
select code_insee as insee_comm, nom as nom_comm, string_agg(cd_ref::text, '<br/>') as cd_ref,sum(nb_obs) as nb_obs, sum(nb_obs_1500_1980) as nb_obs_1500_1980, sum(nb_obs_1981_2000) as nb_obs_1981_2000, sum(nb_obs_2001_2013) as nb_obs_2001_2013, sum(nb_obs_averee) as nb_obs_averee, sum(nb_obs_interpretee) as nb_obs_interpretee, string_agg(nom_complet, '<br/>') as noms_taxon,count(*) as nb_tax,sum(case when cd_ref='".$_GET['cd_ref']."' THEN 100 when cd_ref!='".$_GET['cd_ref']."' THEN 1 ELSE NULL::integer END) as nb_tax_visu, count(case when cd_ref='".$_GET['cd_ref']."' THEN 1 ELSE NULL::integer END) as nb_tax_n1, count(case when cd_ref!='".$_GET['cd_ref']."'  THEN 1 ELSE NULL::integer END) as nb_tax_n2,min(date_premiere_obs) AS date_premiere_obs, max(date_derniere_obs) AS date_derniere_obs, ST_ASGeoJSON(geom) as lieu
 from (select mai.code_insee, mai.nom, recur.cd_ref, max(recur.cd_taxsup) as cd_taxsup, max(recur.nom_complet) as nom_complet, max(mai.geom) as geom,count(*) AS nb_obs, count(
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
        END) AS nb_obs_2001_2013, count(
        CASE
            WHEN lien.type_localisation_commune = 'A'::bpchar THEN 1
            ELSE NULL::integer
        END) AS nb_obs_averee, count(
        CASE
            WHEN lien.type_localisation_commune = 'I'::bpchar THEN 1
            ELSE NULL::integer
        END) AS nb_obs_interpretee, min(obs.date_debut_obs) AS date_premiere_obs, max(obs.date_fin_obs) AS date_derniere_obs
    FROM observation_reunion.observation_commune_reunion lien, observation_reunion.communes_bdtopo_reunion mai, observation_reunion.observation_taxon_reunion obs, observation_reunion.index_reunion ind, (WITH RECURSIVE hierarchie(cd_ref, nom_complet, cd_taxsup) AS (
  SELECT cd_ref, nom_complet, cd_taxsup
    FROM observation.taxref_v5 WHERE cd_ref = '".$_GET['cd_ref']."'
  UNION ALL
  SELECT e.cd_ref, e.nom_complet, e.cd_taxsup
    FROM hierarchie AS h, observation.taxref_v5 AS e 
    WHERE h.cd_ref = e.cd_taxsup
)
SELECT * FROM hierarchie) recur
    WHERE mai.code_insee::text = lien.code_insee::text and lien.id_flore_fcbn=obs.id_flore_fcbn and obs.code_taxon=ind.code_taxon and ind.cd_ref=recur.cd_ref
    group by mai.code_insee, mai.nom, recur.cd_ref) n1
    group by n1.code_insee, n1.nom, n1.geom order by nb_obs desc;";
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