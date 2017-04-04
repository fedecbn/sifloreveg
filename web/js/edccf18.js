//LAYERS STYLE RULES-------------------------------------------------------
//Création du style objet selectionné	
var StyleSelected = new OpenLayers.Style({
    'strokeColor': '#F90000',
    'strokeWidth': 4,
    'strokeOpacity': 0.8,
    'fillOpacity': 0.80,
//'fillColor': '#aa0000',
    'pointRadius': 7
});
//Style of the Cluster Objects
var rule_cluster = new OpenLayers.Rule({
    name: 'Cluster',
    elseFilter:true,
});
//Création de la règle pour rendu 1, cas ou il y a au moins une observation avérée
var rule_averee_high = new OpenLayers.Rule({
    name: 'Localisation Avérée',
    filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
        property: 'nb_obs_averee',
        value: 1
    }),
    symbolizer: {
        fillColor: '#419F2E',
        strokeColor: '#419F2E',
//pointRadius: 12
    }
});
//Création de la règle pour rendu 1, cas ou il n'y pas d'observation avérée
var rule_averee_low = new OpenLayers.Rule({
    name: 'Localisation Interprétée',
    filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.LESS_THAN,
        property: 'nb_obs_averee',
        value: 1
    }),
    symbolizer: {
        fillColor: '#A3E096',
        strokeColor: '#8ABF7E',
//pointRadius: 8
    }
});
//Création de la règle pour rendu 2, cas ou il y a moins de 5 observations
var rule_obs_1 = new OpenLayers.Rule({
    name: 'Moins de 5 observations',
    filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.LESS_THAN,
        property: 'nb_obs',
        value: 5
    }),
    symbolizer: {
//fillColor: '#C79F4B',
        fillColor: '#F6E497',
        strokeColor: '#F6E497',
//pointRadius: 12
    }
});

//Création de la règle pour rendu 2, cas ou il a plus de 10 observations
var rule_obs_2 = new OpenLayers.Rule({
    name: 'Entre 5 et 9 observations',
    filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
        property: 'nb_obs',
        value: 5
    }),
    symbolizer: {
//fillColor: '#A67E2E',
        fillColor: '#BF8718',
        strokeColor: '#BF8718',
//pointRadius: 12
    }

});


//Création de la règle pour rendu 2, cas ou il y a plus de 10 observations
var rule_obs_3 = new OpenLayers.Rule({
    name: 'Entre 10 et 24 observations',
    filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
        property: 'nb_obs',
        value: 10
    }),
    symbolizer: {
//fillColor: '#663E10',
        fillColor:'#996A0C',
        strokeColor: '#996A0C',
//pointRadius: 12
    }
});

//Création de la règle pour rendu 2, cas ou il y a plus de 25 observations
var rule_obs_4 = new OpenLayers.Rule({
    name: 'Entre 25 et 99 observations',
    filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
        property: 'nb_obs',
        value: 25
    }),
    symbolizer: {
//fillColor: '#663E10',
        fillColor:'#9C5129',
        strokeColor:'#9C5129',
//pointRadius: 12
    }
});

//Création de la règle pour rendu 2, cas ou il y a plus de 100 observations
var rule_obs_5 = new OpenLayers.Rule({
    name: 'Plus de 100  observations',
    filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
        property: 'nb_obs',
        value: 100
    }),
    symbolizer: {
//fillColor: '#663E10',
        fillColor:'#6C2A29',
        strokeColor:'#6C2A29',
//pointRadius: 12
    }
});


