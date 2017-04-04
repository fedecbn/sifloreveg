//Getting the maille data from the map layer object and inserting it into it's section as a table
var taxonurl,page,ordField='',ordDir='';
fnInitSave=jQuery.fn.dataTableExt.oPagination.two_button.fnInit;
jQuery.fn.dataTableExt.oPagination.two_button.fnInit=function( oSettings, nPaging, fnCallbackDraw ){
    var oLang = oSettings.oLanguage.oPaginate;
    var oClasses = oSettings.oClasses;
    var fnClickHandler = function ( e ) {
        if ( oSettings.oApi._fnPageChange( oSettings, e.data.action ) )
        {
            fnCallbackDraw( oSettings );
        }
    };
    console.log(oSettings.oClasses.sPageNextDisabled);
    var sAppend = (!oSettings.bJUI) ?
            '<a class="'+oSettings.oClasses.sPagePrevDisabled+'" tabindex="'+oSettings.iTabIndex+'" role="button"><i class="glyphicon glyphicon-chevron-left"></i>'+oLang.sPrevious+'</a>'+
            '<a class="'+oSettings.oClasses.sPageNextDisabled+'" tabindex="'+oSettings.iTabIndex+'" role="button">'+oLang.sNext+'<i class="glyphicon glyphicon-chevron-right"></i></a>'
            :
            '<a class="'+oSettings.oClasses.sPagePrevDisabled+'" tabindex="'+oSettings.iTabIndex+'" role="button"><span class="'+oSettings.oClasses.sPageJUIPrev+'"></span></a>'+
            '<a class="'+oSettings.oClasses.sPageNextDisabled+'" tabindex="'+oSettings.iTabIndex+'" role="button"><span class="'+oSettings.oClasses.sPageJUINext+'"></span></a>';
    $(nPaging).append( sAppend );
    	
    var els = $('a', nPaging);
    var nPrevious = els[0],
            nNext = els[1];
    	
    oSettings.oApi._fnBindAction( nPrevious, {action: "previous"}, fnClickHandler );
    oSettings.oApi._fnBindAction( nNext,     {action: "next"},     fnClickHandler );
    
    /* ID the first elements only */
    if ( !oSettings.aanFeatures.p )
    {
        nPaging.id = oSettings.sTableId+'_paginate';
        nPrevious.id = oSettings.sTableId+'_previous';
        nNext.id = oSettings.sTableId+'_next';
	
        nPrevious.setAttribute('aria-controls', oSettings.sTableId);
        nNext.setAttribute('aria-controls', oSettings.sTableId);
    }
};
function tableMaille(featurecollection){
    $('#SyntheseGridCont1 *').remove();
    var msg = '<table id="SyntheseGrid1" class="table table-hover table-condensed"><thead><tr><th><a href="cd_sig">Code maille</a></th><th><a href="cd_ref">Code TaxRef</a></th><th><a href="noms_taxon">Nom(s) du(des) taxon(s)</a></th><th><a href="nb_obs">Nb observations</a></th><th><a href="date_premiere_obs">Date prèmiere obs.</a></th><th><a href="date_derniere_obs">Date dernière obs.</a></th><th><a href="nb_tax_n1">Nb taxon rang choisi</a></th><th><a href="nb_tax_n2">Nb taxon rangs inf.</a></th><th><a href="nb_obs_2001_2013">Nb obs. date≥2000</a></th><th><a href="nb_obs_averee">Nb obs. loc. avérée</a></th><th><a href="nb_obs_interpretee">Nb obs. loc. interprétée</a></th></tr></thead><tbody>';
    for (var i = 0; i < 10 && i < featurecollection.features.length; i++) {
        msg = msg + '<tr>'; //open row
        msg = msg + '<td class="key">' + featurecollection.features[i].properties.cd_sig + '</td>';
        msg = msg + '<td>' + featurecollection.features[i].properties.cd_ref + '</td>';
        msg = msg + '<td>' + featurecollection.features[i].properties.noms_taxon + '</td>';
        msg = msg + '<td>' + featurecollection.features[i].properties.nb_obs + '</td>';
        msg = msg + '<td>' + featurecollection.features[i].properties.date_premiere_obs + '</td>';
        msg = msg + '<td>' + featurecollection.features[i].properties.date_derniere_obs + '</td>';
        msg = msg + '<td>' + featurecollection.features[i].properties.nb_tax_n1 + '</td>';
        msg = msg + '<td>' + featurecollection.features[i].properties.nb_tax_n2 + '</td>';
        msg = msg + '<td>' + featurecollection.features[i].properties.nb_obs_2001_2013 + '</td>';
        msg = msg + '<td>' + featurecollection.features[i].properties.nb_obs_averee + '</td>';
        msg = msg + '<td>' + featurecollection.features[i].properties.nb_obs_interpretee + '</td>';
        msg = msg + '</tr>'; //close row
    }
    msg = msg + '</tbody></table><div id="synthesePageControls"></div>';
    $('#SyntheseGridCont1').append(msg);
    if(page!=1){
        $('#synthesePageControls').append('<a href="#" class="paginate_enabled_previous" id="synthesePrev"><i class="glyphicon glyphicon-chevron-left"></i>Précédent</a>');
        $('#synthesePrev').click(function(){
            page-=1;
            pagegridMaille(page,ordField,ordDir);
            return(false);
        });
    }else{
        $('#synthesePageControls').append('<a href="#" class="paginate_disabled_previous" id="synthesePrev"><i class="glyphicon glyphicon-chevron-left"></i>Précédent</a>');
        $('#synthesePrev').click(function(){
            return(false);
        });
    }
    if(featurecollection.features[10]){
        $('#synthesePageControls').append('<a href="#" class="paginate_enabled_next" id="syntheseNext">Suivant<i class="glyphicon glyphicon-chevron-right"></i></a>');
        $('#syntheseNext').click(function(){
            page+=1;
            pagegridMaille(page,ordField,ordDir);
            return(false);
        });
    }else{
        $('#synthesePageControls').append('<a href="#" class="paginate_disabled_next" id="syntheseNext">Suivant<i class="glyphicon glyphicon-chevron-right"></i></a>');
        $('#syntheseNext').click(function(){
            return(false);
        });
    }
    $("#SyntheseGrid1 tbody tr").click(function() {
        if($('#Observations').hasClass('active')){
            $('#MainTabs a[href="#map"]').tab('show');
        }
        var key = $(this).children('.key').text();
        var feat=vector_layer.getFeaturesByAttribute('cd_sig', key)[0] ;
        if (!feat){
            map.zoomTo(5);
            feat=vector_layer.getFeaturesByAttribute('cd_sig', key)[0];
        }
        selectFeaturesControl.unselectAll();
        selectFeaturesControl.select(feat);
    });
    $('#SyntheseGrid1 th>a').click(function(){
        if(ordDir=='desc'){
            ordDir='';
        }else{
            ordDir='desc';
        }
        ordField=$(this).attr('href');
        pagegridMaille(page,ordField,ordDir);
        return false;
    });
}
function tableCommune(featurecollection){
    $('#SyntheseGridCont1 *').remove();
    var msg = '<table id="SyntheseGrid1" class="table table-hover table-condensed"><thead><tr><th><a href="insee_comm">Insee</a></th><th><a href="nom_comm">Commune</a></th><th><a href="cd_ref">Code TxRef</a></th><th><a href="noms_taxon">Nom(s) du(des) taxon(s)</a></th><th><a href="nb_obs">Nb observations</a></th><th><a href="date_premiere_obs">Date prèmiere obs.</a></th><th><a href="date_derniere_obs">Date dernière obs.</a></th><th><a href="nb_tax_n1">Nb taxon rang choisi</a></th><th><a href="nb_tax_n2">Nb taxonrangs inf.</a></th><th><a href="nb_obs_2001_2013">Nb obs. date≥2000</a></th><th><a href="nb_obs_averee">Nb obs. loc. avérée</a></th><th><a href="nb_obs_interpretee">Nb obs. loc. interprétée</a></th></tr></thead><tbody>';
    for (var i = 0; i < 10 && i < featurecollection.features.length; i++) {
        msg = msg + '<tr>'; //open row
        msg = msg + '<td class="key">' + featurecollection.features[i].properties.insee_comm + '</td>';
        if (featurecollection.features[i].properties.nom_comm) {
            msg = msg + '<td>' + featurecollection.features[i].properties.nom_comm + '</td>';
        } else {
            msg = msg + '<td></td>';
        }
        msg = msg + '<td>' + featurecollection.features[i].properties.cd_ref + '</td>';
        msg = msg + '<td>' + featurecollection.features[i].properties.noms_taxon + '</td>';
        msg = msg + '<td>' + featurecollection.features[i].properties.nb_obs + '</td>';
        msg = msg + '<td>' + featurecollection.features[i].properties.date_premiere_obs + '</td>';
        msg = msg + '<td>' + featurecollection.features[i].properties.date_derniere_obs + '</td>';
        msg = msg + '<td>' + featurecollection.features[i].properties.nb_tax_n1 + '</td>';
        msg = msg + '<td>' + featurecollection.features[i].properties.nb_tax_n2 + '</td>';
        msg = msg + '<td>' + featurecollection.features[i].properties.nb_obs_2001_2013 + '</td>';
        msg = msg + '<td>' + featurecollection.features[i].properties.nb_obs_averee + '</td>';
        msg = msg + '<td>' + featurecollection.features[i].properties.nb_obs_interpretee + '</td>';
        msg = msg + '</tr>'; //close row
    }
    msg = msg + '</tbody></table><div id="synthesePageControls"></div>';
    $('#SyntheseGridCont1').append(msg);

        if(page!=1){
            $('#synthesePageControls').append('<a href="#" class="paginate_enabled_previous" id="synthesePrev">Précédent</a>');
            $('#synthesePrev').click(function(){
                page-=1;
                pagegridComm(page,ordField,ordDir);
                return(false);
            });
        }
        if(featurecollection.features[10]){
            $('#synthesePageControls').append('<a href="#" class="paginate_enabled_next" id="syntheseNext">Suivant</a>');
            $('#syntheseNext').click(function(){
                page+=1;
                pagegridComm(page,ordField,ordDir);
                return(false);
            });
        }
        $("#SyntheseGrid1 tbody tr").click(function() {
            if($('#Observations').hasClass('active')){
                $('#MainTabs a[href="#map"]').tab('show');
            }
            var key = $(this).children('.key').text();
            var feat=vector_layer.getFeaturesByAttribute('insee_comm', key)[0] ;
            if (!feat){
                map.zoomTo(5);
                feat=vector_layer.getFeaturesByAttribute('insee_comm', key)[0];
            }
            selectFeaturesControl.unselectAll();
            selectFeaturesControl.select(feat);
        });
        $('#SyntheseGrid1 th>a').click(function(){
            if(ordDir=='desc'){
                ordDir='';
            }else{
                ordDir='desc';
            }
            ordField=$(this).attr('href');
            pagegridComm(page,ordField,ordDir);
            return false;
        });
}
function fillgridMaille(featurecollection, url) {
    page=1;
    ordField='';
    ordDir='';
    taxonurl=url;
    $('a[href="#SyntheseGridCont1"]').text("Synthèse par maille");
    tableMaille(featurecollection);
    /*$('#SyntheseGrid1').dataTable({
        "bPaginate": false,
        "bLengthChange": true,
        "bFilter": false,
        "bSort": true,
        "bInfo": false,
        "bAutoWidth": true
    });*/
}
function pagegridMaille(page,orderField,orderDir){
    $.ajax({
        url: taxonurl+'&pag='+page+'&ordfield='+orderField+'&ordDir='+orderDir,
        dataType: "json",
    }).done(function(data) {
        featurecollection = data;
        tableMaille(featurecollection);
        if (selectedFeature){
            $("#SyntheseGrid1 .key:contains("+selectedFeature.attributes.cd_sig+")").parent().addClass('success');
        }
    });
}
function fillgridComm(featurecollection,url) {
    page=1;
    ordField='';
    ordDir='';
    taxonurl=url;
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

function pagegridComm(page,orderField,orderDir){
    $.ajax({
        url: taxonurl+'&pag='+page+'&ordfield='+orderField+'&ordDir='+orderDir,
        dataType: "json",
    }).done(function(data) {
        featurecollection = data;
        tableCommune(featurecollection);
        if (selectedFeature){
            $("#SyntheseGrid1 .key:contains("+selectedFeature.attributes.insee_comm+")").parent().addClass('success');
        }
    });
}

//Getting the data from the json object and inserting it into it's section as a table
function fillgridTaxon(datacollection) {
    $('#SyntheseGridCont2 *').remove();
    var msg = '<table id="SyntheseGrid2" class="table table-hover table-condensed"><thead><tr><th>Code TaxRef</th><th>Nom du taxon</th><th>Nb observations</th><th>Date prèmiere obs.</th><th>Date dernière obs.</th><th>Nb obs. date≥2000</th><th>Nb obs. avérée</th><th>Nb obs. interprétée</th></tr></thead><tbody>';
    for (var i = 0; i < datacollection["rows"].length; i++) {
        msg = msg + '<tr>'; //open row
        msg = msg + '<td>' + datacollection["rows"][i]["cd_ref"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["nom_complet"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["nb_obs"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["date_premiere_obs"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["date_derniere_obs"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["nb_obs_2001_2013"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["nb_obs_averee"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["nb_obs_interpretee"] + '</td>';
        msg = msg + '</tr>'; //close row
    }
    msg = msg + '</tbody></table><div id="synthesePageControls"></div>';
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

var ObsRef,ObsObj;

function fillgridObservMaille(datacollection,Ref,Obj) {
    ObsRef=Ref;
    ObsObj=Obj;
    $('#Observations *').remove();
    if(typeof datacollection["rows"][0]["remarque_lieu"]!='undefined'){
        Remarque_lieu='<th>Remarque_lieu</th>';
    }else{
        Remarque_lieu='';
    }
    var msg = '<table id="ObservationsTable" class="table table-hover table-condensed"><thead><tr><th class="hidden"></th><th>ID flore mère</th>\n\
<th>Code TaxRef</th><th>Nom TaxRef V5</th><th>Code Maille</th><th>Type localisation</th><th>Type rattachement</th><th>\n\
Date début obs</th><th>Date fin obs</th><th>Nature date</th><th>Type source</th><th>Remarque date</th>\n\
<th>Nom taxon bd mère</th><th>Code taxon bd mère</th><th>Referentiel bd mère</th><th>Nom taxon originel</th><th>Remarque taxon</th>\n\
<th>Date transmission</th><th>Statut population</th><th>BD mère</th><th>Usage donnée</th><th>BD source</th>\n\
<th>ID flore source</th><th>Remarque donnee mère</th>'+Remarque_lieu+'<th>Type doc</th>\n\
<th>Cote biblio cbn</th><th>Titre doc</th><th>Année doc</th><th>Auteur doc</th><th>Ref doc</th><th>Code herbarium</th>\n\
<th>Code index herbariorum</th><th>Nom herbarium</th><th>Code herbier</th><th>Nom herbier</th><th>Part herbier</th><th>ID part</th>\n\
<th>Cote biblio bd mère</th>\n\
</tr></thead><tbody>';
    for (var i = 0; i < datacollection["rows"].length; i++) {
        msg = msg + '<tr>'; //open row
        msg = msg + '<td class="key hidden">'+datacollection["rows"][i]["id_flore_fcbn"]+'</td>'
        msg = msg + notNullCell(datacollection["rows"][i]["id_flore_mere"]);
        msg = msg + notNullCell(datacollection["rows"][i]["cd_ref"]);
        msg = msg + notNullCell(datacollection["rows"][i]["nom_complet"]);
        msg = msg + notNullCell(datacollection["rows"][i]["cd_sig"]);
        msg = msg + notNullCell(datacollection["rows"][i]["libelle_type_localisation"]);
        msg = msg + notNullCell(datacollection["rows"][i]["libelle_type_rattachement"]);
        msg = msg + notNullCell(datacollection["rows"][i]["date_debut_obs"]);
        msg = msg + notNullCell(datacollection["rows"][i]["date_fin_obs"]);
        msg = msg + notNullCell(datacollection["rows"][i]["libelle_nature_date"]);
        msg = msg + notNullCell(datacollection["rows"][i]["libelle_type_source"]);
        msg = msg + notNullCell(datacollection["rows"][i]["remarque_date"]);
        msg = msg + notNullCell(datacollection["rows"][i]["nom_taxon_mere"]);
        msg = msg + notNullCell(datacollection["rows"][i]["code_taxon_mere"]);
        msg = msg + notNullCell(datacollection["rows"][i]["referentiel_mere"]);
        msg = msg + notNullCell(datacollection["rows"][i]["nom_taxon_originel"]);
        msg = msg + notNullCell(datacollection["rows"][i]["remarque_taxon"]);
        msg = msg + notNullCell(datacollection["rows"][i]["date_transmission"]);
        msg = msg + notNullCell(datacollection["rows"][i]["libelle_statut_pop"]);
        msg = msg + notNullCell(datacollection["rows"][i]["libelle_court_bd_mere"]);
        msg = msg + notNullCell(datacollection["rows"][i]["libelle_usage_donnee"]);
        msg = msg + notNullCell(datacollection["rows"][i]["libelle_court_bd_source"]);
        msg = msg + notNullCell(datacollection["rows"][i]["id_flore_source"]);
        msg = msg + notNullCell(datacollection["rows"][i]["remarque_donnee_mere"]);
        if(Remarque_lieu!=''){
            msg = msg + notNullCell(datacollection["rows"][i]["remarque_lieu"]);
        }
        msg = msg + notNullCell(datacollection["rows"][i]["type_doc"]);
        msg = msg + notNullCell(datacollection["rows"][i]["cote_biblio_cbn"]);
        msg = msg + notNullCell(datacollection["rows"][i]["titre_doc"]);
        msg = msg + notNullCell(datacollection["rows"][i]["annee_doc"]);
        msg = msg + notNullCell(datacollection["rows"][i]["auteur_doc"]);
        msg = msg + notNullCell(datacollection["rows"][i]["ref_doc"]);
        msg = msg + notNullCell(datacollection["rows"][i]["code_herbarium"]);
        msg = msg + notNullCell(datacollection["rows"][i]["code_index_herbariorum"]);
        msg = msg + notNullCell(datacollection["rows"][i]["nom_herbarium"]);
        msg = msg + notNullCell(datacollection["rows"][i]["code_herbier"]);
        msg = msg + notNullCell(datacollection["rows"][i]["nom_herbier"]);
        msg = msg + notNullCell(datacollection["rows"][i]["part_herbier"]);
        msg = msg + notNullCell(datacollection["rows"][i]["id_part"]);
        msg = msg + notNullCell(datacollection["rows"][i]["cote_biblio_bd_mere"]);
        msg = msg + '</tr>'; //close row
    }
    msg = msg + '</tbody></table>';
    $('#Observations').append(msg);
    if (typeof showComments == 'function') {
        $("#ObservationsTable tbody tr").click(function() {
            var key = $(this).children('.key').text();
            $('#ObservationsModal').modal('show');
            $('#readCommentBtn').unbind( "click" );
            $('#readCommentBtn').click(function(){
                var urlComments = 'query/commentaires_existants?cd_ref=' + SelectedTaxon + '&id_obj=&id_flore_fcbn='+ key;
                showComments(urlComments,true);
                $('#ObservationsModal').modal('hide');
            });
            $('#newCommentBtn').unbind( "click" );
            $('#newCommentBtn').click(function(){
                setCommentValues( SelectedTaxon,SelectedTaxonName,ObsObj,key,true);
                $('#ObservationsModal').modal('hide');
            });
        });
            $('#readCommentBtn').click(function(){
                var urlComments = 'query/commentaires_existants?cd_ref=' + SelectedTaxon + '&id_obj=&id_flore_fcbn='+ key;
                showComments(urlComments,true);
                $('#ObservationsModal').modal('hide');
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


function fillgridObservCommune(datacollection,Ref,Obj) {
    ObsRef=Ref;
    ObsObj=Obj;
    $('#Observations *').remove();
    var msg = "<table id='ObservationsTable'  class='table table-hover table-condensed'><thead><tr><th class='hidden'></th><th>ID flore mère</th>\n\
<th>Code TaxRef</th><th>Nom TaxRef V5</th><th>Code Insee</th><th>Nom Commune</th><th>Type localisation</th><th>Type rattachement</th><th>\n\
Date début obs</th><th>Date fin obs</th><th>Nature date</th><th>Type source</th><th>Remarque date</th>\n\
<th>Nom taxon bd mère</th><th>Code taxon bd mère</th><th>Referentiel bd mère</th><th>Nom taxon originel</th><th>Remarque taxon</th>\n\
<th>Date transmission</th><th>Statut population</th><th>BD mère</th><th>Usage donnée</th><th>BD source</th>\n\
<th>ID flore source</th><th>Remarque donnee mère</th><th>Remarque_lieu</th><th>Type doc</th>\n\
<th>Cote biblio cbn</th><th>Titre doc</th><th>Année doc</th><th>Auteur doc</th><th>Ref doc</th><th>Code herbarium</th>\n\
<th>Code index herbariorum</th><th>Nom herbarium</th><th>Code herbier</th><th>Nom herbier</th><th>Part herbier</th><th>ID part</th>\n\
<th>Cote biblio bd mère</th>\n\
</tr></thead><tbody>";
    for (var i = 0; i < datacollection["rows"].length; i++) {
        msg = msg + '<tr>'; //open row
        msg = msg + '<td class="key hidden">'+datacollection["rows"][i]["id_flore_fcbn"]+'</td>'
        msg = msg + notNullCell(datacollection["rows"][i]["id_flore_mere"]);
        msg = msg + notNullCell(datacollection["rows"][i]["cd_ref"]);
        msg = msg + notNullCell(datacollection["rows"][i]["nom_complet"]);
        msg = msg + notNullCell(datacollection["rows"][i]["insee_comm"]);
        msg = msg + notNullCell(datacollection["rows"][i]["nom_comm"]);
        msg = msg + notNullCell(datacollection["rows"][i]["libelle_type_localisation"]);
        msg = msg + notNullCell(datacollection["rows"][i]["libelle_type_rattachement"]);
        msg = msg + notNullCell(datacollection["rows"][i]["date_debut_obs"]);
        msg = msg + notNullCell(datacollection["rows"][i]["date_fin_obs"]);
        msg = msg + notNullCell(datacollection["rows"][i]["libelle_nature_date"]);
        msg = msg + notNullCell(datacollection["rows"][i]["libelle_type_source"]);
        msg = msg + notNullCell(datacollection["rows"][i]["remarque_date"]);
        msg = msg + notNullCell(datacollection["rows"][i]["nom_taxon_mere"]);
        msg = msg + notNullCell(datacollection["rows"][i]["code_taxon_mere"]);
        msg = msg + notNullCell(datacollection["rows"][i]["referentiel_mere"]);
        msg = msg + notNullCell(datacollection["rows"][i]["nom_taxon_originel"]);
        msg = msg + notNullCell(datacollection["rows"][i]["remarque_taxon"]);
        msg = msg + notNullCell(datacollection["rows"][i]["date_transmission"]);
        msg = msg + notNullCell(datacollection["rows"][i]["libelle_statut_pop"]);
        msg = msg + notNullCell(datacollection["rows"][i]["libelle_court_bd_mere"]);
        msg = msg + notNullCell(datacollection["rows"][i]["libelle_usage_donnee"]);
        msg = msg + notNullCell(datacollection["rows"][i]["libelle_court_bd_source"]);
        msg = msg + notNullCell(datacollection["rows"][i]["id_flore_source"]);
        msg = msg + notNullCell(datacollection["rows"][i]["remarque_donnee_mere"]);
        msg = msg + notNullCell(datacollection["rows"][i]["remarque_lieu"]);
        msg = msg + notNullCell(datacollection["rows"][i]["type_doc"]);
        msg = msg + notNullCell(datacollection["rows"][i]["cote_biblio_cbn"]);
        msg = msg + notNullCell(datacollection["rows"][i]["titre_doc"]);
        msg = msg + notNullCell(datacollection["rows"][i]["annee_doc"]);
        msg = msg + notNullCell(datacollection["rows"][i]["auteur_doc"]);
        msg = msg + notNullCell(datacollection["rows"][i]["ref_doc"]);
        msg = msg + notNullCell(datacollection["rows"][i]["code_herbarium"]);
        msg = msg + notNullCell(datacollection["rows"][i]["code_index_herbariorum"]);
        msg = msg + notNullCell(datacollection["rows"][i]["nom_herbarium"]);
        msg = msg + notNullCell(datacollection["rows"][i]["code_herbier"]);
        msg = msg + notNullCell(datacollection["rows"][i]["nom_herbier"]);
        msg = msg + notNullCell(datacollection["rows"][i]["part_herbier"]);
        msg = msg + notNullCell(datacollection["rows"][i]["id_part"]);
        msg = msg + notNullCell(datacollection["rows"][i]["cote_biblio_bd_mere"]);
        msg = msg + '</tr>'; //close row
    }
    msg = msg + '</tbody></table>';
    $('#Observations').append(msg);
    if (typeof showComments == 'function') {
        $("#ObservationsTable tbody tr").click(function() {
            var key = $(this).children('.key').text();
            $('#ObservationsModal').modal('show');
            $('#readCommentBtn').unbind( "click" );
            $('#readCommentBtn').click(function(){
                var urlComments = 'query/commentaires_existants?cd_ref=' + SelectedTaxon + '&id_obj=&id_flore_fcbn='+ key;
                showComments(urlComments,true);
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
