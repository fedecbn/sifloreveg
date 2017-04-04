var map, layer = new OpenLayers.Layer.WMS(), featurecollection, vector_layer,selectedFeature,selectFeaturesControl,ClusterStrategy;
//Unselect the feature when it's popup is closed
function onPopupClose(evt) {
    selectFeaturesControl.unselect(selectedFeature);
}


//When the feature is selected, it creates a popup div
function onFeatureSelect(feature){
    if(feature.cluster){
        map.setCenter(feature.geometry.getBounds().getCenterLonLat());
        map.zoomIn();
        map.zoomIn();
    }else{
        selectedFeature = feature;
        var popupContent = '';
        var idObj = '';
        if (feature.attributes.cd_sig) {
            popupContent = popupContent + "<b>Code Maille: </b>" + feature.attributes.cd_sig + "<br/>";
            idObj = feature.attributes.cd_sig;
            commentBtnText="Commenter cette maille";
        } else {
            idObj = feature.attributes.insee_comm;
            popupContent = popupContent + "<b>Insee: </b>" + feature.attributes.insee_comm + "<br/>";
            if(feature.attributes.nom_comm){
                popupContent = popupContent + "<b>Commune: </b>" + feature.attributes.nom_comm + "<br/>";
            }
            commentBtnText="Commenter cette commune";
        }
        popupContent = popupContent + "<b>Nom(s) du(des) syntaxon(s): </b><br/>" + feature.attributes.noms_taxon + "<br/>";
        popupContent = popupContent + "<b>Nb observations: </b>" + feature.attributes.nb_obs + "<br/>";
        popupContent = popupContent + "<b>Date de première obs.: </b>" + feature.attributes.date_premiere_obs + "<br/>";
        popupContent = popupContent + "<b>Date de dernière obs.: </b>" + feature.attributes.date_derniere_obs + "<br/>";
        popupContent = popupContent + "<b>Nb obs. date≥2000: </b>" + feature.attributes.nb_obs_2001_2013 + "<br/>";
        popupContent = popupContent + "<b>Nb obs. loc. avérée: </b>" + feature.attributes.nb_obs_averee + "<br/>";
        if (SelectedRegion=='metro') {
            popupContent = popupContent + "<div class='btn-group-vertical'>";
            if (typeof showComments == 'function') {
                var urlComments = '"query/commentaires_existants?cd_ref=' + SelectedTaxon + '&id_obj=' + idObj + '"';
                popupContent = popupContent + "<button class='btn btn-primary' onclick='showComments(" + urlComments + ",true)'>Voir les commentaires</button>";
                popupContent = popupContent + "<button class='btn btn-primary' onclick='setCommentValues(\"" + SelectedTaxon + "\",\""+SelectedTaxonName+"\",\""+idObj+"\",\"\",true)'>"+commentBtnText+"</button>";
            }
            var ObsParams = '"' + SelectedTaxon + '","' + idObj + '"';
            popupContent = popupContent + "<button class='btn btn-primary' onclick='showObservations(" + ObsParams + ")'>Voir les Observations</button>";
            popupContent = popupContent + "</div>";
        }
        popup = new OpenLayers.Popup.FramedCloud("Info",
            feature.geometry.getBounds().getCenterLonLat(),
            null, popupContent,
            null, true, onPopupClose);
        feature.popup = popup;
        map.addPopup(popup);
        $("#SyntheseGrid1 .success").removeClass('success');
        $("#SyntheseGrid1 .key:contains("+idObj+")").parent().addClass('success');
    }
}


//When the feature is unselected, it removes the popup
function onFeatureUnselect(feature) {
     clearMapPopup();
    selectedFeature=null;
}
function clearMapPopup() {
    if(selectedFeature){
        map.removePopup(selectedFeature.popup);
        $("#SyntheseGrid1 .success").removeClass('success');
    }
}