//Création de la règle pour rendu 4, cas ou il y a uniquement des obs inférieure à 1950
var rule_date_1 = new OpenLayers.Rule({
    name: "date<1950",
    filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.LESS_THAN,
        property: 'date_derniere_obs',
        value: '1950-01-01'
    }),
    symbolizer: {
        fillColor: '#DCB7F7',
        strokeColor: '#B699CC',
//pointRadius: 12
    }
});
//Création de la règle pour rendu 4, cas ou il y a uniquement des obs inférieure entre 1950 et 2000
var rule_date_2 = new OpenLayers.Rule({
    name: "1950≤date<2000",
    filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.LESS_THAN,
        property: 'date_derniere_obs',
        value: '2000-01-01'
    }),
    symbolizer: {
        fillColor: '#9F44E5',
        strokeColor: '#9F44E5',
//pointRadius: 12
    }
});
//Création de la règle pour rendu 4, cas ou il y a des obs supérieure et 2000
var rule_date_3 = new OpenLayers.Rule({
    name: "date≥2000",
    filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
        property: 'date_derniere_obs',
        value: '2000-01-01'
    }),
    symbolizer: {
        fillColor: '#3F056B',
        strokeColor: '#3F056B',
//pointRadius: 12
    }
});
//Création du style par defaut (localisation avérée(vert)/interprétée(orange)
var Style_maille = new OpenLayers.Style({
//'strokeColor': '#419F2E',
    pointRadius: "${radius}",
    fillColor: "#ffcc66",
    fillOpacity: 0.8,
    strokeColor: "#cc6633",
    strokeWidth: 2,
    strokeOpacity: 0.8
}, {
    context: {
        radius: function(feature) {
            return Math.min(feature.attributes.count, 7) + 3;
        }
    }
});
//Création du style nombre d'observation
var Style_maille2 = new OpenLayers.Style({
    pointRadius: "${radius}",
    fillColor: "#ffcc66",
    fillOpacity: 0.8,
    strokeColor: "#cc6633",
    strokeWidth: 2,
    strokeOpacity: 0.8
}, {
    context: {
        radius: function(feature) {
            return Math.min(feature.attributes.count, 7) + 3;
        }
    }
});
//Création du style rang taxonomique
var Style_maille3 = new OpenLayers.Style({
    pointRadius: "${radius}",
    fillColor: "#ffcc66",
    fillOpacity: 0.8,
    strokeColor: "#cc6633",
    strokeWidth: 2,
    strokeOpacity: 0.8
}, {
    context: {
        radius: function(feature) {
            return Math.min(feature.attributes.count, 7) + 3;
        }
    }
});
//Création du style pour date
var Style_maille4 = new OpenLayers.Style({
    pointRadius: "${radius}",
    fillColor: "#ffcc66",
    fillOpacity: 0.8,
    strokeColor: "#cc6633",
    strokeWidth: 2,
    strokeOpacity: 0.8
}, {
    context: {
        radius: function(feature) {
            return Math.min(feature.attributes.count, 7) + 3;
        }
    }
});
//Attribution des règles aux styles
Style_maille.addRules([rule_averee_high, rule_averee_low, rule_cluster]);
Style_maille2.addRules([rule_obs_1, rule_obs_2, rule_obs_3,rule_obs_4, rule_obs_5, rule_cluster]);
Style_maille4.addRules([rule_date_3, rule_date_2, rule_date_1, rule_cluster]);
//Création du style de la carte pour rendu par défaut
var StyleMap_maille = new OpenLayers.StyleMap({
    'default': Style_maille,
    'select': StyleSelected
});
//Création du style de la carte pour rendu nb observations
var StyleMap_maille2 = new OpenLayers.StyleMap({
    'default': Style_maille2,
    'select': StyleSelected
});
//Création du style de la carte pour rendu date
var StyleMap_maille4 = new OpenLayers.StyleMap({
    'default': Style_maille4,
    'select': StyleSelected
});
//--------------------------------------------------------------------------------

var SelectedTaxon = PageStatusTaxon;
var SelectedTaxonName = '';
var SelectedTaxonOption = PageStatusTaxonOption;
var SelectedSyntheseOption = PageStatusSyntheseOption;
var SelectedRegion = PageStatusRegion;
var BaseTitle = document.title;
var partialQueryEnabled=true;
var datosQuery;
function updateUrl(taxon,syntheseopt,taxonopt,region){
    params="?cd_ref="+taxon+"&r="+region;
    if (taxonopt!=1){
        params=params+"&to="+taxonopt
    }
    if(syntheseopt!=1){
        params=params+"&so="+syntheseopt
    }
    if(!ieDis9){
        history.pushState({taxon:taxon,region:region,taxonopt:taxonopt,syntheseopt:syntheseopt}, "", params);
    }else{
        window.location=BaseUrl+params;
    }
}
window.onpopstate = function (event) {
  if (event.state) {
    SelectedTaxon=event.state.taxon;
    SelectedSyntheseOption=event.state.syntheseopt;
    SelectedTaxonOption=event.state.taxonopt;
    changeRegion(event.state.region);
    $('#TaxonSelect option[value=' + event.state.taxon + ']').prop('selected', true);
    SelectedTaxonName=$('#TaxonSelect option:selected').text();
    //$("#TaxonSelect").trigger("chosen:updated");
    $('input[name=SyntheseOptions][value='+SelectedSyntheseOption+']').prop('checked', 'checked');
    $('input[name=TaxonOptions][value='+SelectedTaxonOption+']').prop('checked', 'checked');
    setCommentValues(SelectedTaxon,SelectedTaxonName,'','',false);
    setReleveValues(SelectedTaxon,SelectedTaxonName,'','',false);
  }
}


