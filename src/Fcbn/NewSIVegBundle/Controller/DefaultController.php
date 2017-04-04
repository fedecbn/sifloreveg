<?php

namespace Fcbn\NewSIVegBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller {

    public function indexAction() {
        $taxon = isset($_GET["cd_ref"]) ? $_GET["cd_ref"] : '';
        if (isset($_GET["r"]) && $_GET["r"] != '') {
            $region = $_GET["r"];
        } else {
            $region = 'metro';
        }
        if (isset($_GET["to"]) && $_GET["to"] != '' && $this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
            $taxopt = $_GET["to"];
        } else {
            $taxopt = '1';
        }
        if (isset($_GET["so"]) && $_GET["so"] != '') {
            $synopt = $_GET["so"];
        } else {
            $synopt = '1';
        }
        //return new response($this->get('new_si_veg.layer')->getParams());
        $Layers = $this->getDoctrine()->getRepository('FcbnNewSIFloreBundle:MapLayers')->findAll();
        $layersData=array();
        foreach ($Layers as $Layer) {
            if(!isset($layersData[$Layer->getlabel().$Layer->getTreeNodeChild().$Layer->getzone()])){
                $layersData[$Layer->getlabel().$Layer->getTreeNodeChild().$Layer->getzone()]=array("treenodechild" => $Layer->getTreeNodeChild(),
                    "label" => $Layer->getlabel(),
                    "variablejavascript:" => $Layer->getvariableJavascript(),
                    "layers" => $Layer->getlayers() ,
                    "typewebservice"=>$Layer->gettypeWebservice(),
                    "url"=>$Layer->geturl(),
                    "zone" => $Layer->getzone(),
                    "treenodechild" => $Layer->getTreeNodeChild());
            }else{
                $layersData[$Layer->getlabel().$Layer->getTreeNodeChild().$Layer->getzone()]["layers"].=','.$Layer->getlayers();
            }
        }
        return $this->render('FcbnNewSIVegBundle:Default:index.html.twig', array('taxon' => $taxon, 'region' => $region, 'taxonoption' => $taxopt, 'syntheseoption' => $synopt, 'layers'=>$layersData));
    }

}

