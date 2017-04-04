<?php

namespace Fcbn\NewSIFloreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * MapLayers
 */
class MapLayers
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $treeNodeChild;

    /**
     * @var string
     */
    private $label;

    /**
     * @var string
     */
    private $variableJavascript;

    /**
     * @var string
     */
    private $layers;

    /**
     * @var string
     */
    private $typeWebservice;

    /**
     * @var string
     */
    private $zone;

    /**
     * @var string
     */
    private $url;

    /**
     * @var string
     */
    private $description;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set treeNodeChild
     *
     * @param string $treeNodeChild
     * @return MapLayers
     */
    public function setTreeNodeChild($treeNodeChild)
    {
        $this->treeNodeChild = $treeNodeChild;
    
        return $this;
    }

    /**
     * Get treeNodeChild
     *
     * @return string 
     */
    public function getTreeNodeChild()
    {
        return $this->treeNodeChild;
    }

    /**
     * Set labelAffichage
     *
     * @param string $labelAffichage
     * @return MapLayers
     */
    public function setLabel($label)
    {
        $this->label = $label;
    
        return $this;
    }

    /**
     * Get labelAffichage
     *
     * @return string 
     */
    public function getLabel()
    {
        return $this->label;
    }

    /**
     * Set variableJavascript
     *
     * @param string $variableJavascript
     * @return MapLayers
     */
    public function setVariableJavascript($variableJavascript)
    {
        $this->variableJavascript = $variableJavascript;
    
        return $this;
    }

    /**
     * Get variableJavascript
     *
     * @return string 
     */
    public function getVariableJavascript()
    {
        return $this->variableJavascript;
    }

    /**
     * Set layers
     *
     * @param string $layers
     * @return MapLayers
     */
    public function setLayers($layers)
    {
        $this->layers = $layers;
    
        return $this;
    }

    /**
     * Get layers
     *
     * @return string 
     */
    public function getLayers()
    {
        return $this->layers;
    }

    /**
     * Set typeWebservice
     *
     * @param string $typeWebservice
     * @return MapLayers
     */
    public function setTypeWebservice($typeWebservice)
    {
        $this->typeWebservice = $typeWebservice;
    
        return $this;
    }

    /**
     * Get typeWebservice
     *
     * @return string 
     */
    public function getTypeWebservice()
    {
        return $this->typeWebservice;
    }

    /**
     * Set empriseGeographique
     *
     * @param string $empriseGeographique
     * @return MapLayers
     */
    public function setzone($empriseGeographique)
    {
        $this->zone = $empriseGeographique;
    
        return $this;
    }

    /**
     * Get empriseGeographique
     *
     * @return string 
     */
    public function getzone()
    {
        return $this->zone;
    }

    /**
     * Set url
     *
     * @param string $url
     * @return MapLayers
     */
    public function setUrl($url)
    {
        $this->url = $url;
    
        return $this;
    }

    /**
     * Get url
     *
     * @return string 
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return MapLayers
     */
    public function setDescription($description)
    {
        $this->description = $description;
    
        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }
}