//Function that updates the taxons list, depending on the filters
function taxonsListUpdate() {
    var type = $("#TaxonsGroup option:selected").attr("value");
    var rang = $("#TaxonsRangs option:selected").attr("value");
    //$("#TaxonSelect").trigger("chosen:updated");
    var url = "query/taxons?rang=" + rang + "&type=" + type;
    $.ajax({
        url: url,
    }).done(function(data) {
        $("#TaxonSelect option").remove();
        var jsonobject=jQuery.parseJSON(data);
        $.each(jsonobject.results,function(key, value){
            $("#TaxonSelect").append(new Option(value.text, value.id));
        });
    });
         /*$('#TaxonSelect option[value="' + SelectedTaxon + '"]').prop('selected', true);
         SelectedTaxonName=$('#TaxonSelect option:selected').text();
         setCommentValues(SelectedTaxon,SelectedTaxonName,'','',false);
         setReleveValues(SelectedTaxon,SelectedTaxonName,'','',false);
         //$("#TaxonSelect").trigger("chosen:updated");
    });*/
}


function SendTaxonSelectionForm(){ 
    SelectedTaxon=$("#TaxonSelect").select2('data').id;
    SelectedTaxonName=$("#TaxonSelect").select2('data').text;
    SelectedSyntheseOption=$('input[name=SyntheseOptions]:checked', '#TaxonSelectionForm').attr('value');
    if($('#TaxonOptions1').length!==0){
        SelectedTaxonOption=$('input[name=TaxonOptions]:checked', '#TaxonSelectionForm').attr('value');
    }
    updateUrl(SelectedTaxon,SelectedSyntheseOption, SelectedTaxonOption,SelectedRegion);
    LoadLayer(SelectedTaxon,SelectedSyntheseOption, SelectedTaxonOption, SelectedRegion);
    PageStatusTaxon = '';
    setCommentValues(SelectedTaxon,SelectedTaxonName,'','',false);
    setReleveValues(SelectedTaxon,SelectedTaxonName,'','',false);
}
function setCommentValues(CommentTaxon,CommentTaxonName,CommentCodeObject,CommentCodeObs,goTo){
    $('#inputCodRef').val(SelectedTaxon);
    $('#inputNomTaxon').val(SelectedTaxonName);
    $('#inputCodeObject').val(CommentCodeObject);
    $('#inputCodeObs').val(CommentCodeObs);
    if(goTo){
        $('#MainTabs a[href="#newcomment"]').tab('show');
    }
}
function setReleveValues(CommentTaxon,CommentTaxonName,CommentCodeObject,CommentCodeObs,goTo){
    $('#inputCodRef').val(SelectedTaxon);
    $('#inputNomTaxon').val(SelectedTaxonName);
    $('#inputCodeObject').val(CommentCodeObject);
    $('#inputCodeObs').val(CommentCodeObs);
    if(goTo){
        $('#MainTabs a[href="#newreleve"]').tab('show');
    }
}

