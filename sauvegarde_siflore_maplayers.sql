--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;




--
-- Data for Name: maplayers; Type: TABLE DATA; Schema: public; Owner: siflore
--

COPY maplayers (id, tree_node_child, label, variable_javascript, layers, type_webservice, zone, url, description) FROM stdin;
442	Fonds de cartes	Territoires agréments CBN	cbn_territoires_agrem	Territoires agréments CBN	WMS	metropole	http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs	Limites des territoires d'agrément des CBN
443	Fonds de cartes	Régions biogéographiques	regions_bio	Régions biogéographiques	WMS	metropole	http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs	Régions biogéographiques. Cette couche, initialement nommée "regions_biogeo_aee_france.shp" est issue d'une extraction pour la France (avec les limites BdCarto) et d'une reprojection en RGF93 - Lambert 93 par Maëlle DECHERF (FCBN) de la couche diffusée par l'Agence européenne de l'environnement à l'adresse suivante :;http://www.eea.europa.eu/data-and-maps/data/biogeographical-regions-europe-2008
444	Fonds de cartes	Agences de l'eau	agences_eau	Agences de l'eau	WMS	metropole	http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs	Limites des agences de l'eau (générée à partir de la bd_carthage)
445	Fonds de cartes	Carte routière	scan_1000	scan_1000_v2	WMS	metropole	http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs	Scan 1000 de la France métropolitaine (carte au 1/1000000)
446	Fonds de cartes	Relief	relief_metropole	Relief	WMS	metropole	http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs	Illustration du relief de la France à partir d'un MNT 250 mètres avec comme échelle (pas de valeur/0-200m/200-500m/500-900m/900-1600m/1600-2100/2100-2800/>2800)
447	Fonds de cartes	Territoires agréments CBN	cbn_territoires_agrem_mas	Territoires agréments CBN (Réunion)	WMS	reunion	http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs	Limites du territoire d'agrément CBN mascarin (uniquement ile de la réunion sans Mayotte et iles éparses)
448	Fonds de cartes	Scan 100	scan_100_mas	scan_100_mas	WMS	reunion	http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs	Scan 100 de l'ile de la Réunion (carte au 1/100000)
449	Limites administratives et CBN	Territoires de compétence des CBN	limite_admin_cbn	Territoires agréments CBN contours	WMS	metropole	http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs	Contours avec fond transparent des territoires d'agrément des CBN
450	Limites administratives et CBN	Départements	limite_admin_cbn	Départements	WMS	metropole	http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs	
451	INPN	Terrains des Conservatoires des espaces naturels	inpn	Terrains_des_Conservatoires_des_espaces_naturels	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limite des terrains des conservatoires d'espaces naturels
452	INPN	Terrains du Conservatoire du Littoral	inpn	Terrains_du_Conservatoire_du_Littoral	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des terrains du conservatoire du littoral
453	INPN	Arretes de protection de biotope	inpn	Arretes_de_protection_de_biotope	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des arrêtés de protection du biotope
454	INPN	Reserves naturelles nationales	inpn	Reserves_naturelles_nationales	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des Réserves Naturelles Nationales.
455	INPN	Reserves naturelles regionales	inpn	Reserves_naturelles_regionales	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des Réserves Naturelles Régionales. Réserves créées à l'initiative des régions.
456	INPN	Réserves naturelles de la collectivité territoriale de Corse	inpn	rnc	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des Réserves Naturelles de la Collectivité territoriale de Corse
457	INPN	Reserves biologiques	inpn	Reserves_biologiques	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des réserves biologiques. Elles s'appliquent au domaine forestier de l'Etat (réserve biologique domaniale) géré par l'Office national des forêts (ONF)
458	INPN	Sites Ramsar	inpn	Sites_Ramsar	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des sites Ramsar. Ramsar est une convention visant à la protection des zones humides d'importance internationale.
459	INPN	Parcs nationaux	inpn	Parcs_nationaux	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des Parcs nationaux
460	INPN	Reserves nationales de chasse et faune sauvage	inpn	Reserves_nationales_de_chasse_et_faune_sauvage	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des réserves nationales de chasse et faune sauvage
461	INPN	Reserves de la biosphere	inpn	Reserves_de_la_biosphere	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des réserves des la biosphère
462	INPN	Parcs naturels regionaux	inpn	Parcs_naturels_regionaux	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des parcs naturels régionaux
463	INPN	Parc naturel marin	inpn	Parc_naturel_marin	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des parcs naturels marins
464	INPN	Znieff1	inpn	Znieff1	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des znieff de type1
465	INPN	Znieff2	inpn	Znieff2	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des znieff de type2
466	INPN	Sites d'importance communautaire	inpn	Sites_d_importance_communautaire	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des zones d'importance communautaire
467	INPN	Zones de protection spéciale	inpn	Zones_de_protection_speciale	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des zones de protection spéciales
468	Fonds de cartes	GeoSignal	raster_geosignal	RASTER25k	WMS	metropole	http://wms.geosignal.fr/metropole	Carte routière géosignal au 25000 eme (affichage en fonction du zoom)
469	Fonds de cartes	GeoSignal	raster_geosignal	RASTER50k	WMS	metropole	http://wms.geosignal.fr/metropole	Carte routière géosignal au 50000 eme (affichage en fonction du zoom)
470	Fonds de cartes	GeoSignal	raster_geosignal	RASTER100k	WMS	metropole	http://wms.geosignal.fr/metropole	Carte routière géosignal au 100000 eme (affichage en fonction du zoom)
471	Fonds de cartes	GeoSignal	raster_geosignal	RASTER250k	WMS	metropole	http://wms.geosignal.fr/metropole	Carte routière géosignal au 250000 eme (affichage en fonction du zoom)
472	Fonds de cartes	GeoSignal	raster_geosignal	RASTER500k	WMS	metropole	http://wms.geosignal.fr/metropole	Carte routière géosignal au 500000 eme (affichage en fonction du zoom)
473	Fonds de cartes	GeoSignal	raster_geosignal	RASTER1000k	WMS	metropole	http://wms.geosignal.fr/metropole	Carte routière géosignal au 1000000 eme (affichage en fonction du zoom)
474	Fonds de cartes	GeoSignal	raster_geosignal	RASTER5k	WMS	metropole	http://wms.geosignal.fr/metropole	Carte routière géosignal au 5000 eme (affichage en fonction du zoom)
475	Fonds de cartes	GeoSignal	raster_geosignal	RASTER4000k	WMS	metropole	http://wms.geosignal.fr/metropole	Carte routière géosignal au 4000000 eme (affichage en fonction du zoom)
476	pas utilise	Corinne Land cover 2006	corinne_land_cover	topp:CLC06_RGF	WMS	metropole	http://sd1878-2.sivit.org/geoserver/wms	occupation du sol corine land cover (pas utilisée car longue à l'affichage, il faudrait pouvoir utiliser un niveau de zoom à laquelle elle apparait)
477	Cours d'eau	Cours d'eau de plus de 100km	cours_eau_sandre	CoursEau1	WMS	metropole	http://services.sandre.eaufrance.fr/geo/zonage	Cours d'eau de plus de 100km
478	Cours d'eau	Cours d'eau de 50 à 100km	cours_eau_sandre	CoursEau2	WMS	metropole	http://services.sandre.eaufrance.fr/geo/zonage	Cours d'eau de 50 à 100km
479	Cours d'eau	Cours d'eau de 25 à 50km	cours_eau_sandre	CoursEau3	WMS	metropole	http://services.sandre.eaufrance.fr/geo/zonage	Cours d'eau de 25 à 50km
480	INPN	Reserves biologiques	inpn_reunion_1	Reserves_biologiques	WMS	reunion	http://ws.carmencarto.fr/WMS/119/reu_inpn	Limites des réserves biologiques
481	INPN	Parcs nationaux	inpn_reunion_2	Parcs_nationaux	WMS	reunion	http://ws.carmencarto.fr/WMS/119/reu_inpn	Limites des parcs nationaux
482	INPN	Terrains du Conservatoire du Littoral	inpn_reunion_3	Terrains_du_Conservatoire_du_Littoral	WMS	reunion	http://ws.carmencarto.fr/WMS/119/reu_inpn	Limites des terrains du conservatoire du littoral
483	INPN	Arretes de protection de biotope	inpn_reunion_4	Arretes_de_protection_de_biotope	WMS	reunion	http://ws.carmencarto.fr/WMS/119/reu_inpn	Limites des arrêtés de protection du biotope
484	INPN	Reserves naturelles nationales	inpn_reunion_5	Reserves_naturelles_nationales	WMS	reunion	http://ws.carmencarto.fr/WMS/119/reu_inpn	Limites des réserves naturelles
\.


--
-- Name: maplayers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: siflore
--

SELECT pg_catalog.setval('maplayers_id_seq', 484, true);


--
-- PostgreSQL database dump complete
--

