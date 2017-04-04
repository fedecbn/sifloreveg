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