function ToggleLayersMenu(region){
    switch(region){
        case 'metro':
            $('.MetropoleLayers').removeClass('hidden');
            $('.ReunionLayers').addClass('hidden');
            $('.ReunionLayers .overlayerSelector').prop('checked', false);
            $('.ReunionLayers .fondCartesOptions').first().prop('checked',true);
//            $('.overlayerSelector[layer=Départements]').prop('checked', true).trigger('change');
            $('#alternateMaille').text("Synthèse maille 5km");
        break;
        case 'reun':
            $('.ReunionLayers').removeClass('hidden');
            $('.MetropoleLayers').addClass('hidden');
            $('.MetropoleLayers .overlayerSelector').prop('checked', false);
            $('.MetropoleLayers .fondCartesOptions').first().prop('checked',true);
            $('#alternateMaille').text("Synthèse maille 1km");
        break;
    }
}
function changeRegion(region){
    $('#RegionSelectionList>li').removeClass('active');
    $('#RegionSelectionList>li>a[href="'+region+'"]').parent().addClass('active');
    SelectedRegion=region;
    ToggleLayersMenu(region);
    DestroyMap();
    LoadMap(region);
}
function partialTaxonList(){
    if(SelectedTaxon){
        $("#TaxonSelect").attr('value',' ');
    }
    $("#TaxonSelect").select2({
        ajax: {
            url: "query/taxons",
            dataType: 'json',
            quietMillis: 300,
            params: {
                global: false,//Prevents firing the ajax events
            },
            data: function (term, page) {
                return {
                    q: term, //search term
                    page:page,
                    limit:10,
                    rang: $("#TaxonsRangs option:selected").attr("value"),
                    type: $("#TaxonsGroup option:selected").attr("value")
                };
            },
            results: function (data,page) {
                var more = (page * 10) < data.rowcount;
                return {results: data.results,more:more}
            },
            formatResult:    function (results) {return results;},
            formatSelection: function (results) {
                return results.text;
            }
        },
        escapeMarkup: function (m) { return m; },
        initSelection: function(element, callback) {
            $.ajax("query/taxons?id="+SelectedTaxon+"&page=1&limit=1", {
                dataType: "json"
            }).done(function(data) {
                SelectedTaxonName=data.results[0].text;
                callback(data.results[0]);
            });
        }
    });   
}
$(document).ready(function() {
    if(!ieDis9){
        updateUrl(SelectedTaxon, SelectedSyntheseOption, SelectedTaxonOption, SelectedRegion);
    }
    $('input[name=SyntheseOptions][value='+SelectedSyntheseOption+']').prop('checked', 'checked');
    $('input[name=TaxonOptions][value='+SelectedTaxonOption+']').prop('checked', 'checked');
    $("#TaxonsGroup").select2();
    $("#TaxonsRangs").select2();
    partialTaxonList();
    /*$('#FullTaxonListButton').click(function(){
        if(partialQueryEnabled){
            $('#FullTaxonListButton').addClass('btn-success');
            partialQueryEnabled=false;
            $("#TaxonSelect").select2("destroy");
            $("#TaxonSelect").replaceWith("<select data-placeholder='Choisir un syntaxon' id='TaxonSelect' class='LeftSelectInput' value=' '><option></option></select>");
            $("#TaxonSelect").select2();
            taxonsListUpdate();
            $("#TaxonsGroup").on('change', function(e) {
                taxonsListUpdate();
            });
            $("#TaxonsRangs").on('change', function(e) {
                taxonsListUpdate();
            });
        }else{
            $('#FullTaxonListButton').removeClass('btn-success');
            partialQueryEnabled=true;
            $("#TaxonSelect").select2("destroy");
            $("#TaxonSelect").replaceWith("<input data-placeholder='Choisir un syntaxon' type=hidden id='TaxonSelect' class='LeftSelectInput' value=' '/>");
            $("#TaxonsGroup").unbind("change");
            $("#TaxonsRangs").unbind("change");
            partialTaxonList();
        }
    });*/
    $('#RegionSelectionList>li>a[href="'+SelectedRegion+'"]').parent().addClass('active');

    $('.fondCartesMenu input').on('change',function(e){
        if($(this).prop("checked", true)){
            ChangeMap($(this));
        }
    });
    $('.overlayerSelector').on('change',function(e){
        if($(this).prop("checked")== true){
            addOverlay($(this));
        }else{
            removeOverlay($(this));
        }
    });
    /*$('#Region').on('change',function(e){
        changeRegion($("#Region option:selected").attr("value"));
        updateUrl(SelectedTaxon,SelectedRegion);
    });*/
    $('#RegionSelectionList>li>a').click(function(e){
        e.preventDefault();
        changeRegion($(this).attr("href"));
        updateUrl(SelectedTaxon, SelectedSyntheseOption, SelectedTaxonOption,SelectedRegion);
    });
    //taxonsListUpdate();
    ToggleLayersMenu(SelectedRegion);
    LoadMap(SelectedRegion);
});

