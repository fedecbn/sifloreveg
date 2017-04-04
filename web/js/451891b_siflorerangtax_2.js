//Création de la règle pour rendu 3, cas ou il y a uniquement le rang choisi (correspondant au champ nb_visu=100
var rule_tax_1 = new OpenLayers.Rule({
    name: 'Uniquement le nom choisi',
    filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: 'nb_tax_visu',
        value: 100
    }),
    symbolizer: {
        fillColor: '#01B0F0',
        strokeColor: '#01B0F0',
//pointRadius: 12
    }
});
//Création de la règle pour rendu 3, cas ou il y a le rang choisi et inférieur (correspondant au champ nb_visu>10
var rule_tax_2 = new OpenLayers.Rule({
    name: 'Taxon choisi et taxons inférieurs',
    filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.GREATER_THAN,
        property: 'nb_tax_visu',
        value: 100
    }),
    symbolizer: {
        fillColor: '#002F2F',
        strokeColor: '#002F2F',
//pointRadius: 12
    }
});
//Création de la règle pour rendu 3, cas ou il y a uniquement le rang inférieur (correspondant au champ nb_visu entre 0 et 10
var rule_tax_3 = new OpenLayers.Rule({
    name: 'Uniquement les taxons inférieurs',
    filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.GREATER_THAN,
        property: 'nb_tax_visu',
        value: 0
    }),
    symbolizer: {
        fillColor: '#E70739',
        strokeColor: '#E70739',
//pointRadius: 12
    }
});

Style_maille3.addRules([rule_tax_3, rule_tax_2, rule_tax_1, rule_cluster]);

//Création du style de la carte pour rendu rang taxonomique
var StyleMap_maille3 = new OpenLayers.StyleMap({
    'default': Style_maille3,
    'select': StyleSelected
});
function renduRangeTax(){
    vector_layer.styleMap = StyleMap_maille3;
    $('#legendRendu').append("<div id='renduLegend'><div class='renduLegendSquare' style='background:#E70739; border-color:#E70739;'></div>Uniquement les taxons inférieurs<div class='clearfix'></div><div      class='renduLegendSquare' style='background:#002F2F; border-color:#002F2F;'></div>Taxon choisi et taxons inférieurs<div class='clearfix'></div><div class='renduLegendSquare' style='background:#01B0F0; border-color:#01B0F0'></div>Uniquement le nom choisi");
}
