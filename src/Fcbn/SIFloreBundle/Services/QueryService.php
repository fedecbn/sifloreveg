<?php
namespace Fcbn\SiFloreBundle\Services;

use Doctrine\DBAL\Connection;

class QueryService
{
    private $connection;

    public function __construct(Connection $dbalConnection){
        $this->connection=$dbalConnection;
    }
    //taxons.php
    public function taxons($rang,$type){
        $jsonRows=array();
        $statement = $this->connection->prepare("select cd_ref, nom_complet from exploitation.taxons where (rang = :rang or :rang ='') and (type = :type or :type ='') order by nom_complet;");
        $statement -> bindParam(':rang', $rang);
        $statement -> bindParam(':type', $type);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[]=$row;
            }
        }
        $header = '{success: true, rows: ';
        $footer = '}';
        return $header . \json_encode($jsonRows) . $footer;
    }
     //synthese_utm1_ss_inf.php
    public function synthese_utm1_ss_inf($cd_ref){
        $feature=array();
        $statement = $this->connection->prepare("--synthese_utm1_ss_inf
            SELECT mai.nom_maille as cd_sig, ind.cd_ref,count(*) AS nb_obs, count(
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
                    WHEN lien.type_localisation_maille_utm1 = 'A'::bpchar THEN 1
                    ELSE NULL::integer
                END) AS nb_obs_averee, count(
                CASE
                    WHEN lien.type_localisation_maille_utm1 = 'I'::bpchar THEN 1
                    ELSE NULL::integer
                END) AS nb_obs_interpretee, string_agg(distinct ind.nom_taxon, '|') as noms_taxon,1 as nb_tax,100 as nb_tax_visu, 1 as nb_tax_n1, 0 as nb_tax_n2,min(obs.date_debut_obs) AS date_premiere_obs, max(obs.date_fin_obs) AS date_derniere_obs, ST_ASGeoJSON(mai.geom) as lieu
            FROM observation_reunion.observation_maille_utm1 lien, observation_reunion.maille_utm1 mai, observation_reunion.observation_taxon_reunion obs, observation_reunion.index_reunion ind
            WHERE  mai.nom_maille::text = lien.nom_maille::text and lien.id_flore_fcbn=obs.id_flore_fcbn and obs.code_taxon=ind.code_taxon and ind.cd_ref= :cd_ref
            group by cd_sig, cd_ref,geom order by nb_obs desc;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }
    //synthese_utm1.php
    public function synthese_utm1($cd_ref){
        $feature=array();
        $statement = $this->connection->prepare("--synthese_utm1
select cd_sig, string_agg(cd_ref::text, '|') as cd_ref,sum(nb_obs) as nb_obs, sum(nb_obs_1500_1980) as nb_obs_1500_1980, sum(nb_obs_1981_2000) as nb_obs_1981_2000, sum(nb_obs_2001_2013) as nb_obs_2001_2013, sum(nb_obs_averee) as nb_obs_averee, sum(nb_obs_interpretee) as nb_obs_interpretee, string_agg(nom_complet, '|') as noms_taxon,count(*) as nb_tax,sum(case when cd_ref= :cd_ref THEN 100 when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_visu, count(case when cd_ref= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n1, count(case when cd_ref!= :cd_ref  THEN 1 ELSE NULL::integer END) as nb_tax_n2,min(date_premiere_obs) AS date_premiere_obs, max(date_derniere_obs) AS date_derniere_obs, ST_ASGeoJSON(geom) as lieu
 from (select mai.nom_maille as cd_sig, tax.cd_ref, max(tax.cd_taxsup) as cd_taxsup, max(tax.nom_complet) as nom_complet, max(mai.geom) as geom,count(*) AS nb_obs, count(
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
            WHEN lien.type_localisation_maille_utm1 = 'A'::bpchar THEN 1
            ELSE NULL::integer
        END) AS nb_obs_averee, count(
        CASE
            WHEN lien.type_localisation_maille_utm1 = 'I'::bpchar THEN 1
            ELSE NULL::integer
        END) AS nb_obs_interpretee, min(obs.date_debut_obs) AS date_premiere_obs, max(obs.date_fin_obs) AS date_derniere_obs
    FROM observation_reunion.observation_maille_utm1 lien, observation_reunion.maille_utm1 mai, observation_reunion.observation_taxon_reunion obs, observation_reunion.index_reunion ind, exploitation.taxref_v5_new tax
    WHERE mai.nom_maille::text = lien.nom_maille::text and lien.id_flore_fcbn=obs.id_flore_fcbn and obs.code_taxon=ind.code_taxon and ind.cd_ref=tax.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref )
    group by mai.nom_maille, tax.cd_ref) n1
    group by n1.cd_sig, n1.geom order by nb_obs desc;");
    $statement -> bindParam(':cd_ref', $cd_ref);
    if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    } 
    /*//synthese_utm1_old.php
    public function synthese_utm1_old($cd_ref){
        $feature=array();
        $statement = $this->connection->prepare("select cd_sig, string_agg(cd_ref::text, '|') as cd_ref,sum(nb_obs) as nb_obs, sum(nb_obs_1500_1980) as nb_obs_1500_1980, sum(nb_obs_1981_2000) as nb_obs_1981_2000, sum(nb_obs_2001_2013) as nb_obs_2001_2013, sum(nb_obs_averee) as nb_obs_averee, sum(nb_obs_interpretee) as nb_obs_interpretee, string_agg(nom_complet, '|') as noms_taxon,count(*) as nb_tax,sum(case when cd_ref= :cd_ref THEN 100 when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_visu, count(case when cd_ref= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n1, count(case when cd_ref!= :cd_ref  THEN 1 ELSE NULL::integer END) as nb_tax_n2,min(date_premiere_obs) AS date_premiere_obs, max(date_derniere_obs) AS date_derniere_obs, ST_ASGeoJSON(geom) as lieu
 from (select mai.nom_maille as cd_sig, recur.cd_ref, max(recur.cd_taxsup) as cd_taxsup, max(recur.nom_complet) as nom_complet, max(mai.geom) as geom,count(*) AS nb_obs, count(
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
            WHEN lien.type_localisation_maille_utm1 = 'A'::bpchar THEN 1
            ELSE NULL::integer
        END) AS nb_obs_averee, count(
        CASE
            WHEN lien.type_localisation_maille_utm1 = 'I'::bpchar THEN 1
            ELSE NULL::integer
        END) AS nb_obs_interpretee, min(obs.date_debut_obs) AS date_premiere_obs, max(obs.date_fin_obs) AS date_derniere_obs
    FROM observation_reunion.observation_maille_utm1 lien, observation_reunion.maille_utm1 mai, observation_reunion.observation_taxon_reunion obs, observation_reunion.index_reunion ind, (WITH RECURSIVE hierarchie(cd_ref, nom_complet, cd_taxsup) AS (
  SELECT cd_ref, nom_complet, cd_taxsup
    FROM observation.taxref_v5 WHERE cd_ref = :cd_ref
  UNION ALL
  SELECT e.cd_ref, e.nom_complet, e.cd_taxsup
    FROM hierarchie AS h, observation.taxref_v5 AS e 
    WHERE h.cd_ref = e.cd_taxsup
)
SELECT * FROM hierarchie) recur
    WHERE mai.nom_maille::text = lien.nom_maille::text and lien.id_flore_fcbn=obs.id_flore_fcbn and obs.code_taxon=ind.code_taxon and ind.cd_ref=recur.cd_ref
    group by mai.nom_maille, recur.cd_ref) n1
    group by n1.cd_sig, n1.geom;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }*/
    //synthese_utm10_ss_inf.php
    public function synthese_utm10_ss_inf($cd_ref){
        $feature=array();
        $statement = $this->connection->prepare("--synthese_utm10_ss_inf
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
    WHERE  mai.cd_sig::text = lien.cd_sig::text and lien.id_flore_fcbn=obs.id_flore_fcbn and obs.code_taxon=ind.code_taxon and ind.cd_ref= :cd_ref
    group by mai.cd_sig, cd_ref,geom order by nb_obs desc;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }
    //synthese_utm10.php
    public function synthese_utm10($cd_ref){
        $feature=array();
        $statement = $this->connection->prepare("--synthese_utm_10
select cd_sig, string_agg(cd_ref::text, '<br/>') as cd_ref,sum(nb_obs) as nb_obs, sum(nb_obs_1500_1980) as nb_obs_1500_1980, sum(nb_obs_1981_2000) as nb_obs_1981_2000, sum(nb_obs_2001_2013) as nb_obs_2001_2013, sum(nb_obs_averee) as nb_obs_averee, sum(nb_obs_interpretee) as nb_obs_interpretee, string_agg(nom_complet, '<br/>') as noms_taxon,count(*) as nb_tax,sum(case when cd_ref= :cd_ref THEN 100 when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_visu, count(case when cd_ref= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n1, count(case when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n2,min(date_premiere_obs) AS date_premiere_obs, max(date_derniere_obs) AS date_derniere_obs, ST_ASGeoJSON(geom) as lieu
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
    WHERE mai.cd_sig::text = lien.cd_sig::text and lien.id_flore_fcbn=obs.id_flore_fcbn and obs.code_taxon=ind.code_taxon and ind.cd_ref=tax.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref  )
    group by mai.cd_sig, tax.cd_ref) n1
    group by n1.cd_sig, n1.geom order by nb_obs desc;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }
    //synthese_taxon_utm_ss_inf.php
    public function synthese_taxon_utm_ss_inf($cd_ref){
        $jsonRows=array();
        $statement = $this->connection->prepare("SELECT ind.cd_ref, ind.nom_complet, count(*) AS nb_obs, count(
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
    WHERE obs.code_taxon=ind.code_taxon and ind.cd_ref= :cd_ref
    group by cd_ref,nom_complet;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {

                $json_rows[] = $row;
            }
        }
        $header = '{success: true, rows: ';
        $footer = '}';
        echo $header . json_encode($json_rows) . $footer;
    }
    //synthese_taxon_utm.php
    public function synthese_taxon_utm($cd_ref){
        $jsonRows=array();
        $statement = $this->connection->prepare("--synthese_taxon_utm
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
    FROM observation.taxref_v5 WHERE cd_ref = :cd_ref
  UNION ALL
  SELECT e.cd_ref, e.nom_complet, e.cd_taxsup
    FROM hierarchie AS h, observation.taxref_v5 AS e 
    WHERE h.cd_ref = e.cd_taxsup
)
SELECT cd_ref, nom_complet FROM hierarchie) recur
    WHERE obs.code_taxon=ind.code_taxon and ind.cd_ref=recur.cd_ref
    group by recur.cd_ref, recur.nom_complet;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $json_rows[] = $row;
            }
        }
        $header = '{success: true, rows: ';
        $footer = '}';
        echo $header . json_encode($json_rows) . $footer;
    }
    //synthese_taxon_fr5_ss_inf.php
    public function synthese_taxon_fr5_ss_inf($cd_ref){
        $jsonRows=array();
        $statement = $this->connection->prepare("--synthese taxon fr5 ss inf
SELECT syn.cd_ref, syn.nom_complet, nb_obs, nb_obs_1500_1980, nb_obs_1981_2000, nb_obs_2001_2013, nb_obs_averee, nb_obs_interpretee, date_premiere_obs, date_derniere_obs
    FROM exploitation.synthese_taxon_fr5 syn
    WHERE cd_ref = :cd_ref ;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $json_rows[] = $row;
            }
        }
        $header = '{success: true, rows: ';
        $footer = '}';
        echo $header . json_encode($json_rows) . $footer;
    }
    //synthese_taxon_fr5.php
    public function synthese_taxon_fr5($cd_ref){
        $jsonRows=array();
        $statement = $this->connection->prepare("--synthese taxon fr5
SELECT syn.cd_ref, syn.nom_complet, nb_obs, nb_obs_1500_1980, nb_obs_1981_2000, nb_obs_2001_2013, nb_obs_averee, nb_obs_interpretee, date_premiere_obs, date_derniere_obs
    FROM exploitation.synthese_taxon_fr5 syn, (WITH RECURSIVE hierarchie(cd_ref, nom_complet, cd_taxsup) AS (
  SELECT cd_ref, nom_complet, cd_taxsup
    FROM observation.taxref_v5 WHERE cd_ref = :cd_ref
  UNION ALL
  SELECT e.cd_ref, e.nom_complet, e.cd_taxsup
    FROM hierarchie AS h, observation.taxref_v5 AS e 
    WHERE h.cd_ref = e.cd_taxsup
)
SELECT cd_ref, nom_complet FROM hierarchie) recur
    WHERE recur.cd_ref=syn.cd_ref;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $json_rows[] = $row;
            }
        }
        $header = '{success: true, rows: ';
        $footer = '}';
        echo $header . json_encode($json_rows) . $footer;
    }
    //synthese_taxon_fr10_ss_inf.php
    public function synthese_taxon_fr10_ss_inf($cd_ref){
        $jsonRows=array();
        $statement = $this->connection->prepare("--synthese taxon fr10 ss inf
    SELECT syn.cd_ref, syn.nom_complet, nb_obs, nb_obs_1500_1980, nb_obs_1981_2000, nb_obs_2001_2013, nb_obs_averee, nb_obs_interpretee, date_premiere_obs, date_derniere_obs
    FROM exploitation.synthese_taxon_fr10 syn
    WHERE cd_ref = :cd_ref ;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $json_rows[] = $row;
            }
        }
        $header = '{success: true, rows: ';
        $footer = '}';
        echo $header . json_encode($json_rows) . $footer;
    }
    //synthese_taxon_fr10.php
    public function synthese_taxon_fr10($cd_ref){
        $jsonRows=array();
        $statement = $this->connection->prepare("--synthese taxon fr10
SELECT syn.cd_ref, syn.nom_complet, nb_obs, nb_obs_1500_1980, nb_obs_1981_2000, nb_obs_2001_2013, nb_obs_averee, nb_obs_interpretee, date_premiere_obs, date_derniere_obs
    FROM exploitation.synthese_taxon_fr10 syn, (WITH RECURSIVE hierarchie(cd_ref, nom_complet, cd_taxsup) AS (
  SELECT cd_ref, nom_complet, cd_taxsup
    FROM observation.taxref_v5 WHERE cd_ref = :cd_ref
  UNION ALL
  SELECT e.cd_ref, e.nom_complet, e.cd_taxsup
    FROM hierarchie AS h, observation.taxref_v5 AS e 
    WHERE h.cd_ref = e.cd_taxsup
)
SELECT cd_ref, nom_complet FROM hierarchie) recur
    WHERE recur.cd_ref=syn.cd_ref; ");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $json_rows[] = $row;
            }
        }
        $header = '{success: true, rows: ';
        $footer = '}';
        echo $header . json_encode($json_rows) . $footer;
    }
    //synthese_taxon_comm_ss_inf.php
    public function synthese_taxon_comm_ss_inf($cd_ref){
        $jsonRows=array();
        $statement = $this->connection->prepare("--synthese taxon comm ss inf
SELECT syn.cd_ref, syn.nom_complet, nb_obs, nb_obs_1500_1980, nb_obs_1981_2000, nb_obs_2001_2013, nb_obs_averee, nb_obs_interpretee, date_premiere_obs, date_derniere_obs
    FROM exploitation.synthese_taxon_comm syn
    WHERE cd_ref = :cd_ref;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $json_rows[] = $row;
            }
        }
        $header = '{success: true, rows: ';
        $footer = '}';
        echo $header . json_encode($json_rows) . $footer;
    }

    //synthese_taxon_comm.php
    public function synthese_taxon_comm($cd_ref){
        $jsonRows=array();
        $statement = $this->connection->prepare("--synthese_taxon_comm
SELECT syn.cd_ref, syn.nom_complet, nb_obs, nb_obs_1500_1980, nb_obs_1981_2000, nb_obs_2001_2013, nb_obs_averee, nb_obs_interpretee, date_premiere_obs, date_derniere_obs
    FROM exploitation.synthese_taxon_comm syn, (WITH RECURSIVE hierarchie(cd_ref, nom_complet, cd_taxsup) AS (
  SELECT cd_ref, nom_complet, cd_taxsup
    FROM observation.taxref_v5 WHERE cd_ref = :cd_ref
  UNION ALL
  SELECT e.cd_ref, e.nom_complet, e.cd_taxsup
    FROM hierarchie AS h, observation.taxref_v5 AS e 
    WHERE h.cd_ref = e.cd_taxsup
)
SELECT cd_ref, nom_complet FROM hierarchie) recur
    WHERE recur.cd_ref=syn.cd_ref;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $json_rows[] = $row;
            }
        }
        $header = '{success: true, rows: ';
        $footer = '}';
        echo $header . json_encode($json_rows) . $footer;
    }
    //synthese_fr5_ss_inf.php
    public function synthese_fr5_ss_inf($cd_ref){
        $feature=array();
        $statement = $this->connection->prepare("--synthese fr5 ss inf
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
    FROM exploitation.obs_maille_fr5
    WHERE cd_ref= :cd_ref
    group by cd_sig, cd_ref,geom order by nb_obs desc;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }
    //synthese_fr5.php
    public function synthese_fr5($cd_ref){
        $feature=array();
        $statement = $this->connection->prepare("--synthese fr5
select cd_sig, string_agg(cd_ref::text, '<br/>') as cd_ref,sum(nb_obs) as nb_obs, sum(nb_obs_1500_1980) as nb_obs_1500_1980, sum(nb_obs_1981_2000) as nb_obs_1981_2000, sum(nb_obs_2001_2013) as nb_obs_2001_2013, sum(nb_obs_averee) as nb_obs_averee, sum(nb_obs_interpretee) as nb_obs_interpretee, string_agg(nom_complet, '<br/>') as noms_taxon,count(*) as nb_tax,sum(case when cd_ref= :cd_ref THEN 100 when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_visu, count(case when cd_ref= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n1, count(case when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n2,min(date_premiere_obs) AS date_premiere_obs, max(date_derniere_obs) AS date_derniere_obs, ST_ASGeoJSON(geom) as lieu
 from (SELECT obs.cd_sig, obs.cd_ref, max(tax.cd_taxsup) as cd_taxsup, max(tax.nom_complet) as nom_complet, max(obs.geom) as geom, count(*) AS nb_obs, count(
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
            WHEN obs.libelle_type_localisation = 'Averée' THEN 1
            ELSE NULL::integer
        END) AS nb_obs_averee, count(
        CASE
            WHEN obs.libelle_type_localisation = 'Interpretée' THEN 1
            ELSE NULL::integer
        END) AS nb_obs_interpretee, min(obs.date_debut_obs) AS date_premiere_obs, max(obs.date_fin_obs) AS date_derniere_obs
    FROM exploitation.obs_maille_fr5 obs, exploitation.taxref_v5_new tax
     WHERE tax.cd_ref=obs.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref)
    group by obs.cd_sig, obs.cd_ref) n1
    group by n1.cd_sig, n1.geom order by nb_obs desc;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }
    /*//synthese_fr5_old.php
    public function synthese_fr5_old($cd_ref){
        $feature=array();
        $statement = $this->connection->prepare("--synthese fr5
select cd_sig, string_agg(cd_ref::text, '<br/>') as cd_ref,sum(nb_obs) as nb_obs, sum(nb_obs_1500_1980) as nb_obs_1500_1980, sum(nb_obs_1981_2000) as nb_obs_1981_2000, sum(nb_obs_2001_2013) as nb_obs_2001_2013, sum(nb_obs_averee) as nb_obs_averee, sum(nb_obs_interpretee) as nb_obs_interpretee, string_agg(nom_complet, '<br/>') as noms_taxon,count(*) as nb_tax,sum(case when cd_ref= :cd_ref THEN 100 when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_visu, count(case when cd_ref= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n1, count(case when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n2,min(date_premiere_obs) AS date_premiere_obs, max(date_derniere_obs) AS date_derniere_obs, ST_ASGeoJSON(geom) as lieu
 from (SELECT obs.cd_sig, obs.cd_ref, max(recur.cd_taxsup) as cd_taxsup, max(recur.nom_complet) as nom_complet, max(obs.geom) as geom, count(*) AS nb_obs, count(
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
            WHEN obs.libelle_type_localisation = 'Averée' THEN 1
            ELSE NULL::integer
        END) AS nb_obs_averee, count(
        CASE
            WHEN obs.libelle_type_localisation = 'Interpretée' THEN 1
            ELSE NULL::integer
        END) AS nb_obs_interpretee, min(obs.date_debut_obs) AS date_premiere_obs, max(obs.date_fin_obs) AS date_derniere_obs
    FROM exploitation.obs_maille_fr5 obs, (WITH RECURSIVE hierarchie(cd_ref, nom_complet, cd_taxsup) AS (
  SELECT cd_ref, nom_complet, cd_taxsup
    FROM observation.taxref_v5 WHERE cd_ref = :cd_ref
  UNION ALL
  SELECT e.cd_ref, e.nom_complet, e.cd_taxsup
    FROM hierarchie AS h, observation.taxref_v5 AS e 
    WHERE h.cd_ref = e.cd_taxsup
)
SELECT * FROM hierarchie) recur
    WHERE recur.cd_ref=obs.cd_ref
    group by obs.cd_sig, obs.cd_ref) n1
    group by n1.cd_sig, n1.geom order by nb_obs desc;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }*/
    //synthese_fr10_ss_inf.php
    public function synthese_fr10_ss_inf($cd_ref){
        $feature=array();
        $statement = $this->connection->prepare("--synthese fr10 ss inf
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
    WHERE cd_ref= :cd_ref
    group by cd_sig, cd_ref,geom order by nb_obs desc;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }
    //synthese_fr10.php
    public function synthese_fr10($cd_ref){
        $feature=array();
        $statement = $this->connection->prepare("--synthese fr10
select cd_sig, string_agg(cd_ref::text, '<br/>') as cd_ref,sum(nb_obs) as nb_obs, sum(nb_obs_1500_1980) as nb_obs_1500_1980, sum(nb_obs_1981_2000) as nb_obs_1981_2000, sum(nb_obs_2001_2013) as nb_obs_2001_2013, sum(nb_obs_averee) as nb_obs_averee, sum(nb_obs_interpretee) as nb_obs_interpretee, string_agg(nom_complet, '<br/>') as noms_taxon,count(*) as nb_tax,sum(case when cd_ref= :cd_ref THEN 100 when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_visu, count(case when cd_ref= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n1, count(case when cd_ref!= :cd_ref  THEN 1 ELSE NULL::integer END) as nb_tax_n2,min(date_premiere_obs) AS date_premiere_obs, max(date_derniere_obs) AS date_derniere_obs, ST_ASGeoJSON(geom) as lieu
 from (SELECT obs.cd_sig, obs.cd_ref, max(tax.cd_taxsup) as cd_taxsup, max(tax.nom_complet) as nom_complet, max(obs.geom) as geom, count(*) AS nb_obs, count(
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
            WHEN obs.libelle_type_localisation = 'Averée' THEN 1
            ELSE NULL::integer
        END) AS nb_obs_averee, count(
        CASE
            WHEN obs.libelle_type_localisation = 'Interpretée' THEN 1
            ELSE NULL::integer
        END) AS nb_obs_interpretee, min(obs.date_debut_obs) AS date_premiere_obs, max(obs.date_fin_obs) AS date_derniere_obs
    FROM exploitation.obs_maille_fr10 obs, exploitation.taxref_v5_new tax
     WHERE tax.cd_ref=obs.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref )
    group by obs.cd_sig, obs.cd_ref) n1
    group by n1.cd_sig, n1.geom order by nb_obs desc;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }
    /*//synthese_fr10_old.php
    public function synthese_fr10_old($cd_ref){
        $feature=array();
        $statement = $this->connection->prepare("--synthese fr10
select cd_sig, string_agg(cd_ref::text, '<br/>') as cd_ref,sum(nb_obs) as nb_obs, sum(nb_obs_1500_1980) as nb_obs_1500_1980, sum(nb_obs_1981_2000) as nb_obs_1981_2000, sum(nb_obs_2001_2013) as nb_obs_2001_2013, sum(nb_obs_averee) as nb_obs_averee, sum(nb_obs_interpretee) as nb_obs_interpretee, string_agg(nom_complet, '<br/>') as noms_taxon,count(*) as nb_tax,sum(case when cd_ref= :cd_ref THEN 100 when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_visu, count(case when cd_ref= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n1, count(case when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n2,min(date_premiere_obs) AS date_premiere_obs, max(date_derniere_obs) AS date_derniere_obs, ST_ASGeoJSON(geom) as lieu
 from (SELECT obs.cd_sig, obs.cd_ref, max(recur.cd_taxsup) as cd_taxsup, max(recur.nom_complet) as nom_complet, max(obs.geom) as geom, count(*) AS nb_obs, count(
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
            WHEN obs.libelle_type_localisation = 'Averée' THEN 1
            ELSE NULL::integer
        END) AS nb_obs_averee, count(
        CASE
            WHEN obs.libelle_type_localisation = 'Interpretée' THEN 1
            ELSE NULL::integer
        END) AS nb_obs_interpretee, min(obs.date_debut_obs) AS date_premiere_obs, max(obs.date_fin_obs) AS date_derniere_obs
    FROM exploitation.obs_maille_fr10 obs, (WITH RECURSIVE hierarchie(cd_ref, nom_complet, cd_taxsup) AS (
  SELECT cd_ref, nom_complet, cd_taxsup
    FROM observation.taxref_v5 WHERE cd_ref = :cd_ref
  UNION ALL
  SELECT e.cd_ref, e.nom_complet, e.cd_taxsup
    FROM hierarchie AS h, observation.taxref_v5 AS e 
    WHERE h.cd_ref = e.cd_taxsup
)
SELECT * FROM hierarchie) recur
    WHERE recur.cd_ref=obs.cd_ref
    group by obs.cd_sig, obs.cd_ref) n1
    group by n1.cd_sig, n1.geom order by nb_obs desc;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }*/
    //synthese_comm_ss_inf.php
    public function synthese_comm_ss_inf($cd_ref){
        $feature=array();
        $statement = $this->connection->prepare("--synthese comm ss inf
SELECT insee_comm, max(nom_comm), cd_ref,count(*) AS nb_obs, count(
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
        END) AS nb_obs_interpretee, string_agg(distinct nom_complet, '|') as noms_taxon,1 as nb_tax,10 as nb_tax_visu, 1 as nb_tax_n1, 0 as nb_tax_n2,min(date_debut_obs) AS date_premiere_obs, max(date_fin_obs) AS date_derniere_obs, ST_ASGeoJSON(geom) as lieu
    FROM exploitation.obs_commune
    WHERE cd_ref= :cd_ref
    group by insee_comm, cd_ref,geom order by nb_obs desc;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }
    //synthese_comm_reunion_ss_inf.php
    public function synthese_comm_reunion_ss_inf($cd_ref){
        $feature=array();
        $statement = $this->connection->prepare("--synthese_comm_reunion_ss_inf
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
    WHERE  mai.code_insee::text = lien.code_insee::text and lien.id_flore_fcbn=obs.id_flore_fcbn and obs.code_taxon=ind.code_taxon and ind.cd_ref= :cd_ref
    group by mai.code_insee, mai.code_insee, cd_ref,geom order by nb_obs desc;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }
    //synthese_comm_reunion.php
    public function synthese_comm_reunion($cd_ref){
        $feature=array();
        $statement = $this->connection->prepare("--synthese_comm_reunion
select code_insee as insee_comm, nom as nom_comm, string_agg(cd_ref::text, '<br/>') as cd_ref,sum(nb_obs) as nb_obs, sum(nb_obs_1500_1980) as nb_obs_1500_1980, sum(nb_obs_1981_2000) as nb_obs_1981_2000, sum(nb_obs_2001_2013) as nb_obs_2001_2013, sum(nb_obs_averee) as nb_obs_averee, sum(nb_obs_interpretee) as nb_obs_interpretee, string_agg(nom_complet, '<br/>') as noms_taxon,count(*) as nb_tax,sum(case when cd_ref= :cd_ref THEN 100 when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_visu, count(case when cd_ref= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n1, count(case when cd_ref!= :cd_ref  THEN 1 ELSE NULL::integer END) as nb_tax_n2,min(date_premiere_obs) AS date_premiere_obs, max(date_derniere_obs) AS date_derniere_obs, ST_ASGeoJSON(geom) as lieu
 from (select mai.code_insee, mai.nom, tax.cd_ref, max(tax.cd_taxsup) as cd_taxsup, max(tax.nom_complet) as nom_complet, max(mai.geom) as geom,count(*) AS nb_obs, count(
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
    FROM observation_reunion.observation_commune_reunion lien, observation_reunion.communes_bdtopo_reunion mai, observation_reunion.observation_taxon_reunion obs, observation_reunion.index_reunion ind, exploitation.taxref_v5_new tax
    WHERE mai.code_insee::text = lien.code_insee::text and lien.id_flore_fcbn=obs.id_flore_fcbn and obs.code_taxon=ind.code_taxon and ind.cd_ref=tax.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref)
    group by mai.code_insee, mai.nom, tax.cd_ref) n1
    group by n1.code_insee, n1.nom, n1.geom order by nb_obs desc;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }
    /*//synthese_comm_reunion_old.php
    public function synthese_comm_reunion_old($cd_ref){
        $feature=array();
        $statement = $this->connection->prepare("--synthese_comm_reunion
select code_insee as insee_comm, nom as nom_comm, string_agg(cd_ref::text, '<br/>') as cd_ref,sum(nb_obs) as nb_obs, sum(nb_obs_1500_1980) as nb_obs_1500_1980, sum(nb_obs_1981_2000) as nb_obs_1981_2000, sum(nb_obs_2001_2013) as nb_obs_2001_2013, sum(nb_obs_averee) as nb_obs_averee, sum(nb_obs_interpretee) as nb_obs_interpretee, string_agg(nom_complet, '<br/>') as noms_taxon,count(*) as nb_tax,sum(case when cd_ref= :cd_ref THEN 100 when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_visu, count(case when cd_ref= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n1, count(case when cd_ref!= :cd_ref  THEN 1 ELSE NULL::integer END) as nb_tax_n2,min(date_premiere_obs) AS date_premiere_obs, max(date_derniere_obs) AS date_derniere_obs, ST_ASGeoJSON(geom) as lieu
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
    FROM observation.taxref_v5 WHERE cd_ref = :cd_ref
  UNION ALL
  SELECT e.cd_ref, e.nom_complet, e.cd_taxsup
    FROM hierarchie AS h, observation.taxref_v5 AS e 
    WHERE h.cd_ref = e.cd_taxsup
)
SELECT * FROM hierarchie) recur
    WHERE mai.code_insee::text = lien.code_insee::text and lien.id_flore_fcbn=obs.id_flore_fcbn and obs.code_taxon=ind.code_taxon and ind.cd_ref=recur.cd_ref
    group by mai.code_insee, mai.nom, recur.cd_ref) n1
    group by n1.code_insee, n1.nom, n1.geom order by nb_obs desc;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }*/
    //synthese_comm.php
    public function synthese_comm($cd_ref){
        $feature=array();
        $statement = $this->connection->prepare("--synthese_comm
select insee_comm, max(nom_comm) as nom_comm, string_agg(cd_ref::text, '<br/>') as cd_ref,sum(nb_obs) as nb_obs, sum(nb_obs_1500_1980) as nb_obs_1500_1980, sum(nb_obs_1981_2000) as nb_obs_1981_2000, sum(nb_obs_2001_2013) as nb_obs_2001_2013, sum(nb_obs_averee) as nb_obs_averee, sum(nb_obs_interpretee) as nb_obs_interpretee, string_agg(nom_complet, '<br/>') as noms_taxon,count(*) as nb_tax,sum(case when cd_ref= :cd_ref THEN 100 when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_visu, count(case when cd_ref= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n1, count(case when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n2,min(date_premiere_obs) AS date_premiere_obs, max(date_derniere_obs) AS date_derniere_obs, ST_ASGeoJSON(geom) as lieu
 from (SELECT obs.insee_comm, max(obs.nom_comm) as nom_comm, obs.cd_ref, max(tax.cd_taxsup) as cd_taxsup, max(tax.nom_complet) as nom_complet, max(obs.geom) as geom, count(*) AS nb_obs, count(CASE WHEN obs.date_fin_obs >= '1500-01-01'::date AND obs.date_fin_obs < '1980-01-01'::date THEN 1 ELSE NULL::integer END) AS nb_obs_1500_1980, count(CASE WHEN obs.date_fin_obs >= '1980-01-01'::date AND obs.date_fin_obs < '2000-01-01'::date THEN 1 ELSE NULL::integer END) AS nb_obs_1981_2000, count(CASE WHEN obs.date_fin_obs >= '2000-01-01'::date THEN 1 ELSE NULL::integer END) AS nb_obs_2001_2013, count(CASE WHEN obs.libelle_type_localisation = 'Averée' THEN 1 ELSE NULL::integer END) AS nb_obs_averee, count(CASE WHEN obs.libelle_type_localisation = 'Interpretée' THEN 1 ELSE NULL::integer END) AS nb_obs_interpretee, min(obs.date_debut_obs) AS date_premiere_obs, max(obs.date_fin_obs) AS date_derniere_obs
 FROM exploitation.obs_commune obs, exploitation.taxref_v5_new tax
     WHERE tax.cd_ref=obs.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref)
    group by obs.insee_comm, obs.cd_ref) n1
    group by n1.insee_comm, n1.geom order by nb_obs desc;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }
   /*//synthese_comm_old.php
    public function synthese_comm_old($cd_ref){
        $feature=array();
        $statement = $this->connection->prepare("--synthese_comm
select insee_comm, nom_comm, string_agg(cd_ref::text, '<br/>') as cd_ref,sum(nb_obs) as nb_obs, sum(nb_obs_1500_1980) as nb_obs_1500_1980, sum(nb_obs_1981_2000) as nb_obs_1981_2000, sum(nb_obs_2001_2013) as nb_obs_2001_2013, sum(nb_obs_averee) as nb_obs_averee, sum(nb_obs_interpretee) as nb_obs_interpretee, string_agg(nom_complet, '<br/>') as noms_taxon,count(*) as nb_tax,sum(case when cd_ref= :cd_ref THEN 100 when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_visu, count(case when cd_ref= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n1, count(case when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n2,min(date_premiere_obs) AS date_premiere_obs, max(date_derniere_obs) AS date_derniere_obs, ST_ASGeoJSON(geom) as lieu
 from (SELECT obs.insee_comm, obs.nom_comm, obs.cd_ref, max(tax.cd_taxsup) as cd_taxsup, max(tax.nom_complet) as nom_complet, max(obs.geom) as geom, count(*) AS nb_obs, count(CASE WHEN obs.date_fin_obs >= '1500-01-01'::date AND obs.date_fin_obs < '1980-01-01'::date THEN 1 ELSE NULL::integer END) AS nb_obs_1500_1980, count(CASE WHEN obs.date_fin_obs >= '1980-01-01'::date AND obs.date_fin_obs < '2000-01-01'::date THEN 1 ELSE NULL::integer END) AS nb_obs_1981_2000, count(CASE WHEN obs.date_fin_obs >= '2000-01-01'::date THEN 1 ELSE NULL::integer END) AS nb_obs_2001_2013, count(CASE WHEN obs.libelle_type_localisation = 'Averée' THEN 1 ELSE NULL::integer END) AS nb_obs_averee, count(CASE WHEN obs.libelle_type_localisation = 'Interpretée' THEN 1 ELSE NULL::integer END) AS nb_obs_interpretee, min(obs.date_debut_obs) AS date_premiere_obs, max(obs.date_fin_obs) AS date_derniere_obs
 FROM exploitation.obs_commune obs, exploitation.taxref_v5_new tax
     WHERE tax.cd_ref=obs.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref )
    group by obs.insee_comm, obs.nom_comm, obs.cd_ref) n1
    group by n1.insee_comm, n1.nom_comm, n1.geom order by nb_obs desc;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }*/
   //observation_taxon.php

/****************************observation_taxon_commune TABLE DOESN'T EXIST ***********/

   /* public function observation_taxon($cd_ref){
        $statement = $this->connection->prepare("select nom_taxon_mere , cd_ref_taxref, code_commune_mere AS insee_comm, ST_ASGeoJSON(ST_Transform(geom,900913)) AS lieu from observation_taxon_commune
	WHERE cd_ref_taxref= :cd_ref
 ;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }*/
   /*//observation_taxon_comm.php
    public function observation_taxon_comm($cd_ref){
        $jsonRows=array();
        $statement = $this->connection->prepare("select nom_complet, cd_ref, nom_taxon_mere, bd_mere, date_debut_obs, date_fin_obs from exploitation.observation_taxon_all
	WHERE cd_ref= :cd_ref limit 1000;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[]=$row;
            }
        }
        $header = '{success: true, rows: ';
        $footer = '}';
        return $header . \json_encode($jsonRows) . $footer;
    }*/
   //observation_fr5_ss_inf.php
    public function observation_fr5_ss_inf($cd_ref,$id_obj){
        $jsonRows=array();
        $statement = $this->connection->prepare("--observation_fr5_ss_inf
        select * from exploitation.obs_maille_fr5 obs
	WHERE obs.cd_ref= :cd_ref and cd_sig= :id_obj ;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        $statement -> bindParam(':id_obj', $id_obj);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[]=$row;
            }
        }
        $header = '{success: true, rows: ';
        $footer = '}';
        return $header . \json_encode($jsonRows) . $footer;
    }
   //observation_fr5.php
    public function observation_fr5($cd_ref,$id_obj){
        $jsonRows=array();
        $statement = $this->connection->prepare("--observation_fr5
        select * from exploitation.obs_maille_fr5 obs, exploitation.taxref_v5_new tax
	WHERE obs.cd_ref=tax.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref ) and cd_sig= :id_obj ;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        $statement -> bindParam(':id_obj', $id_obj);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[]=$row;
            }
        }
        $header = '{success: true, rows: ';
        $footer = '}';
        return $header . \json_encode($jsonRows) . $footer;
    }
   //observation_fr10_ss_inf.php
    public function observation_fr10_ss_inf($cd_ref,$id_obj){
        $jsonRows=array();
        $statement = $this->connection->prepare("--observation_fr10_ss_inf
        select * from exploitation.obs_maille_fr10 obs
	WHERE obs.cd_ref= :cd_ref and cd_sig= :id_obj ;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        $statement -> bindParam(':id_obj', $id_obj);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[]=$row;
            }
        }
        $header = '{success: true, rows: ';
        $footer = '}';
        return $header . \json_encode($jsonRows) . $footer;
    }
   //observation_fr10.php
    public function observation_fr10($cd_ref,$id_obj){
        $jsonRows=array();
        $statement = $this->connection->prepare("--observation_fr10
select * from exploitation.obs_maille_fr10 obs, exploitation.taxref_v5_new tax
	WHERE tax.cd_ref=obs.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref ) and cd_sig= :id_obj;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        $statement -> bindParam(':id_obj', $id_obj);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[]=$row;
            }
        }
        $header = '{success: true, rows: ';
        $footer = '}';
        return $header . \json_encode($jsonRows) . $footer;
    }
   /*//observation_fr10_old.php
    public function observation_fr10_old($cd_ref,$id_obj){
        $jsonRows=array();
        $statement = $this->connection->prepare("
select * from exploitation.obs_maille_fr10 obs, (WITH RECURSIVE hierarchie(cd_ref, nom_complet, cd_taxsup) AS (
  SELECT cd_ref, nom_complet, cd_taxsup
    FROM observation.taxref_v5 WHERE cd_ref = :cd_ref
  UNION ALL
  SELECT e.cd_ref, e.nom_complet, e.cd_taxsup
    FROM hierarchie AS h, observation.taxref_v5 AS e 
    WHERE h.cd_ref = e.cd_taxsup
)
SELECT cd_ref FROM hierarchie) recur
	WHERE obs.cd_ref= recur.cd_ref and cd_sig= :id_obj
 ;
");
        $statement -> bindParam(':cd_ref', $cd_ref);
        $statement -> bindParam(':id_obj', $id_obj);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[]=$row;
            }
        }
        $header = '{success: true, rows: ';
        $footer = '}';
        return $header . \json_encode($jsonRows) . $footer;
    }*/
   //observation_comm_ss_inf.php
    public function observation_comm_ss_inf($cd_ref,$id_obj){
        $jsonRows=array();
        $statement = $this->connection->prepare("--observation_comm_ss_inf
        select *  from exploitation.obs_commune obs
	WHERE obs.cd_ref= :cd_ref and insee_comm= :id_obj;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        $statement -> bindParam(':id_obj', $id_obj);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[]=$row;
            }
        }
        $header = '{success: true, rows: ';
        $footer = '}';
        return $header . \json_encode($jsonRows) . $footer;
    }
   //observation_comm.php
    public function observation_comm($cd_ref,$id_obj){
        $jsonRows=array();
        $statement = $this->connection->prepare("--observation_comm
        select * from exploitation.obs_commune obs, exploitation.taxref_v5_new tax
	WHERE obs.cd_ref=tax.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref ) and insee_comm= :id_obj ;");
        $statement -> bindParam(':cd_ref', $cd_ref);
        $statement -> bindParam(':id_obj', $id_obj);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[]=$row;
            }
        }
        $header = '{success: true, rows: ';
        $footer = '}';
        return $header . \json_encode($jsonRows) . $footer;
    }
   //communes_old.php

/****************************exploitation.communes TABLE DOESN'T EXIST ***********/

   /* public function communes_old($cd_ref,$id_obj){
        $jsonRows=array();
        $statement = $this->connection->prepare("SELECT insee_comm, nom_comm FROM exploitation.communes;");
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[]=$row;
            }
        }
        $header = '{success: true, rows: ';
        $footer = '}';
        return $header . \json_encode($jsonRows) . $footer;
    }*/


   //commentaires.php

/***********************UNTESTED**********************************/

   /*public function commentaires($prenom,$nom,$email,$comment,$user,$cd_ref,$id_obj,$id_flore_fcbn,$type_com,$priorite_com,$action_com,$nom_complet){
        $jsonRows=array();
        $ans='';
        $statement = $this->connection->prepare("INSERT INTO exploitation.commentaires (prenom,nom,email,comment,utilisateur,cd_ref,id_obj,id_flore_fcbn, date_com, type_com, priorite_com, action_com,nom_complet) values ( :prenom , :nom , :email ,:comment, :user , :cd_ref, :id_obj, :id_flore_fcbn, CURRENT_DATE, :type_com, :priorite_com, :action_com, :nom_complet) returning id;");
        $statement -> bindParam(':prenom', $prenom);
        $statement -> bindParam(':nom', $nom);
        $statement -> bindParam(':email', $email);
        $statement -> bindParam(':comment', $comment);
        $statement -> bindParam(':user', $user);
        $statement -> bindParam(':cd_ref', $cd_ref);
        $statement -> bindParam(':id_obj', $id_obj);
        $statement -> bindParam(':id_flore_fcbn', $id_flore_fcbn);
        $statement -> bindParam(':type_com', $type_com);
        $statement -> bindParam(':priorite_com', $priorite_com);
        $statement -> bindParam(':action_com', $action_com);
        $statement -> bindParam(':nom_complet', $nom_complet);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $ans.= $row['id'];
            }
        }
        return $ans;
    }*/
   //commentaires_existants.php
    public function commentaires_existants($cd_ref,$id_obj, $id_flore_fcbn){
        $jsonRows=array();
        $statement = $this->connection->prepare("--commentaires_existants
SELECT * FROM exploitation.commentaires WHERE cd_ref = :cd_ref and (id_obj= :id_obj or :id_obj='') and (id_flore_fcbn= :id_flore_fcbn or :id_flore_fcbn='');");
        $statement -> bindParam(':cd_ref', $cd_ref);
        $statement -> bindParam(':id_obj', $id_obj);
        $statement -> bindParam(':id_flore_fcbn', $id_flore_fcbn);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[]=$row;
            }
        }
        $header = '{success: true, rows: ';
        $footer = '}';
        return $header . \json_encode($jsonRows) . $footer;
    }
    

}
?>
