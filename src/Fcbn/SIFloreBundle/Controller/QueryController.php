<?php
namespace Fcbn\SIFloreBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\Response;

class QueryController extends Controller{
    public function indexAction($queryname){
        switch ($queryname){
            case "taxons":
                return new response($this->get('si_flore.query')->taxons(isset($_GET['rang'])?$_GET['rang']:'',isset($_GET['type'])?$_GET['type']:''));//test ?rang=GN&type
            case "synthese_utm1_ss_inf":
                return new response($this->get('si_flore.query')->synthese_utm1_ss_inf($_GET['cd_ref']));//test ?cd_ref=129632
            case "synthese_utm1":
                return new response($this->get('si_flore.query')->synthese_utm1($_GET['cd_ref']));
           /*case "synthese_utm1_old":
                return new response($this->get('si_flore.query')->synthese_utm1_old($_GET['cd_ref']));*/
            case "synthese_utm10_ss_inf":
                return new response($this->get('si_flore.query')->synthese_utm10_ss_inf($_GET['cd_ref']));
            case "synthese_utm10":
                return new response($this->get('si_flore.query')->synthese_utm10($_GET['cd_ref']));
            case "synthese_taxon_utm_ss_inf":
                return new response($this->get('si_flore.query')->synthese_taxon_utm_ss_inf($_GET['cd_ref']));
            case "synthese_taxon_utm":
                return new response($this->get('si_flore.query')->synthese_taxon_utm($_GET['cd_ref']));
            case "synthese_taxon_fr5_ss_inf":
                return new response($this->get('si_flore.query')->synthese_taxon_fr5_ss_inf($_GET['cd_ref']));
            case "synthese_taxon_fr5":
                return new response($this->get('si_flore.query')->synthese_taxon_fr5($_GET['cd_ref']));
            case "synthese_taxon_fr10_ss_inf":
                return new response($this->get('si_flore.query')->synthese_taxon_fr10_ss_inf($_GET['cd_ref']));
            case "synthese_taxon_fr10":
                return new response($this->get('si_flore.query')->synthese_taxon_fr10($_GET['cd_ref']));
            case "synthese_taxon_comm_ss_inf":
                return new response($this->get('si_flore.query')->synthese_taxon_comm_ss_inf($_GET['cd_ref']));
            case "synthese_taxon_comm":
                return new response($this->get('si_flore.query')->synthese_taxon_comm($_GET['cd_ref']));
            case "synthese_fr5_ss_inf":
                return new response($this->get('si_flore.query')->synthese_fr5_ss_inf($_GET['cd_ref']));
            case "synthese_fr5":
                return new response($this->get('si_flore.query')->synthese_fr5($_GET['cd_ref']));
            /*case "synthese_fr5_old":
                return new response($this->get('si_flore.query')->synthese_fr5_old($_GET['cd_ref']));*/
            case "synthese_fr10_ss_inf":
                return new response($this->get('si_flore.query')->synthese_fr10_ss_inf($_GET['cd_ref']));
            case "synthese_fr10":
                return new response($this->get('si_flore.query')->synthese_fr10($_GET['cd_ref']));
            /*case "synthese_fr10_old":
                return new response($this->get('si_flore.query')->synthese_fr10_old($_GET['cd_ref']));*/
            case "synthese_comm_ss_inf":
                return new response($this->get('si_flore.query')->synthese_comm_ss_inf($_GET['cd_ref']));
            case "synthese_comm_reunion_ss_inf":
                return new response($this->get('si_flore.query')->synthese_comm_reunion_ss_inf($_GET['cd_ref']));
            case "synthese_comm_reunion":
                return new response($this->get('si_flore.query')->synthese_comm_reunion($_GET['cd_ref']));
            /*case "synthese_comm_reunion_old":
                return new response($this->get('si_flore.query')->synthese_comm_reunion_old($_GET['cd_ref']));*/
            case "synthese_comm":
                return new response($this->get('si_flore.query')->synthese_comm($_GET['cd_ref']));
            /*case "synthese_comm_old":
                return new response($this->get('si_flore.query')->synthese_comm_old($_GET['cd_ref']));*/
            //case "observation_taxon":
            //    return new response($this->get('si_flore.query')->observation_taxon($_GET['cd_ref']));
            /*case "observation_taxon_comm":
                return new response($this->get('si_flore.query')->observation_taxon_comm($_GET['cd_ref']));*/
            case "observation_fr5_ss_inf":
                return new response($this->get('si_flore.query')->observation_fr5_ss_inf($_GET['cd_ref'],$_GET['id_obj']));//test  ?cd_ref=129632&id_obj=5kmL93E1055N6300
            case "observation_fr5":
                return new response($this->get('si_flore.query')->observation_fr5($_GET['cd_ref'],$_GET['id_obj']));
            case "observation_fr10_ss_inf":
                return new response($this->get('si_flore.query')->observation_fr10_ss_inf($_GET['cd_ref'],$_GET['id_obj']));//test  ?cd_ref=129632&id_obj=10kmL93E105N630
            case "observation_fr10":
                return new response($this->get('si_flore.query')->observation_fr10($_GET['cd_ref'],$_GET['id_obj']));
            /*case "observation_fr10_old":
                return new response($this->get('si_flore.query')->observation_fr10_old($_GET['cd_ref'],$_GET['id_obj']));*/
            case "observation_comm_ss_inf":
                return new response($this->get('si_flore.query')->observation_comm_ss_inf($_GET['cd_ref'],$_GET['id_obj']));//test ?cd_ref=129632&id_obj=06140
            case "observation_comm":
                return new response($this->get('si_flore.query')->observation_comm($_GET['cd_ref'],$_GET['id_obj']));
            //case "communes_old":
            //    return new response($this->get('si_flore.query')->communes_old($_GET['cd_ref'],$_GET['id_obj']));
            case "commentaires":
                if($this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')){
                    return new response($this->get('si_flore.query')->commentaires(''));
                }
               return new response("");
            case "commentaires_existants":
                return new response($this->get('si_flore.query')->commentaires_existants($_GET['cd_ref'],isset($_GET['id_obj'])?$_GET['id_obj']:'',isset($_GET['id_flore_fcbn'])?$_GET['id_flore_fcbn']:''));//test ?cd_ref=197530&id_obj=10kmL93E069N633&id_flore_fcbn
            
        }
    }
}
?>