$body = $("body");
ajaxCallCount=0;
    $(document).on({
        ajaxStart: function() { 
            if(!ieDis8 && SelectedTaxon!=''){
                $body.addClass("loading"); //Show the loading modal
            }
            ajaxCallCount=ajaxCallCount+1;
        },
        ajaxStop: function() { 
            ajaxCallCount=ajaxCallCount-1;
            if (ajaxCallCount==0){
                $body.removeClass("loading"); //Hide the loading modal
                document.title=BaseTitle +' - '+ SelectedTaxonName;//Append taxon name to the document title
        }
    }
});



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


//Getting the maille data from the map layer object and inserting it into it's section as a table
var taxonurl, page, ordField = '', ordDir = '';
fnInitSave = jQuery.fn.dataTableExt.oPagination.two_button.fnInit;
jQuery.fn.dataTableExt.oPagination.two_button.fnInit = function(oSettings, nPaging, fnCallbackDraw) {
    var oLang = oSettings.oLanguage.oPaginate;
    var oClasses = oSettings.oClasses;
    var fnClickHandler = function(e) {
        if (oSettings.oApi._fnPageChange(oSettings, e.data.action))
        {
            fnCallbackDraw(oSettings);
        }
    };
// Disabled for IE
    var sAppend = (!oSettings.bJUI) ?
            '<a class="' + oSettings.oClasses.sPagePrevDisabled + '" tabindex="' + oSettings.iTabIndex + '" role="button"><i class="glyphicon glyphicon-chevron-left"></i>' + oLang.sPrevious + '</a>' +
            '<a class="' + oSettings.oClasses.sPageNextDisabled + '" tabindex="' + oSettings.iTabIndex + '" role="button">' + oLang.sNext + '<i class="glyphicon glyphicon-chevron-right"></i></a>'
            :
            '<a class="' + oSettings.oClasses.sPagePrevDisabled + '" tabindex="' + oSettings.iTabIndex + '" role="button"><span class="' + oSettings.oClasses.sPageJUIPrev + '"></span></a>' +
            '<a class="' + oSettings.oClasses.sPageNextDisabled + '" tabindex="' + oSettings.iTabIndex + '" role="button"><span class="' + oSettings.oClasses.sPageJUINext + '"></span></a>';
    $(nPaging).append(sAppend);

    var els = $('a', nPaging);
    var nPrevious = els[0],
            nNext = els[1];

    oSettings.oApi._fnBindAction(nPrevious, {action: "previous"}, fnClickHandler);
    oSettings.oApi._fnBindAction(nNext, {action: "next"}, fnClickHandler);

    /* ID the first elements only */
    if (!oSettings.aanFeatures.p)
    {
        nPaging.id = oSettings.sTableId + '_paginate';
        nPrevious.id = oSettings.sTableId + '_previous';
        nNext.id = oSettings.sTableId + '_next';

        nPrevious.setAttribute('aria-controls', oSettings.sTableId);
        nNext.setAttribute('aria-controls', oSettings.sTableId);
    }
};
function tableMaille(datacollection) {
    $('#SyntheseGridCont1 *').remove();
    var msg = '<table id="SyntheseGrid1" class="table table-hover table-condensed"><thead><tr>';
    for (i = 0; i < datacollection["cols"].length; i++) {
        /* The field_name is taken if no label is specified */
        var label = datacollection["cols"][i]["label"] ? datacollection["cols"][i]["label"] : datacollection["cols"][i]["field_name"].replace(/_/, ' ');
        if (datacollection["cols"][i]["header_classes"])
            classes = datacollection["cols"][i]["header_classes"];
        else
            classes = '';
        msg += '<th class="' 
                + classes
                + '"><a href="'
                + datacollection["cols"][i]["field_name"]+'">'
                + label;
        +'</a></th>';
    }
    msg += '</tr></thead><tbody>';
    for (var i = 0; i < datacollection["rows"].length; i++) {
        msg = msg + '<tr>'; //open row
        for (var j = 0; j < datacollection["cols"].length; j++) {
            if (datacollection["cols"][j]["body_classes"])
                classes = datacollection["cols"][j]["body_classes"];
            else
                classes = '';
            msg = msg + '<td class="' + classes + '">' + notNull(datacollection["rows"][i][datacollection["cols"][j]["field_name"]]) + '</td>';
        }
        msg = msg + '</tr>'; //close row
    }
    msg = msg + '</tbody></table>';
    msg = msg + '<div id="synthesePageControls"></div>';
    $('#SyntheseGridCont1').append(msg);
    if (page != 1) {
        $('#synthesePageControls').append('<a href="#" class="paginate_enabled_previous" id="synthesePrev"><i class="glyphicon glyphicon-chevron-left"></i>Précédent</a>');
        $('#synthesePrev').click(function() {
            page -= 1;
            pagegridMaille(page, ordField, ordDir);
            return(false);
        });
    } else {
        $('#synthesePageControls').append('<a href="#" class="paginate_disabled_previous" id="synthesePrev"><i class="glyphicon glyphicon-chevron-left"></i>Précédent</a>');
        $('#synthesePrev').click(function() {
            return(false);
        });
    }
    if (datacollection.count>10) {
        $('#synthesePageControls').append('<a href="#" class="paginate_enabled_next" id="syntheseNext">Suivant<i class="glyphicon glyphicon-chevron-right"></i></a>');
        $('#syntheseNext').click(function() {
            page += 1;
            pagegridMaille(page, ordField, ordDir);
            return(false);
        });
    } else {
        $('#synthesePageControls').append('<a href="#" class="paginate_disabled_next" id="syntheseNext">Suivant<i class="glyphicon glyphicon-chevron-right"></i></a>');
        $('#syntheseNext').click(function() {
            return(false);
        });
    }
    $("#SyntheseGrid1 tbody tr").click(function() {
        if ($('#Observations').hasClass('active')) {
            $('#MainTabs a[href="#map"]').tab('show');
        }
        var key = $(this).children('.key').text();
        var feat = vector_layer.getFeaturesByAttribute('cd_sig', key)[0];
        if (!feat) {
            map.zoomTo(5);
            feat = vector_layer.getFeaturesByAttribute('cd_sig', key)[0];
        }
        selectFeaturesControl.unselectAll();
        selectFeaturesControl.select(feat);
    });
    $('#SyntheseGrid1 th>a').click(function() {
        if (ordDir == 'desc') {
            ordDir = '';
        } else {
            ordDir = 'desc';
        }
        ordField = $(this).attr('href');
        pagegridMaille(page, ordField, ordDir);
        return false;
    });
}
function tableCommune(datacollection) {
    $('#SyntheseGridCont1 *').remove();
    var msg = '<table id="SyntheseGrid1" class="table table-hover table-condensed"><thead><tr>';
    for (i = 0; i < datacollection["cols"].length; i++) {
        /* The field_name is taken if no label is specified */
        var label = datacollection["cols"][i]["label"] ? datacollection["cols"][i]["label"] : datacollection["cols"][i]["field_name"].replace(/_/, ' ');
        if (datacollection["cols"][i]["header_classes"])
            classes = datacollection["cols"][i]["header_classes"];
        else
            classes = '';
        msg += '<th class="' 
                + classes
                + '"><a href="'
                + datacollection["cols"][i]["field_name"]+'">'
                + label;
        +'</a></th>';
    }
    msg += '</tr></thead><tbody>';
    for (var i = 0; i < datacollection["rows"].length; i++) {
        msg = msg + '<tr>'; //open row
        for (var j = 0; j < datacollection["cols"].length; j++) {
            if (datacollection["cols"][j]["body_classes"])
                classes = datacollection["cols"][j]["body_classes"];
            else
                classes = '';
            msg = msg + '<td class="' + classes + '">' + notNull(datacollection["rows"][i][datacollection["cols"][j]["field_name"]]) + '</td>';
        }
        msg = msg + '</tr>'; //close row
    }
    msg = msg + '</tbody></table>';
    msg = msg + '<div id="synthesePageControls"></div>';
    $('#SyntheseGridCont1').append(msg);

if (page != 1) {
        $('#synthesePageControls').append('<a href="#" class="paginate_enabled_previous" id="synthesePrev"><i class="glyphicon glyphicon-chevron-left"></i>Précédent</a>');
        $('#synthesePrev').click(function() {
            page -= 1;
            pagegridMaille(page, ordField, ordDir);
            return(false);
        });
    } else {
        $('#synthesePageControls').append('<a href="#" class="paginate_disabled_previous" id="synthesePrev"><i class="glyphicon glyphicon-chevron-left"></i>Précédent</a>');
        $('#synthesePrev').click(function() {
            return(false);
        });
    }
    if (datacollection.count>10) {
        $('#synthesePageControls').append('<a href="#" class="paginate_enabled_next" id="syntheseNext">Suivant<i class="glyphicon glyphicon-chevron-right"></i></a>');
        $('#syntheseNext').click(function() {
            page += 1;
            pagegridMaille(page, ordField, ordDir);
            return(false);
        });
    } else {
        $('#synthesePageControls').append('<a href="#" class="paginate_disabled_next" id="syntheseNext">Suivant<i class="glyphicon glyphicon-chevron-right"></i></a>');
        $('#syntheseNext').click(function() {
            return(false);
        });
    }
    $("#SyntheseGrid1 tbody tr").click(function() {
        if ($('#Observations').hasClass('active')) {
            $('#MainTabs a[href="#map"]').tab('show');
        }
        var key = $(this).children('.key').text();
        var feat = vector_layer.getFeaturesByAttribute('insee_comm', key)[0];
        if (!feat) {
            map.zoomTo(5);
            feat = vector_layer.getFeaturesByAttribute('insee_comm', key)[0];
        }
        selectFeaturesControl.unselectAll();
        selectFeaturesControl.select(feat);
    });
    $('#SyntheseGrid1 th>a').click(function() {
        if (ordDir == 'desc') {
            ordDir = '';
        } else {
            ordDir = 'desc';
        }
        ordField = $(this).attr('href');
        pagegridComm(page, ordField, ordDir);
        return false;
    });
}
function fillgridMaille(featurecollection, url) {
    page = 1;
    ordField = '';
    ordDir = '';
    taxonurl = url;
    $('a[href="#SyntheseGridCont1"]').text("Synthèse par maille");
    tableMaille(featurecollection);
    $('#SyntheseGrid1').dataTable({
     "bPaginate": false,
     "bLengthChange": true,
     "bFilter": false,
     "bSort": true,
     "bInfo": false,
     "bAutoWidth": true
     });
}
function pagegridMaille(page, orderField, orderDir) {
    $.ajax({
        url: taxonurl + '&pag=' + page + '&ordfield=' + orderField + '&ordDir=' + orderDir,
        dataType: "json",
    }).done(function(data) {
        featurecollection = data;
        tableMaille(featurecollection);
        if (selectedFeature) {
            $("#SyntheseGrid1 .key:contains(" + selectedFeature.attributes.cd_sig + ")").parent().addClass('success');
        }
    });
}
function fillgridComm(featurecollection, url) {
    page = 1;
    ordField = '';
    ordDir = '';
    taxonurl = url;
    $('a[href="#SyntheseGridCont1"]').text("Synthèse par commune");
    tableCommune(featurecollection);
    /*$('#SyntheseGrid1').dataTable({
     "bPaginate": false,
     "bLengthChange": true,
     "bFilter": false,
     "bSort": true,
     "bInfo": false,
     "bAutoWidth": true
     });*/
}