//Configuration of the map layer
var optionsMetro = {
// Projection
    projection: new OpenLayers.Projection("EPSG:2154"),
    displayProjection: new OpenLayers.Projection("EPSG:2154"),
    maxResolution: 'auto',
//Definition de la bounding box pour l'extension maximale (france metropole)
    maxExtent: new OpenLayers.Bounds(50000, 6000000, 1300000, 7200000),
    units:'m',	
//Definition des différents niveau d'echelle utilisables
    scales: [7000000, 5300000, 3000000, 1000000, 650000, 400000, 250000, 100000, 50000, 10000],
};
var optionsReun = {
// Projection
    projection: new OpenLayers.Projection("EPSG:2975"),
    displayProjection: new OpenLayers.Projection("EPSG:2975"),
    maxResolution: 'auto',
    units:'m',
    maxExtent: new OpenLayers.Bounds(297395, 7632671, 396546, 7692704),
    scales: [650000, 400000, 250000, 100000, 50000, 10000],
};
//Load Legend from the QGIS server
function LoadLegendSiFlore(url,LayerName) {//caution with the quotes in the LayerName
    $('#legendFondsCarte').append('<img class="fondLegend" lay="'+LayerName+'" src="'+url+'&LAYERS=' + encodeURI(LayerName) + '&TRANSPARENT=FALSE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&EXCEPTIONS=application%2Fvnd.ogc.se_xml&FORMAT=image%2Fpng&LEGEND_OPTIONS=forceLabels%3Aon&SCALE=800000000000"/>');
};
function RemoveLegendSiFlore(LayerName) {//caution with the quotes in the LayerName
    $('.fondLegend').each(function(){
        if($(this).attr('lay')==LayerName){
            $(this).remove();
        }
    });
};
//OPTIONS for the WMS layers
wmsOptions={isBaseLayer: true, visibility: true, hideInLegend: true,attribution: 'Sources: © FCBN 2016, Système d\'information national flore, fonge, végétation et habitats, <u>données du réseau des CBN en cours d\'intégration et de qualification nationale</u><br />\
© IGN 2013, BD CARTO - © SANDRE 2013, SIE - © Muséum national d\'Histoire naturelle 2013, Espaces protégés, TAXREF v7.0 - © GEOSIGNAL 2013, Carte routière'};//COPYRIGHT attribution


function LoadMap(zone) {
    $('#legendRendu *').remove();
    $('#legendFondsCarte *').remove();
    $('#MainTabs a[href="#map"]').tab('show');
    $('#MainTabs a[href="#Observations"]').addClass('hidden');
    switch (zone) {
        case 'metro':
            map = new OpenLayers.Map(optionsMetro);
            map.addLayer(layer);
            ChangeMap($('.MetropoleLayers .fondCartesOptions').first().prop('checked',true));
            //ici on ajoute deux couches cochées par défaut en plus (la 17- les territoires agréments des CBN- et la 18 -les départements)
            //ce serait bien de ne pas prendr eun index numérique car peut changer mais voir comment fonction has()?
            addOverlay($('.MetropoleLayers .overlayerSelector').eq(17).prop('checked',true));
            addOverlay($('.MetropoleLayers .overlayerSelector').eq(18).prop('checked',true));
            break;
        case'reun':
            map = new OpenLayers.Map(optionsReun);
            map.addLayer(layer);
            ChangeMap($('.ReunionLayers .fondCartesOptions').first().prop('checked',true));
            break;
    }
    //adding the map layer
    vector_layer = new OpenLayers.Layer.Vector();
    /*ClusterStrategy = new OpenLayers.Strategy.Cluster({distance: 20, threshold: 5});
    //OVERRIDE cluster funtion.
    ClusterStrategy.clusterDefault = ClusterStrategy.cluster;//copy of the original cluster function
    ClusterStrategy.cluster =  function (event){
        if((!event || event.zoomChanged)&&selectedFeature){
            selectFeaturesControl.unselect(selectedFeature);//unselecting all features before calling cluster function
        }
        ClusterStrategy.clusterDefault(event);
    };*/
    //vector_layer = new OpenLayers.Layer.Vector('',{strategies:[ClusterStrategy]});
    vector_layer = new OpenLayers.Layer.Vector();
    ChangeRendu();
    map.addLayer(vector_layer);
    selectFeaturesControl = new OpenLayers.Control.SelectFeature(vector_layer, {onSelect: onFeatureSelect, onUnselect: onFeatureUnselect});
    map.addControl(selectFeaturesControl);
    selectFeaturesControl.activate();
    map.zoomTo(1);
    map.render('map');
    scaleControl= new OpenLayers.Control.ScaleLine({bottomInUnits:'', maxWidth: 200}); 
    map.addControl(scaleControl);//Adding the scale control
    LoadLayer(SelectedTaxon, SelectedSyntheseOption, SelectedTaxonOption, SelectedRegion);
}

function DestroyMap() {
    map.destroy();
    layer.destroy();
    layer = new OpenLayers.Layer.WMS();
}


