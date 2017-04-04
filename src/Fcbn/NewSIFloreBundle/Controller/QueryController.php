<?php

namespace Fcbn\NewSIFloreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class QueryController extends Controller {

    public function indexAction($queryname) {
        switch ($queryname) {
            case "taxons"://Getting the taxon names and codes
                return new response($this->get('new_si_flore.query')->taxons(isset($_GET['rang']) ? $_GET['rang'] : '', isset($_GET['type']) ? $_GET['type'] : '', isset($_GET['q']) ? $_GET['q'] : '', isset($_GET['id']) ? $_GET['id'] : '', isset($_GET['page']) ? $_GET['page'] : '', isset($_GET['limit']) ? $_GET['limit'] : '')); //test ?rang=GN&type
            /*             * ******************ONLY SELECTED TAXON********************* */
            case "synthese_taxon_utm_ss_inf":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    return new response($this->get('new_si_flore.grid')->synthese_taxon_utm_ss_inf($_GET['cd_ref']));
                }
                return new response("");
            case "synthese_taxon_utm":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY') or $this->get('new_si_flore.query')->checkTaxRange($_GET['cd_ref']) == $_GET['cd_ref']) {
                    return new response($this->get('new_si_flore.grid')->synthese_taxon_utm($_GET['cd_ref']));
                }
                return new response("");

