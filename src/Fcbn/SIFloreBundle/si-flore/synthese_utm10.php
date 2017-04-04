<?php
$dbconn = pg_connect("host=94.23.218.10 port=5432 dbname=si_flore_national_v3 user='".$_SERVER['PHP_AUTH_USER']."' password=pUErwasrvIDMrUa");
$requete = "--synthese_utm_10
select cd_sig, string_agg(cd_ref::text, '<br/>') as cd_ref,sum(nb_obs) as nb_obs, sum(nb_obs_1500_1980) as nb_obs_1500_1980, sum(nb_obs_1981_2000) as nb_obs_1981_2000, sum(nb_obs_2001_2013) as nb_obs_2001_2013, sum(nb_obs_averee) as nb_obs_averee, sum(nb_obs_interpretee) as nb_obs_interpretee, string_agg(nom_complet, '<br/>') as noms_taxon,count(*) as nb_tax,sum(case when cd_ref='".$_GET['cd_ref']."' THEN 100 when cd_ref!='".$_GET['cd_ref']."' THEN 1 ELSE NULL::integer END) as nb_tax_visu, count(case when cd_ref='".$_GET['cd_ref']."' THEN 1 ELSE NULL::integer END) as nb_tax_n1, count(case when cd_ref!='".$_GET['cd_ref']."'  THEN 1 ELSE NULL::integer END) as nb_tax_n2,min(date_premiere_obs) AS date_premiere_obs, max(date_derniere_obs) AS date_derniere_obs, ST_ASGeoJSON(geom) as lieu
 from (select mai.cd_sig, tax.cd_ref, max(tax.cd_taxsup) as cd_taxsup, max(tax.nom_complet) as nom_complet, max(mai.geom) as geom,count(*) AS nb_obs, count(
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
            WHEN lien.type_localisation_maille_utm10 = 'A'::bpchar THEN 1
            ELSE NULL::integer
        END) AS nb_obs_averee, count(
        CASE
            WHEN lien.type_localisation_maille_utm10 = 'I'::bpchar THEN 1
            ELSE NULL::integer
        END) AS nb_obs_interpretee, min(obs.date_debut_obs) AS date_premiere_obs, max(obs.date_fin_obs) AS date_derniere_obs
    FROM observation_reunion.observation_maille_utm10 lien, observation_reunion.grille_10km_zee_974 mai, observation_reunion.observation_taxon_reunion obs, observation_reunion.index_reunion ind, exploitation.taxref_v5_new tax
    WHERE mai.cd_sig::text = lien.cd_sig::text and lien.id_flore_fcbn=obs.id_flore_fcbn and obs.code_taxon=ind.code_taxon and ind.cd_ref=tax.cd_ref and (tax.cd_ref='".$_GET['cd_ref']."' or tax.cd_taxsup='".$_GET['cd_ref']."' or tax.cd_taxsup2='".$_GET['cd_ref']."' or tax.cd_taxsup3='".$_GET['cd_ref']."' )
    group by mai.cd_sig, tax.cd_ref) n1
    group by n1.cd_sig, n1.geom order by nb_obs desc;";
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