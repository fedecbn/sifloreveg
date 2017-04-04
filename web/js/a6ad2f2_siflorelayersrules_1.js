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
//Création de la règle pour rendu 2, cas ou il y a moins de 10 observations
var rule_obs_1 = new OpenLayers.Rule({
    name: 'Moins de 10 observations',
    filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.LESS_THAN,
        property: 'nb_obs',
        value: 10
    }),
    symbolizer: {
//fillColor: '#C79F4B',
        fillColor: '#F6E497',
        strokeColor: '#F6E497',
//pointRadius: 12
    }
});
//Création de la règle pour rendu 2, cas ou il y a plus de 5 observations
var rule_obs_2 = new OpenLayers.Rule({
    name: 'Entre 10 et 100 observations',
    filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
        property: 'nb_obs',
        value: 10
    }),
    symbolizer: {
//fillColor: '#A67E2E',
        fillColor: '#C79F4B',
        strokeColor: '#C79F4B',
//pointRadius: 12
    }
});
//Création de la règle pour rendu 2, cas ou il y a moins de 10 observations
var rule_obs_3 = new OpenLayers.Rule({
    name: 'Plus de 100 observations',
    filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
        property: 'nb_obs',
        value: 100
    }),
    symbolizer: {
//fillColor: '#663E10',
        fillColor: '#2E1C0B',
        strokeColor: '#2E1C0B',
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
        fillColor: '#3F056B',
        strokeColor: '#3F056B',
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
        fillColor: '#DCB7F7',
        strokeColor: '#B699CC',
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
Style_maille2.addRules([rule_obs_1, rule_obs_2, rule_obs_3, rule_cluster]);
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