            case "synthese_utm10_ss_inf":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    if (isset($_GET['pag'])) {
                        return new response($this->get('new_si_flore.grid')->synthese_utm10_ss_inf_table($_GET['cd_ref'], isset($_GET['pag']) ? $_GET['pag'] : 0, isset($_GET['ordfield']) ? $_GET['ordfield'] : '', isset($_GET['ordDir']) ? $_GET['ordDir'] : ''));
                    } else {
                        return new response($this->get('new_si_flore.query')->synthese_utm10_ss_inf($_GET['cd_ref']));
                    }
                }
                return new response("");

            case "synthese_fr10_ss_inf":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    if (isset($_GET['pag'])) {
                        return new response($this->get('new_si_flore.grid')->synthese_fr10_ss_inf_table($_GET['cd_ref'], isset($_GET['pag']) ? $_GET['pag'] : 0, isset($_GET['ordfield']) ? $_GET['ordfield'] : '', isset($_GET['ordDir']) ? $_GET['ordDir'] : ''));
                    } else {
                        return new response($this->get('new_si_flore.query')->synthese_fr10_ss_inf($_GET['cd_ref']));
                    }
                }
                return new response("");

            case "observation_fr10_ss_inf":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    return new response($this->get('new_si_flore.grid')->observation_fr10_ss_inf($_GET['cd_ref'], $_GET['id_obj'])); //test  ?cd_ref=129632&id_obj=10kmL93E105N630 
                }
                return new response("");
            case "synthese_taxon_fr10_ss_inf":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    return new response($this->get('new_si_flore.grid')->synthese_taxon_fr10_ss_inf($_GET['cd_ref']));
                }
                return new response("");

            case "information_taxons_ss_inf":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    return new response($this->get('new_si_flore.grid')->information_taxons_ss_inf($_GET['cd_ref']));
                }
                return new response("");

            case "information_taxa_taxons_ss_inf":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    return new response($this->get('new_si_flore.grid')->information_taxa_taxons_ss_inf($_GET['cd_ref']));
                }
                return new response("");


            /*             * ******************SELECTED TAXON & INFERIORS********************* */
            case "synthese_utm10":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY') or $this->get('new_si_flore.query')->checkTaxRange($_GET['cd_ref']) == $_GET['cd_ref']) {
                    if (isset($_GET['pag'])) {
                        return new response($this->get('new_si_flore.grid')->synthese_utm10_table($_GET['cd_ref'], isset($_GET['pag']) ? $_GET['pag'] : 0, isset($_GET['ordfield']) ? $_GET['ordfield'] : '', isset($_GET['ordDir']) ? $_GET['ordDir'] : ''));
                    } else {
                        return new response($this->get('new_si_flore.query')->synthese_utm10($_GET['cd_ref']));
                    }
                }
                return new response("");

            case "synthese_taxon_fr10":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY') or $this->get('new_si_flore.query')->checkTaxRange($_GET['cd_ref']) == $_GET['cd_ref']) {
                    return new response($this->get('new_si_flore.grid')->synthese_taxon_fr10($_GET['cd_ref']));
                }
                return new response("");

            case "information_taxons":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY') or $this->get('new_si_flore.query')->checkTaxRange($_GET['cd_ref']) == $_GET['cd_ref']) {
                    return new response($this->get('new_si_flore.grid')->information_taxons($_GET['cd_ref']));
                }
                return new response("");

            case "information_taxa_taxons":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY') or $this->get('new_si_flore.query')->checkTaxRange($_GET['cd_ref']) == $_GET['cd_ref']) {
                    return new response($this->get('new_si_flore.grid')->information_taxa_taxons($_GET['cd_ref']));
                }
                return new response("");

            case "synthese_fr10":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY') or $this->get('new_si_flore.query')->checkTaxRange($_GET['cd_ref']) == $_GET['cd_ref']) {
                    if (isset($_GET['pag'])) {
                        return new response($this->get('new_si_flore.grid')->synthese_fr10_table($_GET['cd_ref'], isset($_GET['pag']) ? $_GET['pag'] : 0, isset($_GET['ordfield']) ? $_GET['ordfield'] : '', isset($_GET['ordDir']) ? $_GET['ordDir'] : ''));
                    } else {
                        return new response($this->get('new_si_flore.query')->synthese_fr10($_GET['cd_ref']));
                    }
                }
                return new response("");
            case "observation_fr10":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY') or $this->get('new_si_flore.query')->checkTaxRange($_GET['cd_ref']) == $_GET['cd_ref']) {
                    return new response($this->get('new_si_flore.grid')->observation_fr10($_GET['cd_ref'], $_GET['id_obj']));
                }
                return new response("");
            //case "communes_old":
            //    return new response($this->get('new_si_flore.query')->communes_old($_GET['cd_ref'],$_GET['id_obj']));
            /* case "observation_fr10_old":
              return new response($this->get('new_si_flore.query')->observation_fr10_old($_GET['cd_ref'],$_GET['id_obj'])); */
            /* case "synthese_utm1_old":
              return new response($this->get('new_si_flore.query')->synthese_utm1_old($_GET['cd_ref'])); */
            /* case "synthese_fr5_old":
              return new response($this->get('new_si_flore.query')->synthese_fr5_old($_GET['cd_ref'])); */
            /* case "synthese_fr10_old":
              return new response($this->get('new_si_flore.query')->synthese_fr10_old($_GET['cd_ref'])); */
            /* case "synthese_comm_reunion_old":
              return new response($this->get('new_si_flore.query')->synthese_comm_reunion_old($_GET['cd_ref'])); */
            /* case "synthese_comm_old":
              return new response($this->get('new_si_flore.query')->synthese_comm_old($_GET['cd_ref'])); */
            //case "observation_taxon":
            //    return new response($this->get('new_si_flore.query')->observation_taxon($_GET['cd_ref']));
            /* case "observation_taxon_comm":
              return new response($this->get('new_si_flore.query')->observation_taxon_comm($_GET['cd_ref'])); */
            case "commentaires":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    //$prenom=$_POST['inputPrenom'];
                    $prenom = $this->get('security.context')->getToken()->getUser()->getFirstname();
                    $nom = $this->get('security.context')->getToken()->getUser()->getLastname();
                    $email = $this->get('security.context')->getToken()->getUser()->getEmail();
                    $user = $this->get('security.context')->getToken()->getUser()->getUsername();
                    $comment = $_POST['txtareaCommentaire'];
                    $cd_ref = $_POST['inputCodRef'];
                    $id_obj = isset($_POST['inputCodeObject']) ? $_POST['inputCodeObject'] : '';
                    $id_flore_fcbn = isset($_POST['inputCodeObs']) ? $_POST['inputCodeObs'] : '';
                    $type_com = $_POST['selecType'];
                    $priorite_com = $_POST['selecPriorite'];
                    $action_com = $_POST['selecAction'];
                    $nom_complet = $_POST['inputNomTaxon'];
                    //return new response($prenom."<br>".$nom."<br>".$email."<br>".$comment."<br>".$user."<br>".$cd_ref."<br>".$id_obj."<br>".$id_flore_fcbn."<br>".$type_com."<br>".$priorite_com."<br>".$action_com."<br>".$nom_complet);
                    if ($comment != '' && $user != '' && $cd_ref != '' && $type_com != '' && $priorite_com != '' && $action_com != '' && $nom_complet != '') {
                        return new response($this->get('new_si_flore.query')->commentaires($prenom, $nom, $email, $comment, $user, $cd_ref, $id_obj, $id_flore_fcbn, $type_com, $priorite_com, $action_com, $nom_complet));
                    }
                }
                return new response("");
            case "commentaires_existants":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    return new response($this->get('new_si_flore.query')->commentaires_existants($_GET['cd_ref'], isset($_GET['id_obj']) ? $_GET['id_obj'] : '', isset($_GET['id_flore_fcbn']) ? $_GET['id_flore_fcbn'] : '')); //test ?cd_ref=197530&id_obj=10kmL93E069N633&id_flore_fcbn
                }
                return new response("");
        }

        //Checking for big taxon conditions
        $txOptions = 1;
        if (strstr($queryname, 'ss_inf')) {
            $txOptions = 2;
        }
        if (!$this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY') && $this->get('new_si_flore.query')->isTooBig(isset($_GET['cd_ref']) ? $_GET['cd_ref'] : '', $txOptions)) {
            return new response('{"type":"error","msg":"Trop d\'élements à  afficher \n Ce taxon est commun"}');
        }

        switch ($queryname) {
            case "observation_comm":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY') or $this->get('new_si_flore.query')->checkTaxRange($_GET['cd_ref']) == $_GET['cd_ref']) {
                    return new response($this->get('new_si_flore.grid')->observation_comm($_GET['cd_ref'], $_GET['id_obj']));
                }
                return new response("");

            case "synthese_comm_reunion":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY') or $this->get('new_si_flore.query')->checkTaxRange($_GET['cd_ref']) == $_GET['cd_ref']) {
                    if (isset($_GET['pag'])) {
                        return new response($this->get('new_si_flore.grid')->synthese_comm_reunion_table($_GET['cd_ref'], isset($_GET['pag']) ? $_GET['pag'] : 0, isset($_GET['ordfield']) ? $_GET['ordfield'] : '', isset($_GET['ordDir']) ? $_GET['ordDir'] : ''));
                    } else {
                        return new response($this->get('new_si_flore.query')->synthese_comm_reunion($_GET['cd_ref']));
                    }
                }
                return new response("");
            case "synthese_taxon_comm_ss_inf":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    return new response($this->get('new_si_flore.grid')->synthese_taxon_comm_ss_inf($_GET['cd_ref']));
                }
                return new response("");
            case "synthese_taxon_fr5_ss_inf":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    return new response($this->get('new_si_flore.grid')->synthese_taxon_fr5_ss_inf($_GET['cd_ref']));
                }
                return new response("");
            case "observation_fr5_ss_inf":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    return new response($this->get('new_si_flore.grid')->observation_fr5_ss_inf($_GET['cd_ref'], $_GET['id_obj'])); //test  ?cd_ref=129632&id_obj=5kmL93E1055N6300 
                }
                return new response("");
            case "observation_comm_ss_inf":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    return new response($this->get('new_si_flore.grid')->observation_comm_ss_inf($_GET['cd_ref'], $_GET['id_obj'])); //test ?cd_ref=129632&id_obj=06140    
                }
                return new response("");
            case "synthese_utm1":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    if (isset($_GET['pag'])) {
                        return new response($this->get('new_si_flore.grid')->synthese_utm1_table($_GET['cd_ref'], isset($_GET['pag']) ? $_GET['pag'] : 0, isset($_GET['ordfield']) ? $_GET['ordfield'] : '', isset($_GET['ordDir']) ? $_GET['ordDir'] : ''));
                    } else {
                        return new response($this->get('new_si_flore.query')->synthese_utm1($_GET['cd_ref']));
                    }
                }
                return new response("");
            case "synthese_taxon_comm":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY') or $this->get('new_si_flore.query')->checkTaxRange($_GET['cd_ref']) == $_GET['cd_ref']) {
                    return new response($this->get('new_si_flore.grid')->synthese_taxon_comm($_GET['cd_ref']));
                }
                return new response("");
            case "observation_fr5":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    return new response($this->get('new_si_flore.grid')->observation_fr5($_GET['cd_ref'], $_GET['id_obj']));
                }
                return new response("");
            case "synthese_taxon_fr5":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    return new response($this->get('new_si_flore.grid')->synthese_taxon_fr5($_GET['cd_ref']));
                }
                return new response("");
            case "synthese_comm":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY') or $this->get('new_si_flore.query')->checkTaxRange($_GET['cd_ref']) == $_GET['cd_ref']) {
                    if (isset($_GET['pag'])) {
                        return new response($this->get('new_si_flore.grid')->synthese_comm_table($_GET['cd_ref'], isset($_GET['pag']) ? $_GET['pag'] : 0, isset($_GET['ordfield']) ? $_GET['ordfield'] : '', isset($_GET['ordDir']) ? $_GET['ordDir'] : ''));
                    } else {
                        return new response($this->get('new_si_flore.query')->synthese_comm($_GET['cd_ref']));
                    }
                }
                return new response("");
            case "synthese_utm1_ss_inf":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    if (isset($_GET['pag'])) {
                        return new response($this->get('new_si_flore.grid')->synthese_utm1_ss_inf_table($_GET['cd_ref'], isset($_GET['pag']) ? $_GET['pag'] : 0, isset($_GET['ordfield']) ? $_GET['ordfield'] : '', isset($_GET['ordDir']) ? $_GET['ordDir'] : '')); //test ?cd_ref=129632
                    } else {
                        return new response($this->get('new_si_flore.query')->synthese_utm1_ss_inf($_GET['cd_ref'])); //test ?cd_ref=129632
                    }
                }
                return new response("");
            case "synthese_fr5_ss_inf":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    if (isset($_GET['pag'])) {
                        return new response($this->get('new_si_flore.grid')->synthese_fr5_ss_inf_table($_GET['cd_ref'], isset($_GET['pag']) ? $_GET['pag'] : 0, isset($_GET['ordfield']) ? $_GET['ordfield'] : '', isset($_GET['ordDir']) ? $_GET['ordDir'] : ''));
                    } else {
                        return new response($this->get('new_si_flore.query')->synthese_fr5_ss_inf($_GET['cd_ref']));
                    }
                }
                return new response("");
            case "synthese_comm_ss_inf":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    if (isset($_GET['pag'])) {
                        return new response($this->get('new_si_flore.grid')->synthese_comm_ss_inf_table($_GET['cd_ref'], isset($_GET['pag']) ? $_GET['pag'] : 0, isset($_GET['ordfield']) ? $_GET['ordfield'] : '', isset($_GET['ordDir']) ? $_GET['ordDir'] : ''));
                    } else {
                        return new response($this->get('new_si_flore.query')->synthese_comm_ss_inf($_GET['cd_ref']));
                    }
                }
                return new response("");
            case "synthese_comm_reunion_ss_inf":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    if (isset($_GET['pag'])) {
                        return new response($this->get('new_si_flore.grid')->synthese_comm_reunion_ss_inf_table($_GET['cd_ref'], isset($_GET['pag']) ? $_GET['pag'] : 0, isset($_GET['ordfield']) ? $_GET['ordfield'] : '', isset($_GET['ordDir']) ? $_GET['ordDir'] : ''));
                    } else {
                        return new response($this->get('new_si_flore.query')->synthese_comm_reunion_ss_inf($_GET['cd_ref']));
                    }
                }
                return new response("");
            case "synthese_fr5":
                if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
                    if (isset($_GET['pag'])) {
                        return new response($this->get('new_si_flore.grid')->synthese_fr5_table($_GET['cd_ref'], isset($_GET['pag']) ? $_GET['pag'] : 0, isset($_GET['ordfield']) ? $_GET['ordfield'] : '', isset($_GET['ordDir']) ? $_GET['ordDir'] : ''));
                    } else {
                        return new response($this->get('new_si_flore.query')->synthese_fr5($_GET['cd_ref']));
                    }
                }
                return new response("");
        }
    }

}

?>