//Function to change the map base layer
function ChangeMap(option) {
    map.removeLayer(layer);
    RemoveLegendSiFlore(layer.name);
    RemoveLegendSiFlore(option.attr('layer'));
    layer=new OpenLayers.Layer.WMS
            (option.attr('layer'), option.attr('url'),
                    {'layers': option.attr('layer'), transparent: false, format: 'image/png'}, wmsOptions
            );
    map.addLayer(layer);
    LoadLegendSiFlore(option.attr('url'),option.attr('layer'));
}
//ADD/REMOVE OVERLAYING LAYERS
overlays = new Array(); //array containing the displayed layers that overlay the map
function addOverlay(overlayOption) {
    var NewLayer = new OpenLayers.Layer.WMS
                    (overlayOption.text(), overlayOption.attr('url'),
                            {'layers': [overlayOption.attr('layer')], transparent: true, format: 'image/png'},
                    {isBaseLayer: false, visibility: true,
                        alwaysInRange: false,
                        displayOutsideMaxExtent: true,
                    });
    overlays[overlayOption.attr('url') + overlayOption.attr('layer')] = NewLayer;
    map.addLayer(overlays[overlayOption.attr('url') + overlayOption.attr('layer')]);
    LoadLegendSiFlore(overlayOption.attr('url'),overlayOption.attr('layer'));
}
function removeOverlay(overlayOption) {
    map.removeLayer(overlays[overlayOption.attr('url') + overlayOption.attr('layer')]);
    RemoveLegendSiFlore(overlayOption.attr('layer'));
}


//ADD TAXONS LAYER
function LoadLayer(taxon, syntheseOpc, inferieurs, region) {
    selectFeaturesControl.unselectAll();
    vector_layer.removeAllFeatures();
    $('#MainTabs a[href="#map"]').tab('show');
    $('#MainTabs a[href="#Observations"]').addClass('hidden');
    if (taxon != '') {
        var synthese = '';
        var inf = '';
        $('#LegendSyntheseDesc span').remove();
        if (region == "metro") {
//Generating the service URL depending on the taxon and options selected
            switch (syntheseOpc) {
                case '1':
                    synthese = 'fr10';
                    $('#LegendSyntheseDesc').append('<span>Répartition Maille 10*10 INPN</span>');
                    break;
                case '2':
                    synthese = 'fr5';
                    $('#LegendSyntheseDesc').append('<span>Répartition Maille 5*5 INPN</span>');
                    break;
                case '3':
                    synthese = 'comm';
                    $('#LegendSyntheseDesc').append('<span>Répartition Communale</span>');
                    break;
            }
            if (inferieurs == 2) {
                inf = '_ss_inf';
            }
//Getting the data for the map features
            var url = "query/synthese_" + synthese + inf + "?cd_ref=" + taxon;
            var urlTaxon = "query/synthese_taxon_" + synthese + inf + "?cd_ref=" + taxon;
            var urlInfo = "query/information_taxons"+ inf +"?cd_ref=" + taxon;
            var urlInfoTaxa = "query/information_taxa_taxons"+ inf +"?cd_ref=" + taxon;
        } else {
            switch (syntheseOpc) {
                case '1':
                    synthese = 'utm10';
                    $('#LegendSyntheseDesc').append('<span>Répartition Maille 10*10 INPN</span>');
                    break;
                case '2':
                    synthese = 'utm1';
                    $('#LegendSyntheseDesc').append('<span>Répartition Maille 1*1 INPN</span>');
                    break;
                case '3':
                    synthese = 'comm_reunion';
                    $('#LegendSyntheseDesc').append('<span>Répartition Communale</span>');
                    break;
            }
            if (inferieurs == 2) {
                inf = '_ss_inf';
            }
            var url = "query/synthese_" + synthese + inf + "?cd_ref=" + taxon;
            var urlTaxon = "query/synthese_taxon_utm" + inf + "?cd_ref=" + taxon;
            var urlInfo = "query/information_taxons"+ inf +"?cd_ref=" + taxon;
            var urlInfoTaxa = "query/information_taxa_taxons"+ inf +"?cd_ref=" + taxon;
        }
        var urlComments = "query/commentaires_existants?cd_ref=" + taxon;
        $.ajax({
            url: url,
            dataType: "json",
        }).done(function(data) {
            /*if (synthese == 'comm'||synthese == 'comm_reunion') {
                ClusterStrategy.activate();
            }else{
                ClusterStrategy.deactivate();
            }*/
            if(data.type=='error'){
                alert(data.msg);
            }else{
                featurecollection = data;
                var geojson_format = new OpenLayers.Format.GeoJSON();
                vector_layer.addFeatures(geojson_format.read(featurecollection));
            }
        });
        $.ajax({
            url: url+'&pag=1',
            dataType: "json",
        }).done(function(data) {
            if(data.type!='error'){
                featurecollection = data;
                if (synthese == 'comm'||synthese == 'comm_reunion') {
                    fillgridComm(featurecollection,url);
                } else {
                    fillgridMaille(featurecollection,url);
                }
            }else{
                $('#SyntheseGridCont1 *').remove();
                $('#SyntheseGridCont2 *').remove();
                $('#SyntheseGridCont3 *').remove();
                $('#SyntheseGridCont4 *').remove();
            }
        });
        //Getting the data for the taxons datagrid

        $.ajax({
            url: urlTaxon,
            dataType: "json",
        }).done(function(data) {
            if(data.type!='error'){
                datacollection = data;
                fillgridTaxon(datacollection);
            }
        });
        if (typeof showComments == 'function') {
            showComments(urlComments, false);
        }


        //Getting the data for the taxons information datagrid

        $.ajax({
            url: urlInfo,
            dataType: "json",
        }).done(function(data) {
            if(data.type!='error'){
                datacollection = data;
                fillgridInfo(datacollection);
            }
        });
        if (typeof showComments == 'function') {
            showComments(urlComments, false);
        }

        //Getting the data for the taxons taxa information datagrid

        $.ajax({
            url: urlInfoTaxa,
            dataType: "json",
        }).done(function(data) {
            if(data.type!='error'){
                datacollection = data;
                fillgridInfoTaxa(datacollection);
            }
        });
        if (typeof showComments == 'function') {
            showComments(urlComments, false);
        }


        //Load Taxon Image
        var linksUrl = '/query/photolinks/' + taxon;
        $.ajax({
            url     : linksUrl,
            type    : "GET",
            dataType: "json",
            success : function(data) {
                if (!data.imgs.length || data.type == 'error') {
                    $('#photo .panel-body').text('');
                    $('#photo').addClass('hidden');
                } else {
                    $('#photo').removeClass('hidden');
                    $('#photo .panel-body').html('');
                    for (i in data.imgs) {
                        var img = '<img class="img-rounded" src="/query/photo/' + data.imgs[i] + '" />';
                        $('#photo .panel-body').append(img);
                    }
                }
            }
        });
    }
}