function pagegridComm(page, orderField, orderDir) {
    $.ajax({
        url: taxonurl + '&pag=' + page + '&ordfield=' + orderField + '&ordDir=' + orderDir,
        dataType: "json",
    }).done(function(data) {
        featurecollection = data;
        tableCommune(featurecollection);
        if (selectedFeature) {
            $("#SyntheseGrid1 .key:contains(" + selectedFeature.attributes.insee_comm + ")").parent().addClass('success');
        }
    });
}

//Getting the data from the json object and inserting it into it's section as a table
function fillgridTaxon(datacollection) {
    $('#SyntheseGridCont2 *').remove();
    var msg = '<table id="SyntheseGrid2" class="table table-hover table-condensed"><thead><tr>';
    msg = msg + preparetable(datacollection);
    msg = msg + '<div id="synthesePageControls"></div>';
    $('#SyntheseGridCont2').append(msg);
    $('#SyntheseGrid2').dataTable({
        "bPaginate": false,
        "bLengthChange": true,
        "bFilter": false,
        "bSort": true,
        "bInfo": false,
        "bAutoWidth": true
    });
}
var ObsRef, ObsObj;

//Getting the informations for a taxon (for instance an external url-link on the taxon)

function fillgridInfo(datacollection) {
    $('#SyntheseGridCont3 *').remove();
    var msg = '<table id="SyntheseGrid3" class="table table-hover table-condensed"><thead><tr>';
    msg = msg + preparetable(datacollection);
    msg = msg + '<div id="synthesePageControls"></div>';
    $('#SyntheseGridCont3').append(msg);
    $('#SyntheseGrid3').dataTable({
        "bPaginate": false,
        "bLengthChange": true,
        "bFilter": false,
        "bSort": true,
        "bInfo": false,
        "bAutoWidth": true
    });
}
var ObsRef, ObsObj;

