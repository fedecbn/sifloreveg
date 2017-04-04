<?php

namespace Fcbn\NewSiFloreBundle\Services;

use Doctrine\DBAL\Connection;

class QueryService {

    private $connection;
    private $security;

    public function __construct(Connection $dbalConnection, $security) {
        $this->connection = $dbalConnection;
        $this->security = $security;
    }

    public function isTooBig($cdRef, $txOption) {
        if ($cdRef == '') {
            return false;
        };
        $statement = $this->connection->prepare("select * from exploitation.taxons_communs where cd_ref=:cd_ref");
        $statement->bindParam(':cd_ref', $cdRef);

        if ($statement->execute()) {
            $row = $statement->fetch();
        }
        if ($row) {
            if ($txOption == 1 && $row['taxons_communs_ss_inf'] == 'non') {
                return true;
            }
            if ($txOption == 2 && $row['taxons_communs_av_inf'] == 'non') {
                return true;
            }
        }
        return false;
    }
    public function checkTaxRange($cdRef) {
        $ans = '';
        $statement = $this->connection->prepare("select cd_ref from exploitation.taxons where cd_ref = :cd_ref and (rang='GN' or rang='ES' or rang='SSES')");
        $statement->bindParam(':cd_ref', $cdRef);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $ans = $row['cd_ref'];
            }
        }
        return $ans;
    }

    //taxons.php
    public function taxons($rang, $groupe, $term, $id, $page, $limit) {
        $Options = '{"results": [';
        $search = ".*";
        $idsearch = 0;
        $offsetCond = ' limit ' . pg_escape_string($limit) . ' offset ' . ($page - 1) * $limit;
        if ($term) {
            $search = ".*" . preg_quote(trim($term, ' ')) . ".*";
        }
        if ($id) {
            $idsearch = preg_quote($id);
        }
        if (!$this->security->isGranted('IS_AUTHENTICATED_FULLY')) {
            switch ($groupe) {
                case 'bryo':
                    $typeCon = " and (type = 'bryo_liste' or type ='bryo_pas_liste')";
                    break;
                case 'tracheo':
                    $typeCon = " and (type = 'tracheo')";
                    break;
                default:
                    $typeCon = "";
            }
            switch ($rang) {
                case 'GN':
                    $typeRan = "(rang = 'GN')";
                    break;
                case 'ES':
                    $typeRan = "(rang = 'ES')";
                    break;
		case 'SSES':
                    $typeRan = "(rang = 'SSES')";
                    break;

                default:
                    $typeRan = "(rang = 'GN' or rang = 'ES' or rang = 'SSES')";
            }
            $CountStatement = $this->connection->prepare("select count(taxons.nom_complet) rowcount from exploitation.taxons where (" . $typeRan . $typeCon . ") and nom_complet ~* :search  and (cd_ref = :id or :id=0);");
            $statement = $this->connection->prepare("select cd_ref, nom_complet from exploitation.taxons where (" . $typeRan . $typeCon . ") and nom_complet ~* :search  and (cd_ref = :id or :id=0) order by nom_complet" . $offsetCond . ";");
        } else {
            $CountStatement = $this->connection->prepare("select count(taxons.nom_complet) rowcount from exploitation.taxons where (rang = :rang or :rang ='') and (type = :type or :type ='') and nom_complet ~* :search and (cd_ref = :id or :id=0);");
            $statement = $this->connection->prepare("select cd_ref, nom_complet from exploitation.taxons where (rang = :rang or :rang ='') and (type = :type or :type ='') and nom_complet ~* :search and (cd_ref = :id or :id=0) order by nom_complet" . $offsetCond . ";");
            $statement->bindParam(':type', $groupe);
            $statement->bindParam(':rang', $rang);
            $CountStatement->bindParam(':type', $groupe);
            $CountStatement->bindParam(':rang', $rang);
        }
        $statement->bindParam(':search', $search);
        $statement->bindParam(':id', $idsearch);
        $CountStatement->bindParam(':search', $search);
        $CountStatement->bindParam(':id', $idsearch);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $Options.='{"id":"' . $row['cd_ref'] . '","text":"' . $row['nom_complet'] . '"},';
            }
        }
        if ($CountStatement->execute()) {
            $row = $CountStatement->fetch();
            $Count = $row['rowcount'];
        }
        $Options = trim($Options, ',');
        $Options.='],"rowcount":' . $row['rowcount'] . '}';
        return $Options;
    }

    //synthese_utm1_ss_inf.php
    public function synthese_utm1_ss_inf($cd_ref) {
        $feature = array();
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
            group by cd_sig, cd_ref,geom;");
        $statement->bindParam(':cd_ref', $cd_ref);
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
    public function synthese_utm1($cd_ref) {
        $feature = array();
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
    FROM observation_reunion.observation_maille_utm1 lien, observation_reunion.maille_utm1 mai, observation_reunion.observation_taxon_reunion obs, observation_reunion.index_reunion ind, exploitation.taxref_new tax
    WHERE mai.nom_maille::text = lien.nom_maille::text and lien.id_flore_fcbn=obs.id_flore_fcbn and obs.code_taxon=ind.code_taxon and ind.cd_ref=tax.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref )
    group by mai.nom_maille, tax.cd_ref) n1
    group by n1.cd_sig, n1.geom;");
        $statement->bindParam(':cd_ref', $cd_ref);
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

    /* //synthese_utm1_old.php
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
      } */

    //synthese_utm10_ss_inf.php
    public function synthese_utm10_ss_inf($cd_ref) {
        $feature = array();
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
    group by mai.cd_sig, cd_ref,geom;");

        $statement->bindParam(':cd_ref', $cd_ref);
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
    public function synthese_utm10($cd_ref) {
        $feature = array();
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
    FROM observation_reunion.observation_maille_utm10 lien, observation_reunion.grille_10km_zee_974 mai, observation_reunion.observation_taxon_reunion obs, observation_reunion.index_reunion ind, exploitation.taxref_new tax
    WHERE mai.cd_sig::text = lien.cd_sig::text and lien.id_flore_fcbn=obs.id_flore_fcbn and obs.code_taxon=ind.code_taxon and ind.cd_ref=tax.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref  )
    group by mai.cd_sig, tax.cd_ref) n1
    group by n1.cd_sig, n1.geom;");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                if (!$this->security->isGranted('IS_AUTHENTICATED_FULLY')) {
                    $row['date_premiere_obs'] = date_create_from_format('Y-m-d', $row['date_premiere_obs'])->format('Y');
                    $row['date_derniere_obs'] = date_create_from_format('Y-m-d', $row['date_derniere_obs'])->format('Y');
                }
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                        $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }
    //synthese_fr5_ss_inf.php
    public function synthese_fr5_ss_inf($cd_ref) {
        $feature = array();

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
    group by cd_sig, cd_ref,geom-- order by;");
        $statement->bindParam(':cd_ref', $cd_ref);
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
    public function synthese_fr5($cd_ref) {
        $feature = array();
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
    FROM exploitation.obs_maille_fr5 obs, exploitation.taxref_new tax
     WHERE tax.cd_ref=obs.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref)
    group by obs.cd_sig, obs.cd_ref) n1
    group by n1.cd_sig, n1.geom;");
        $statement->bindParam(':cd_ref', $cd_ref);
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

    /* //synthese_fr5_old.php
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
      } */

    //synthese_fr10_ss_inf.php
    public function synthese_fr10_ss_inf($cd_ref) {
        $feature = array();
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
    group by cd_sig, cd_ref,geom;");

        $statement->bindParam(':cd_ref', $cd_ref);
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
    public function synthese_fr10($cd_ref) {
        $feature = array();
        $statement = $this->connection->prepare("--synthese fr10
    select cd_sig, string_agg(cd_ref::text, '<br/>') as cd_ref,sum(nb_obs) as nb_obs,
    sum(nb_obs_1500_1980) as nb_obs_1500_1980, sum(nb_obs_1981_2000) as nb_obs_1981_2000,
    sum(nb_obs_2001_2013) as nb_obs_2001_2013, sum(nb_obs_averee) as nb_obs_averee, 
    sum(nb_obs_interpretee) as nb_obs_interpretee, string_agg(nom_complet, '<br/>') as noms_taxon,count(*) as nb_tax,
    sum(case when cd_ref= :cd_ref THEN 100 when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_visu,
    count(case when cd_ref= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n1, 
    count(case when cd_ref!= :cd_ref  THEN 1 ELSE NULL::integer END) as nb_tax_n2,
    min(date_premiere_obs) AS date_premiere_obs, max(date_derniere_obs) AS date_derniere_obs, 
    ST_ASGeoJSON(geom) as lieu
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
    FROM exploitation.obs_maille_fr10 obs, exploitation.taxref_new tax
     WHERE tax.cd_ref=obs.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref )
    group by obs.cd_sig, obs.cd_ref) n1
    group by n1.cd_sig, n1.geom;");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                if (!$this->security->isGranted('IS_AUTHENTICATED_FULLY')) {
                    $row['date_premiere_obs'] = date_create_from_format('Y-m-d', $row['date_premiere_obs'])->format('Y');
                    $row['date_derniere_obs'] = date_create_from_format('Y-m-d', $row['date_derniere_obs'])->format('Y');
                }
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                        $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }

    /* //synthese_fr10_old.php
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
      } */

    //synthese_comm_ss_inf.php
    public function synthese_comm_ss_inf($cd_ref) {
        $feature = array();
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
    group by insee_comm, cd_ref,geom-- order by;");
        $statement->bindParam(':cd_ref', $cd_ref);
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
    public function synthese_comm_reunion_ss_inf($cd_ref) {
        $feature = array();
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
    group by mai.code_insee, mai.code_insee, cd_ref,geom;");
        $statement->bindParam(':cd_ref', $cd_ref);
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
    public function synthese_comm_reunion($cd_ref) {
        $feature = array();
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
    FROM observation_reunion.observation_commune_reunion lien, observation_reunion.communes_bdtopo_reunion mai, observation_reunion.observation_taxon_reunion obs, observation_reunion.index_reunion ind, exploitation.taxref_new tax
    WHERE mai.code_insee::text = lien.code_insee::text and lien.id_flore_fcbn=obs.id_flore_fcbn and obs.code_taxon=ind.code_taxon and ind.cd_ref=tax.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref)
    group by mai.code_insee, mai.nom, tax.cd_ref) n1
    group by n1.code_insee, n1.nom, n1.geom;");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                if (!$this->security->isGranted('IS_AUTHENTICATED_FULLY')) {
                    $row['date_premiere_obs'] = date_create_from_format('Y-m-d', $row['date_premiere_obs'])->format('Y');
                    $row['date_derniere_obs'] = date_create_from_format('Y-m-d', $row['date_derniere_obs'])->format('Y');
                }
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                        $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }

    /* //synthese_comm_reunion_old.php
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
      } */

    //synthese_comm.php
    public function synthese_comm($cd_ref) {
        $feature = array();
        $statement = $this->connection->prepare("--synthese_comm
select insee_comm, max(nom_comm) as nom_comm, string_agg(cd_ref::text, '<br/>') as cd_ref,sum(nb_obs) as nb_obs, sum(nb_obs_1500_1980) as nb_obs_1500_1980, sum(nb_obs_1981_2000) as nb_obs_1981_2000, sum(nb_obs_2001_2013) as nb_obs_2001_2013, sum(nb_obs_averee) as nb_obs_averee, sum(nb_obs_interpretee) as nb_obs_interpretee, string_agg(nom_complet, '<br/>') as noms_taxon,count(*) as nb_tax,sum(case when cd_ref= :cd_ref THEN 100 when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_visu, count(case when cd_ref= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n1, count(case when cd_ref!= :cd_ref THEN 1 ELSE NULL::integer END) as nb_tax_n2,min(date_premiere_obs) AS date_premiere_obs, max(date_derniere_obs) AS date_derniere_obs, ST_ASGeoJSON(geom) as lieu
 from (SELECT obs.insee_comm, max(obs.nom_comm) as nom_comm, obs.cd_ref, max(tax.cd_taxsup) as cd_taxsup, max(tax.nom_complet) as nom_complet, max(obs.geom) as geom, count(*) AS nb_obs, count(CASE WHEN obs.date_fin_obs >= '1500-01-01'::date AND obs.date_fin_obs < '1980-01-01'::date THEN 1 ELSE NULL::integer END) AS nb_obs_1500_1980, count(CASE WHEN obs.date_fin_obs >= '1980-01-01'::date AND obs.date_fin_obs < '2000-01-01'::date THEN 1 ELSE NULL::integer END) AS nb_obs_1981_2000, count(CASE WHEN obs.date_fin_obs >= '2000-01-01'::date THEN 1 ELSE NULL::integer END) AS nb_obs_2001_2013, count(CASE WHEN obs.libelle_type_localisation = 'Averée' THEN 1 ELSE NULL::integer END) AS nb_obs_averee, count(CASE WHEN obs.libelle_type_localisation = 'Interpretée' THEN 1 ELSE NULL::integer END) AS nb_obs_interpretee, min(obs.date_debut_obs) AS date_premiere_obs, max(obs.date_fin_obs) AS date_derniere_obs
 FROM exploitation.obs_commune obs, exploitation.taxref_new tax
     WHERE tax.cd_ref=obs.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref)
    group by obs.insee_comm, obs.cd_ref) n1
    group by n1.insee_comm, n1.geom;");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $type = '"type": "Feature"';
                $geometry = '"geometry": ' . $row['lieu'];
                unset($row['lieu']);
                if (!$this->security->isGranted('IS_AUTHENTICATED_FULLY')) {
                    $row['date_premiere_obs'] = date_create_from_format('Y-m-d', $row['date_premiere_obs'])->format('Y');
                    $row['date_derniere_obs'] = date_create_from_format('Y-m-d', $row['date_derniere_obs'])->format('Y');
                }
                $properties = '"properties": ' . json_encode($row);
                $feature[] = '{' . $type . ', ' . $geometry . ', ' .
                        $properties . '}';
            }
        }
        $header = '{"type": "FeatureCollection", "features": [';
        $footer = ']}';
        echo $header . implode(', ', $feature) . $footer;
    }
    public function commentaires($prenom, $nom, $email, $comment, $user, $cd_ref, $id_obj, $id_flore_fcbn, $type_com, $priorite_com, $action_com, $nom_complet) {
        $json_rows = array();
        $ans = '';
        $statement = $this->connection->prepare("INSERT INTO exploitation.commentaires (prenom,nom,email,comment,utilisateur,cd_ref,id_obj,id_flore_fcbn, date_com, type_com, priorite_com, action_com,nom_complet) values ( :prenom , :nom , :email ,:comment, :user , :cd_ref, :id_obj, :id_flore_fcbn, CURRENT_DATE, :type_com, :priorite_com, :action_com, :nom_complet) returning id;");
        $statement->bindParam(':prenom', $prenom);
        $statement->bindParam(':nom', $nom);
        $statement->bindParam(':email', $email);
        $statement->bindParam(':comment', $comment);
        $statement->bindParam(':user', $user);
        $statement->bindParam(':cd_ref', $cd_ref);
        $statement->bindParam(':id_obj', $id_obj);
        $statement->bindParam(':id_flore_fcbn', $id_flore_fcbn);
        $statement->bindParam(':type_com', $type_com);
        $statement->bindParam(':priorite_com', $priorite_com);
        $statement->bindParam(':action_com', $action_com);
        $statement->bindParam(':nom_complet', $nom_complet);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $ans.= $row['id'];
            }
        }
        /*      The Original SI-Flore sent a mail after wrinting on db.
          Disabled for now
          $to      = 'pargass31@gmail.com';
          $subject = 'le sujet';
          $message = 'Bonjour !';
          $headers = 'From: webmaster@example.com' . "\r\n" .
          'Reply-To: webmaster@example.com' . "\r\n" .
          'X-Mailer: PHP/' . phpversion();

          mail($to, $subject, $message, $headers); */
        return $ans;
    }

    //commentaires_existants.php
    public function commentaires_existants($cd_ref, $id_obj, $id_flore_fcbn) {
        $jsonRows = array();
        $statement = $this->connection->prepare("--commentaires_existants
SELECT * FROM exploitation.commentaires WHERE cd_ref = :cd_ref and (id_obj= :id_obj or :id_obj='') and (id_flore_fcbn= :id_flore_fcbn or :id_flore_fcbn='');");
        $statement->bindParam(':cd_ref', $cd_ref);
        $statement->bindParam(':id_obj', $id_obj);
        $statement->bindParam(':id_flore_fcbn', $id_flore_fcbn);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"rows": ';
        $footer = '}';
        return $header . \json_encode($jsonRows) . $footer;
    }

}

?>