function ChangeRendu() {
    $('#renduLegend').remove();
    switch ($('input[name=RenduOptions]:checked', '#RenduSelectionForm').attr('value')) {
        case '1':
            vector_layer.styleMap = StyleMap_maille;
            $('#legendRendu').append("<div id='renduLegend'><div class='renduLegendSquare' style='background:#419F2E; border-color:#419F2E;'></div>Localisation Avérée <div class='clearfix'></div><div class='renduLegendSquare' style='background:#A3E096; border-color:#8ABF7E'></div>Localisation Interprétée</div>");
            break;
        case '2':
            vector_layer.styleMap = StyleMap_maille2;
            $('#legendRendu').append("<div id='renduLegend'><div class='renduLegendSquare' style='background:#F6E497; border-color:#F6E497;'></div>Moins de 5 observations<div class='clearfix'></div><div id='renduLegend'><div class='renduLegendSquare' style='background:#BF8718; border-color:#BF8718'></div>Entre 5 et 9 observations<div class='clearfix'></div><div id='renduLegend'><div class='renduLegendSquare' style='background:#996A0C; border-color:#996A0C'></div>Entre 10 et 24 observations<div id='renduLegend'><div class='renduLegendSquare' style='background:#9C5129; border-color:#9C5129;'></div>Entre 25 et 99 observations<div class='clearfix'></div><div id='renduLegend'><div class='renduLegendSquare' style='background:#6C2A29; border-color:#6C2A29'></div>Plus de 100 observations");
            break;
        case '3':
            if(typeof renduRangeTax == 'function'){
                renduRangeTax();
            }
            break;
        case '4':
            vector_layer.styleMap = StyleMap_maille4;
            $('#legendRendu').append("<div id='renduLegend'><div class='renduLegendSquare' style='background:#3F056B; border-color:#3F056B;'></div>date≥2000<div class='clearfix'></div><div class='renduLegendSquare' style='background:#9F44E5; border-color:#9F44E5;'></div>1950≤date<2000<div class='clearfix'></div><div class='renduLegendSquare' style='background:#DCB7F7; border-color:#B699CC;'></div>date<1950");
            break;
    }
    vector_layer.redraw(true);
}


//Observations ----------------------------------------------------------------------
function notNullCell(content) {
    if (content) {
        return '<td>' + content + '</td>';
    } else {
        return '<td></td>';
    }
}
function showObservations(taxon,object) {
    var url = 'query/observation';
    switch (SelectedSyntheseOption) {
        case '1':
            url = url + '_fr10';
            break;
        case '2':
            url = url + '_fr5';
            break;
        case '3':
            url = url + '_comm';
            break;
    }
    if (SelectedTaxonOption == 2) {
        url = url + '_ss_inf';
    }
    url = url + "?cd_ref="+taxon+"&id_obj="+object;
    $.ajax({
        url: url,
        dataType: "json",
    }).done(function(data) {
        fillgridObserv(data,taxon,object);/*
        if (SelectedSyntheseOption == 1 || SelectedSyntheseOption == 2) {
            fillgridObservMaille(data,taxon,object);
        } else {
            fillgridObservCommune(data,taxon,object);
        }*/
        $('#MainTabs a[href="#Observations"]').tab('show');
        $('#MainTabs a[href="#Observations"]').removeClass('hidden');
    });
}

//-----------------------------------------------------------------------------------

