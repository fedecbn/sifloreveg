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
    $("#TaxonSelect").select2({
        minimumInputLength: 3,
        ajax: {
            url: "query/taxons",
            dataType: 'json',
            quietMillis: 300,
            params: {
                global: false,
            },
            data: function (term, page) {
                return {
                    q: term, //search term
                    rang: $("#TaxonsRangs option:selected").attr("value"),
                    type: $("#TaxonsGroup option:selected").attr("value"),
                };
            },
            results: function (data,page) {
                return {results: data.results}
            },
            formatResult:    function (results) {return results;},
            formatSelection: function (results) {
                return results.text;
            },
            escapeMarkup: function (m) { return m; }
        },
        initSelection: function(element, callback) {
            if(SelectedTaxon){
                $.ajax("query/taxons?id="+SelectedTaxon, {
                    dataType: "json"
                }).done(function(data) {
                    callback(data.results[0]);
                });
            }
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
    $('#FullTaxonListButton').click(function(){
        if(partialQueryEnabled){
            $('#FullTaxonListButton').addClass('btn-success');
            partialQueryEnabled=false;
            $("#TaxonSelect").select2("destroy");
            $("#TaxonSelect").replaceWith("<select data-placeholder='Choisir un taxon' id='TaxonSelect' class='LeftSelectInput' value=' '><option></option></select>");
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
            $("#TaxonSelect").replaceWith("<input data-placeholder='Choisir un taxon' type=hidden id='TaxonSelect' class='LeftSelectInput' value=' '/>");
            $("#TaxonsGroup").unbind("change");
            $("#TaxonsRangs").unbind("change");
            partialTaxonList();
        }
    });
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


