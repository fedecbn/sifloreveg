<?php
namespace Fcbn\NewSIFloreBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Fcbn\NewSIFloreBundle\Entity\MapLayers;

class LoadMapLayersData implements FixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Fonds de cartes");
        $LayerData->setLabel("Territoires agréments CBN");
        $LayerData->setVariableJavascript("cbn_territoires_agrem");
        $LayerData->setLayers("Territoires agréments CBN");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs");
        $LayerData->setDescription("Limites des territoires d'agrément des CBN");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Fonds de cartes");
        $LayerData->setLabel("Régions biogéographiques");
        $LayerData->setVariableJavascript("regions_bio");
        $LayerData->setLayers("Régions biogéographiques");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs");
        $LayerData->setDescription("Régions biogéographiques. Cette couche, initialement nommée \"regions_biogeo_aee_france.shp\" est issue d'une extraction pour la France (avec les limites BdCarto) et d'une reprojection en RGF93 - Lambert 93 par Maëlle DECHERF (FCBN) de la couche diffusée par l'Agence européenne de l'environnement à l'adresse suivante :;http://www.eea.europa.eu/data-and-maps/data/biogeographical-regions-europe-2008");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Fonds de cartes");
        $LayerData->setLabel("Agences de l'eau");
        $LayerData->setVariableJavascript("agences_eau");
        $LayerData->setLayers("Agences de l'eau");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs");
        $LayerData->setDescription("Limites des agences de l'eau (générée à partir de la bd_carthage)");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Fonds de cartes");
        $LayerData->setLabel("Carte routière");
        $LayerData->setVariableJavascript("scan_1000");
        $LayerData->setLayers("scan_1000_v2");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs");
        $LayerData->setDescription("Scan 1000 de la France métropolitaine (carte au 1/1000000)");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Fonds de cartes");
        $LayerData->setLabel("Relief");
        $LayerData->setVariableJavascript("relief_metropole");
        $LayerData->setLayers("Relief");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs");
        $LayerData->setDescription("Illustration du relief de la France à partir d'un MNT 250 mètres avec comme échelle (pas de valeur/0-200m/200-500m/500-900m/900-1600m/1600-2100/2100-2800/>2800)");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Fonds de cartes");
        $LayerData->setLabel("Territoires agréments CBN");
        $LayerData->setVariableJavascript("cbn_territoires_agrem_mas");
        $LayerData->setLayers("Territoires agréments CBN (Réunion)");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("reunion");
        $LayerData->setUrl("http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs");
        $LayerData->setDescription("Limites du territoire d'agrément CBN mascarin (uniquement ile de la réunion sans Mayotte et iles éparses)");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Fonds de cartes");
        $LayerData->setLabel("Scan 100");
        $LayerData->setVariableJavascript("scan_100_mas");
        $LayerData->setLayers("scan_100_mas");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("reunion");
        $LayerData->setUrl("http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs");
        $LayerData->setDescription("Scan 100 de l'ile de la Réunion (carte au 1/100000)");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Limites administratives et CBN");
        $LayerData->setLabel("Territoires de compétence des CBN");
        $LayerData->setVariableJavascript("limite_admin_cbn");
        $LayerData->setLayers("Territoires agréments CBN contours");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs");
        $LayerData->setDescription("Contours avec fond transparent des territoires d'agrément des CBN");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Limites administratives et CBN");
        $LayerData->setLabel("Départements");
        $LayerData->setVariableJavascript("limite_admin_cbn");
        $LayerData->setLayers("Départements");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs");
        $LayerData->setDescription("");

        $manager->persist($LayerData);

       /* $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Fonds de cartes");
        $LayerData->setLabel("Orthophoto");
        $LayerData->setVariableJavascript("ign_ortho");
        $LayerData->setLayers("OI.OrthoimageCoverage");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://wxs.ign.fr/rbrh8w7jei95y19ew2lazrn4/inspire/r/wms?");
        $LayerData->setDescription("Orthophotographies aérienne France entière (ce sont des données lourdes il faudrait pouvoir les afficher avec un certain niveau de zoom)");

        $manager->persist($LayerData);*/

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Terrains des Conservatoires des espaces naturels");
        $LayerData->setVariableJavascript("inpn");
        $LayerData->setLayers("Terrains_des_Conservatoires_des_espaces_naturels");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/fxx_inpn");
        $LayerData->setDescription("Limite des terrains des conservatoires d'espaces naturels");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Terrains du Conservatoire du Littoral");
        $LayerData->setVariableJavascript("inpn");
        $LayerData->setLayers("Terrains_du_Conservatoire_du_Littoral");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/fxx_inpn");
        $LayerData->setDescription("Limites des terrains du conservatoire du littoral");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Arretes de protection de biotope");
        $LayerData->setVariableJavascript("inpn");
        $LayerData->setLayers("Arretes_de_protection_de_biotope");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/fxx_inpn");
        $LayerData->setDescription("Limites des arrêtés de protection du biotope");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Reserves naturelles nationales");
        $LayerData->setVariableJavascript("inpn");
        $LayerData->setLayers("Reserves_naturelles_nationales");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/fxx_inpn");
        $LayerData->setDescription("Limites des Réserves Naturelles Nationales.");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Reserves naturelles regionales");
        $LayerData->setVariableJavascript("inpn");
        $LayerData->setLayers("Reserves_naturelles_regionales");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/fxx_inpn");
        $LayerData->setDescription("Limites des Réserves Naturelles Régionales. Réserves créées à l'initiative des régions.");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Réserves naturelles de la collectivité territoriale de Corse");
        $LayerData->setVariableJavascript("inpn");
        $LayerData->setLayers("rnc");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/fxx_inpn");
        $LayerData->setDescription("Limites des Réserves Naturelles de la Collectivité territoriale de Corse");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Reserves biologiques");
        $LayerData->setVariableJavascript("inpn");
        $LayerData->setLayers("Reserves_biologiques");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/fxx_inpn");
        $LayerData->setDescription("Limites des réserves biologiques. Elles s'appliquent au domaine forestier de l'Etat (réserve biologique domaniale) géré par l'Office national des forêts (ONF)");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Sites Ramsar");
        $LayerData->setVariableJavascript("inpn");
        $LayerData->setLayers("Sites_Ramsar");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/fxx_inpn");
        $LayerData->setDescription("Limites des sites Ramsar. Ramsar est une convention visant à la protection des zones humides d'importance internationale.");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Parcs nationaux");
        $LayerData->setVariableJavascript("inpn");
        $LayerData->setLayers("Parcs_nationaux");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/fxx_inpn");
        $LayerData->setDescription("Limites des Parcs nationaux");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Reserves nationales de chasse et faune sauvage");
        $LayerData->setVariableJavascript("inpn");
        $LayerData->setLayers("Reserves_nationales_de_chasse_et_faune_sauvage");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/fxx_inpn");
        $LayerData->setDescription("Limites des réserves nationales de chasse et faune sauvage");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Reserves de la biosphere");
        $LayerData->setVariableJavascript("inpn");
        $LayerData->setLayers("Reserves_de_la_biosphere");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/fxx_inpn");
        $LayerData->setDescription("Limites des réserves des la biosphère");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Parcs naturels regionaux");
        $LayerData->setVariableJavascript("inpn");
        $LayerData->setLayers("Parcs_naturels_regionaux");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/fxx_inpn");
        $LayerData->setDescription("Limites des parcs naturels régionaux");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Parc naturel marin");
        $LayerData->setVariableJavascript("inpn");
        $LayerData->setLayers("Parc_naturel_marin");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/fxx_inpn");
        $LayerData->setDescription("Limites des parcs naturels marins");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Terrains du Conservatoire du Littoral");
        $LayerData->setVariableJavascript("inpn");
        $LayerData->setLayers("Terrains_du_Conservatoire_du_Littoral");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/fxx_inpn");
        $LayerData->setDescription("Limites des terrains du conservatoire du littoral");

        $manager->persist($LayerData);

        /*$LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("ZICO");
        $LayerData->setVariableJavascript("inpn");
        $LayerData->setLayers("ZICO");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/fxx_inpn");
        $LayerData->setDescription("Limites des ZICO");

        $manager->persist($LayerData);*/

        $LayerData->setLabel("Znieff1");
        $LayerData->setVariableJavascript("inpn");
        $LayerData->setLayers("Znieff1");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/fxx_inpn");
        $LayerData->setDescription("Limites des znieff de type1");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Znieff2");
        $LayerData->setVariableJavascript("inpn");
        $LayerData->setLayers("Znieff2");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/fxx_inpn");
        $LayerData->setDescription("Limites des znieff de type2");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Sites d'importance communautaire");
        $LayerData->setVariableJavascript("inpn");
        $LayerData->setLayers("Sites_d_importance_communautaire");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/fxx_inpn");
        $LayerData->setDescription("Limites des zones d'importance communautaire");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Zones de protection spéciale");
        $LayerData->setVariableJavascript("inpn");
        $LayerData->setLayers("Zones_de_protection_speciale");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/fxx_inpn");
        $LayerData->setDescription("Limites des zones de protection spéciales");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Fonds de cartes");
        $LayerData->setLabel("GeoSignal");
        $LayerData->setVariableJavascript("raster_geosignal");
        $LayerData->setLayers("RASTER25k");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://wms.geosignal.fr/metropole");
        $LayerData->setDescription("Carte routière géosignal au 25000 eme (affichage en fonction du zoom)");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Fonds de cartes");
        $LayerData->setLabel("GeoSignal");
        $LayerData->setVariableJavascript("raster_geosignal");
        $LayerData->setLayers("RASTER50k");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://wms.geosignal.fr/metropole");
        $LayerData->setDescription("Carte routière géosignal au 50000 eme (affichage en fonction du zoom)");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Fonds de cartes");
        $LayerData->setLabel("GeoSignal");
        $LayerData->setVariableJavascript("raster_geosignal");
        $LayerData->setLayers("RASTER100k");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://wms.geosignal.fr/metropole");
        $LayerData->setDescription("Carte routière géosignal au 100000 eme (affichage en fonction du zoom)");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Fonds de cartes");
        $LayerData->setLabel("GeoSignal");
        $LayerData->setVariableJavascript("raster_geosignal");
        $LayerData->setLayers("RASTER250k");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://wms.geosignal.fr/metropole");
        $LayerData->setDescription("Carte routière géosignal au 250000 eme (affichage en fonction du zoom)");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Fonds de cartes");
        $LayerData->setLabel("GeoSignal");
        $LayerData->setVariableJavascript("raster_geosignal");
        $LayerData->setLayers("RASTER500k");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://wms.geosignal.fr/metropole");
        $LayerData->setDescription("Carte routière géosignal au 500000 eme (affichage en fonction du zoom)");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Fonds de cartes");
        $LayerData->setLabel("GeoSignal");
        $LayerData->setVariableJavascript("raster_geosignal");
        $LayerData->setLayers("RASTER1000k");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://wms.geosignal.fr/metropole");
        $LayerData->setDescription("Carte routière géosignal au 1000000 eme (affichage en fonction du zoom)");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Fonds de cartes");
        $LayerData->setLabel("GeoSignal");
        $LayerData->setVariableJavascript("raster_geosignal");
        $LayerData->setLayers("RASTER5k");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://wms.geosignal.fr/metropole");
        $LayerData->setDescription("Carte routière géosignal au 5000 eme (affichage en fonction du zoom)");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Fonds de cartes");
        $LayerData->setLabel("GeoSignal");
        $LayerData->setVariableJavascript("raster_geosignal");
        $LayerData->setLayers("RASTER4000k");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://wms.geosignal.fr/metropole");
        $LayerData->setDescription("Carte routière géosignal au 4000000 eme (affichage en fonction du zoom)");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("pas utilise");
        $LayerData->setLabel("Corinne Land cover 2006");
        $LayerData->setVariableJavascript("corinne_land_cover");
        $LayerData->setLayers("topp:CLC06_RGF");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://sd1878-2.sivit.org/geoserver/wms");
        $LayerData->setDescription("occupation du sol corine land cover (pas utilisée car longue à l'affichage, il faudrait pouvoir utiliser un niveau de zoom à laquelle elle apparait)");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Cours d'eau");
        $LayerData->setLabel("Cours d'eau de plus de 100km");
        $LayerData->setVariableJavascript("cours_eau_sandre");
        $LayerData->setLayers("CoursEau1");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://services.sandre.eaufrance.fr/geo/zonage");
        $LayerData->setDescription("Cours d'eau de plus de 100km");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Cours d'eau");
        $LayerData->setLabel("Cours d'eau de 50 à 100km");
        $LayerData->setVariableJavascript("cours_eau_sandre");
        $LayerData->setLayers("CoursEau2");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://services.sandre.eaufrance.fr/geo/zonage");
        $LayerData->setDescription("Cours d'eau de 50 à 100km");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Cours d'eau");
        $LayerData->setLabel("Cours d'eau de 25 à 50km");
        $LayerData->setVariableJavascript("cours_eau_sandre");
        $LayerData->setLayers("CoursEau3");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://services.sandre.eaufrance.fr/geo/zonage");
        $LayerData->setDescription("Cours d'eau de 25 à 50km");

        $manager->persist($LayerData);

       /* $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Cours d'eau");
        $LayerData->setLabel("COURDO4");
        $LayerData->setVariableJavascript("cours_eau_sandre");
        $LayerData->setLayers("CoursEau4");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://services.sandre.eaufrance.fr/geo/zonage");
        $LayerData->setDescription("Cours d'eau de 5 à 10km");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Cours d'eau");
        $LayerData->setLabel("COURDO5");
        $LayerData->setVariableJavascript("cours_eau_sandre");
        $LayerData->setLayers("CoursEau5");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://services.sandre.eaufrance.fr/geo/zonage");
        $LayerData->setDescription("Cours d'eau inférieurs à 5km");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("Cours d'eau");
        $LayerData->setLabel("CoursEau6");
        $LayerData->setVariableJavascript("cours_eau_sandre");
        $LayerData->setLayers("COURDO6");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("metropole");
        $LayerData->setUrl("http://services.sandre.eaufrance.fr/geo/zonage");
        $LayerData->setDescription("");

        $manager->persist($LayerData);*/

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Reserves biologiques");
        $LayerData->setVariableJavascript("inpn_reunion_1");
        $LayerData->setLayers("Reserves_biologiques");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("reunion");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/reu_inpn");
        $LayerData->setDescription("Limites des réserves biologiques");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Parcs nationaux");
        $LayerData->setVariableJavascript("inpn_reunion_2");
        $LayerData->setLayers("Parcs_nationaux");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("reunion");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/reu_inpn");
        $LayerData->setDescription("Limites des parcs nationaux");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Terrains du Conservatoire du Littoral");
        $LayerData->setVariableJavascript("inpn_reunion_3");
        $LayerData->setLayers("Terrains_du_Conservatoire_du_Littoral");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("reunion");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/reu_inpn");
        $LayerData->setDescription("Limites des terrains du conservatoire du littoral");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Arretes de protection de biotope");
        $LayerData->setVariableJavascript("inpn_reunion_4");
        $LayerData->setLayers("Arretes_de_protection_de_biotope");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("reunion");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/reu_inpn");
        $LayerData->setDescription("Limites des arrêtés de protection du biotope");

        $manager->persist($LayerData);

        $LayerData = new MapLayers();
        $LayerData->setTreeNodeChild("INPN");
        $LayerData->setLabel("Reserves naturelles nationales");
        $LayerData->setVariableJavascript("inpn_reunion_5");
        $LayerData->setLayers("Reserves_naturelles_nationales");
        $LayerData->setTypeWebservice("WMS");
        $LayerData->setzone("reunion");
        $LayerData->setUrl("http://ws.carmencarto.fr/WMS/119/reu_inpn");
        $LayerData->setDescription("Limites des réserves naturelles");

        $manager->persist($LayerData);


        $manager->flush();
    }
}