//Getting the taxa informations for a taxon (for instance red lists status)

function fillgridInfoTaxa(datacollection) {
    $('#SyntheseGridCont4 *').remove();
    var msg = '<table id="SyntheseGrid4" class="table table-hover table-condensed"><thead><tr>';
    msg = msg + preparetable(datacollection);
    msg = msg + '<div id="synthesePageControls"></div>';
    $('#SyntheseGridCont4').append(msg);
    $('#SyntheseGrid4').dataTable({
        "bPaginate": false,
        "bLengthChange": true,
        "bFilter": false,
        "bSort": true,
        "bInfo": false,
        "bAutoWidth": true
    });
}
var ObsRef, ObsObj;


function fillgridObserv(datacollection, Ref, Obj) {
    ObsRef = Ref;
    ObsObj = Obj;
    $('#Observations *').remove();
    var msg = '<table id="ObservationsTable" class="table table-hover table-condensed"><thead><tr>';
    msg=msg+preparetable(datacollection);
    $('#Observations').append(msg);
    if (typeof showComments == 'function'|| showObservations =='function') {
        $("#ObservationsTable tbody tr").click(function() {
            var key = $(this).children('.key').text();
            $('#observation_title_id').html(key);
            $('#ObservationsModal').modal('show');
            $('#readReleveBtn').off('click').click(function() {
                var urlReleve = 'query/releve_existant?cd_ref=' + SelectedTaxon + '&synthese_option='+SelectedSyntheseOption+'&id_obj=&id_flore_fcbn=' + key;
                showReleve(urlReleve, true);
                $('#ObservationsModal').modal('hide');
            });
            $('#readCommentBtn').unbind("click");
            $('#readCommentBtn').click(function() {
                var urlComments = 'query/commentaires_existants?cd_ref=' + SelectedTaxon + '&synthese_option='+SelectedSyntheseOption+'&id_obj=&id_flore_fcbn=' + key;
                showComments(urlComments, true);
                $('#ObservationsModal').modal('hide');
            });
            $('#newCommentBtn').unbind("click");
            $('#newCommentBtn').click(function() {
                setCommentValues(SelectedTaxon, SelectedTaxonName, ObsObj, key, true);
                $('#ObservationsModal').modal('hide');
            });
      });
    }
    $('#ObservationsTable').dataTable({
        "bPaginate": true,
        "bLengthChange": false,
        "bFilter": false,
        "bSort": true,
        "bInfo": false,
        "bAutoWidth": false,
        "oLanguage": {
            "oPaginate": {
                "sNext": "Suivant",
                "sPrevious": "Précédent"
            }
        }
    });
}
function preparetable(datacollection) {
    msg='';
    for (i = 0; i < datacollection["cols"].length; i++) {
        /* The field_name is taken if no label is specified */
        var label = datacollection["cols"][i]["label"] ? datacollection["cols"][i]["label"] : datacollection["cols"][i]["field_name"].replace(/_/g, ' ');
        if (datacollection["cols"][i]["header_classes"])
            classes = datacollection["cols"][i]["header_classes"];
        else
            classes = '';
        msg += '<th class="' + classes + '">' + label;
        +'</th>';
    }
    msg += '</tr></thead><tbody>';
    for (var i = 0; i < datacollection["rows"].length; i++) {
        msg = msg + '<tr>'; //open row
        for (var j = 0; j < datacollection["cols"].length; j++) {
            if (datacollection["cols"][j]["body_classes"])
                classes = datacollection["cols"][j]["body_classes"];
            else
                classes = '';
            msg = msg + '<td class="' + classes + '">' + notNull(datacollection["rows"][i][datacollection["cols"][j]["field_name"]]) + '</td>';
        }
        msg = msg + '</tr>'; //close row
    }
    return msg + '</tbody></table>';
}
function notNull(content) {
    if (content) {
        return content;
    } else {
        return '';
    }
}
