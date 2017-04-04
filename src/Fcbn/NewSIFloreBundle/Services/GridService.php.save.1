<?php

namespace Fcbn\NewSiFloreBundle\Services;

class GridService {

    private $connection;
    private $security;
    private $grids;
    private $defOrderBy;

    public function __construct($dbalConnection, $security, $grids) {
        $this->connection = $dbalConnection;
        $this->security = $security;
        $this->grids = $grids;
    }

    //observation_fr5_ss_inf.php
    public function observation_fr5_ss_inf($cd_ref, $id_obj) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['observations_grid'] as $key => $values) {
            if (isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true)) {

                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $statement = $this->connection->prepare("--observation_fr5_ss_inf
        select " . $fields . " from exploitation.obs_maille_fr5 obs
	WHERE obs.cd_ref= :cd_ref and cd_sig= :id_obj ;");
        $statement->bindParam(':cd_ref', $cd_ref);
        $statement->bindParam(':id_obj', $id_obj);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    //observation_fr5.php
    public function observation_fr5($cd_ref, $id_obj) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['observations_grid'] as $key => $values) {
            if (isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true)) {

                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $statement = $this->connection->prepare("--observation_fr5
        select " . $fields . " from exploitation.obs_maille_fr5 obs, exploitation.taxref_new tax
	WHERE obs.cd_ref=tax.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref ) and cd_sig= :id_obj ;");
        $statement->bindParam(':cd_ref', $cd_ref);
        $statement->bindParam(':id_obj', $id_obj);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    //observation_fr10_ss_inf.php
    public function observation_fr10_ss_inf($cd_ref, $id_obj) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['observations_grid'] as $key => $values) {
            if (isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true)) {

                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $statement = $this->connection->prepare("--observation_fr10_ss_inf
        select " . $fields . " from exploitation.obs_maille_fr10 obs
	WHERE obs.cd_ref= :cd_ref and cd_sig= :id_obj ;");
        $statement->bindParam(':cd_ref', $cd_ref);
        $statement->bindParam(':id_obj', $id_obj);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    //observation_fr10.php
    public function observation_fr10($cd_ref, $id_obj) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['observations_grid'] as $key => $values) {
            if (isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true)) {

                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $statement = $this->connection->prepare("--observation_fr10
select " . $fields . " from exploitation.obs_maille_fr10 obs, exploitation.taxref_new tax
	WHERE tax.cd_ref=obs.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref ) and cd_sig= :id_obj;");
        $statement->bindParam(':cd_ref', $cd_ref);
        $statement->bindParam(':id_obj', $id_obj);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    //observation_comm_ss_inf.php
    public function observation_comm_ss_inf($cd_ref, $id_obj) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['observations_grid'] as $key => $values) {
            if (isset($values['commune_display']) && $values['commune_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true)) {

                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $statement = $this->connection->prepare("--observation_comm_ss_inf
        select " . $fields . "  from exploitation.obs_commune obs
	WHERE obs.cd_ref= :cd_ref and insee_comm= :id_obj;");
        $statement->bindParam(':cd_ref', $cd_ref);
        $statement->bindParam(':id_obj', $id_obj);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    //observation_comm.php
    public function observation_comm($cd_ref, $id_obj) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['observations_grid'] as $key => $values) {
            if (isset($values['commune_display']) && $values['commune_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true)) {

                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $statement = $this->connection->prepare("--observation_comm
        select " . $fields . " from exploitation.obs_commune obs, exploitation.taxref_new tax
	WHERE obs.cd_ref=tax.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref ) and insee_comm= :id_obj;");
        $statement->bindParam(':cd_ref', $cd_ref);
        $statement->bindParam(':id_obj', $id_obj);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    //SYNTHESE
    public function synthese_fr10_table($cd_ref, $offset, $ordField, $ordDir) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['mailles_grid'] as $key => $values) {
            if (isset($values['metro_display']) && $values['metro_display'] && isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true) && isset($values['inferieurs_display']) && $values['inferieurs_display']) {
                if (isset($values['default_order_by']) && $values['default_order_by']) {
                    $this->defOrderBy = $key;
                }
                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);
                unset($values['default_order_by']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $offsetCond = '';
        if ($offset != 0) {
            $offsetCond = ' limit 11 offset ' . ($offset - 1) * 10;
        }
        if ($ordField) {
            $orderField = pg_escape_string($ordField);
            if ($ordDir == 'desc') {
                $orderDir = ' desc';
            } else {
                $orderDir = '';
            }
        } else {
            $orderField = $this->defOrderBy;
            $orderDir = ' desc';
        }
        $statement = $this->connection->prepare("--synthese fr10
    select sum(nb_obs) ," . $fields . "
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
    group by n1.cd_sig, n1.geom order by " . $orderField . $orderDir . $offsetCond . ";");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    public function synthese_fr10_ss_inf_table($cd_ref, $offset, $ordField, $ordDir) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['mailles_grid'] as $key => $values) {
            if (isset($values['metro_display']) && $values['metro_display'] && isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true) && isset($values['not_inferieurs_display']) && $values['not_inferieurs_display']) {
                if (isset($values['default_order_by']) && $values['default_order_by']) {
                    $this->defOrderBy = $key;
                }
                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);
                unset($values['default_order_by']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $offsetCond = '';
        if ($offset != 0) {
            $offsetCond = ' limit 11 offset ' . ($offset - 1) * 10;
        }
        if ($ordField) {
            $orderField = pg_escape_string($ordField);
            if ($ordDir == 'desc') {
                $orderDir = ' desc';
            } else {
                $orderDir = '';
            }
        } else {
            $orderField = $this->defOrderBy;
            $orderDir = ' desc';
        }
        $statement = $this->connection->prepare("--synthese fr10 ss inf
SELECT " . $fields . " FROM exploitation.obs_maille_fr10
    WHERE cd_ref= :cd_ref
    group by cd_sig, cd_ref,geom order by " . $orderField . $orderDir . $offsetCond . ";");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    public function synthese_fr5_table($cd_ref, $offset, $ordField, $ordDir) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['mailles_grid'] as $key => $values) {
            if (isset($values['metro_display']) && $values['metro_display'] && isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true) && isset($values['inferieurs_display']) && $values['inferieurs_display']) {
                if (isset($values['default_order_by']) && $values['default_order_by']) {
                    $this->defOrderBy = $key;
                }
                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);
                unset($values['default_order_by']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $offsetCond = '';
        if ($offset != 0) {
            $offsetCond = ' limit 11 offset ' . ($offset - 1) * 10;
        }
        if ($ordField) {
            $orderField = pg_escape_string($ordField);
            if ($ordDir == 'desc') {
                $orderDir = ' desc';
            } else {
                $orderDir = '';
            }
        } else {
            $orderField = $this->defOrderBy;
            $orderDir = ' desc';
        }
        $statement = $this->connection->prepare("--synthese fr5
select " . $fields . "
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
    group by n1.cd_sig, n1.geom order by " . $orderField . $orderDir . $offsetCond . ";");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    public function synthese_fr5_ss_inf_table($cd_ref, $offset, $ordField, $ordDir) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['mailles_grid'] as $key => $values) {
            if (isset($values['metro_display']) && $values['metro_display'] && isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true) && isset($values['not_inferieurs_display']) && $values['not_inferieurs_display']) {
                if (isset($values['default_order_by']) && $values['default_order_by']) {
                    $this->defOrderBy = $key;
                }
                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);
                unset($values['default_order_by']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $offsetCond = '';
        if ($offset != 0) {
            $offsetCond = ' limit 11 offset ' . ($offset - 1) * 10;
        }
        if ($ordField) {
            $orderField = pg_escape_string($ordField);
            if ($ordDir == 'desc') {
                $orderDir = ' desc';
            } else {
                $orderDir = '';
            }
        } else {
            $orderField = $this->defOrderBy;
            $orderDir = ' desc';
        }
        $statement = $this->connection->prepare("--synthese fr5 ss inf
SELECT " . $fields . "
FROM exploitation.obs_maille_fr5
    WHERE cd_ref= :cd_ref
    group by cd_sig, cd_ref,geom order by " . $orderField . $orderDir . $offsetCond . ";");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    public function synthese_comm_table($cd_ref, $offset, $ordField, $ordDir) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['mailles_grid'] as $key => $values) {
            if (isset($values['metro_display']) && $values['metro_display'] && isset($values['commune_display']) && $values['commune_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true) && isset($values['inferieurs_display']) && $values['inferieurs_display']) {
                if (isset($values['default_order_by']) && $values['default_order_by']) {
                    $this->defOrderBy = $key;
                }
                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);
                unset($values['default_order_by']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $offsetCond = '';
        if ($offset != 0) {
            $offsetCond = ' limit 11 offset ' . ($offset - 1) * 10;
        }
        if ($ordField) {
            $orderField = pg_escape_string($ordField);
            if ($ordDir == 'desc') {
                $orderDir = ' desc';
            } else {
                $orderDir = '';
            }
        } else {
            $orderField = $this->defOrderBy;
            $orderDir = ' desc';
        }
        $statement = $this->connection->prepare("--synthese_comm
select " . $fields . "
from (SELECT obs.insee_comm, max(obs.nom_comm) as nom_comm, obs.cd_ref, max(tax.cd_taxsup) as cd_taxsup, max(tax.nom_complet) as nom_complet, max(obs.geom) as geom, count(*) AS nb_obs, count(CASE WHEN obs.date_fin_obs >= '1500-01-01'::date AND obs.date_fin_obs < '1980-01-01'::date THEN 1 ELSE NULL::integer END) AS nb_obs_1500_1980, count(CASE WHEN obs.date_fin_obs >= '1980-01-01'::date AND obs.date_fin_obs < '2000-01-01'::date THEN 1 ELSE NULL::integer END) AS nb_obs_1981_2000, count(CASE WHEN obs.date_fin_obs >= '2000-01-01'::date THEN 1 ELSE NULL::integer END) AS nb_obs_2001_2013, count(CASE WHEN obs.libelle_type_localisation = 'Averée' THEN 1 ELSE NULL::integer END) AS nb_obs_averee, count(CASE WHEN obs.libelle_type_localisation = 'Interpretée' THEN 1 ELSE NULL::integer END) AS nb_obs_interpretee, min(obs.date_debut_obs) AS date_premiere_obs, max(obs.date_fin_obs) AS date_derniere_obs
 FROM exploitation.obs_commune obs, exploitation.taxref_new tax
     WHERE tax.cd_ref=obs.cd_ref and (tax.cd_ref= :cd_ref or tax.cd_taxsup= :cd_ref or tax.cd_taxsup2= :cd_ref or tax.cd_taxsup3= :cd_ref)
    group by obs.insee_comm, obs.cd_ref) n1
    group by n1.insee_comm, n1.geom order by " . $orderField . $orderDir . $offsetCond . ";");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    public function synthese_comm_ss_inf_table($cd_ref, $offset, $ordField, $ordDir) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['mailles_grid'] as $key => $values) {
            if (isset($values['metro_display']) && $values['metro_display'] && isset($values['commune_display']) && $values['commune_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true) && isset($values['not_inferieurs_display']) && $values['not_inferieurs_display']) {
                if (isset($values['default_order_by']) && $values['default_order_by']) {
                    $this->defOrderBy = $key;
                }
                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);
                unset($values['default_order_by']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $offsetCond = '';
        if ($offset != 0) {
            $offsetCond = ' limit 11 offset ' . ($offset - 1) * 10;
        }
        if ($ordField) {
            $orderField = pg_escape_string($ordField);
            if ($ordDir == 'desc') {
                $orderDir = ' desc';
            } else {
                $orderDir = '';
            }
        } else {
            $orderField = $this->defOrderBy;
            $orderDir = ' desc';
        }
        $statement = $this->connection->prepare("--synthese comm ss inf
SELECT " . $fields . "
FROM exploitation.obs_commune
    WHERE cd_ref= :cd_ref
    group by insee_comm, cd_ref,geom order by " . $orderField . $orderDir . $offsetCond . ";");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    public function synthese_utm10_table($cd_ref, $offset, $ordField, $ordDir) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['mailles_grid'] as $key => $values) {
            if (isset($values['reunion_display']) && $values['reunion_display'] && isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true) && isset($values['inferieurs_display']) && $values['inferieurs_display']) {
                if (isset($values['default_order_by']) && $values['default_order_by']) {
                    $this->defOrderBy = $key;
                }
                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $offsetCond = '';
        if ($offset != 0) {
            $offsetCond = ' limit 11 offset ' . ($offset - 1) * 10;
        }
        if ($ordField) {
            $orderField = pg_escape_string($ordField);
            if ($ordDir == 'desc') {
                $orderDir = ' desc';
            } else {
                $orderDir = '';
            }
        } else {
            $orderField = $this->defOrderBy;
            $orderDir = ' desc';
        }
        $statement = $this->connection->prepare("--synthese_utm_10
select " . $fields . "
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
    group by n1.cd_sig, n1.geom order by " . $orderField . $orderDir . $offsetCond . ";");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    public function synthese_utm10_ss_inf_table($cd_ref, $offset, $ordField, $ordDir) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['mailles_grid'] as $key => $values) {
            if ((isset($values['reunion_display']) && $values['reunion_display'] && isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true) && isset($values['not_inferieurs_display']) && $values['not_inferieurs_display']&& !(isset($values['not_utm10_ss_inf']) && $values['not_utm10_ss_inf']))||isset($values['utm10_ss_inf']) && $values['utm10_ss_inf']) {
                if (isset($values['default_order_by']) && $values['default_order_by']) {
                    $this->defOrderBy = $key;
                }
                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $offsetCond = '';
        if ($offset != 0) {
            $offsetCond = ' limit 11 offset ' . ($offset - 1) * 10;
        }
        if ($ordField) {
            $orderField = pg_escape_string($ordField);
            if ($ordDir == 'desc') {
                $orderDir = ' desc';
            } else {
                $orderDir = '';
            }
        } else {
            $orderField = $this->defOrderBy;
            $orderDir = ' desc';
        }
        $statement = $this->connection->prepare("--synthese_utm10_ss_inf
SELECT " . $fields . "
FROM observation_reunion.observation_maille_utm10 lien, observation_reunion.grille_10km_zee_974 mai, observation_reunion.observation_taxon_reunion obs, observation_reunion.index_reunion ind
    WHERE  mai.cd_sig::text = lien.cd_sig::text and lien.id_flore_fcbn=obs.id_flore_fcbn and obs.code_taxon=ind.code_taxon and ind.cd_ref= :cd_ref
    group by mai.cd_sig, cd_ref,geom order by " . $orderField . $orderDir . $offsetCond . ";");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    public function synthese_utm1_table($cd_ref, $offset, $ordField, $ordDir) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['mailles_grid'] as $key => $values) {
            if (isset($values['reunion_display']) && $values['reunion_display'] && isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true) && isset($values['inferieurs_display']) && $values['inferieurs_display']) {
                if (isset($values['default_order_by']) && $values['default_order_by']) {
                    $this->defOrderBy = $key;
                }
                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $offsetCond = '';
        if ($offset != 0) {
            $offsetCond = ' limit 11 offset ' . ($offset - 1) * 10;
        }
        if ($ordField) {
            $orderField = pg_escape_string($ordField);
            if ($ordDir == 'desc') {
                $orderDir = ' desc';
            } else {
                $orderDir = '';
            }
        } else {
            $orderField = $this->defOrderBy;
            $orderDir = ' desc';
        }
        $statement = $this->connection->prepare("--synthese_utm1
select " . $fields . "
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
    group by n1.cd_sig, n1.geom order by " . $orderField . $orderDir . $offsetCond . ";");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    public function synthese_utm1_ss_inf_table($cd_ref, $offset, $ordField, $ordDir) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['mailles_grid'] as $key => $values) {
            if ((isset($values['reunion_display']) && $values['reunion_display'] && isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true) && isset($values['not_inferieurs_display']) && $values['not_inferieurs_display']&& !(isset($values['not_utm1_ss_inf']) && $values['not_utm1_ss_inf']))||isset($values['utm1_ss_inf']) && $values['utm1_ss_inf']) {
                if (isset($values['default_order_by']) && $values['default_order_by']) {
                    $this->defOrderBy = $key;
                }
                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $offsetCond = '';
        if ($offset != 0) {
            $offsetCond = ' limit 11 offset ' . ($offset - 1) * 10;
        }
        if ($ordField) {
            $orderField = pg_escape_string($ordField);
            if ($ordDir == 'desc') {
                $orderDir = ' desc';
            } else {
                $orderDir = '';
            }
        } else {
            $orderField = $this->defOrderBy;
            $orderDir = ' desc';
        }
        $statement = $this->connection->prepare("--synthese_utm1_ss_inf
            SELECT " . $fields . "
            FROM observation_reunion.observation_maille_utm1 lien, observation_reunion.maille_utm1 mai, observation_reunion.observation_taxon_reunion obs, observation_reunion.index_reunion ind
            WHERE  mai.nom_maille::text = lien.nom_maille::text and lien.id_flore_fcbn=obs.id_flore_fcbn and obs.code_taxon=ind.code_taxon and ind.cd_ref= :cd_ref
            group by mai.nom_maille, cd_ref,geom order by " . $orderField . $orderDir . $offsetCond . ";");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    public function synthese_comm_reunion_table($cd_ref, $offset, $ordField, $ordDir) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['mailles_grid'] as $key => $values) {
            if (isset($values['reunion_display']) && $values['reunion_display'] && isset($values['commune_display']) && $values['commune_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true) && isset($values['inferieurs_display']) && $values['inferieurs_display']) {
                if (isset($values['default_order_by']) && $values['default_order_by']) {
                    $this->defOrderBy = $key;
                }
                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $offsetCond = '';
        if ($offset != 0) {
            $offsetCond = ' limit 11 offset ' . ($offset - 1) * 10;
        }
        if ($ordField) {
            $orderField = pg_escape_string($ordField);
            if ($ordDir == 'desc') {
                $orderDir = ' desc';
            } else {
                $orderDir = '';
            }
        } else {
            $orderField = $this->defOrderBy;
            $orderDir = ' desc';
        }
        $statement = $this->connection->prepare("--synthese_comm_reunion
select " . $fields . "
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
    group by n1.code_insee, n1.nom, n1.geom order by " . $orderField . $orderDir . $offsetCond . ";");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    public function synthese_comm_reunion_ss_inf_table($cd_ref, $offset, $ordField, $ordDir) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['mailles_grid'] as $key => $values) {
            if (isset($values['reunion_display']) && $values['reunion_display'] && isset($values['commune_display']) && $values['commune_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true) && isset($values['not_inferieurs_display']) && $values['not_inferieurs_display']) {
                if (isset($values['default_order_by']) && $values['default_order_by']) {
                    $this->defOrderBy = $key;
                }
                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $offsetCond = '';
        if ($offset != 0) {
            $offsetCond = ' limit 11 offset ' . ($offset - 1) * 10;
        }
        if ($ordField) {
            $orderField = pg_escape_string($ordField);
            if ($ordDir == 'desc') {
                $orderDir = ' desc';
            } else {
                $orderDir = '';
            }
        } else {
            $orderField = $this->defOrderBy;
            $orderDir = ' desc';
        }
        $statement = $this->connection->prepare("--synthese_comm_reunion_ss_inf
SELECT " . $fields . "
FROM observation_reunion.observation_commune_reunion lien, observation_reunion.communes_bdtopo_reunion mai, observation_reunion.observation_taxon_reunion obs, observation_reunion.index_reunion ind
    WHERE  mai.code_insee::text = lien.code_insee::text and lien.id_flore_fcbn=obs.id_flore_fcbn and obs.code_taxon=ind.code_taxon and ind.cd_ref= :cd_ref
    group by mai.code_insee, mai.code_insee, cd_ref,geom order by " . $orderField . $orderDir . $offsetCond . ";");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }


//TAXONS
    //information_taxons.php
    public function information_taxons($cd_ref) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['information_grid'] as $key => $values) {
            if (isset($values['metro_display']) && $values['metro_display'] && isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true)) {

                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $statement = $this->connection->prepare("--information taxon
SELECT  " . $fields . "
FROM exploitation.information_taxons syn, (WITH RECURSIVE hierarchie(cd_ref, nom_complet, cd_taxsup) AS (
  SELECT cd_ref, nom_complet, cd_taxsup
    FROM exploitation.taxref_new WHERE cd_ref = :cd_ref
  UNION ALL
  SELECT e.cd_ref, e.nom_complet, e.cd_taxsup
    FROM hierarchie AS h, exploitation.taxref_new AS e
    WHERE h.cd_ref = e.cd_taxsup
)
SELECT cd_ref, nom_complet FROM hierarchie) recur
    WHERE recur.cd_ref=syn.cd_ref; ");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    //information_taxons_ss_inf.php
    public function information_taxons_ss_inf($cd_ref) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['information_grid'] as $key => $values) {
            if (isset($values['metro_display']) && $values['metro_display'] && isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true)) {

                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $statement = $this->connection->prepare("--information taxon ss inf
    SELECT   " . $fields . "
    FROM exploitation.information_taxons syn
    WHERE cd_ref = :cd_ref ;");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }


    //information_taxa_taxons.php
    public function information_taxa_taxons($cd_ref) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['information_taxa_grid'] as $key => $values) {
            if (isset($values['metro_display']) && $values['metro_display'] && isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true)) {

                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $statement = $this->connection->prepare("--information taxa taxon
SELECT  " . $fields . "
FROM exploitation.information_taxa_taxons syn, (WITH RECURSIVE hierarchie(cd_ref, nom_complet, cd_taxsup) AS (
  SELECT cd_ref, nom_complet, cd_taxsup
    FROM exploitation.taxref_new WHERE cd_ref = :cd_ref
  UNION ALL
  SELECT e.cd_ref, e.nom_complet, e.cd_taxsup
    FROM hierarchie AS h, exploitation.taxref_new AS e
    WHERE h.cd_ref = e.cd_taxsup
)
SELECT cd_ref, nom_complet FROM hierarchie) recur
    WHERE recur.cd_ref::text=syn.cd_ref; ");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    //information_taxa_taxons_ss_inf.php
    public function information_taxa_taxons_ss_inf($cd_ref) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['information_taxa_grid'] as $key => $values) {
            if (isset($values['metro_display']) && $values['metro_display'] && isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true)) {

                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $statement = $this->connection->prepare("--information taxa taxon ss inf
    SELECT   " . $fields . "
    FROM exploitation.information_taxa_taxons syn
    WHERE cd_ref = :cd_ref ;");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    //synthese_taxon_fr10.php
    public function synthese_taxon_fr10($cd_ref) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['taxons_grid'] as $key => $values) {
            if (isset($values['metro_display']) && $values['metro_display'] && isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true)) {

                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $statement = $this->connection->prepare("--synthese taxon fr10
SELECT  " . $fields . "
FROM exploitation.synthese_taxon_fr10 syn, (WITH RECURSIVE hierarchie(cd_ref, nom_complet, cd_taxsup) AS (
  SELECT cd_ref, nom_complet, cd_taxsup
    FROM exploitation.taxref_new WHERE cd_ref = :cd_ref
  UNION ALL
  SELECT e.cd_ref, e.nom_complet, e.cd_taxsup
    FROM hierarchie AS h, exploitation.taxref_new AS e 
    WHERE h.cd_ref = e.cd_taxsup
)
SELECT cd_ref, nom_complet FROM hierarchie) recur
    WHERE recur.cd_ref=syn.cd_ref; ");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    //synthese_taxon_fr10_ss_inf.php
    public function synthese_taxon_fr10_ss_inf($cd_ref) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['taxons_grid'] as $key => $values) {
            if (isset($values['metro_display']) && $values['metro_display'] && isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true)) {

                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $statement = $this->connection->prepare("--synthese taxon fr10 ss inf
    SELECT   " . $fields . "
    FROM exploitation.synthese_taxon_fr10 syn
    WHERE cd_ref = :cd_ref ;");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    //synthese_taxon_fr5.php
    public function synthese_taxon_fr5($cd_ref) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['taxons_grid'] as $key => $values) {
            if (isset($values['metro_display']) && $values['metro_display'] && isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true)) {

                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $statement = $this->connection->prepare("--synthese taxon fr5
SELECT " . $fields . "
FROM exploitation.synthese_taxon_fr5 syn, (WITH RECURSIVE hierarchie(cd_ref, nom_complet, cd_taxsup) AS (
  SELECT cd_ref, nom_complet, cd_taxsup
    FROM exploitation.taxref_new WHERE cd_ref = :cd_ref
  UNION ALL
  SELECT e.cd_ref, e.nom_complet, e.cd_taxsup
    FROM hierarchie AS h, exploitation.taxref_new AS e 
    WHERE h.cd_ref = e.cd_taxsup
)
SELECT cd_ref, nom_complet FROM hierarchie) recur
    WHERE recur.cd_ref=syn.cd_ref;");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    //synthese_taxon_fr5_ss_inf.php
    public function synthese_taxon_fr5_ss_inf($cd_ref) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['taxons_grid'] as $key => $values) {
            if (isset($values['metro_display']) && $values['metro_display'] && isset($values['maille_display']) && $values['maille_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true)) {

                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $statement = $this->connection->prepare("--synthese taxon fr5 ss inf
SELECT " . $fields . "
FROM exploitation.synthese_taxon_fr5 syn
    WHERE cd_ref = :cd_ref ;");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    //synthese_taxon_comm.php
    public function synthese_taxon_comm($cd_ref) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['taxons_grid'] as $key => $values) {
            if (isset($values['metro_display']) && $values['metro_display'] && isset($values['commune_display']) && $values['commune_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true)) {

                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $statement = $this->connection->prepare("--synthese_taxon_comm
SELECT " . $fields . "
    FROM exploitation.synthese_taxon_comm syn, (WITH RECURSIVE hierarchie(cd_ref, nom_complet, cd_taxsup) AS (
  SELECT cd_ref, nom_complet, cd_taxsup
    FROM exploitation.taxref_new WHERE cd_ref = :cd_ref
  UNION ALL
  SELECT e.cd_ref, e.nom_complet, e.cd_taxsup
    FROM hierarchie AS h, exploitation.taxref_new AS e 
    WHERE h.cd_ref = e.cd_taxsup
)
SELECT cd_ref, nom_complet FROM hierarchie) recur
    WHERE recur.cd_ref=syn.cd_ref;");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    //synthese_taxon_comm_ss_inf.php
    public function synthese_taxon_comm_ss_inf($cd_ref) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['taxons_grid'] as $key => $values) {
            if (isset($values['metro_display']) && $values['metro_display'] && isset($values['commune_display']) && $values['commune_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true)) {

                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $statement = $this->connection->prepare("--synthese taxon comm ss inf
SELECT " . $fields . "
    FROM exploitation.synthese_taxon_comm syn
    WHERE cd_ref = :cd_ref;");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    //synthese_taxon_utm.php
    public function synthese_taxon_utm($cd_ref) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['taxons_grid'] as $key => $values) {
            if (isset($values['reunion_display']) && $values['reunion_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true)) {

                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $statement = $this->connection->prepare("--synthese_taxon_utm
SELECT " . $fields . "
FROM observation_reunion.observation_taxon_reunion obs, observation_reunion.index_reunion ind, (WITH RECURSIVE hierarchie(cd_ref, nom_complet, cd_taxsup) AS (
  SELECT cd_ref, nom_complet, cd_taxsup
    FROM exploitation.taxref_new WHERE cd_ref = :cd_ref
  UNION ALL
  SELECT e.cd_ref, e.nom_complet, e.cd_taxsup
    FROM hierarchie AS h, exploitation.taxref_new AS e 
    WHERE h.cd_ref = e.cd_taxsup
)
SELECT cd_ref, nom_complet FROM hierarchie) recur
    WHERE obs.code_taxon=ind.code_taxon and ind.cd_ref=recur.cd_ref
    group by ind.cd_ref, ind.nom_complet;");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

    //synthese_taxon_utm_ss_inf.php
    public function synthese_taxon_utm_ss_inf($cd_ref) {
        $jsonRows = array();
        $fields = '';
        $columns = array();
        foreach ($this->grids['taxons_grid'] as $key => $values) {
            if (isset($values['reunion_display']) && $values['reunion_display'] && (isset($values['roles']) ? $this->security->isGranted($values['roles']) : true) && (isset($values['not_roles']) ? !$this->security->isGranted($values['not_roles']) : true)) {

                if (!isset($values['field_name'])) {
                    $fields.=$key . ' as ' . $key . ',';
                } else {
                    $fields.=$values['field_name'] . ' as ' . $key . ',';
                }
                $values['field_name'] = $key;
                unset($values['roles']);
                unset($values['not_roles']);
                unset($values['maille_display']);
                unset($values['commune_display']);

                $columns[] = $values;
            }
        }
        $fields = trim($fields, ',');
        $statement = $this->connection->prepare("SELECT  " . $fields . "
            FROM observation_reunion.observation_taxon_reunion obs, observation_reunion.index_reunion ind
    WHERE obs.code_taxon=ind.code_taxon and ind.cd_ref= :cd_ref
    group by cd_ref,nom_complet;");
        $statement->bindParam(':cd_ref', $cd_ref);
        if ($statement->execute()) {
            while ($row = $statement->fetch()) {
                $jsonRows[] = $row;
            }
        }
        $header = '{"success": true,"count": ' . count($jsonRows);
        $footer = '}';
        if (isset($jsonRows[10]))
            unset($jsonRows[10]); //removing the 11 row if exist (it's only recovered for the count to know if there are more fields to show)
        return $header . ',"cols":' . \json_encode($columns) . ',"rows": ' . \json_encode($jsonRows) . $footer;
    }

}
