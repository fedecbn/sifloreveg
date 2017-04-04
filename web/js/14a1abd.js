/*FitToParent*/
Ext.namespace('Ext.ux');
/**
 * @class Ext.ux.FitToParent
 * @extends Object
 * <p>Plugin for {@link Ext.BoxComponent BoxComponent} and descendants that adjusts the size of the component to fit inside a parent element</p>
 * <p>The following example will adjust the size of the panel to fit inside the element with id="some-el":<pre><code>
var panel = new Ext.Panel({
    title: 'Test',
    renderTo: 'some-el',
    plugins: ['fittoparent']
});</code></pre></p>
 * <p>It is also possible to specify additional parameters:<pre><code>
var panel = new Ext.Panel({
    title: 'Test',
    renderTo: 'other-el',
    autoHeight: true,
    plugins: [
        new Ext.ux.FitToParent({
            parent: 'parent-el',
            fitHeight: false,
            offsets: [10, 0]
        })
    ]
});</code></pre></p>
 * <p>The element the component is rendered to needs to have <tt>style="overflow:hidden"</tt>, otherwise the component will only grow to fit the parent element, but it will never shrink.</p>
 * <p>Note: This plugin should not be used when the parent element is the document body. In this case you should use a {@link Ext.Viewport Viewport} container.</p>
 */
Ext.ux.FitToParent = Ext.extend(Object, {
    /**
     * @cfg {HTMLElement/Ext.Element/String} parent The element to fit the component size to (defaults to the element the component is rendered to).
     */
    /**
     * @cfg {Boolean} fitWidth If the plugin should fit the width of the component to the parent element (default <tt>true</tt>).
     */
    fitWidth: true,
    /**
     * @cfg {Boolean} fitHeight If the plugin should fit the height of the component to the parent element (default <tt>true</tt>).
     */
    fitHeight: true,
    /**
     * @cfg {Boolean} offsets Decreases the final size with [width, height] (default <tt>[0, 0]</tt>).
     */
    offsets: [0, 0],
    /**
     * @constructor
     * @param {HTMLElement/Ext.Element/String/Object} config The parent element or configuration options.
     * @ptype fittoparent
     */
    constructor: function(config) {
        config = config || {};
        if(config.tagName || config.dom || Ext.isString(config)){
            config = {parent: config};
        }
        Ext.apply(this, config);
    },
    init: function(c) {
        this.component = c;
        c.on('render', function(c) {
            this.parent = Ext.get(this.parent || c.getPositionEl().dom.parentNode);
            if(c.doLayout){
                c.monitorResize = true;
                c.doLayout = c.doLayout.createInterceptor(this.fitSize, this);
            } else {
                this.fitSize();
                Ext.EventManager.onWindowResize(this.fitSize, this);
            }
        }, this, {single: true});
    },
    fitSize: function() {
        var pos = this.component.getPosition(true),
            size = this.parent.getViewSize();
        this.component.setSize(
            this.fitWidth ? size.width - pos[0] - this.offsets[0] : undefined,
            this.fitHeight ? size.height - pos[1] - this.offsets[1] : undefined);
    }
});
Ext.preg('fittoparent', Ext.ux.FitToParent);


﻿//Code créé par Romain Gaspard, pour la Fédération des Conservatoires Botaniques Nationaux
var queryroute= document.getElementById('query_route').value+"/";
var buttonCommentHide=true;
//Store contenant la liste des taxons pour selection
var taxref_store = new Ext.data.JsonStore({
//url : 'taxons.php',
fields : ['cd_ref', 'nom_complet'],
root : 'rows',
autoLoad : true,
proxy : new Ext.data.HttpProxy({
url: queryroute+"taxons",
method: 'GET',
}),
root : 'rows',
});

var rang_store=new Ext.data.ArrayStore({
fields: ['id','rang'],
data: [['','Tous les rangs'],['GN','Genre'],['ES','Espèce'],['SSES','Sous-espèce'],['VAR','Variété'],['FO','Forme'],['CAR','Cultivar']]
});

var bryo_store=new Ext.data.ArrayStore({
fields: ['id','type'],
data: [['','Tous les groupes'],['tracheo','Trachéophytes'],['bryo_liste','Bryophytes DHFF / conv. Berne'],['bryo_pas_liste','Bryophytes hors DHFF / conv. Berne']]
});

//Store qui va contenir les commentaires saisis
var commentaires = new Ext.data.JsonStore({
url : queryroute+'commentaires',
fields : ['nom', 'comment','prenom','email','type_com','action_com','priorite_com','id_obj','id_flore_fcbn','cd_ref','nom_complet'],
root : 'rows',
autoLoad : false
});


//Combobox de selection du taxon
var taxref_combo = new Ext.form.ComboBox({
id : 'taxref_combo',
fieldLabel : "",
emptyText : "Choisir un taxon",
editable : true,
tpl: '<tpl for="."><div ext:qtip="{nom_complet}" class="x-combo-list-item">{nom_complet}</div></tpl>',
typeAhead: true,
selectOnFocus:true,
store : taxref_store,
forceSelection: true,
mode: 'local',
labelWidth : 0,
width : 275,
high: 200,
mode : 'local',
valueField : 'cd_ref',
displayField : 'nom_complet',
 triggerAction: 'all'
});

//Combobox de selection du taxon
var rang_combo = new Ext.form.ComboBox({
id : 'rang_combo',
fieldLabel : "",
triggerAction : 'all',
emptyText : "Choisir un rang",
editable : true,
store : rang_store,
queryMode: 'local',
labelWidth : 0,
width : 275,
high: 200,
mode : 'local',
valueField : 'id',
displayField : 'rang',
  triggerAction: 'all',
        selectOnFocus:true
});

var bryo_combo = new Ext.form.ComboBox({
id : 'bryo_combo',
fieldLabel : "",
triggerAction : 'all',
emptyText : "Choisir un groupe de taxons",
editable : true,
store : bryo_store,
queryMode: 'local',
labelWidth : 0,
width : 275,
high: 200,
mode : 'local',
valueField : 'id',
displayField : 'type',
  triggerAction: 'all',
        selectOnFocus:true
});

//Action aprés choix d'un groupe de taxon
Ext.getCmp('bryo_combo').on('select', function(combo, record, index){
taxref_store.removeAll();
taxref_combo.clearValue();
taxref_store.load({params:{rang: Ext.getCmp('rang_combo').getValue(),type: Ext.getCmp('bryo_combo').getValue()}})
});

//Action aprés choix d'un rang
Ext.getCmp('rang_combo').on('select', function(combo, record, index){
taxref_store.removeAll();
taxref_combo.clearValue();
taxref_store.load({params:{rang: Ext.getCmp('rang_combo').getValue(),type: Ext.getCmp('bryo_combo').getValue()}})
});

//Liste de case à cocher pour selectionner le rang taxonomique souhaité       
var radiogroup_rang= {
            xtype: 'radiogroup',
 //           fieldLabel: 'Single Column',
            itemCls: 'x-check-group-alt',
            columns: 1,
            items: [
			{boxLabel: 'Taxon choisi et taxons inférieurs', name: 'id_rang', inputValue: '2',checked: true},
                {boxLabel: 'Uniquement le nom choisi', name: 'id_rang', inputValue: '1', checked: false},               
            ]
        };

//Liste de case à cocher pour selectionner le type de synthèse souhaité       
var radiogroup_synthese= {
            xtype: 'radiogroup',
 //           fieldLabel: 'Single Column',
            itemCls: 'x-check-group-alt',
            columns: 1,
            items: [
                {boxLabel: 'Synthèse maille 10km métropole et Réunion', name: 'id_synthese', inputValue: '1', checked: true},
                {boxLabel: 'Synthèse maille 5km métropole et 1km Réunion', name: 'id_synthese', inputValue: '2'},
                {boxLabel: 'Synthèse communale métropole et Réunion', name: 'id_synthese', inputValue: '3'}
            ]
        };

        
var taxons_communs_ss_inf= new Array('113893','79908','127439','92876','127454','116142','92606','103316','117201','91289','116012','100225','115624','114114','98921','94207','106499','105817','102900','113904','92302','107649','128268','120717','92501','128956','85740','100787','114658','99473','94503','86763','79734','128832','98865','102352','116043','128801','124233','80759','105966','100310','84061','80990','95567','103375','128754','82922','105247','91430','119550','125014','100052','119473','609982','81295','116759','96180','114416','120753','80410','119418','104775','81569','610646','96508','105017','86305','88510','124261','124814','112355','116952','106581','98078','112745','79783','87930','119977','116903','129305','97537','122745','124034','91886','115156','116265','114297','107117','83912','106653','93023','104903','128175','107038','90017','104173','125006','129298','100104','100142','85903','97434','82738','89200','113474','91382','101300','108996','117860','98717','127259','95793','91912','95149','103772','93308','122028','86634','97947','103514','126035','129147','100045','88569','84112','90669','99582','127613','127294','104516','107090','118016','129669','154743','83272','104214','90008','114611','108351','94995','88905','97452','115655','129506','84999','107446','86490','80591','129191','115918','97141','118993','87560','126859','115470','125000','106698','124797','128938','90681','96229','116744','92379');       
var taxons_communs_av_inf= new Array('610909','159572','128880','128419','127029','124205','124080','123683','123522','119915','119419','117019','114332','113596','113221','112975','111289','108027','107711','104876','99494','99373','99334','97962','96895','96271','96046','95671','94626','94164','87964','87849','84534','83653','82952','188731','188746','188897','188909','188971','189167','189250','189255','189424','189480','189549','189627','189678','189811','190021','190054','190057','190079','190258','190272','190324','190341','190352','190355','190360','190443','190485','190670','190679','190854','190930','191107','191160','191232','191251','191508','191518','191524','191573','191651','191688','191778','192027','192047','192126','192232','192318','192415','192419','192516','192520','192551','192567','192622','192648','192681','192690','192748','192773','192807','193114','193132','193203','193276','193359','193498','193519','193689','193693','193722','193734','193786','193822','193851','193884','193954','194069','194168','194177','194267','194288','194322','194338','194360','194445','194515','194615','194621','195001','195452','195496','195527','195739','196059','196129','196268','196286','196360','196467','196529','196532','196618','196635','196708','196709','196882','197006','197047','197080','197220','197284','197319','197334','197352','197402','197403','197563','197585','197624','197652','197699','197729','197745','197758','197762','197903','197932','198343','198449','198548','198631','198789','198831','198849','198879','198883','198901','198902','198911','198938','445553','446721','606920');       
       
//Création des variables pour stocker les valeurs des cases à cocher et des combobox        
var datasetId_tax='';
var datasetNom_tax;
var datasetsynthese;
var datasetrang;
        
//Bouton pour envoyer les synthèses
var submitButton_synthese = new Ext.Button({
text : 'Envoyer',
handler : function() {
//var datasetId_com = Ext.getCmp('commune_combo').getValue();

datasetId_tax = Ext.getCmp('taxref_combo').getValue();
datasetNom_tax = Ext.getCmp('taxref_combo').getRawValue();
datasetsynthese = synthese_form.getForm().getValues()['id_synthese'];
datasetrang = rang_form.getForm().getValues()['id_rang'];
//Ext.getCmp('observations_fr10').store.proxy.protocol.params.cd_ref = 0;
//Ext.getCmp('observations_fr10').store.proxy.protocol.params.insee_comm = '';
Ext.getCmp('observations_fr10').store.removeAll();
Ext.getCmp('synthese_taxon_fr5').store.removeAll();
Ext.getCmp('synthese_taxon_fr5_ss_inf').store.removeAll();
Ext.getCmp('synthese_taxon_fr10').store.removeAll();
Ext.getCmp('synthese_taxon_fr10_ss_inf').store.removeAll();
Ext.getCmp('synthese_taxon_comm').store.removeAll();
Ext.getCmp('synthese_taxon_comm_ss_inf').store.removeAll();
Ext.getCmp('synthese_taxon_utm').store.removeAll();
Ext.getCmp('synthese_taxon_utm_ss_inf').store.removeAll();
Ext.getCmp('synthese_comm').store.removeAll();
Ext.getCmp('synthese_comm_ss_inf').store.removeAll();
Ext.getCmp('synthese_comm_reunion').store.removeAll();
Ext.getCmp('synthese_comm_reunion_ss_inf').store.removeAll();
Ext.getCmp('synthese_fr10').store.removeAll();
Ext.getCmp('synthese_fr10_ss_inf').store.removeAll();
Ext.getCmp('synthese_fr5').store.removeAll();
Ext.getCmp('synthese_fr5_ss_inf').store.removeAll();
Ext.getCmp('synthese_utm1').store.removeAll();
Ext.getCmp('synthese_utm1_ss_inf').store.removeAll();
Ext.getCmp('synthese_utm10').store.removeAll();
Ext.getCmp('synthese_utm10_ss_inf').store.removeAll();
Ext.getCmp('commentaires_existants').store.removeAll();
if(typeof commentairepanel =='object'){
commentairepanel.getForm().setValues({
id_obj: '',
id_flore_fcbn: '',
});}
mapTabPanel.hideTabStripItem(observationsPanel_fr10); 
mapTabPanel.hideTabStripItem(observationsPanel_fr10_ss_inf); 
mapTabPanel.hideTabStripItem(observationsPanel_fr5); 
mapTabPanel.hideTabStripItem(observationsPanel_fr5_ss_inf); 
mapTabPanel.hideTabStripItem(observationsPanel_comm); 
mapTabPanel.hideTabStripItem(observationsPanel_comm_ss_inf); 
mapTabPanel.hideTabStripItem(observationsPanel_utm); 
mapTabPanel.hideTabStripItem(observationsPanel_utm_ss_inf); 
mapTabPanel.setActiveTab(mapPanel);
if (datasetId_tax == '')
Ext.MessageBox.alert("Erreur !","Veuillez d'abord sélectionner un taxon");
		else	
		if (datasetId_tax != '') 
	
			{
			if ((taxons_communs_ss_inf.indexOf(datasetId_tax)>=0) && (datasetsynthese == '2' || datasetsynthese == '3'))		
			Ext.MessageBox.alert("Trop d'élements à afficher","Ce taxon est commun: seule la synthèse maille 10km est disponible");
			else
			if ((taxons_communs_av_inf.indexOf(datasetId_tax)>=0) && (datasetsynthese == '2' || datasetsynthese == '3') && datasetrang == '2')		
			Ext.MessageBox.alert("Trop d'élements à afficher","Ce taxon est commun: seule la synthèse maille 10km est disponible");
			else
			//cas synthese 10 + rang taxon choisi uniquement
			if (datasetsynthese == '1' && datasetrang == '1' )
				{
				southTabPanel.unhideTabStripItem(southPanel_fr10);
				southTabPanel.hideTabStripItem(southPanel_fr5);
				southTabPanel.hideTabStripItem(southPanel_comm);
				
				southTabPanel.unhideTabStripItem(southPanel_utm10);				
				southTabPanel.hideTabStripItem(southPanel_utm1);
				southTabPanel.hideTabStripItem(southPanel_comm_reunion);
								
				southTabPanel.hideTabStripItem(southPanel_taxon_fr10);
				southTabPanel.unhideTabStripItem(southPanel_taxon_fr10_ss_inf);
				southTabPanel.hideTabStripItem(southPanel_taxon_fr5);
				southTabPanel.hideTabStripItem(southPanel_taxon_fr5_ss_inf);
				southTabPanel.hideTabStripItem(southPanel_taxon_comm);
				southTabPanel.hideTabStripItem(southPanel_taxon_comm_ss_inf);
				
				southTabPanel.hideTabStripItem(southPanel_taxon_utm);
				southTabPanel.unhideTabStripItem(southPanel_taxon_utm_ss_inf);
				
				southTabPanel.setActiveTab(southPanel_fr10);
				
				synthese_fr10_layer.setVisibility(true);
				synthese_fr5_layer.setVisibility(false);
				synthese_commune_layer.setVisibility(false);
				
				synthese_utm10_layer.setVisibility(true);
				synthese_utm1_layer.setVisibility(false);
				synthese_commune_reunion_layer.setVisibility(false);
				
				Ext.getCmp('synthese_fr10_ss_inf').store.proxy.protocol.params.cd_ref = datasetId_tax;
				Ext.getCmp('synthese_fr10_ss_inf').store.load();
				Ext.getCmp('synthese_utm10_ss_inf').store.proxy.protocol.params.cd_ref = datasetId_tax;
				Ext.getCmp('synthese_utm10_ss_inf').store.load();
				Ext.getCmp('synthese_taxon_fr10_ss_inf').store.load({params: {cd_ref: datasetId_tax}});
				Ext.getCmp('synthese_taxon_utm_ss_inf').store.load({params: {cd_ref: datasetId_tax}});
				Ext.getCmp('commentaires_existants').store.load({params: {cd_ref: datasetId_tax}});
				if(typeof commentairepanel =='object'){commentairepanel.getForm().setValues({nom_complet:datasetNom_tax});}
				}
			else
			//cas synthese 10 + rang taxon choisi et inferieur
			if (datasetsynthese == '1' && datasetrang == '2' )
				{
				southTabPanel.unhideTabStripItem(southPanel_fr10);
				southTabPanel.hideTabStripItem(southPanel_fr5);
				southTabPanel.hideTabStripItem(southPanel_comm);
				
				southTabPanel.unhideTabStripItem(southPanel_utm10);				
				southTabPanel.hideTabStripItem(southPanel_utm1);
				southTabPanel.hideTabStripItem(southPanel_comm_reunion);
								
				southTabPanel.unhideTabStripItem(southPanel_taxon_fr10);
				southTabPanel.hideTabStripItem(southPanel_taxon_fr10_ss_inf);
				southTabPanel.hideTabStripItem(southPanel_taxon_fr5);
				southTabPanel.hideTabStripItem(southPanel_taxon_fr5_ss_inf);
				southTabPanel.hideTabStripItem(southPanel_taxon_comm);
				southTabPanel.hideTabStripItem(southPanel_taxon_comm_ss_inf);
				
				southTabPanel.unhideTabStripItem(southPanel_taxon_utm);
				southTabPanel.hideTabStripItem(southPanel_taxon_utm_ss_inf);
				
				southTabPanel.setActiveTab(southPanel_fr10);
				
				synthese_fr10_layer.setVisibility(true);
				synthese_fr5_layer.setVisibility(false);
				synthese_commune_layer.setVisibility(false);
				
				synthese_utm10_layer.setVisibility(true);
				synthese_utm1_layer.setVisibility(false);
				synthese_commune_reunion_layer.setVisibility(false);
				
				Ext.getCmp('synthese_fr10').store.proxy.protocol.params.cd_ref = datasetId_tax;
				Ext.getCmp('synthese_fr10').store.load();
				Ext.getCmp('synthese_utm10').store.proxy.protocol.params.cd_ref = datasetId_tax;
				Ext.getCmp('synthese_utm10').store.load();
				Ext.getCmp('synthese_taxon_fr10').store.load({params: {cd_ref: datasetId_tax}});
				Ext.getCmp('synthese_taxon_utm').store.load({params: {cd_ref: datasetId_tax}});
				Ext.getCmp('commentaires_existants').store.load({params: {cd_ref: datasetId_tax}});
				if(typeof commentairepanel =='object'){commentairepanel.getForm().setValues({nom_complet:datasetNom_tax});}			
				}
			else
			//cas synthese 5 + rang taxon choisi uniquement
			if (datasetsynthese == '2' && datasetrang == '1' )
			{
				southTabPanel.hideTabStripItem(southPanel_fr10);
				southTabPanel.unhideTabStripItem(southPanel_fr5);
				southTabPanel.hideTabStripItem(southPanel_comm);
				
				southTabPanel.hideTabStripItem(southPanel_utm10);				
				southTabPanel.unhideTabStripItem(southPanel_utm1);
				southTabPanel.hideTabStripItem(southPanel_comm_reunion);
								
				southTabPanel.hideTabStripItem(southPanel_taxon_fr10);
				southTabPanel.hideTabStripItem(southPanel_taxon_fr10_ss_inf);
				southTabPanel.hideTabStripItem(southPanel_taxon_fr5);
				southTabPanel.unhideTabStripItem(southPanel_taxon_fr5_ss_inf);
				southTabPanel.hideTabStripItem(southPanel_taxon_comm);
				southTabPanel.hideTabStripItem(southPanel_taxon_comm_ss_inf);
				
				southTabPanel.hideTabStripItem(southPanel_taxon_utm);
				southTabPanel.unhideTabStripItem(southPanel_taxon_utm_ss_inf);
				
				southTabPanel.setActiveTab(southPanel_fr5);
				
				synthese_fr10_layer.setVisibility(false);
				synthese_fr5_layer.setVisibility(true);
				synthese_commune_layer.setVisibility(false);
				
				synthese_utm10_layer.setVisibility(false);
				synthese_utm1_layer.setVisibility(true);
				synthese_commune_reunion_layer.setVisibility(false);
				
				Ext.getCmp('synthese_fr5_ss_inf').store.proxy.protocol.params.cd_ref = datasetId_tax;
				Ext.getCmp('synthese_fr5_ss_inf').store.load();
				Ext.getCmp('synthese_utm1_ss_inf').store.proxy.protocol.params.cd_ref = datasetId_tax;
				Ext.getCmp('synthese_utm1_ss_inf').store.load();
				Ext.getCmp('synthese_taxon_fr5_ss_inf').store.load({params: {cd_ref: datasetId_tax}});
				Ext.getCmp('synthese_taxon_utm_ss_inf').store.load({params: {cd_ref: datasetId_tax}});
				Ext.getCmp('commentaires_existants').store.load({params: {cd_ref: datasetId_tax}});
				if(typeof commentairepanel =='object'){commentairepanel.getForm().setValues({nom_complet:datasetNom_tax});}				
				}
			else
			//cas synthese 5 + rang taxon choisi et inferieur
			if (datasetsynthese == '2' && datasetrang == '2' )
				{			
				southTabPanel.hideTabStripItem(southPanel_fr10);
				southTabPanel.unhideTabStripItem(southPanel_fr5);
				southTabPanel.hideTabStripItem(southPanel_comm);
				
				southTabPanel.hideTabStripItem(southPanel_utm10);				
				southTabPanel.unhideTabStripItem(southPanel_utm1);
				southTabPanel.hideTabStripItem(southPanel_comm_reunion);
								
				southTabPanel.hideTabStripItem(southPanel_taxon_fr10);
				southTabPanel.hideTabStripItem(southPanel_taxon_fr10_ss_inf);
				southTabPanel.unhideTabStripItem(southPanel_taxon_fr5);
				southTabPanel.hideTabStripItem(southPanel_taxon_fr5_ss_inf);
				southTabPanel.hideTabStripItem(southPanel_taxon_comm);
				southTabPanel.hideTabStripItem(southPanel_taxon_comm_ss_inf);
				
				southTabPanel.unhideTabStripItem(southPanel_taxon_utm);
				southTabPanel.hideTabStripItem(southPanel_taxon_utm_ss_inf);
				
				southTabPanel.setActiveTab(southPanel_fr5);
				
				synthese_fr10_layer.setVisibility(false);
				synthese_fr5_layer.setVisibility(true);
				synthese_commune_layer.setVisibility(false);
				
				synthese_utm10_layer.setVisibility(false);
				synthese_utm1_layer.setVisibility(true);
				synthese_commune_reunion_layer.setVisibility(false);
				
				Ext.getCmp('synthese_fr5').store.proxy.protocol.params.cd_ref = datasetId_tax;
				Ext.getCmp('synthese_fr5').store.load();
				Ext.getCmp('synthese_utm1').store.proxy.protocol.params.cd_ref = datasetId_tax;
				Ext.getCmp('synthese_utm1').store.load();
				Ext.getCmp('synthese_taxon_fr5').store.load({params: {cd_ref: datasetId_tax}});
				Ext.getCmp('synthese_taxon_utm').store.load({params: {cd_ref: datasetId_tax}});
				Ext.getCmp('commentaires_existants').store.load({params: {cd_ref: datasetId_tax}});
				if(typeof commentairepanel =='object'){commentairepanel.getForm().setValues({nom_complet:datasetNom_tax});}
				}
			else
			//cas synthese commune + rang taxon choisi uniquement
			if (datasetsynthese == '3' && datasetrang == '1' )
				{
				southTabPanel.hideTabStripItem(southPanel_fr10);
				southTabPanel.hideTabStripItem(southPanel_fr5);
				southTabPanel.unhideTabStripItem(southPanel_comm);
				
				southTabPanel.hideTabStripItem(southPanel_utm10);				
				southTabPanel.hideTabStripItem(southPanel_utm1);
				southTabPanel.unhideTabStripItem(southPanel_comm_reunion);
								
				southTabPanel.hideTabStripItem(southPanel_taxon_fr10);
				southTabPanel.hideTabStripItem(southPanel_taxon_fr10_ss_inf);
				southTabPanel.hideTabStripItem(southPanel_taxon_fr5);
				southTabPanel.hideTabStripItem(southPanel_taxon_fr5_ss_inf);
				southTabPanel.hideTabStripItem(southPanel_taxon_comm);
				southTabPanel.unhideTabStripItem(southPanel_taxon_comm_ss_inf);
				
				southTabPanel.hideTabStripItem(southPanel_taxon_utm);
				southTabPanel.unhideTabStripItem(southPanel_taxon_utm_ss_inf);
				
				southTabPanel.setActiveTab(southPanel_comm);
				
				synthese_fr10_layer.setVisibility(false);
				synthese_fr5_layer.setVisibility(false);
				synthese_commune_layer.setVisibility(true);
				
				synthese_utm10_layer.setVisibility(false);
				synthese_utm1_layer.setVisibility(false);
				synthese_commune_reunion_layer.setVisibility(true);
				
				Ext.getCmp('synthese_comm_ss_inf').store.proxy.protocol.params.cd_ref = datasetId_tax;
				Ext.getCmp('synthese_comm_reunion_ss_inf').store.proxy.protocol.params.cd_ref = datasetId_tax;
				Ext.getCmp('synthese_comm_ss_inf').store.load();
				Ext.getCmp('synthese_comm_reunion_ss_inf').store.load();
				Ext.getCmp('synthese_taxon_comm_ss_inf').store.load({params: {cd_ref: datasetId_tax}});
				Ext.getCmp('synthese_taxon_utm_ss_inf').store.load({params: {cd_ref: datasetId_tax}});
				Ext.getCmp('commentaires_existants').store.load({params: {cd_ref: datasetId_tax}});
				if(typeof commentairepanel =='object'){commentairepanel.getForm().setValues({nom_complet:datasetNom_tax});}	
				}
			else
			//cas synthese commune + rang taxon choisi et inférieurs
			if (datasetsynthese == '3' && datasetrang == '2' )
				{
				southTabPanel.hideTabStripItem(southPanel_fr10);
				southTabPanel.hideTabStripItem(southPanel_fr5);
				southTabPanel.unhideTabStripItem(southPanel_comm);
				
				southTabPanel.hideTabStripItem(southPanel_utm10);				
				southTabPanel.hideTabStripItem(southPanel_utm1);
				southTabPanel.unhideTabStripItem(southPanel_comm_reunion);
								
				southTabPanel.hideTabStripItem(southPanel_taxon_fr10);
				southTabPanel.hideTabStripItem(southPanel_taxon_fr10_ss_inf);
				southTabPanel.hideTabStripItem(southPanel_taxon_fr5);
				southTabPanel.hideTabStripItem(southPanel_taxon_fr5_ss_inf);
				southTabPanel.unhideTabStripItem(southPanel_taxon_comm);
				southTabPanel.hideTabStripItem(southPanel_taxon_comm_ss_inf);
				
				southTabPanel.unhideTabStripItem(southPanel_taxon_utm);
				southTabPanel.hideTabStripItem(southPanel_taxon_utm_ss_inf);
				
				southTabPanel.setActiveTab(southPanel_comm);
				
				synthese_fr10_layer.setVisibility(false);
				synthese_fr5_layer.setVisibility(false);
				synthese_commune_layer.setVisibility(true);
				
				synthese_utm10_layer.setVisibility(false);
				synthese_utm1_layer.setVisibility(false);
				synthese_commune_reunion_layer.setVisibility(true);
				
				Ext.getCmp('synthese_comm').store.proxy.protocol.params.cd_ref = datasetId_tax;
				Ext.getCmp('synthese_comm').store.load();
				Ext.getCmp('synthese_comm_reunion').store.proxy.protocol.params.cd_ref = datasetId_tax;
				Ext.getCmp('synthese_comm_reunion').store.load();
				Ext.getCmp('synthese_taxon_comm').store.load({params: {cd_ref: datasetId_tax}});
				Ext.getCmp('synthese_taxon_utm').store.load({params: {cd_ref: datasetId_tax}});
				Ext.getCmp('commentaires_existants').store.load({params: {cd_ref: datasetId_tax}});
				if(typeof commentairepanel =='object'){commentairepanel.getForm().setValues({nom_complet:datasetNom_tax});}
				}													}												
// ferme function et bouton						
}
});

//Liste de case à cocher pour selectionner le rendu souhaité   
var radiogroup_visu= {
            xtype: 'radiogroup',
 //           fieldLabel: 'Single Column',
            itemCls: 'x-check-group-alt',
            columns: 1,
            items: [
                {boxLabel: 'Localisation avérée/interprétée', name: 'id_visu', inputValue: '1', checked: true},
                {boxLabel: "Nombre d'observations", name: 'id_visu', inputValue: '2'},
                {boxLabel: 'Rang taxonomique', name: 'id_visu', inputValue: '3'},
				{boxLabel: "Date d'observation", name: 'id_visu', inputValue: '4'}
            ]
        };
 
//Initialisation des variables (obligé de créer plusieurs legenPanel pour la réactualisation aprés changement du rendu)
var legendPanel4;
var legendPanel3;
var legendPanel2;

//Initialisation de la variable contenant le rendu actuel
var datasetRendu_actuel='1';

//Bouton pour modifier le rendu
var submitButton_rendu = new Ext.Button({
text : 'Modifier le rendu',
handler : function() {
//On récupere le type de rendu demandé dans la liste de case à cocher
var datasetRendu = visu_form.getForm().getValues()['id_visu'];
//Si le rendu demandé est deja affiché, on ne fait rien
if (datasetRendu == datasetRendu_actuel)
1==1;
else
if (datasetRendu == '1')
{
//On applique le style correspondant au rendu 1
synthese_commune_layer.styleMap = StyleMap_maille;
synthese_fr10_layer.styleMap = StyleMap_maille;
synthese_fr5_layer.styleMap = StyleMap_maille;
synthese_utm1_layer.styleMap = StyleMap_maille;
synthese_utm10_layer.styleMap = StyleMap_maille;
synthese_commune_reunion_layer.styleMap = StyleMap_maille;
//On redessine les layers (pas de rechargement et d'envoi de requete)
synthese_commune_layer.redraw(true);
synthese_fr10_layer.redraw(true);
synthese_fr5_layer.redraw(true);
synthese_commune_reunion_layer.redraw(true);
synthese_utm1_layer.redraw(true);
synthese_utm10_layer.redraw(true);
//On vide le westPanel2, contenant uniquement le LegendPanel
eastPanel_2.removeAll();
//On recréer un nouveau LegendPanel
var legendPanel1 = new GeoExt.LegendPanel({
			title : "Légende",
			defaults: {
				  labelCls: 'mylabel',
				  style: 'padding:5px',
				baseParams: {
				 FORMAT: 'image/png',
				  LEGEND_OPTIONS: 'forceLabels:on'
			        }	  
			        },
			//       FORMAT: 'image/png',
			        bodyStyle: 'padding:5px',
//			        width: 350,
			        autoScroll: true,
			        region: 'east'
			    });
//On charge la valeur 1 dans la variable contenant le rendu actuel
datasetRendu_actuel = '1';
//On affiche le nouveau legendPanel
eastPanel_2.add(legendPanel1);
eastPanel_2.show(legendPanel1); 
eastPanel_2.doLayout(legendPanel1);
}
		else
		if (datasetRendu == '2')
		{
		synthese_commune_layer.styleMap = StyleMap_maille2;
		synthese_fr10_layer.styleMap = StyleMap_maille2;
		synthese_fr5_layer.styleMap = StyleMap_maille2;
		synthese_utm1_layer.styleMap = StyleMap_maille2;
		synthese_utm10_layer.styleMap = StyleMap_maille2;
		synthese_commune_reunion_layer.styleMap = StyleMap_maille2;
		synthese_commune_layer.redraw(true);
		synthese_fr10_layer.redraw(true);	
		synthese_fr5_layer.redraw(true);
		synthese_commune_reunion_layer.redraw(true);
		synthese_utm1_layer.redraw(true);
		synthese_utm10_layer.redraw(true);
		eastPanel_2.removeAll();
		var legendPanel2 = new GeoExt.LegendPanel({
			title : "Légende",
			defaults: {
				  labelCls: 'mylabel',
				  style: 'padding:5px',
				baseParams: {
				 FORMAT: 'image/png',
				  LEGEND_OPTIONS: 'forceLabels:on'
			        }	  
			        },
			//       FORMAT: 'image/png',
			        bodyStyle: 'padding:5px',
//			        width: 350,
			        autoScroll: true,
			        region: 'east'
			    });
		datasetRendu_actuel = '2';
		eastPanel_2.add(legendPanel2);
		eastPanel_2.show(legendPanel2); 
		eastPanel_2.doLayout(legendPanel2);
		}
						else
						if (datasetRendu == '3') 
						{
						synthese_commune_layer.styleMap = StyleMap_maille3;
						synthese_fr10_layer.styleMap = StyleMap_maille3;
						synthese_fr5_layer.styleMap = StyleMap_maille3;
						synthese_utm1_layer.styleMap = StyleMap_maille3;
						synthese_utm10_layer.styleMap = StyleMap_maille3;
						synthese_commune_reunion_layer.styleMap = StyleMap_maille3;
						synthese_commune_layer.redraw(true);
						synthese_fr10_layer.redraw(true);	
						synthese_fr5_layer.redraw(true);
						synthese_commune_reunion_layer.redraw(true);
						synthese_utm1_layer.redraw(true);
						synthese_utm10_layer.redraw(true);
						eastPanel_2.removeAll();
						var legendPanel3 = new GeoExt.LegendPanel({
							title : "Légende",
							defaults: {
								  labelCls: 'mylabel',
								  style: 'padding:5px',
								baseParams: {
								 FORMAT: 'image/png',
								  LEGEND_OPTIONS: 'forceLabels:on'
							        }	  
							        },
							//       FORMAT: 'image/png',
							        bodyStyle: 'padding:5px',
//							        width: 350,
							        autoScroll: true,
							        region: 'east'
							    });
						datasetRendu_actuel = '3';
						eastPanel_2.add(legendPanel3);
						eastPanel_2.show(legendPanel3); 
						eastPanel_2.doLayout(legendPanel3);
						}
						else
						if (datasetRendu == '4') 
						{
						synthese_commune_layer.styleMap = StyleMap_maille4;
						synthese_fr10_layer.styleMap = StyleMap_maille4;
						synthese_fr5_layer.styleMap = StyleMap_maille4;
						synthese_utm1_layer.styleMap = StyleMap_maille4;
						synthese_utm10_layer.styleMap = StyleMap_maille4;
						synthese_commune_reunion_layer.styleMap = StyleMap_maille4;
						synthese_commune_layer.redraw(true);
						synthese_fr10_layer.redraw(true);	
						synthese_fr5_layer.redraw(true);
						synthese_commune_reunion_layer.redraw(true);
						synthese_utm1_layer.redraw(true);
						synthese_utm10_layer.redraw(true);
						eastPanel_2.removeAll();
						var legendPanel4 = new GeoExt.LegendPanel({
							title : "Légende",
							defaults: {
								  labelCls: 'mylabel',
								  style: 'padding:5px',
								baseParams: {
								 FORMAT: 'image/png',
								  LEGEND_OPTIONS: 'forceLabels:on'
							        }	  
							        },
							//       FORMAT: 'image/png',
							        bodyStyle: 'padding:5px',
//							        width: 350,
							        autoScroll: true,
							        region: 'east'
							    });
						datasetRendu_actuel = '4';
						eastPanel_2.add(legendPanel4);
						eastPanel_2.show(legendPanel4); 
						eastPanel_2.doLayout(legendPanel4);
						}											
// ferme function et bouton						
}
});



//FormPanel contenant uniquement la combobox de selection du taxon et le titre
var taxref_form = new Ext.FormPanel({
id : 'taxref_election',
title : "Sélection du taxon et options de synthèse",
frame : true,
width : '100%',
buttonAlign : 'center',
labelAlign : 'left',
hideLabel: true,
labelWidth : 1,
labelHigh : 100,
items: [bryo_combo,rang_combo,taxref_combo],
//buttons : [submitButton]
});

//FormPanel contenant la liste des cases à cocher pour le rang
var rang_form = new Ext.FormPanel({
id : 'rang_election',
//title : "Selection par commune",
frame : true,
width : '100%',
buttonAlign : 'center',
labelAlign : 'left',
labelWidth : 1,
items : [radiogroup_rang],
//buttons : [submitButton_synthese]
});

//FormPanel contenant la liste des cases à cocher pour la synthese et le bouton envoyer
var synthese_form = new Ext.FormPanel({
id : 'synthese_election',
//title : "Selection par commune",
frame : true,
width : '100%',
buttonAlign : 'center',
labelAlign : 'left',
labelWidth : 1,
items : [radiogroup_synthese],
buttons : [submitButton_synthese]
});

//FormPanel contenant la listes des cases à cocher pour le rendu et le bouton envoyer
var visu_form = new Ext.FormPanel({
id : 'visu_form',
title : "Sélection du rendu",
frame : true,
width : '100%',
buttonAlign : 'center',
labelAlign : 'left',
labelWidth : 1,
items : [radiogroup_visu],
buttons : [submitButton_rendu]
});


var strategy = new OpenLayers.Strategy.Cluster({distance: 15, threshold: 30});
var strategy2 = new OpenLayers.Strategy.BBOX;

function osm_getTileURL(bounds) {
var res = this.map.getResolution();
var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
var z = this.map.getZoom();
var limit = Math.pow(2, z);
 
if (y < 0 || y >= limit) {
return OpenLayers.Util.getImagesLocation() + "404.png";
} else {
x = ((x % limit) + limit) % limit;
return this.url + z + "/" + x + "/" + y + "." + this.type;
}
}

//Création des layers
var synthese_commune_layer = new OpenLayers.Layer.Vector("Répartition Communale", {visibility: false, displayInLayerSwitcher: true,hideInLegend:false});
var synthese_fr10_layer = new OpenLayers.Layer.Vector("Répartition Maille 10*10 INPN", {visibility: false, displayInLayerSwitcher: true});
var synthese_fr5_layer = new OpenLayers.Layer.Vector("Répartition Maille 5*5 INPN", {visibility: false, displayInLayerSwitcher: true});	
var synthese_commune_reunion_layer = new OpenLayers.Layer.Vector("Répartition Communale", {visibility: false, displayInLayerSwitcher: true});
var synthese_utm1_layer = new OpenLayers.Layer.Vector("Répartition Maille 1*1 utm", {visibility: false, displayInLayerSwitcher: true});	
var synthese_utm10_layer = new OpenLayers.Layer.Vector("Répartition Maille 10*10 utm", {visibility: false, displayInLayerSwitcher: true});

//Création du store contenant les données de synthese communale metropole avec ranf inferieur
var synthese_comm_store = new GeoExt.data.FeatureStore({
layer: synthese_commune_layer,
idProperty: 'numstage',
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'insee_comm', type: 'string'},
{name: 'nom_comm', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
{name: 'noms_taxon', type: 'string'},
{name: 'nb_tax_n1', type: 'int'},
{name: 'nb_tax_n2', type: 'int'},
],
//Envoi de la requete recupérant les données
proxy: new GeoExt.data.ProtocolProxy({
protocol: new OpenLayers.Protocol.HTTP({
url: queryroute+"synthese_comm",
method: 'GET',
//timeout: 120000,
params: {cd_ref: Ext.getCmp('taxref_combo').getValue()},
format: new OpenLayers.Format.GeoJSON(),
//strategies: [new OpenLayers.Strategy.BBOX(),new OpenLayers.Strategy.Cluster()]
})
})
});

//Création du store contenant les données de synthese communale metropole sans rang inferieur
var synthese_comm_store_ss_inf = new GeoExt.data.FeatureStore({
layer: synthese_commune_layer,
idProperty: 'numstage',
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'insee_comm', type: 'string'},
{name: 'nom_comm', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
{name: 'noms_taxon', type: 'string'},
{name: 'nb_tax_n1', type: 'int'},
{name: 'nb_tax_n2', type: 'int'},
],
//Envoi de la requete recupérant les données
proxy: new GeoExt.data.ProtocolProxy({
protocol: new OpenLayers.Protocol.HTTP({
url: queryroute+"synthese_comm_ss_inf",
method: 'GET',
params: {cd_ref: Ext.getCmp('taxref_combo').getValue()},
format: new OpenLayers.Format.GeoJSON(),
//strategies: [new OpenLayers.Strategy.Fixed(),new OpenLayers.Strategy.Cluster()]
})
})
});

//Création du store contenant les données de synthese communale Reunion
var synthese_comm_reunion_store = new GeoExt.data.FeatureStore({
layer: synthese_commune_reunion_layer,
idProperty: 'numstage',
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'insee_comm', type: 'string'},
{name: 'nom_comm', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
{name: 'noms_taxon', type: 'string'},
{name: 'nb_tax_n1', type: 'int'},
{name: 'nb_tax_n2', type: 'int'},
],
proxy: new GeoExt.data.ProtocolProxy({
protocol: new OpenLayers.Protocol.HTTP({
url: queryroute+"synthese_comm_reunion",
method: 'GET',
params: {cd_ref: Ext.getCmp('taxref_combo').getValue()},
format: new OpenLayers.Format.GeoJSON(),
//strategies: [new OpenLayers.Strategy.Fixed(),new OpenLayers.Strategy.Cluster()]
})
})
});

//Création du store contenant les données de synthese communale Reunion sans rang inférieur
var synthese_comm_reunion_store_ss_inf = new GeoExt.data.FeatureStore({
layer: synthese_commune_reunion_layer,
idProperty: 'numstage',
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'insee_comm', type: 'string'},
{name: 'nom_comm', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
{name: 'noms_taxon', type: 'string'},
{name: 'nb_tax_n1', type: 'int'},
{name: 'nb_tax_n2', type: 'int'},
],
proxy: new GeoExt.data.ProtocolProxy({
protocol: new OpenLayers.Protocol.HTTP({
url: queryroute+"synthese_comm_reunion_ss_inf",
method: 'GET',
params: {cd_ref: Ext.getCmp('taxref_combo').getValue()},
format: new OpenLayers.Format.GeoJSON(),
//strategies: [new OpenLayers.Strategy.Fixed(),new OpenLayers.Strategy.Cluster()]
})
})
});

//Création du store contenant les données de synthese maille 10 sans rang inférieur
var synthese_fr10_store_ss_inf = new GeoExt.data.FeatureStore({
layer: synthese_fr10_layer,
idProperty: 'numstage',
fields: [
{name: 'cd_sig', type: 'string'},
{name: 'cd_ref', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
{name: 'noms_taxon', type: 'string'},
{name: 'nb_tax_n1', type: 'int'},
{name: 'nb_tax_n2', type: 'int'},
],
proxy: new GeoExt.data.ProtocolProxy({
protocol: new OpenLayers.Protocol.HTTP({
url: queryroute+"synthese_fr10_ss_inf",
method: 'GET',
params: {cd_ref: Ext.getCmp('taxref_combo').getValue()},
format: new OpenLayers.Format.GeoJSON(),
//strategies: [new OpenLayers.Strategy.Fixed(),new OpenLayers.Strategy.Cluster()]
})
})
});

//Création du store contenant les données de synthese maille 10 avec rang inférieur
var synthese_fr10_store = new GeoExt.data.FeatureStore({
layer: synthese_fr10_layer,
idProperty: 'numstage',
fields: [
{name: 'cd_sig', type: 'string'},
{name: 'cd_ref', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
{name: 'noms_taxon', type: 'string'},
{name: 'nb_tax_n1', type: 'int'},
{name: 'nb_tax_n2', type: 'int'},
],
proxy: new GeoExt.data.ProtocolProxy({
protocol: new OpenLayers.Protocol.HTTP({
url: queryroute+"synthese_fr10",
method: 'GET',
params: {cd_ref: Ext.getCmp('taxref_combo').getValue()},
format: new OpenLayers.Format.GeoJSON(),
//strategies: [new OpenLayers.Strategy.Fixed(),new OpenLayers.Strategy.Cluster()]
})
})
});

//Création du store contenant les données de synthese maille 5 avec rang inferieur
var synthese_fr5_store = new GeoExt.data.FeatureStore({
layer: synthese_fr5_layer,
idProperty: 'numstage',
fields: [
{name: 'cd_sig', type: 'string'},
{name: 'cd_ref', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
{name: 'noms_taxon', type: 'string'},
{name: 'nb_tax_n1', type: 'int'},
{name: 'nb_tax_n2', type: 'int'},
],
proxy: new GeoExt.data.ProtocolProxy({
protocol: new OpenLayers.Protocol.HTTP({
url: queryroute+"synthese_fr5",
method: 'GET',
params: {cd_ref: Ext.getCmp('taxref_combo').getValue()},
format: new OpenLayers.Format.GeoJSON(),
// strategies: [new OpenLayers.Strategy.Fixed(),new OpenLayers.Strategy.Cluster()]
})
})
});

//Création du store contenant les données de synthese maille 5 sans rang inferieur
var synthese_fr5_store_ss_inf = new GeoExt.data.FeatureStore({
layer: synthese_fr5_layer,
idProperty: 'numstage',
fields: [
{name: 'cd_sig', type: 'string'},
{name: 'cd_ref', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
{name: 'noms_taxon', type: 'string'},
{name: 'nb_tax_n1', type: 'int'},
{name: 'nb_tax_n2', type: 'int'},
],
proxy: new GeoExt.data.ProtocolProxy({
protocol: new OpenLayers.Protocol.HTTP({
url: queryroute+"synthese_fr5_ss_inf",
method: 'GET',
params: {cd_ref: Ext.getCmp('taxref_combo').getValue()},
format: new OpenLayers.Format.GeoJSON(),
// strategies: [new OpenLayers.Strategy.Fixed(),new OpenLayers.Strategy.Cluster()]
})
})
});

//Création du store contenant les données de synthese maille 1 Réunion avec rang inférieur
var synthese_utm1_store = new GeoExt.data.FeatureStore({
layer: synthese_utm1_layer,
idProperty: 'numstage',
fields: [
{name: 'cd_sig', type: 'string'},
{name: 'cd_ref', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
{name: 'noms_taxon', type: 'string'},
{name: 'nb_tax_n1', type: 'int'},
{name: 'nb_tax_n2', type: 'int'},
],
proxy: new GeoExt.data.ProtocolProxy({
protocol: new OpenLayers.Protocol.HTTP({
url: queryroute+"synthese_utm1",
method: 'GET',
params: {cd_ref: Ext.getCmp('taxref_combo').getValue()},
format: new OpenLayers.Format.GeoJSON(),
// strategies: [new OpenLayers.Strategy.Fixed(),new OpenLayers.Strategy.Cluster()]
})
})
});

//Création du store contenant les données de synthese maille 1 Réunion sans rang inférieur
var synthese_utm1_store_ss_inf = new GeoExt.data.FeatureStore({
layer: synthese_utm1_layer,
idProperty: 'numstage',
fields: [
{name: 'cd_sig', type: 'string'},
{name: 'cd_ref', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
{name: 'noms_taxon', type: 'string'},
{name: 'nb_tax_n1', type: 'int'},
{name: 'nb_tax_n2', type: 'int'},
],
proxy: new GeoExt.data.ProtocolProxy({
protocol: new OpenLayers.Protocol.HTTP({
url: queryroute+"synthese_utm1_ss_inf",
method: 'GET',
params: {cd_ref: Ext.getCmp('taxref_combo').getValue()},
format: new OpenLayers.Format.GeoJSON(),
// strategies: [new OpenLayers.Strategy.Fixed(),new OpenLayers.Strategy.Cluster()]
})
})
});

//Création du store contenant les données de synthese maille 10 Réunion avec rang inférieur
var synthese_utm10_store = new GeoExt.data.FeatureStore({
layer: synthese_utm10_layer,
idProperty: 'numstage',
fields: [
{name: 'cd_sig', type: 'string'},
{name: 'cd_ref', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
{name: 'noms_taxon', type: 'string'},
{name: 'nb_tax_n1', type: 'int'},
{name: 'nb_tax_n2', type: 'int'},
],
proxy: new GeoExt.data.ProtocolProxy({
protocol: new OpenLayers.Protocol.HTTP({
url: queryroute+"synthese_utm10",
method: 'GET',
params: {cd_ref: Ext.getCmp('taxref_combo').getValue()},
format: new OpenLayers.Format.GeoJSON(),
// strategies: [new OpenLayers.Strategy.Fixed(),new OpenLayers.Strategy.Cluster()]
})
})
});

//Création du store contenant les données de synthese maille 10 Réunion sans rang inférieur
var synthese_utm10_store_ss_inf = new GeoExt.data.FeatureStore({
layer: synthese_utm10_layer,
idProperty: 'numstage',
fields: [
{name: 'cd_sig', type: 'string'},
{name: 'cd_ref', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
{name: 'noms_taxon', type: 'string'},
{name: 'nb_tax_n1', type: 'int'},
{name: 'nb_tax_n2', type: 'int'},
],
proxy: new GeoExt.data.ProtocolProxy({
protocol: new OpenLayers.Protocol.HTTP({
url: queryroute+"synthese_utm10_ss_inf",
method: 'GET',
params: {cd_ref: Ext.getCmp('taxref_combo').getValue()},
format: new OpenLayers.Format.GeoJSON(),
// strategies: [new OpenLayers.Strategy.Fixed(),new OpenLayers.Strategy.Cluster()]
})
})
});

//Création du store contenant les données de synthese par taxon pour maille fr5
var synthese_taxon_fr5_store= new Ext.data.JsonStore({
//layer: synthese_taxon_layer,
idProperty: 'numstage2',
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'nom_complet', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
],
proxy : new Ext.data.HttpProxy({
url: queryroute+"synthese_taxon_fr5",
method: 'GET',
}),
root : 'rows',
});

//Création du store contenant les données de synthese par taxon pour maille fr5 sans rang inferieur
var synthese_taxon_fr5_ss_inf_store= new Ext.data.JsonStore({
idProperty: 'numstage2',
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'nom_complet', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
],
proxy : new Ext.data.HttpProxy({
url: queryroute+"synthese_taxon_fr5_ss_inf",
method: 'GET',
}),
root : 'rows',
});

//Création du store contenant les données de synthese par taxon pour maille fr10
var synthese_taxon_fr10_store= new Ext.data.JsonStore({
//layer: synthese_taxon_layer,
idProperty: 'numstage2',
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'nom_complet', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
],
proxy : new Ext.data.HttpProxy({
url: queryroute+"synthese_taxon_fr10",
method: 'GET',
}),
root : 'rows',
});

//Création du store contenant les données de synthese par taxon pour maille fr10 sans rang inferieur
var synthese_taxon_fr10_ss_inf_store= new Ext.data.JsonStore({
idProperty: 'numstage2',
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'nom_complet', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
],
proxy : new Ext.data.HttpProxy({
url: queryroute+"synthese_taxon_fr10_ss_inf",
method: 'GET',
}),
root : 'rows',
});

//Création du store contenant les données de synthese par taxon pour commune
var synthese_taxon_comm_store= new Ext.data.JsonStore({
//layer: synthese_taxon_layer,
idProperty: 'numstage2',
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'nom_complet', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
],
proxy : new Ext.data.HttpProxy({
url: queryroute+"synthese_taxon_comm",
method: 'GET',
}),
root : 'rows',
});

//Création du store contenant les données de synthese par taxon pour commune sans rang inferieur
var synthese_taxon_comm_store_ss_inf= new Ext.data.JsonStore({
idProperty: 'numstage2',
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'nom_complet', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
],
proxy : new Ext.data.HttpProxy({
url: queryroute+"synthese_taxon_comm_ss_inf",
method: 'GET',
}),
root : 'rows',
});

//Création du store contenant les données de synthese par taxon pour reunion 
var synthese_taxon_utm_store= new Ext.data.JsonStore({
//layer: synthese_taxon_layer,
idProperty: 'numstage2',
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'nom_complet', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
],
proxy : new Ext.data.HttpProxy({
url: queryroute+"synthese_taxon_utm",
method: 'GET',
}),
root : 'rows',
});

//Création du store contenant les données de synthese par taxon pour reunion sans rang inferieur
var synthese_taxon_utm_ss_inf_store= new Ext.data.JsonStore({
idProperty: 'numstage2',
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'nom_complet', type: 'string'},
{name: 'nb_obs', type: 'int'},
{name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'nb_obs_2001_2013', type: 'int'},
{name: 'nb_obs_averee', type: 'int'},
{name: 'nb_obs_interpretee', type: 'int'},
],
proxy : new Ext.data.HttpProxy({
url: queryroute+"synthese_taxon_utm_ss_inf",
method: 'GET',
}),
root : 'rows',
});

//Création du store contenant les observations fr10
var observation_fr10_store = new Ext.data.JsonStore({
//layer: observations_layer,
//root: 'rows',
//id: 'test2',
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'nom_complet', type: 'string'},
{name: 'nom_taxon_mere', type: 'string'},
{name: 'date_debut_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_fin_obs', type: 'date', dateFormat: 'Y-m-d'},
  {name: 'code_taxon_mere', type: 'integer'},
  {name: 'referentiel_mere', type: 'string'},
  {name: 'nom_taxon_originel', type: 'string'},
  {name: 'remarque_taxon', type: 'string'},
 {name: 'libelle_statut_pop', type: 'string'},
 {name: 'libelle_court_bd_mere', type: 'string'},
  {name: 'libelle_usage_donnee', type: 'string'},
  {name: 'libelle_court_bd_source', type: 'string'},
  {name: 'id_flore_source', type: 'string'},
  {name: 'remarque_donnee_mere', type: 'string'},
  {name: 'libelle_nature_date', type: 'string'},
  {name: 'remarque_date', type: 'string'},
  {name: 'remarque_lieu', type: 'string'},
  {name: 'libelle_type_source', type: 'string'},
  {name: 'type_doc', type: 'string'},
  {name: 'cote_biblio_cbn', type: 'integer'},
  {name: 'titre_do', type: 'string'},
  {name: 'annee_doc', type: 'integer'},
  {name: 'auteur_doc', type: 'string'},
  {name: 'ref_doc', type: 'string'},
  {name: 'code_herbarium', type: 'string'},
  {name: 'code_index_herbariorum', type: 'string'},
  {name: 'nom_herbarium', type: 'string'},
  {name: 'code_herbier', type: 'string'},
  {name: 'nom_herbier', type: 'string'},
  {name: 'part_herbier', type: 'string'},
  {name: 'id_part', type: 'string'},
  {name: 'cote_biblio_bd_mere', type: 'string'},
  {name: 'date_transmission', type: 'date', dateFormat: 'Y-m-d'},
  {name: 'id_flore_mere', type: 'string'},
  {name: 'id_flore_fcbn', type: 'string'},
  {name: 'cd_sig', type: 'string'},
  {name: 'libelle_type_localisation', type: 'string'},
  {name: 'libelle_type_rattachement', type: 'string'}
],
proxy : new Ext.data.HttpProxy({
url: queryroute+"observation_fr10",
method: 'GET',
}),
root : 'rows',
});

//Création du store contenant les observations fr10 sans inf
var observation_fr10_store_ss_inf = new Ext.data.JsonStore({
//layer: observations_layer,
//root: 'rows',
//id: 'test2',
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'nom_complet', type: 'string'},
{name: 'nom_taxon_mere', type: 'string'},
{name: 'date_debut_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_fin_obs', type: 'date', dateFormat: 'Y-m-d'},
  {name: 'code_taxon_mere', type: 'integer'},
  {name: 'referentiel_mere', type: 'string'},
  {name: 'nom_taxon_originel', type: 'string'},
  {name: 'remarque_taxon', type: 'string'},
 {name: 'libelle_statut_pop', type: 'string'},
 {name: 'libelle_court_bd_mere', type: 'string'},
  {name: 'libelle_usage_donnee', type: 'string'},
  {name: 'libelle_court_bd_source', type: 'string'},
  {name: 'id_flore_source', type: 'string'},
  {name: 'remarque_donnee_mere', type: 'string'},
  {name: 'libelle_nature_date', type: 'string'},
  {name: 'remarque_date', type: 'string'},
  {name: 'remarque_lieu', type: 'string'},
  {name: 'libelle_type_source', type: 'string'},
  {name: 'type_doc', type: 'string'},
  {name: 'cote_biblio_cbn', type: 'integer'},
  {name: 'titre_do', type: 'string'},
  {name: 'annee_doc', type: 'integer'},
  {name: 'auteur_doc', type: 'string'},
  {name: 'ref_doc', type: 'string'},
  {name: 'code_herbarium', type: 'string'},
  {name: 'code_index_herbariorum', type: 'string'},
  {name: 'nom_herbarium', type: 'string'},
  {name: 'code_herbier', type: 'string'},
  {name: 'nom_herbier', type: 'string'},
  {name: 'part_herbier', type: 'string'},
  {name: 'id_part', type: 'string'},
  {name: 'cote_biblio_bd_mere', type: 'string'},
  {name: 'date_transmission', type: 'date', dateFormat: 'Y-m-d'},
  {name: 'id_flore_mere', type: 'string'},
  {name: 'id_flore_fcbn', type: 'string'},
  {name: 'cd_sig', type: 'string'},
  {name: 'libelle_type_localisation', type: 'string'},
  {name: 'libelle_type_rattachement', type: 'string'}
],
proxy : new Ext.data.HttpProxy({
url: queryroute+"observation_fr10_ss_inf",
method: 'GET',
}),
root : 'rows',
});

//Création du store contenant les observations fr5
var observation_fr5_store = new Ext.data.JsonStore({
//layer: observations_layer,
//root: 'rows',
//id: 'test2',
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'nom_complet', type: 'string'},
{name: 'nom_taxon_mere', type: 'string'},
{name: 'date_debut_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_fin_obs', type: 'date', dateFormat: 'Y-m-d'},
  {name: 'code_taxon_mere', type: 'integer'},
  {name: 'referentiel_mere', type: 'string'},
  {name: 'nom_taxon_originel', type: 'string'},
  {name: 'remarque_taxon', type: 'string'},
 {name: 'libelle_statut_pop', type: 'string'},
 {name: 'libelle_court_bd_mere', type: 'string'},
  {name: 'libelle_usage_donnee', type: 'string'},
  {name: 'libelle_court_bd_source', type: 'string'},
  {name: 'id_flore_source', type: 'string'},
  {name: 'remarque_donnee_mere', type: 'string'},
  {name: 'libelle_nature_date', type: 'string'},
  {name: 'remarque_date', type: 'string'},
  {name: 'remarque_lieu', type: 'string'},
  {name: 'libelle_type_source', type: 'string'},
  {name: 'type_doc', type: 'string'},
  {name: 'cote_biblio_cbn', type: 'integer'},
  {name: 'titre_do', type: 'string'},
  {name: 'annee_doc', type: 'integer'},
  {name: 'auteur_doc', type: 'string'},
  {name: 'ref_doc', type: 'string'},
  {name: 'code_herbarium', type: 'string'},
  {name: 'code_index_herbariorum', type: 'string'},
  {name: 'nom_herbarium', type: 'string'},
  {name: 'code_herbier', type: 'string'},
  {name: 'nom_herbier', type: 'string'},
  {name: 'part_herbier', type: 'string'},
  {name: 'id_part', type: 'string'},
  {name: 'cote_biblio_bd_mere', type: 'string'},
  {name: 'date_transmission', type: 'date', dateFormat: 'Y-m-d'},
  {name: 'id_flore_mere', type: 'string'},
  {name: 'id_flore_fcbn', type: 'string'},
  {name: 'cd_sig', type: 'string'},
  {name: 'libelle_type_localisation', type: 'string'},
  {name: 'libelle_type_rattachement', type: 'string'}
],
proxy : new Ext.data.HttpProxy({
url: queryroute+"observation_fr5",
method: 'GET',
}),
root : 'rows',
});

//Création du store contenant les observations fr5 sans inf
var observation_fr5_store_ss_inf = new Ext.data.JsonStore({
//layer: observations_layer,
//root: 'rows',
//id: 'test2',
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'nom_complet', type: 'string'},
{name: 'nom_taxon_mere', type: 'string'},
{name: 'date_debut_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_fin_obs', type: 'date', dateFormat: 'Y-m-d'},
  {name: 'code_taxon_mere', type: 'integer'},
  {name: 'referentiel_mere', type: 'string'},
  {name: 'nom_taxon_originel', type: 'string'},
  {name: 'remarque_taxon', type: 'string'},
 {name: 'libelle_statut_pop', type: 'string'},
 {name: 'libelle_court_bd_mere', type: 'string'},
  {name: 'libelle_usage_donnee', type: 'string'},
  {name: 'libelle_court_bd_source', type: 'string'},
  {name: 'id_flore_source', type: 'string'},
  {name: 'remarque_donnee_mere', type: 'string'},
  {name: 'libelle_nature_date', type: 'string'},
  {name: 'remarque_date', type: 'string'},
  {name: 'remarque_lieu', type: 'string'},
  {name: 'libelle_type_source', type: 'string'},
  {name: 'type_doc', type: 'string'},
  {name: 'cote_biblio_cbn', type: 'integer'},
  {name: 'titre_do', type: 'string'},
  {name: 'annee_doc', type: 'integer'},
  {name: 'auteur_doc', type: 'string'},
  {name: 'ref_doc', type: 'string'},
  {name: 'code_herbarium', type: 'string'},
  {name: 'code_index_herbariorum', type: 'string'},
  {name: 'nom_herbarium', type: 'string'},
  {name: 'code_herbier', type: 'string'},
  {name: 'nom_herbier', type: 'string'},
  {name: 'part_herbier', type: 'string'},
  {name: 'id_part', type: 'string'},
  {name: 'cote_biblio_bd_mere', type: 'string'},
  {name: 'date_transmission', type: 'date', dateFormat: 'Y-m-d'},
  {name: 'id_flore_mere', type: 'string'},
  {name: 'id_flore_fcbn', type: 'string'},
  {name: 'cd_sig', type: 'string'},
  {name: 'libelle_type_localisation', type: 'string'},
  {name: 'libelle_type_rattachement', type: 'string'}
],
proxy : new Ext.data.HttpProxy({
url: queryroute+"observation_fr5_ss_inf",
method: 'GET',
}),
root : 'rows',
});

//Création du store contenant les observations commune
var observation_comm_store = new Ext.data.JsonStore({
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'nom_complet', type: 'string'},
{name: 'nom_taxon_mere', type: 'string'},
{name: 'date_debut_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_fin_obs', type: 'date', dateFormat: 'Y-m-d'},
  {name: 'code_taxon_mere', type: 'integer'},
  {name: 'referentiel_mere', type: 'string'},
  {name: 'nom_taxon_originel', type: 'string'},
  {name: 'remarque_taxon', type: 'string'},
 {name: 'libelle_statut_pop', type: 'string'},
 {name: 'libelle_court_bd_mere', type: 'string'},
  {name: 'libelle_usage_donnee', type: 'string'},
  {name: 'libelle_court_bd_source', type: 'string'},
  {name: 'id_flore_source', type: 'string'},
  {name: 'remarque_donnee_mere', type: 'string'},
  {name: 'libelle_nature_date', type: 'string'},
  {name: 'remarque_date', type: 'string'},
  {name: 'remarque_lieu', type: 'string'},
  {name: 'libelle_type_source', type: 'string'},
  {name: 'type_doc', type: 'string'},
  {name: 'cote_biblio_cbn', type: 'integer'},
  {name: 'titre_do', type: 'string'},
  {name: 'annee_doc', type: 'integer'},
  {name: 'auteur_doc', type: 'string'},
  {name: 'ref_doc', type: 'string'},
  {name: 'code_herbarium', type: 'string'},
  {name: 'code_index_herbariorum', type: 'string'},
  {name: 'nom_herbarium', type: 'string'},
  {name: 'code_herbier', type: 'string'},
  {name: 'nom_herbier', type: 'string'},
  {name: 'part_herbier', type: 'string'},
  {name: 'id_part', type: 'string'},
  {name: 'cote_biblio_bd_mere', type: 'string'},
  {name: 'date_transmission', type: 'date', dateFormat: 'Y-m-d'},
  {name: 'id_flore_mere', type: 'string'},
  {name: 'id_flore_fcbn', type: 'string'},
  {name: 'insee_comm', type: 'string'},
  {name: 'nom_comm', type: 'string'},
  {name: 'libelle_type_localisation', type: 'string'},
  {name: 'libelle_type_rattachement', type: 'string'}
],
proxy : new Ext.data.HttpProxy({
url: queryroute+"observation_comm",
method: 'GET',
}),
root : 'rows',
});

//Création du store contenant les observations commune sans inf
var observation_comm_store_ss_inf = new Ext.data.JsonStore({
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'nom_complet', type: 'string'},
{name: 'nom_taxon_mere', type: 'string'},
{name: 'date_debut_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_fin_obs', type: 'date', dateFormat: 'Y-m-d'},
  {name: 'code_taxon_mere', type: 'integer'},
  {name: 'referentiel_mere', type: 'string'},
  {name: 'nom_taxon_originel', type: 'string'},
  {name: 'remarque_taxon', type: 'string'},
 {name: 'libelle_statut_pop', type: 'string'},
 {name: 'libelle_court_bd_mere', type: 'string'},
  {name: 'libelle_usage_donnee', type: 'string'},
  {name: 'libelle_court_bd_source', type: 'string'},
  {name: 'id_flore_source', type: 'string'},
  {name: 'remarque_donnee_mere', type: 'string'},
  {name: 'libelle_nature_date', type: 'string'},
  {name: 'remarque_date', type: 'string'},
  {name: 'remarque_lieu', type: 'string'},
  {name: 'libelle_type_source', type: 'string'},
  {name: 'type_doc', type: 'string'},
  {name: 'cote_biblio_cbn', type: 'integer'},
  {name: 'titre_do', type: 'string'},
  {name: 'annee_doc', type: 'integer'},
  {name: 'auteur_doc', type: 'string'},
  {name: 'ref_doc', type: 'string'},
  {name: 'code_herbarium', type: 'string'},
  {name: 'code_index_herbariorum', type: 'string'},
  {name: 'nom_herbarium', type: 'string'},
  {name: 'code_herbier', type: 'string'},
  {name: 'nom_herbier', type: 'string'},
  {name: 'part_herbier', type: 'string'},
  {name: 'id_part', type: 'string'},
  {name: 'cote_biblio_bd_mere', type: 'string'},
  {name: 'date_transmission', type: 'date', dateFormat: 'Y-m-d'},
  {name: 'id_flore_mere', type: 'string'},
  {name: 'id_flore_fcbn', type: 'string'},
  {name: 'cd_sig', type: 'string'},
  {name: 'libelle_type_localisation', type: 'string'},
  {name: 'libelle_type_rattachement', type: 'string'}
],
proxy : new Ext.data.HttpProxy({
url: queryroute+"observation_comm_ss_inf",
method: 'GET',
}),
root : 'rows',
});

//Création du store contenant les observations utm
var observation_utm_store = new Ext.data.JsonStore({
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'nom_complet', type: 'string'},
{name: 'nom_taxon_mere', type: 'string'},
{name: 'date_debut_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_fin_obs', type: 'date', dateFormat: 'Y-m-d'},
  {name: 'code_taxon_mere', type: 'integer'},
  {name: 'referentiel_mere', type: 'string'},
  {name: 'nom_taxon_originel', type: 'string'},
  {name: 'remarque_taxon', type: 'string'},
 {name: 'libelle_statut_pop', type: 'string'},
 {name: 'libelle_court_bd_mere', type: 'string'},
  {name: 'libelle_usage_donnee', type: 'string'},
  {name: 'libelle_court_bd_source', type: 'string'},
  {name: 'id_flore_source', type: 'string'},
  {name: 'remarque_donnee_mere', type: 'string'},
  {name: 'libelle_nature_date', type: 'string'},
  {name: 'remarque_date', type: 'string'},
  {name: 'remarque_lieu', type: 'string'},
  {name: 'libelle_type_source', type: 'string'},
  {name: 'type_doc', type: 'string'},
  {name: 'cote_biblio_cbn', type: 'integer'},
  {name: 'titre_do', type: 'string'},
  {name: 'annee_doc', type: 'integer'},
  {name: 'auteur_doc', type: 'string'},
  {name: 'ref_doc', type: 'string'},
  {name: 'code_herbarium', type: 'string'},
  {name: 'code_index_herbariorum', type: 'string'},
  {name: 'nom_herbarium', type: 'string'},
  {name: 'code_herbier', type: 'string'},
  {name: 'nom_herbier', type: 'string'},
  {name: 'part_herbier', type: 'string'},
  {name: 'id_part', type: 'string'},
  {name: 'cote_biblio_bd_mere', type: 'string'},
  {name: 'date_transmission', type: 'date', dateFormat: 'Y-m-d'},
  {name: 'id_flore_mere', type: 'string'},
  {name: 'id_flore_fcbn', type: 'string'},
  {name: 'cd_sig', type: 'string'},
  {name: 'libelle_type_localisation', type: 'string'},
  {name: 'libelle_type_rattachement', type: 'string'}
],
proxy : new Ext.data.HttpProxy({
url: queryroute+"observation_utm",
method: 'GET',
}),
root : 'rows',
});

//Création du store contenant les observations utm sans inf
var observation_utm_store_ss_inf = new Ext.data.JsonStore({
fields: [
{name: 'cd_ref', type: 'string'},
{name: 'nom_complet', type: 'string'},
{name: 'nom_taxon_mere', type: 'string'},
{name: 'date_debut_obs', type: 'date', dateFormat: 'Y-m-d'},
{name: 'date_fin_obs', type: 'date', dateFormat: 'Y-m-d'},
  {name: 'code_taxon_mere', type: 'integer'},
  {name: 'referentiel_mere', type: 'string'},
  {name: 'nom_taxon_originel', type: 'string'},
  {name: 'remarque_taxon', type: 'string'},
 {name: 'libelle_statut_pop', type: 'string'},
 {name: 'libelle_court_bd_mere', type: 'string'},
  {name: 'libelle_usage_donnee', type: 'string'},
  {name: 'libelle_court_bd_source', type: 'string'},
  {name: 'id_flore_source', type: 'string'},
  {name: 'remarque_donnee_mere', type: 'string'},
  {name: 'libelle_nature_date', type: 'string'},
  {name: 'remarque_date', type: 'string'},
  {name: 'remarque_lieu', type: 'string'},
  {name: 'libelle_type_source', type: 'string'},
  {name: 'type_doc', type: 'string'},
  {name: 'cote_biblio_cbn', type: 'integer'},
  {name: 'titre_do', type: 'string'},
  {name: 'annee_doc', type: 'integer'},
  {name: 'auteur_doc', type: 'string'},
  {name: 'ref_doc', type: 'string'},
  {name: 'code_herbarium', type: 'string'},
  {name: 'code_index_herbariorum', type: 'string'},
  {name: 'nom_herbarium', type: 'string'},
  {name: 'code_herbier', type: 'string'},
  {name: 'nom_herbier', type: 'string'},
  {name: 'part_herbier', type: 'string'},
  {name: 'id_part', type: 'string'},
  {name: 'cote_biblio_bd_mere', type: 'string'},
  {name: 'date_transmission', type: 'date', dateFormat: 'Y-m-d'},
  {name: 'id_flore_mere', type: 'string'},
  {name: 'id_flore_fcbn', type: 'string'},
  {name: 'cd_sig', type: 'string'},
  {name: 'libelle_type_localisation', type: 'string'},
  {name: 'libelle_type_rattachement', type: 'string'}
],
proxy : new Ext.data.HttpProxy({
url: queryroute+"observation_utm_ss_inf",
method: 'GET',
}),
root : 'rows',
});

//Store qui va contenir les commentaires deja dans la base
var commentaires_existants_store = new Ext.data.JsonStore({
//url : 'commentaires_existants.php',
fields : ['nom', 'comment','prenom','email','type_com','action_com','priorite_com','utilisateur','date_com','cd_ref','id_obj','id_flore_fcbn','nom_complet'],
proxy : new Ext.data.HttpProxy({
url: queryroute+"commentaires_existants",
method: 'GET',
}),
root : 'rows',
});

// var observation_taxon_store = new GeoExt.data.FeatureStore({
// id: 'test',
// fields: [
// {name: 'cd_ref', type: 'string'},
// {name: 'insee_comm', type: 'string'},
// {name: 'nom_comm', type: 'string'},
// {name: 'nom_complet', type: 'string'},
// {name: 'nom_taxon_mere', type: 'string'},
// {name: 'libelle_court_bd_mere', type: 'string'},
// {name: 'nb_obs', type: 'int'},
// {name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
// {name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
// {name: 'nb_obs_2001_2013', type: 'int'},
// {name: 'nb_obs_averee', type: 'int'},
// {name: 'nb_obs_interpretee', type: 'int'},
// ],
// proxy: new GeoExt.data.ProtocolProxy({
// protocol: new OpenLayers.Protocol.HTTP({
// url: "observation_taxon.php",
// method: 'GET',
// //params: {insee_comm: Ext.getCmp('commune_combo').getValue()},
// params: {cd_ref: Ext.getCmp('taxref_combo').getValue()},
// format: new OpenLayers.Format.GeoJSON(),
// strategies: [new OpenLayers.Strategy.Fixed(),new OpenLayers.Strategy.Fixed()]
// })
// })
// });

// var observation_commune_store = new GeoExt.data.FeatureStore({
// //layer: observations_layer,
// //root: 'rows',
// id: 'test3',
// fields: [
// {name: 'cd_ref', type: 'string'},
// {name: 'insee_comm', type: 'string'},
// {name: 'nom_comm', type: 'string'},
// {name: 'nom_complet', type: 'string'},
// {name: 'nom_taxon_mere', type: 'string'},
// {name: 'libelle_court_bd_mere', type: 'string'},
// {name: 'nb_obs', type: 'int'},
// {name: 'date_premiere_obs', type: 'date', dateFormat: 'Y-m-d'},
// {name: 'date_derniere_obs', type: 'date', dateFormat: 'Y-m-d'},
// {name: 'nb_obs_2001_2013', type: 'int'},
// {name: 'nb_obs_averee', type: 'int'},
// {name: 'nb_obs_interpretee', type: 'int'},
// ],
// proxy: new GeoExt.data.ProtocolProxy({
// protocol: new OpenLayers.Protocol.HTTP({
// url: "observation_comm.php",
// timeout: 120000,
// method: 'GET',
// //params: {insee_comm: Ext.getCmp('commune_combo').getValue()},
// //params: {cd_ref: Ext.getCmp('taxref_combo').getValue()},
// format: new OpenLayers.Format.GeoJSON(),
// strategies: [new OpenLayers.Strategy.Fixed(),new OpenLayers.Strategy.Fixed()]
// })
// })
// });

// var synthese_taxon_store = new GeoExt.data.FeatureStore({
// layer: synthese_commune_layer,
// idProperty: 'numstage',
// fields: [
// {name: 'cd_ref', type: 'string'},
// {name: 'nom_comm', type: 'string'},
// {name: 'nb_obs', type: 'int'},
// {name: 'date_debut_obs', type: 'date', dateFormat: 'Y-m-d'},
// {name: 'date_fin_obs', type: 'date', dateFormat: 'Y-m-d'},
// {name: 'nb_obs_2001_2013', type: 'int'},
// {name: 'nb_obs_averee', type: 'int'},
// {name: 'nb_obs_interpretee', type: 'int'},
// ],
// proxy: new GeoExt.data.ProtocolProxy({
// protocol: new OpenLayers.Protocol.HTTP({
// url: "observation_comm.php",
// method: 'GET',
// params: {insee_comm: feature.attributes.insee_comm,
// format: new OpenLayers.Format.GeoJSON({
                            // externalProjection: new OpenLayers.Projection("EPSG:2154"),
                            // internalProject: new OpenLayers.Projection("EPSG:900913")
                        // }),
// })
// })
// });

//Création des icones de chargement pour les stores
new Ext.LoadMask(Ext.getBody(),{msg:'Chargement des données', store: synthese_comm_store});
//new Ext.LoadMask(Ext.getBody(),{msg:'Chargement des données', store: synthese_taxon_comm_store});
//new Ext.LoadMask(Ext.getBody(),{msg:'Chargement des données', store: commentaires_existants_store});
new Ext.LoadMask(Ext.getBody(),{msg:'Chargement des données', store: synthese_comm_store_ss_inf});
new Ext.LoadMask(Ext.getBody(),{msg:'Chargement des données', store: synthese_fr5_store_ss_inf});
new Ext.LoadMask(Ext.getBody(),{msg:'Chargement des données', store: synthese_fr5_store});
new Ext.LoadMask(Ext.getBody(),{msg:'Chargement des données', store: synthese_fr10_store});
new Ext.LoadMask(Ext.getBody(),{msg:'Chargement des données', store: synthese_fr10_store_ss_inf});
new Ext.LoadMask(Ext.getBody(),{msg:'Chargement des données', store: observation_fr10_store});
new Ext.LoadMask(Ext.getBody(),{msg:'Chargement des données', store: observation_fr10_store_ss_inf});
new Ext.LoadMask(Ext.getBody(),{msg:'Chargement des données', store: observation_fr5_store});
new Ext.LoadMask(Ext.getBody(),{msg:'Chargement des données', store: observation_fr5_store_ss_inf});
new Ext.LoadMask(Ext.getBody(),{msg:'Chargement des données', store: observation_comm_store});
new Ext.LoadMask(Ext.getBody(),{msg:'Chargement des données', store: observation_comm_store_ss_inf});
new Ext.LoadMask(Ext.getBody(),{msg:'Chargement des données', store: observation_utm_store});
new Ext.LoadMask(Ext.getBody(),{msg:'Chargement des données', store: observation_utm_store_ss_inf});



//Modèle de grille pour la synthese communale
var synthese_comm_GridModel = new Ext.grid.ColumnModel({
columns: [
new Ext.grid.RowNumberer(),
{
id : "insee_comm",
header : "Insee",
width : 60,
dataIndex : "insee_comm",
sortable: true,
}
,
{
id : "nom_comm",
header : "Commune",
width : 150,
dataIndex : "nom_comm",
sortable: true,
}
,
{
id : "cd_ref",
header : "Code TaxRef",
width : 80,
dataIndex : "cd_ref",
sortable: true,
}
,
{
id : "noms_taxon",
header : "Nom(s) du(des) taxon(s)",
width : 250,
sortable: true,
dataIndex : "noms_taxon",
}
,
{
id : "nb_obs",
header : "Nb observations",
width : 120,
dataIndex : "nb_obs",
sortable: true,
align: 'center'
}
,
{
id : "date_premiere_obs",
header : "Date première obs.",
width : 120,
dataIndex : "date_premiere_obs",
sortable: true,
align: 'center',
renderer: Ext.util.Format.dateRenderer('Y-m-d')
}
,
{
id : "date_derniere_obs",
header : "Date dernière obs.",
width : 120,
dataIndex : "date_derniere_obs",
sortable: true,
align: 'center',
renderer: Ext.util.Format.dateRenderer('Y-m-d')
}
,
{
id : "nb_tax_n1",
header : "Nb taxon rang choisi",
width : 120,
sortable: true,
align: 'center',
dataIndex : "nb_tax_n1",
}
,
{
id : "nb_tax_n2",
header : "Nb taxon rangs inf.",
align: 'center',
width : 120,
sortable: true,
dataIndex : "nb_tax_n2",
}
,
{
id : "nb_obs_2001_2013",
header : "Nb obs. date≥2000",
width : 120,
align: 'center',
sortable: true,
dataIndex : "nb_obs_2001_2013",
}
,
{
id : "nb_obs_averee",
header : "Nb obs. loc. avérée",
width : 120,
align: 'center',
sortable: true,
dataIndex : "nb_obs_averee",
}
,
{
id : "nb_obs_interpretee",
header : "Nb obs. loc. interprétée",
width : 120,
align: 'center',
sortable: true,
dataIndex : "nb_obs_interpretee",
}
]
});

//Modèle de grille pour les synthèse à la maille
var synthese_maille_GridModel = new Ext.grid.ColumnModel({
columns: [
new Ext.grid.RowNumberer(),
{
id : "cd_sig",
header : "Code maille",
width : 110,
dataIndex : "cd_sig",
sortable: true,
}
,
{
id : "cd_ref",
header : "Code TaxRef",
width : 80,
dataIndex : "cd_ref",
sortable: true,
}
,
{
id : "noms_taxon",
header : "Nom(s) du(des) taxon(s)",
width : 250,
sortable: true,
dataIndex : "noms_taxon",
}
,
{
id : "nb_obs",
header : "Nb observations",
width : 120,
dataIndex : "nb_obs",
sortable: true,
align: 'center'
}
,
{
id : "date_premiere_obs",
header : "Date première obs.",
width : 120,
dataIndex : "date_premiere_obs",
sortable: true,
align: 'center',
renderer: Ext.util.Format.dateRenderer('Y-m-d')
}
,
{
id : "date_derniere_obs",
header : "Date dernière obs.",
width : 120,
dataIndex : "date_derniere_obs",
sortable: true,
align: 'center',
renderer: Ext.util.Format.dateRenderer('Y-m-d')
}
,
{
id : "nb_tax_n1",
header : "Nb taxon rang choisi",
width : 120,
sortable: true,
align: 'center',
dataIndex : "nb_tax_n1",
}
,
{
id : "nb_tax_n2",
header : "Nb taxon rangs inf.",
align: 'center',
width : 120,
sortable: true,
dataIndex : "nb_tax_n2",
}
,
{
id : "nb_obs_2001_2013",
header : "Nb obs. date≥2000",
width : 120,
align: 'center',
sortable: true,
dataIndex : "nb_obs_2001_2013",
}
,
{
id : "nb_obs_averee",
header : "Nb obs. loc. avérée",
width : 120,
align: 'center',
sortable: true,
dataIndex : "nb_obs_averee",
}
,
{
id : "nb_obs_interpretee",
header : "Nb obs. loc. interprétée",
width : 120,
align: 'center',
sortable: true,
dataIndex : "nb_obs_interpretee",
}
]
});

//Modèle de grille pour la synthese par taxon
var synthese_taxon_GridModel = new Ext.grid.ColumnModel({
columns: [
new Ext.grid.RowNumberer(),
{
id : "cd_ref",
header : "Code TaxRef",
width : 80,
dataIndex : "cd_ref",
sortable: true,
}
,
{
id : "nom_complet",
header : "Nom du taxon",
width : 250,
dataIndex : "nom_complet",
sortable: true,
}
,
{
id : "nb_obs",
header : "Nb observations",
width : 120,
align: 'center',
dataIndex : "nb_obs",
sortable: true,
}
,
{
id : "date_premiere_obs",
header : "Date première obs.",
width : 120,
align: 'center',
dataIndex : "date_premiere_obs",
sortable: true,
renderer: Ext.util.Format.dateRenderer('Y-m-d')
}
,
{
id : "date_derniere_obs",
header : "Date dernière obs.",
width : 120,
align: 'center',
dataIndex : "date_derniere_obs",
sortable: true,
renderer: Ext.util.Format.dateRenderer('Y-m-d')
}
,
{
id : "nb_obs_2001_2013",
header : "Nombre d'obs date≥2000",
width : 120,
align: 'center',
sortable: true,
dataIndex : "nb_obs_2001_2013",
}
,
{
id : "nb_obs_averee",
header : "Nombre d'obs avérée",
width : 120,
align: 'center',
sortable: true,
dataIndex : "nb_obs_averee",
}
,
{
id : "nb_obs_interpretee",
header : "Nombre d'obs interpretee",
width : 120,
align: 'center',
sortable: true,
dataIndex : "nb_obs_interpretee",
}
]
});

 //Modèle de grille pour les observations commune
var observation_GridModel_comm = new Ext.grid.ColumnModel({
columns: [
new Ext.grid.RowNumberer(),
{
id : "id_flore_mere",
header : "ID flore mère",
width : 80,
dataIndex : "id_flore_mere",
sortable: true,
}
,
{
id : "cd_ref",
header : "Code TaxRef",
width : 80,
dataIndex : "cd_ref",
sortable: true,
}
,
{
id : "nom_complet",
header : "Nom TaxRef V5",
width : 200,
dataIndex : "nom_complet",
sortable: true,
}
,
{
id : "insee_comm",
header : "Code Insee",
width : 80,
dataIndex : "insee_comm",
sortable: true,
}
,
{
id : "nom_comm",
header : "Nom Commune",
width : 150,
dataIndex : "nom_comm",
sortable: true,
}
,
{
id : "libelle_type_localisation",
header : "Type localisation",
width : 80,
dataIndex : "libelle_type_localisation",
sortable: true,
}
,
{
id : "libelle_type_rattachement",
header : "Type rattachement",
width : 80,
dataIndex : "libelle_type_rattachement",
sortable: true,
}
,
{
id : "date_debut_obs",
header : "Date début obs",
width : 90,
dataIndex : "date_debut_obs",
sortable: true,
renderer: Ext.util.Format.dateRenderer('Y-m-d')
}
,
{
id : "date_fin_obs",
header : "Date fin obs",
width : 90,
dataIndex : "date_fin_obs",
sortable: true,
renderer: Ext.util.Format.dateRenderer('Y-m-d')
}
,
{
id : "libelle_nature_date",
header : "Nature date",
width : 80,
dataIndex : "libelle_nature_date",
sortable: true,
}
,
{
id : "libelle_type_source",
header : "Type source",
width : 80,
dataIndex : "libelle_type_source",
sortable: true,
}
,
{
id : "remarque_date",
header : "Remarque date",
width : 80,
dataIndex : "remarque_date",
sortable: true,
}
,
{
id : "nom_taxon_mere",
header : "Nom taxon bd mère",
width : 200,
dataIndex : "nom_taxon_mere",
sortable: true,
}
,
{
id : "code_taxon_mere",
header : "Code taxon bd mère",
width : 80,
dataIndex : "code_taxon_mere",
sortable: true,
}
,
{
id : "referentiel_mere",
header : "Referentiel bd mère",
width : 150,
dataIndex : "referentiel_mere",
sortable: true,
}
,
{
id : "nom_taxon_originel",
header : "Nom taxon originel",
width : 150,
dataIndex : "nom_taxon_originel",
sortable: true,
}
,
{
id : "remarque_taxon",
header : "Remarque taxon",
width : 80,
dataIndex : "remarque_taxon",
sortable: true,
}
,
{
id : "date_transmission",
header : "Date transmission",
width : 80,
dataIndex : "date_transmission",
sortable: true,
renderer: Ext.util.Format.dateRenderer('Y-m-d')
}
,
{
id : "libelle_statut_pop",
header : "Statut population",
width : 150,
dataIndex : "libelle_statut_pop",
sortable: true,
}
,
{
id : "libelle_court_bd_mere",
header : "BD mère",
width : 150,
dataIndex : "libelle_court_bd_mere",
sortable: true,
}
,
{
id : "libelle_usage_donnee",
header : "Usage donnée",
width : 150,
dataIndex : "libelle_usage_donnee",
sortable: true,
}
,
{
id : "libelle_court_bd_source",
header : "BD source",
width : 80,
dataIndex : "libelle_court_bd_source",
sortable: true,
}
,
{
id : "id_flore_source",
header : "ID flore source",
width : 80,
dataIndex : "id_flore_source",
sortable: true,
}
,
{
id : "remarque_donnee_mere",
header : "Remarque donnee mère",
width : 80,
dataIndex : "remarque_donnee_mere",
sortable: true,
}

,
{
id : "remarque_lieu",
header : "Remarque_lieu",
width : 80,
dataIndex : "remarque_lieu",
sortable: true,
}

,
{
id : "type_doc",
header : "Type doc",
width : 80,
dataIndex : "type_doc",
sortable: true,
}
,
{
id : "cote_biblio_cbn",
header : "Cote biblio cbn",
width : 80,
dataIndex : "cote_biblio_cbn",
sortable: true,
}
,
{
id : "titre_doc",
header : "Titre doc",
width : 80,
dataIndex : "titre_doc",
sortable: true,
}
,
{
id : "annee_doc",
header : "Année doc",
width : 80,
dataIndex : "annee_doc",
sortable: true,
}
,
{
id : "auteur_doc",
header : "Auteur doc",
width : 80,
dataIndex : "auteur_doc",
sortable: true,
}
,
{
id : "ref_doc",
header : "Ref doc",
width : 80,
dataIndex : "ref_doc",
sortable: true,
}
,
{
id : "code_herbarium",
header : "Code herbarium",
width : 80,
dataIndex : "code_herbarium",
sortable: true,
}
,
{
id : "code_index_herbariorum",
header : "Code index herbariorum",
width : 80,
dataIndex : "code_index_herbariorum",
sortable: true,
}
,
{
id : "nom_herbarium",
header : "Nom herbarium",
width : 80,
dataIndex : "nom_herbarium",
sortable: true,
}
,
{
id : "code_herbier",
header : "Code herbier",
width : 80,
dataIndex : "code_herbier",
sortable: true,
}
,
{
id : "nom_herbier",
header : "Nom herbier",
width : 80,
dataIndex : "nom_herbier",
sortable: true,
}
,
{
id : "part_herbier",
header : "Part herbier",
width : 80,
dataIndex : "part_herbier",
sortable: true,
}
,
{
id : "id_part",
header : "ID part",
width : 80,
dataIndex : "id_part",
sortable: true,
}
,
{
id : "cote_biblio_bd_mere",
header : "Cote biblio bd mère",
width : 80,
dataIndex : "cote_biblio_bd_mere",
sortable: true,
}

]
});

 //Modèle de grille pour les observations maille
var observation_GridModel = new Ext.grid.ColumnModel({
columns: [
new Ext.grid.RowNumberer(),
{
id : "id_flore_mere",
header : "ID flore mère",
width : 80,
dataIndex : "id_flore_mere",
sortable: true,
}
,
{
id : "cd_ref",
header : "Code TaxRef",
width : 80,
dataIndex : "cd_ref",
sortable: true,
}
,
{
id : "nom_complet",
header : "Nom TaxRef V5",
width : 200,
dataIndex : "nom_complet",
sortable: true,
}
,
{
id : "cd_sig",
header : "Code Maille",
width : 110,
dataIndex : "cd_sig",
sortable: true,
}
,
{
id : "libelle_type_localisation",
header : "Type localisation",
width : 80,
dataIndex : "libelle_type_localisation",
sortable: true,
}
,
{
id : "libelle_type_rattachement",
header : "Type rattachement",
width : 80,
dataIndex : "libelle_type_rattachement",
sortable: true,
}
,
{
id : "date_debut_obs",
header : "Date début obs",
width : 90,
dataIndex : "date_debut_obs",
sortable: true,
renderer: Ext.util.Format.dateRenderer('Y-m-d')
}
,
{
id : "date_fin_obs",
header : "Date fin obs",
width : 90,
dataIndex : "date_fin_obs",
sortable: true,
renderer: Ext.util.Format.dateRenderer('Y-m-d')
}
,
{
id : "libelle_nature_date",
header : "Nature date",
width : 80,
dataIndex : "libelle_nature_date",
sortable: true,
}
,
{
id : "libelle_type_source",
header : "Type source",
width : 80,
dataIndex : "libelle_type_source",
sortable: true,
}
,
{
id : "remarque_date",
header : "Remarque date",
width : 80,
dataIndex : "remarque_date",
sortable: true,
}
,
{
id : "nom_taxon_mere",
header : "Nom taxon bd mère",
width : 200,
dataIndex : "nom_taxon_mere",
sortable: true,
}
,
{
id : "code_taxon_mere",
header : "Code taxon bd mère",
width : 80,
dataIndex : "code_taxon_mere",
sortable: true,
}
,
{
id : "referentiel_mere",
header : "Referentiel bd mère",
width : 150,
dataIndex : "referentiel_mere",
sortable: true,
}
,
{
id : "nom_taxon_originel",
header : "Nom taxon originel",
width : 150,
dataIndex : "nom_taxon_originel",
sortable: true,
}
,
{
id : "remarque_taxon",
header : "Remarque taxon",
width : 80,
dataIndex : "remarque_taxon",
sortable: true,
}
,
{
id : "date_transmission",
header : "Date transmission",
width : 80,
dataIndex : "date_transmission",
sortable: true,
renderer: Ext.util.Format.dateRenderer('Y-m-d')
}
,
{
id : "libelle_statut_pop",
header : "Statut population",
width : 150,
dataIndex : "libelle_statut_pop",
sortable: true,
}
,
{
id : "libelle_court_bd_mere",
header : "BD mère",
width : 150,
dataIndex : "libelle_court_bd_mere",
sortable: true,
}
,
{
id : "libelle_usage_donnee",
header : "Usage donnée",
width : 150,
dataIndex : "libelle_usage_donnee",
sortable: true,
}
,
{
id : "libelle_court_bd_source",
header : "BD source",
width : 80,
dataIndex : "libelle_court_bd_source",
sortable: true,
}
,
{
id : "id_flore_source",
header : "ID flore source",
width : 80,
dataIndex : "id_flore_source",
sortable: true,
}
,
{
id : "remarque_donnee_mere",
header : "Remarque donnee mère",
width : 80,
dataIndex : "remarque_donnee_mere",
sortable: true,
}

,
{
id : "remarque_lieu",
header : "Remarque_lieu",
width : 80,
dataIndex : "remarque_lieu",
sortable: true,
}

,
{
id : "type_doc",
header : "Type doc",
width : 80,
dataIndex : "type_doc",
sortable: true,
}
,
{
id : "cote_biblio_cbn",
header : "Cote biblio cbn",
width : 80,
dataIndex : "cote_biblio_cbn",
sortable: true,
}
,
{
id : "titre_doc",
header : "Titre doc",
width : 80,
dataIndex : "titre_doc",
sortable: true,
}
,
{
id : "annee_doc",
header : "Année doc",
width : 80,
dataIndex : "annee_doc",
sortable: true,
}
,
{
id : "auteur_doc",
header : "Auteur doc",
width : 80,
dataIndex : "auteur_doc",
sortable: true,
}
,
{
id : "ref_doc",
header : "Ref doc",
width : 80,
dataIndex : "ref_doc",
sortable: true,
}
,
{
id : "code_herbarium",
header : "Code herbarium",
width : 80,
dataIndex : "code_herbarium",
sortable: true,
}
,
{
id : "code_index_herbariorum",
header : "Code index herbariorum",
width : 80,
dataIndex : "code_index_herbariorum",
sortable: true,
}
,
{
id : "nom_herbarium",
header : "Nom herbarium",
width : 80,
dataIndex : "nom_herbarium",
sortable: true,
}
,
{
id : "code_herbier",
header : "Code herbier",
width : 80,
dataIndex : "code_herbier",
sortable: true,
}
,
{
id : "nom_herbier",
header : "Nom herbier",
width : 80,
dataIndex : "nom_herbier",
sortable: true,
}
,
{
id : "part_herbier",
header : "Part herbier",
width : 80,
dataIndex : "part_herbier",
sortable: true,
}
,
{
id : "id_part",
header : "ID part",
width : 80,
dataIndex : "id_part",
sortable: true,
}
,
{
id : "cote_biblio_bd_mere",
header : "Cote biblio bd mère",
width : 80,
dataIndex : "cote_biblio_bd_mere",
sortable: true,
}

]
});

//Modèle de grille pour les commentaires
var comment_GridModel = new Ext.grid.ColumnModel({
columns: [
new Ext.grid.RowNumberer(),
{
id : "nom_complet",
header : "Nom taxon",
width : 250,
dataIndex : "nom_complet",
sortable: true,
}
,
{
id : "id_obj",
header : "Code maille / insee",
width : 110,
dataIndex : "id_obj",
sortable: true,
}
,
{
id : "id_flore_fcbn",
header : "Code de l'observation",
width : 110,
dataIndex : "id_flore_fcbn",
sortable: true,
}
,
{
id : "utilisateur",
header : "Utilisateur",
width : 80,
dataIndex : "utilisateur",
sortable: true,
}
,
{
id : "comment",
header : "Commentaires",
width : 250,
dataIndex : "comment",
sortable: true,
}
,
{
id : "prenom",
header : "Prénom",
width : 80,
height:100,
dataIndex : "prenom",
sortable: true,
}
,
{
id : "nom",
header : "Nom",
width : 80,
dataIndex : "nom",
sortable: true,
}
,
{
id : "date_com",
header : "Date",
width : 80,
dataIndex : "date_com",
sortable: true,
renderer: Ext.util.Format.dateRenderer('Y-m-d')
}
,
{
id : "type_com",
header : "Type commentaire",
width : 80,
dataIndex : "type_com",
sortable: true,
}
,
{
id : "priorite_com",
header : "Priorité",
width : 80,
sortable: true,
dataIndex : "priorite_com",
}
,
{
id : "action_com",
header : "Action demandée",
width : 80,
sortable: true,
dataIndex : "action_com",
}
]
});


//Création du gridPanel pour la synthese communale metropole avec rang inferieur
var gridPanel_comm = new Ext.grid.GridPanel({
id : 'synthese_comm',
border: false,
stripeRows: true,
store : synthese_comm_store,
colModel: synthese_comm_GridModel,
sm: new GeoExt.grid.FeatureSelectionModel({
selectControl : {boxKey : "shiftKey"}
})
});

//Création du gridPanel pour la synthese communale metropole sans rang inférieur
var gridPanel_comm_ss_inf = new Ext.grid.GridPanel({
id : 'synthese_comm_ss_inf',
border: false,
stripeRows: true,
store : synthese_comm_store_ss_inf,
colModel: synthese_comm_GridModel,
sm: new GeoExt.grid.FeatureSelectionModel({
selectControl : {boxKey : "shiftKey"}
})
});

//Création du gridPanel pour la synthese communale réunion
var gridPanel_comm_reunion = new Ext.grid.GridPanel({
id : 'synthese_comm_reunion',
border: false,
stripeRows: true,
store : synthese_comm_reunion_store,
colModel: synthese_comm_GridModel,
sm: new GeoExt.grid.FeatureSelectionModel({
selectControl : {boxKey : "shiftKey"}
})
});

//Création du gridPanel pour la synthese communale réunion sans rang inférieur
var gridPanel_comm_reunion_ss_inf = new Ext.grid.GridPanel({
id : 'synthese_comm_reunion_ss_inf',
border: false,
stripeRows: true,
store : synthese_comm_reunion_store_ss_inf,
colModel: synthese_comm_GridModel,
sm: new GeoExt.grid.FeatureSelectionModel({
selectControl : {boxKey : "shiftKey"}
})
});

//Création du gridPanel pour la synthese maille 10 avec rang inferieur
var gridPanel_fr10 = new Ext.grid.GridPanel({
id : 'synthese_fr10',
border: false,
stripeRows: true,
store : synthese_fr10_store,
colModel: synthese_maille_GridModel,
sm: new GeoExt.grid.FeatureSelectionModel({
selectControl : {boxKey : "shiftKey"}
})
});

//Création du gridPanel pour la synthese maille 10 ss rang inf
var gridPanel_fr10_ss_inf = new Ext.grid.GridPanel({
id : 'synthese_fr10_ss_inf',
border: false,
stripeRows: true,
store : synthese_fr10_store_ss_inf,
colModel: synthese_maille_GridModel,
sm: new GeoExt.grid.FeatureSelectionModel({
selectControl : {boxKey : "shiftKey"}
})
});

//Création du gridPanel pour la synthese maille 5 avec rang inferieur
var gridPanel_fr5 = new Ext.grid.GridPanel({
id : 'synthese_fr5',
border: false,
stripeRows: true,
store : synthese_fr5_store,
colModel: synthese_maille_GridModel,
sm: new GeoExt.grid.FeatureSelectionModel({
selectControl : {boxKey : "shiftKey"}
})
});

//Création du gridPanel pour la synthese maille 5 sans rang inférieur
var gridPanel_fr5_ss_inf = new Ext.grid.GridPanel({
id : 'synthese_fr5_ss_inf',
border: false,
stripeRows: true,
store : synthese_fr5_store_ss_inf,
colModel: synthese_maille_GridModel,
sm: new GeoExt.grid.FeatureSelectionModel({
selectControl : {boxKey : "shiftKey"}
})
});

//Création du gridPanel pour la synthese maille 1 reunion avec rang inférieur
var gridPanel_utm1 = new Ext.grid.GridPanel({
id : 'synthese_utm1',
border: false,
stripeRows: true,
store : synthese_utm1_store,
colModel: synthese_maille_GridModel,
// sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
sm: new GeoExt.grid.FeatureSelectionModel({
selectControl : {boxKey : "shiftKey"}
})
});

//Création du gridPanel pour la synthese maille 1 reunion sans rang inférieur
var gridPanel_utm1_ss_inf = new Ext.grid.GridPanel({
id : 'synthese_utm1_ss_inf',
border: false,
stripeRows: true,
store : synthese_utm1_store_ss_inf,
colModel: synthese_maille_GridModel,
// sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
sm: new GeoExt.grid.FeatureSelectionModel({
selectControl : {boxKey : "shiftKey"}
})
});

//Création du gridPanel pour la synthese maille 10 reunion avec rang inférieur
var gridPanel_utm10 = new Ext.grid.GridPanel({
id : 'synthese_utm10',
border: false,
stripeRows: true,
store : synthese_utm10_store,
colModel: synthese_maille_GridModel,
// sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
sm: new GeoExt.grid.FeatureSelectionModel({
selectControl : {boxKey : "shiftKey"}
})
});

//Création du gridPanel pour la synthese maille 10 reunion sans rang inférieur
var gridPanel_utm10_ss_inf = new Ext.grid.GridPanel({
id : 'synthese_utm10_ss_inf',
border: false,
stripeRows: true,
store : synthese_utm10_store_ss_inf,
colModel: synthese_maille_GridModel,
// sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
sm: new GeoExt.grid.FeatureSelectionModel({
selectControl : {boxKey : "shiftKey"}
})
});



//Création du gridPanel pour la synthese par taxon fr5 ss ranf inférieur
var gridPanel_taxon_fr5_ss_inf = new Ext.grid.GridPanel({
id : 'synthese_taxon_fr5_ss_inf',
border: false,
stripeRows: true,
store : synthese_taxon_fr5_ss_inf_store,
colModel: synthese_taxon_GridModel,
sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
});

//Création du gridPanel pour la synthese par taxon fr5
var gridPanel_taxon_fr5 = new Ext.grid.GridPanel({
id : 'synthese_taxon_fr5',
border: false,
stripeRows: true,
store : synthese_taxon_fr5_store,
colModel: synthese_taxon_GridModel,
sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
});

//Création du gridPanel pour la synthese par taxon fr10 ss inf
var gridPanel_taxon_fr10_ss_inf = new Ext.grid.GridPanel({
id : 'synthese_taxon_fr10_ss_inf',
border: false,
stripeRows: true,
store : synthese_taxon_fr10_ss_inf_store,
colModel: synthese_taxon_GridModel,
sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
});

//Création du gridPanel pour la synthese par taxon fr10
var gridPanel_taxon_fr10 = new Ext.grid.GridPanel({
id : 'synthese_taxon_fr10',
border: false,
stripeRows: true,
store : synthese_taxon_fr10_store,
colModel: synthese_taxon_GridModel,
sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
});

//Création du gridPanel pour la synthese par taxon commune ss inf
var gridPanel_taxon_comm_ss_inf = new Ext.grid.GridPanel({
id : 'synthese_taxon_comm_ss_inf',
border: false,
stripeRows: true,
store : synthese_taxon_comm_store_ss_inf,
colModel: synthese_taxon_GridModel,
sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
});

//Création du gridPanel pour la synthese par taxon commune
var gridPanel_taxon_comm = new Ext.grid.GridPanel({
id : 'synthese_taxon_comm',
border: false,
stripeRows: true,
store : synthese_taxon_comm_store,
colModel: synthese_taxon_GridModel,
sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
});

//Création du gridPanel pour la synthese par taxon utm ss inf
var gridPanel_taxon_utm_ss_inf = new Ext.grid.GridPanel({
id : 'synthese_taxon_utm_ss_inf',
border: false,
stripeRows: true,
store : synthese_taxon_utm_ss_inf_store,
colModel: synthese_taxon_GridModel,
sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
});

//Création du gridPanel pour la synthese par taxon utm
var gridPanel_taxon_utm = new Ext.grid.GridPanel({
id : 'synthese_taxon_utm',
border: false,
stripeRows: true,
store : synthese_taxon_utm_store,
colModel: synthese_taxon_GridModel,
sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
});


//Création du gridPanel pour les observations pour maille fr10
var gridPanel_obs_fr10 = new Ext.grid.GridPanel({
id : 'observations_fr10',
border: false,
stripeRows: true,
store : observation_fr10_store,
selModel: new Ext.grid.RowSelectionModel({
            singleSelect: true //Une seule ligne sélectionnable à la fois
        }),
colModel: observation_GridModel,
//sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
});

//Création du gridPanel pour les observations pour maille fr10 ss inf
var gridPanel_obs_fr10_ss_inf = new Ext.grid.GridPanel({
id : 'observations_fr10_ss_inf',
border: false,
stripeRows: true,
store : observation_fr10_store_ss_inf,
selModel: new Ext.grid.RowSelectionModel({
            singleSelect: true //Une seule ligne sélectionnable à la fois
        }),
colModel: observation_GridModel,
//sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
});

//Création du gridPanel pour les observations pour maille fr5
var gridPanel_obs_fr5 = new Ext.grid.GridPanel({
id : 'observations_fr5',
border: false,
stripeRows: true,
store : observation_fr5_store,
selModel: new Ext.grid.RowSelectionModel({
            singleSelect: true //Une seule ligne sélectionnable à la fois
        }),
colModel: observation_GridModel,
//sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
});

//Création du gridPanel pour les observations pour maille fr5 ss inf
var gridPanel_obs_fr5_ss_inf = new Ext.grid.GridPanel({
id : 'observations_fr5_ss_inf',
border: false,
stripeRows: true,
store : observation_fr5_store_ss_inf,
selModel: new Ext.grid.RowSelectionModel({
            singleSelect: true //Une seule ligne sélectionnable à la fois
        }),
colModel: observation_GridModel,
//sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
});

//Création du gridPanel pour les observations pour commune
var gridPanel_obs_comm = new Ext.grid.GridPanel({
id : 'observations_comm',
border: false,
stripeRows: true,
store : observation_comm_store,
selModel: new Ext.grid.RowSelectionModel({
            singleSelect: true //Une seule ligne sélectionnable à la fois
        }),
colModel: observation_GridModel_comm,
//sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
});

//Création du gridPanel pour les observations pour maille commune ss inf
var gridPanel_obs_comm_ss_inf = new Ext.grid.GridPanel({
id : 'observations_comm_ss_inf',
border: false,
stripeRows: true,
store : observation_comm_store_ss_inf,
selModel: new Ext.grid.RowSelectionModel({
            singleSelect: true //Une seule ligne sélectionnable à la fois
        }),
colModel: observation_GridModel_comm,
//sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
});

//Création du gridPanel pour les observations pour maille utm
var gridPanel_obs_utm = new Ext.grid.GridPanel({
id : 'observations_utm',
border: false,
stripeRows: true,
store : observation_utm_store,
selModel: new Ext.grid.RowSelectionModel({
            singleSelect: true //Une seule ligne sélectionnable à la fois
        }),
colModel: observation_GridModel,
//sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
});

//Création du gridPanel pour les observations pour maille utm ss inf
var gridPanel_obs_utm_ss_inf = new Ext.grid.GridPanel({
id : 'observations_utm_ss_inf',
border: false,
stripeRows: true,
store : observation_utm_store_ss_inf,
selModel: new Ext.grid.RowSelectionModel({
            singleSelect: true //Une seule ligne sélectionnable à la fois
        }),
colModel: observation_GridModel,
//sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
});

var rec;

   //Recuperation des lignes (row) selectionnables dans le grid
    // //Par défaut, le selectionModel d'un gridPanel est un RowSelectionModel
    // var selModel = gridPanel_obs.getSelectionModel();
    // //On detecte quel ligne (row) est selectionee
    // selModel.on('rowselect',function(){
	// //alert(this.getselected().data.id_obj )
// var id_obj_select_obs = gridPanel_obs.getStore().getAt(1);
// //rec.get('record_id');
// Ext.MessageBox.alert(id_obj_select_obs.get('record_id'));
// //Ext.MessageBox.alert(Ext.getCmp('observations_fr10').getStore().getAt(1));
// //Ext.MessageBox.alert(Ext.getCmp('observations_fr10').getStore().getAt(2));
// //	createPopup_obs();
	// });


//Création du gridPanel pour les commentaires
var gridPanel_comment = new Ext.grid.GridPanel({
id : 'commentaires_existants',
border: false,
stripeRows: true,
store : commentaires_existants_store,
colModel: comment_GridModel,
sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
//sm: new GeoExt.grid.FeatureSelectionModel({
//selectControl : {boxKey : "shiftKey"}
//})
});

//Initalisation de la verif des champs obligatoire pour le panneau commentaires (surlignage en rouge et indication)
Ext.QuickTips.init();

//Store contenant la liste des types de commentaires
var type_com=new Ext.data.ArrayStore({
fields: ['id','type_com'],
data: [['Remarque','Remarque'],['Erreur','Erreur'],['Test','Test']]
});

//Store contenant la liste des types de commentaires
var action_com=new Ext.data.ArrayStore({
fields: ['id','action_com'],
data: [['Modification','Modification'],['Suppression','Suppression']]
});

//Store contenant la liste des types de commentaires
var priorite_com=new Ext.data.ArrayStore({
fields: ['id','priorite_com'],
data: [['Basse','Basse'],['Moyenne','Moyenne'],['Haute','Haute']]
});


//Modification de la methode par defaut pour la legend des flux WMS		
/** Using the ExtJS-way to override single methods of classes. */
Ext.override(GeoExt.WMSLegend, {

        /*  NOTE (JvdB): override the WMSLegend.getLegendUrl() method: to allow baseParams, in particular FORMAT=
         *  to be merged in via Heron config
         *  the version below taken from GeoExt GitHub on 27.sept.2012
         */

        /** api: (define)
         *  module = GeoExt
         *  class = WMSLegend
         */

        /** api: (extends)
         *  GeoExt/widgets/LayerLegend.js
         */
        /**
         * @param layerName
         * @param layerNames
         */
    /** private: method[getLegendUrl]
     *  :param layerName: ``String`` A sublayer.
     *  :param layerNames: ``Array(String)`` The array of sublayers,
     *      read from this.layerRecord if not provided.
     *  :return: ``String`` The legend URL.
     *
     *  Get the legend URL of a sublayer.
     */
    getLegendUrl: function(layerName, layerNames) {
        var rec = this.layerRecord;
        var url;
        var styles = rec && rec.get("styles");
        var layer = rec.getLayer();
        layerNames = layerNames || [layer.params.LAYERS].join(",").split(",");

        var styleNames = layer.params.STYLES &&
                             [layer.params.STYLES].join(",").split(",");
        var idx = layerNames.indexOf(layerName);
        var styleName = styleNames && styleNames[idx];
        // check if we have a legend URL in the record's
        // "styles" data field
        if(styles && styles.length > 0) {
            if(styleName) {
                Ext.each(styles, function(s) {
                    url = (s.name == styleName && s.legend) && s.legend.href;
                    return !url;
                });
            } else if(this.defaultStyleIsFirst === true && !styleNames &&
                      !layer.params.SLD && !layer.params.SLD_BODY) {
                url = styles[0].legend && styles[0].legend.href;
            }
        }
        if(!url) {
            url = layer.getFullRequestString({
                REQUEST: "GetLegendGraphic",
                WIDTH: null,
                HEIGHT: null,
                EXCEPTIONS: "application/vnd.ogc.se_xml",
                LAYER: layerName,
                LAYERS: null,
                STYLE: (styleName !== '') ? styleName: null,
                STYLES: null,
                SRS: null,
                FORMAT: null,
                TIME: null
            });
        }
        var params = Ext.apply({}, this.baseParams);
        if (layer.params._OLSALT) {
            // update legend after a forced layer redraw
            params._OLSALT = layer.params._OLSALT;
        }
        url = Ext.urlAppend(url, Ext.urlEncode(params));
        if (url.toLowerCase().indexOf("request=getlegendgraphic") != -1) {
            if (url.toLowerCase().indexOf("format=") == -1) {
                url = Ext.urlAppend(url, "FORMAT=image%2Fgif");
            }
            // add scale parameter - also if we have the url from the record's
            // styles data field and it is actually a GetLegendGraphic request.
            if (this.useScaleParameter === true) {
                var scale = layer.map.getScale();
                url = Ext.urlAppend(url, "SCALE=" + scale);
            }
        }

        return url;
    }
});

Ext.namespace('GeoExt');

/** api: constructor
 *  .. class:: WMSLegend(config)
 *
 *  Show a legend image for a WMS layer. The image can be read from the styles
 *  field of a layer record (if the record comes e.g. from a
 *  :class:`GeoExt.data.WMSCapabilitiesReader`). If not provided, a
 *  GetLegendGraphic request will be issued to retrieve the image.
 */
GeoExt.WMSLegend = Ext.extend(GeoExt.LayerLegend, {

    /** api: config[defaultStyleIsFirst]
     *  ``Boolean``
     *  The WMS spec does not say if the first style advertised for a layer in
     *  a Capabilities document is the default style that the layer is
     *  rendered with. We make this assumption by default. To be strictly WMS
     *  compliant, set this to false, but make sure to configure a STYLES
     *  param with your WMS layers, otherwise LegendURLs advertised in the
     *  GetCapabilities document cannot be used.
     */
    defaultStyleIsFirst: true,

    /** api: config[useScaleParameter]
     *  ``Boolean``
     *  Should we use the optional SCALE parameter in the SLD WMS
     *  GetLegendGraphic request? Defaults to true.
     */
    useScaleParameter: true,

    /** api: config[baseParams]
     * ``Object``
     *  Optional parameters to add to the legend url, this can e.g. be used to
     *  support vendor-specific parameters in a SLD WMS GetLegendGraphic
     *  request. To override the default MIME type of image/gif use the
     *  FORMAT parameter in baseParams.
     *
     *  .. code-block:: javascript
     *
     *      var legendPanel = new GeoExt.LegendPanel({
     *          map: map,
     *          title: 'Legend Panel',
     *          defaults: {
     *              style: 'padding:5px',
     *              baseParams: {
     *                  FORMAT: 'image/png',
     *                  LEGEND_OPTIONS: 'forceLabels:on'
     *              }
     *          }
     *      });
     */
    baseParams: null,

    /** private: method[initComponent]
     *  Initializes the WMS legend. For group layers it will create multiple
     *  image box components.
     */
    initComponent: function() {
        GeoExt.WMSLegend.superclass.initComponent.call(this);
        var layer = this.layerRecord.getLayer();
        this._noMap = !layer.map;
        layer.events.register("moveend", this, this.onLayerMoveend);
        this.update();
    },

    /** private: method[onLayerMoveend]
     *  :param e: ``Object``
     */
    onLayerMoveend: function(e) {
        if ((e.zoomChanged === true && this.useScaleParameter === true) ||
                                                                this._noMap) {
            delete this._noMap;
            this.update();
        }
    },

    /** private: method[getLegendUrl]
     *  :param layerName: ``String`` A sublayer.
     *  :param layerNames: ``Array(String)`` The array of sublayers,
     *      read from this.layerRecord if not provided.
     *  :return: ``String`` The legend URL.
     *
     *  Get the legend URL of a sublayer.
     */
    getLegendUrl: function(layerName, layerNames) {
        var rec = this.layerRecord;
        var url;
        var styles = rec && rec.get("styles");
        var layer = rec.getLayer();
        layerNames = layerNames || [layer.params.LAYERS].join(",").split(",");

        var styleNames = layer.params.STYLES &&
                             [layer.params.STYLES].join(",").split(",");
        var idx = layerNames.indexOf(layerName);
        var styleName = styleNames && styleNames[idx];
        // check if we have a legend URL in the record's
        // "styles" data field
        if(styles && styles.length > 0) {
            if(styleName) {
                Ext.each(styles, function(s) {
                    url = (s.name == styleName && s.legend) && s.legend.href;
                    return !url;
                });
            } else if(this.defaultStyleIsFirst === true && !styleNames &&
                      !layer.params.SLD && !layer.params.SLD_BODY) {
                url = styles[0].legend && styles[0].legend.href;
            }
        }
        if(!url) {
            url = layer.getFullRequestString({
                REQUEST: "GetLegendGraphic",
                WIDTH: null,
                HEIGHT: null,
                EXCEPTIONS: "application/vnd.ogc.se_xml",
      //          LAYER: layerName,
                LAYERS: layerName,
                STYLE: (styleName !== '') ? styleName: null,
                STYLES: null,
                SRS: null,
                FORMAT: null,
                TIME: null
            });
        }
        var params = Ext.apply({}, this.baseParams);
        if (layer.params._OLSALT) {
            // update legend after a forced layer redraw
            params._OLSALT = layer.params._OLSALT;
        }
        url = Ext.urlAppend(url, Ext.urlEncode(params));
        if (url.toLowerCase().indexOf("request=getlegendgraphic") != -1) {
            if (url.toLowerCase().indexOf("format=") == -1) {
                url = Ext.urlAppend(url, "FORMAT=image%2Fgif");
            }
            // add scale parameter - also if we have the url from the record's
            // styles data field and it is actually a GetLegendGraphic request.
            if (this.useScaleParameter === true) {
                var scale = layer.map.getScale();
                url = Ext.urlAppend(url, "SCALE=" + scale);
            }
        }

        return url;
    },
    
 
    /** private: method[update]
     *  Update the legend, adding, removing or updating
     *  the per-sublayer box component.
     */
    update: function() {
        var layer = this.layerRecord.getLayer();
        // In some cases, this update function is called on a layer
        // that has just been removed, see ticket #238.
        // The following check bypass the update if map is not set.
        if(!(layer && layer.map)) {
            return;
        }
        GeoExt.WMSLegend.superclass.update.apply(this, arguments);

        var layerNames, layerName, i, len;

        layerNames = [layer.params.LAYERS].join(",").split(",");

        var destroyList = [];
        var textCmp = this.items.get(0);
        this.items.each(function(cmp) {
            i = layerNames.indexOf(cmp.itemId);
            if(i < 0 && cmp != textCmp) {
                destroyList.push(cmp);
            } else if(cmp !== textCmp){
                layerName = layerNames[i];
                var newUrl = this.getLegendUrl(layerName, layerNames);
                if(!OpenLayers.Util.isEquivalentUrl(newUrl, cmp.url)) {
                    cmp.setUrl(newUrl);
                }
            }
        }, this);
        for(i = 0, len = destroyList.length; i<len; i++) {
            var cmp = destroyList[i];
            // cmp.destroy() does not remove the cmp from
            // its parent container!
            this.remove(cmp);
            cmp.destroy();
        }

        for(i = 0, len = layerNames.length; i<len; i++) {
            layerName = layerNames[i];
            if(!this.items || !this.getComponent(layerName)) {
                this.add({
                    xtype: "gx_legendimage",
                    url: this.getLegendUrl(layerName, layerNames),
                    itemId: layerName
                });
            }
        }
        this.doLayout();
    },

    /** private: method[beforeDestroy]
     */
    beforeDestroy: function() {
        if (this.useScaleParameter === true) {
            var layer = this.layerRecord.getLayer();
            layer && layer.events &&
                layer.events.unregister("moveend", this, this.onLayerMoveend);
        }
        GeoExt.WMSLegend.superclass.beforeDestroy.apply(this, arguments);
    }

});

/** private: method[supports]
 *  Private override
 */
GeoExt.WMSLegend.supports = function(layerRecord) {
    return layerRecord.getLayer() instanceof OpenLayers.Layer.WMS ? 1 : 0;
};

/** api: legendtype = gx_wmslegend */
GeoExt.LayerLegend.types["gx_wmslegend"] = GeoExt.WMSLegend;

/** api: xtype = gx_wmslegend */
Ext.reg('gx_wmslegend', GeoExt.WMSLegend);
//Fin de modification de la methode par defaut legend flux WMS

//Store contenant la liste des layers
var layer_store = new GeoExt.data.LayerStore({
    map: map,
    layers: "Scan 1000"
});

//LegendPanel
var legendPanel = new GeoExt.LegendPanel({
title : "Légende",
defaults: {
            labelCls: 'mylabel',
            style: 'padding:5px',
	baseParams: {
           FORMAT: 'image/png',
		   
//	 LAYERS: map.getLayer(),
            LEGEND_OPTIONS: 'forceLabels:on'
        }	  
        },
//		layerStore: layer_store,
   //     layerRecord: mapPanel.layers.getByLayer(attr.layer),
//       FORMAT: 'image/png',
closeAction: 'hide',
        bodyStyle: 'padding:5px',
 //       width: 350,
        autoScroll: true,
        region: 'east',
		// tbar: new Ext.Toolbar({
            // items: [
                // {text: 'hide/show', handler: updateHideInLegend}
            // ]
        // }),
    });

//Panneau de gauche supérieur, contenant les formulaires pour envoi des synthese et modification du rendu
var westPanel_1 = new Ext.Panel({
region : 'west',
border : false,
//width : 270,
minSize: 275,
collapsible: false,
//layout: 'fit',
items : [taxref_form,rang_form,synthese_form,visu_form]
});

//Panneau de droit inférieur inférieur contenant le panneau de legende (obligé de separer en deux pour pouvoir vider le panneau inférieur et recharger la nouvel légende aprés modification du rendu
var eastPanel_2 = new Ext.Panel({
region : 'east',
border : false,
//width : 270,
minSize: 275,
collapsible: false,
//layout: 'fit',
items : [legendPanel]
});

//Panneau de gauche regroupant les deux
var westPanel = new Ext.Panel({
region : 'west',
border : false,
width : 300,
minSize: 275,
collapsible: true,
autoScroll: true,
//layout: 'fit',
items : [westPanel_1]
});

//Onglet inférieur contenant la synthese par commune metropole
var southPanel_comm = new Ext.Panel({
title : 'Synthèse par commune: Métropole',
region : 'south',
layout : 'fit',
collapsible: false,
width : '100%',
height : 200,
hidden: true,
//border: false,
items : [gridPanel_comm]
});

//Onglet inférieur contenant la synthese par commune réunion
var southPanel_comm_reunion = new Ext.Panel({
title : 'Synthèse par commune: Réunion',
region : 'south',
layout : 'fit',
collapsible: false,
width : '100%',
height : 200,
// hidden: true,
// hideBorders: true,
// hideLabel: true,
// hideParent: true,
//border: false,
items : [gridPanel_comm_reunion]
});

//Onglet inférieur contenant la synthese par maille 10
var southPanel_fr10 = new Ext.Panel({
title : 'Synthèse par maille 10*10km métropole',
region : 'south',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
items : [gridPanel_fr10]
});

//Onglet inférieur contenant la synthese par maille 5
var southPanel_fr5 = new Ext.Panel({
title : 'Synthèse par maille 5*5km métropole',
region : 'south',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
items : [gridPanel_fr5]
});

//Onglet inférieur contenant la synthese par maille 1 réunion
var southPanel_utm1 = new Ext.Panel({
title : 'Synthèse par maille 1*1km Réunion',
region : 'south',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
items : [gridPanel_utm1]
});

//Onglet inférieur contenant la synthese par maille 10 réunion
var southPanel_utm10 = new Ext.Panel({
title : 'Synthèse par maille 10*10km Réunion',
region : 'south',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
items : [gridPanel_utm10]
});

//Onglet inférieur contenant la synthese par taxon fr5
var southPanel_taxon_fr5 = new Ext.Panel({
title : 'Synthèse par taxon métropole',
region : 'south',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
//visible: false,
items : [gridPanel_taxon_fr5]
});

//Onglet inférieur contenant la synthese par taxon fr5 sans rang inf
var southPanel_taxon_fr5_ss_inf = new Ext.Panel({
title : 'Synthèse par taxon métropole',
region : 'south',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
//visible: false,
items : [gridPanel_taxon_fr5_ss_inf]
});

//Onglet inférieur contenant la synthese par taxon fr 10
var southPanel_taxon_fr10 = new Ext.Panel({
title : 'Synthèse par taxon métropole',
region : 'south',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
//visible: false,
items : [gridPanel_taxon_fr10]
});

//Onglet inférieur contenant la synthese par taxon fr 10 sans rang inf
var southPanel_taxon_fr10_ss_inf = new Ext.Panel({
title : 'Synthèse par taxon métropole',
region : 'south',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
//visible: false,
items : [gridPanel_taxon_fr10_ss_inf]
});

//Onglet inférieur contenant la synthese par taxon commune
var southPanel_taxon_comm = new Ext.Panel({
title : 'Synthèse par taxon métropole',
region : 'south',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
//visible: false,
items : [gridPanel_taxon_comm]
});

//Onglet inférieur contenant la synthese par taxon commune sans rang inf
var southPanel_taxon_comm_ss_inf = new Ext.Panel({
title : 'Synthèse par taxon métropole',
region : 'south',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
//visible: false,
items : [gridPanel_taxon_comm_ss_inf]
});

//Onglet inférieur contenant la synthese par taxon utm
var southPanel_taxon_utm = new Ext.Panel({
title : 'Synthèse par taxon Réunion',
region : 'south',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
//visible: false,
items : [gridPanel_taxon_utm]
});

//Onglet inférieur contenant la synthese par taxon utm sans rang inf
var southPanel_taxon_utm_ss_inf = new Ext.Panel({
title : 'Synthèse par taxon Réunion',
region : 'south',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
//visible: false,
items : [gridPanel_taxon_utm_ss_inf]
});

//Onglet central  contenant les observations fr10
var observationsPanel_fr10 = new Ext.Panel({
title : 'Liste des observations',
id:'observationsPanel_fr10',
region : 'center',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
items : [gridPanel_obs_fr10]
});

//Onglet central contenant les observations fr10 ss rang inf
var observationsPanel_fr10_ss_inf = new Ext.Panel({
title : 'Liste des observations',
id:'observationsPanel_fr10_ss_inf',
region : 'center',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
items : [gridPanel_obs_fr10_ss_inf]
});

//Onglet central  contenant les observations fr5
var observationsPanel_fr5 = new Ext.Panel({
title : 'Liste des observations',
id:'observationsPanel_fr5',
region : 'center',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
items : [gridPanel_obs_fr5]
});

//Onglet central contenant les observations fr5 ss rang inf
var observationsPanel_fr5_ss_inf = new Ext.Panel({
title : 'Liste des observations',
id:'observationsPanel_fr5_ss_inf',
region : 'center',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
items : [gridPanel_obs_fr5_ss_inf]
});

//Onglet central  contenant les observations commune
var observationsPanel_comm = new Ext.Panel({
title : 'Liste des observations',
id:'observationsPanel_comm',
region : 'center',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
items : [gridPanel_obs_comm]
});

//Onglet central contenant les observations commune ss rang inf
var observationsPanel_comm_ss_inf = new Ext.Panel({
title : 'Liste des observations',
id:'observationsPanel_comm_ss_inf',
region : 'center',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
items : [gridPanel_obs_comm_ss_inf]
});

//Onglet central  contenant les observations utm
var observationsPanel_utm = new Ext.Panel({
title : 'Liste des observations',
id:'observationsPanel_utm',
region : 'center',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
items : [gridPanel_obs_utm]
});

//Onglet central contenant les observations utm ss rang inf
var observationsPanel_utm_ss_inf = new Ext.Panel({
title : 'Liste des observations',
id:'observationsPanel_utm_ss_inf',
region : 'center',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
items : [gridPanel_obs_utm_ss_inf]
});



//Onglet central avec les commentaires existants	
var commentPanel = new Ext.Panel({
title : 'Commentaires existants',
region : 'center',
layout : 'fit',
collapsible: false,
//width : 600,
height : 150,
border: false,
items : [gridPanel_comment]
});

// var commentPanel_all = new Ext.Panel({
// title : 'Commentaires',
// region : 'center',
// //layout : 'fit',
// collapsible: false,
// width : 600,
// height : 800,
// border: false,
// items : [commentPanel,commentPanel_new]
// });

//Panneau inférieur, contenant l'ensemble des onglets inférieurs
var southTabPanel = new Ext.TabPanel({
        title:'panel principal',
        activeTab: 0,
        // enableTabScroll:true,
		//layout : 'fit',
		collapsible: true,
		//width : '100%',
		//height : 200,
		region : 'south',
        items:[southPanel_comm,southPanel_comm_reunion,southPanel_fr5,southPanel_fr10,southPanel_utm1,southPanel_utm10,southPanel_taxon_fr5,southPanel_taxon_fr5_ss_inf,southPanel_taxon_fr10,southPanel_taxon_fr10_ss_inf,southPanel_taxon_comm,southPanel_taxon_comm_ss_inf,southPanel_taxon_utm,southPanel_taxon_utm_ss_inf]
    });
    
//Création du style objet selectionné	
var StyleSelected = new OpenLayers.Style({
'strokeColor': '#F90000',
'strokeWidth': 4,
'strokeOpacity': 0.8,
'fillOpacity': 0.80,
//'fillColor': '#aa0000',
'pointRadius': 7
});

//Création de la règle pour rendu 1, cas ou il y a au moins une observation avérée
var rule_averee_high = new OpenLayers.Rule({
name:'Localisation Avérée',
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
name:'Localisation Interprétée',
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
name:'Moins de 10 observations',
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
name:'Entre 10 et 100 observations',
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
name:'Plus de 100 observations',
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

//Création de la règle pour rendu 3, cas ou il y a uniquement le rang choisi (correspondant au champ nb_visu=100
var rule_tax_1 = new OpenLayers.Rule({
name:'Uniquement le nom choisi',
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
name:'Taxon choisi et taxons inférieurs',
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
name:'Uniquement les taxons inférieurs',
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

//Création de la règle pour rendu 4, cas ou il y a uniquement des obs inférieure à 1950
var rule_date_1 = new OpenLayers.Rule({
name:"date<1950",
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
name:"1950≤date<2000",
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
name:"date≥2000",
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
'strokeWidth': 2,
'strokeOpacity': 0.5,
'fillOpacity': 0.80
});

//Création du style nombre d'observation
var Style_maille2 = new OpenLayers.Style({
//'strokeColor': '#040317',
'strokeWidth': 2,
'strokeOpacity': 0.5,
'fillOpacity': 0.80
});

//Création du style rang taxonomique
var Style_maille3 = new OpenLayers.Style({
//'strokeColor': '#040317',
'strokeWidth': 2,
'strokeOpacity': 0.5,
'fillOpacity': 0.80
});

//Création du style pour date
var Style_maille4 = new OpenLayers.Style({
//'strokeColor': '#040317',
'strokeWidth': 2,
'strokeOpacity': 0.5,
'fillOpacity': 0.80
});

//Attribution des règles aux styles
Style_maille.addRules([rule_averee_high,rule_averee_low]);
Style_maille2.addRules([rule_obs_1,rule_obs_2,rule_obs_3]);
Style_maille3.addRules([rule_tax_3,rule_tax_2,rule_tax_1]);
Style_maille4.addRules([rule_date_3,rule_date_2,rule_date_1]);

//Création du style de la carte pour rendu par défaut
var StyleMap_maille = new OpenLayers.StyleMap({
default: Style_maille,
select: StyleSelected
});

//Création du style de la carte pour rendu nb observations
var StyleMap_maille2 = new OpenLayers.StyleMap({
default: Style_maille2,
select: StyleSelected
});

//Création du style de la carte pour rendu rang taxonomique
var StyleMap_maille3 = new OpenLayers.StyleMap({
default: Style_maille3,
select: StyleSelected
});

//Création du style de la carte pour rendu date
var StyleMap_maille4 = new OpenLayers.StyleMap({
default: Style_maille4,
select: StyleSelected
});

//Attribution des styles aux carte (style par défaut)
synthese_fr5_layer.styleMap = StyleMap_maille;
synthese_fr10_layer.styleMap = StyleMap_maille;
synthese_utm1_layer.styleMap = StyleMap_maille;
synthese_utm10_layer.styleMap = StyleMap_maille;
synthese_commune_layer.styleMap = StyleMap_maille;
synthese_commune_reunion_layer.styleMap = StyleMap_maille;

//Definition des variables contenant les différents systèmes de projections
var epsg4326 = new OpenLayers.Projection("EPSG:4326");
var epsg2154 = new OpenLayers.Projection("EPSG:2154");
var epsg900913 = new OpenLayers.Projection("EPSG:900913");
var mapBounds = new OpenLayers.Bounds(250000, 5400000, 350000, 6459419).transform(epsg900913,epsg2154);

//Definition des options pour la carte principale (metropole)
var options = {
  // Projection
  projection: new OpenLayers.Projection("EPSG:2154"),
  displayProjection: new OpenLayers.Projection("EPSG:2154"),
  controls: [],
  maxResolution: 'auto',
//Definition de la bounding box pour l'extension maximale (france metropole)
  maxExtent: new OpenLayers.Bounds(50000, 6000000, 1300000, 7080000),
  //maxScales: 0.5,
  //minScales: 700000,
//Definition des différents niveau d'echelle utilisables
  scales: [800000000000,600000000000,400000000000, 200000000000, 100000000000, 50000000000, 20000000000, 10000000000, 5000000000, 2500000000],
    //                maxResolution: "auto",
   //                 maxExtent: new OpenLayers.Bounds(-180, -90, 180, 90),
 //                   maxResolution: 0.17578125,
   //                 maxScale: 10000000,
     //               minResolution: "auto",
     //               minExtent: new OpenLayers.Bounds(-1, -1, 1, 1),
       //             minResolution: 0.0439453125,
         //           numZoomLevels: 5,
           //         units: "degrees"
 // maxExtent: mapBounds,
};

//Definition des options pour la carte de la réunion
var options_2 = {
  // Projection
  projection: new OpenLayers.Projection("EPSG:2975"),
 displayProjection: new OpenLayers.Projection("EPSG:2975"),
  controls: [],
  maxResolution: 'auto',
  maxExtent: new OpenLayers.Bounds(297395, 7632671, 396546, 7692704),
  //maxScales: 0.5,
  //minScales: 700000,
  scales: [150000000000,100000000000, 50000000000, 20000000000, 10000000000, 5000000000],
    //                maxResolution: "auto",
   //                 maxExtent: new OpenLayers.Bounds(-180, -90, 180, 90),
 //                   maxResolution: 0.17578125,
   //                 maxScale: 10000000,
     //               minResolution: "auto",
     //               minExtent: new OpenLayers.Bounds(-1, -1, 1, 1),
       //             minResolution: 0.0439453125,
         //           numZoomLevels: 5,
           //         units: "degrees"
 // maxExtent: mapBounds,
};

// //Création du panneau contenant l'icone zoombox et main
// //Creation of a custom panel with a ZoomBox control with the alwaysZoom option sets to true				
				// OpenLayers.Control.CustomNavToolbar = OpenLayers.Class(OpenLayers.Control.Panel, {
				    // /**
				     // * Constructor: OpenLayers.Control.NavToolbar 
				     // * Add our two mousedefaults controls.
				     // *
				     // * Parameters:
				     // * options - {Object} An optional object whose properties will be used
				     // *     to extend the control.
				     // */	
				    // initialize: function(options) {
				        // OpenLayers.Control.Panel.prototype.initialize.apply(this, [options]);
				        // this.addControls([
				          // new OpenLayers.Control.Navigation(),
						  // //Here it come
				          // new OpenLayers.Control.ZoomBox({alwaysZoom:false})
				        // ]);
						// // To make the custom navtoolbar use the regular navtoolbar style
						// this.displayClass = 'olControlNavToolbar'
				    // },		
				    // /**
				     // * Method: draw 
				     // * calls the default draw, and then activates mouse defaults.
				     // */
				    // draw: function() {
				        // var div = OpenLayers.Control.Panel.prototype.draw.apply(this, arguments);
                        // this.defaultControl = this.controls[0];
				        // return div;
				    // }
				// });
// var panel = new OpenLayers.Control.CustomNavToolbar();
				
//Création des deux cartes avec leurs options
var map = new OpenLayers.Map('', options);
var map2 = new OpenLayers.Map('', options_2);

// var synthese_commune_layer_2 = new OpenLayers.Layer.Vector("Répartition Communale 2", {visibility: true, alwaysInRange: false,
                     // maxScale: 10000000}
                     // );

 // map.addLayer(synthese_commune_layer_2);
 
//Ajout de la barre de zoom
map.addControl(new OpenLayers.Control.PanZoomBar());
//Ajout de la possibilité de se deplacer en cliquant sur la carte
map.addControl(new OpenLayers.Control.Navigation());
//Ajout du panel contenant la zoombox et la main
//map.addControl(panel);

//Même chose pour la carte de la réunion (pas le panneau avec zoombox et main)
map2.addControl(new OpenLayers.Control.PanZoomBar());
map2.addControl(new OpenLayers.Control.Navigation());

//Création et activation de la selection des objets du layer synthese commune
var selectFeatureControl_comm = new
OpenLayers.Control.SelectFeature(synthese_commune_layer);
map.addControl(selectFeatureControl_comm);
selectFeatureControl_comm.activate();

//Création et activation de la selection des objets du layer synthese maille 10
var selectFeatureControl_fr10 = new
OpenLayers.Control.SelectFeature(synthese_fr10_layer);
map.addControl(selectFeatureControl_fr10);
selectFeatureControl_fr10.activate();

//Création et activation de la selection des objets du layer synthese maille 5
var selectFeatureControl_fr5 = new
OpenLayers.Control.SelectFeature(synthese_fr5_layer);
map.addControl(selectFeatureControl_fr5);
selectFeatureControl_fr5.activate();

//Création et activation de la selection des objets du layer synthese maille utm1
var selectFeatureControl_utm1 = new
OpenLayers.Control.SelectFeature(synthese_utm1_layer);
map2.addControl(selectFeatureControl_utm1);
selectFeatureControl_utm1.activate();

//Création et activation de la selection des objets du layer synthese maille utm10
var selectFeatureControl_utm10 = new
OpenLayers.Control.SelectFeature(synthese_utm10_layer);
map2.addControl(selectFeatureControl_utm10);
selectFeatureControl_utm10.activate();

// Layers Fonds cartographiques metropole
var cbn_territoires_agrem = new OpenLayers.Layer.WMS
("Territoires agréments CBN", "http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs",
{'layers': 'Territoires agréments CBN', transparent: false, format: 'image/png'},
{isBaseLayer: true, visibility: true,hideInLegend:true}
);

var regions_bio = new OpenLayers.Layer.WMS
("Régions biogéographiques", "http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs",
{'layers': 'Régions biogéographiques', transparent: false, format: 'image/png'},
{isBaseLayer: true, visibility: true}
);

var agences_eau = new OpenLayers.Layer.WMS
("Agences de l'eau", "http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs",
{'layers': "Agences de l'eau", transparent: false, format: 'image/png'},
{isBaseLayer: true, visibility: true}
);


//a voir si utile
var updateHideInLegend = function() {
        layerRec0.set("hideInLegend", !layerRec0.get("hideInLegend"));
    };
	
var scan_1000 = new OpenLayers.Layer.WMS
("Scan 1000", "http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs",
{'layers': 'scan_1000_v2', transparent: false, legendTitle: "Scan 1000 test "},hideInLegend=true,
{isBaseLayer: true, visibility: true, legendTitle: "Scan 1000 test "}
);

var relief_metropole = new OpenLayers.Layer.WMS
("Relief", "http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs",
{'layers': 'Relief', transparent: true, format: 'image/png'},
{isBaseLayer: true, visibility: false}
);

// Layers Fonds cartographiques Réunion
var cbn_territoires_agrem_mas = new OpenLayers.Layer.WMS
("Territoires agréments CBN", "http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs",
{'layers': 'Territoires agréments CBN (Réunion)', transparent: false, format: 'image/png'},
{isBaseLayer: true, visibility: true}
);

var scan_100_mas = new OpenLayers.Layer.WMS
("Scan 100", "http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs",
{'layers': 'scan_100_mas', transparent: false, format: 'image/png'},
{isBaseLayer: true, visibility: true}
);

function osm_getTileURL(bounds) {
var res = this.map.getResolution();
var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
var z = this.map.getZoom();
var limit = Math.pow(2, z);
 
if (y < 0 || y >= limit) {
x = ((x % limit) + limit) % limit;
return this.url + z + "/" + x + "/" + y + "." + this.type;
} else {
x = ((x % limit) + limit) % limit;
return this.url + z + "/" + x + "/" + y + "." + this.type;
}
}

//Layers Overlays
var limite_admin_cbn = new OpenLayers.Layer.WMS
("Limites administratives et CBN", "http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs",
{'layers': ['Territoires agréments CBN contours','Départements'], transparent: true, format: 'image/png'},
{isBaseLayer: false, visibility: false,
alwaysInRange: false,
displayOutsideMaxExtent: true,
//maxResolution: map.getResolutionForZoom(1),
//minResolution: map.getResolutionForZoom(1),
//getURL: osm_getTileURL
}
);

// var departements_metropole = new OpenLayers.Layer.WMS
// ("Départements", "http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs",
// {'layers': 'Départements', transparent: true, format: 'image/png'},
// {isBaseLayer: false, visibility: false}
// );



//Ajout de la projection par defaut et parametrage de l'inversion des coordonnées à false (obligatoire pour affiché la couche ortho de l'ign en flux wms)
OpenLayers.Projection.defaults['EPSG:2154'] = new OpenLayers.Projection('EPSG:2154');
OpenLayers.Projection.defaults['EPSG:2154'].xy = false;



//Ajout de la couche ortho
var ign_ortho = new OpenLayers.Layer.WMS(
"Orthophoto",
"https://anais.just:anais.just@wxs.ign.fr/rbrh8w7jei95y19ew2lazrn4/inspire/r/wms?",
{
layers: "OI.OrthoimageCoverage",
crs: 'EPSG:2154',
VERSION:'1.3.0',
transparent: true,
format: 'image/png',

},
{
singleTile: true,
isBaseLayer : true
}
);

//Autres wms
 var inpn = new OpenLayers.Layer.WMS("INPN",
    "http://ws.carmencarto.fr/WMS/119/fxx_inpn", {
        layers: [
	  "Terrains_des_Conservatoires_des_espaces_naturels",
	  "Terrains_du_Conservatoire_du_Littoral",
	  "Arretes_de_protection_de_biotope",
	  "Reserves_naturelles",
	  "Reserves_naturelles_regionales",
	  "rnc",
	  "Reserves_biologiques",
	  "Sites_Ramsar",
	  "Parcs_nationaux",
	  "Reserves_nationales_de_chasse_et_faune_sauvage",
	  "Reserves_de_la_biosphere",
	  "Parcs_naturels_regionaux",
	  "Parc_naturel_marin",
	  "Terrains_du_Conservatoire_du_Littoral",
	  "ZICO",
	 "Znieff2",
	  "Znieff1",
	  "Sites_d_importance_communautaire",
	  "Zones_de_protection_speciale"
        ],
        transparent: true,
        format: "image/gif"
    }, {
                    isBaseLayer: false,
                    buffer: 0,
                    // exclude this layer from layer container nodes
                    displayInLayerSwitcher: false,
                    visibility: false
                }
);

var raster_geosignal = new OpenLayers.Layer.WMS("GeoSignal",
    "http://wms.geosignal.fr/metropole", {
        layers: [
       "RASTER25k",
        "RASTER50k",
       "RASTER100k",
       "RASTER250k",
        "RASTER500k",
       "RASTER1000k",
       "RASTER5k",
        "RASTER4000k"
        ],
        transparent: true,
        format: "image/gif"
    }, {
                    isBaseLayer: true,
                    buffer: 0,
                    // exclude this layer from layer container nodes
 //                   displayInLayerSwitcher: false,
                    visibility: false
                }
);

var corinne_land_cover = new OpenLayers.Layer.WMS
("Corinne Land cover 2006", "http://sd1878-2.sivit.org/geoserver/wms",
{'layers': 'topp:CLC06_RGF', transparent: true, format: 'image/png'},
{isBaseLayer: false, visibility: false}
);

var cours_eau_sandre = new OpenLayers.Layer.WMS("Cours d'eau",
    "http://services.sandre.eaufrance.fr/geo/zonage", {
        layers: [
       "COURDO1",
        "COURDO2",
       "COURDO3",
       "COURDO4",
        "COURDO5",
       "COURDO6"
        ],
        transparent: true,
        format: "image/gif"
    }, {
                    isBaseLayer: false,
                    buffer: 0,
                    // exclude this layer from layer container nodes
                   displayInLayerSwitcher: false,
                    visibility: false
                }
);


var inpn_reunion_1 = new OpenLayers.Layer.WMS("Reserves_biologiques",
    "http://ws.carmencarto.fr/WMS/119/reu_inpn", {
        layers:  "Reserves_biologiques",
        transparent: true,
        format: "image/gif"
    }, {
                    isBaseLayer: false,
                    buffer: 0,
                    // exclude this layer from layer container nodes
                    displayInLayerSwitcher: true,
                    visibility: false
                }
);

var inpn_reunion_2 = new OpenLayers.Layer.WMS("Parcs_nationaux",
    "http://ws.carmencarto.fr/WMS/119/reu_inpn", {
        layers: "Parcs_nationaux",
        transparent: true,
        format: "image/gif"
    }, {
                    isBaseLayer: false,
                    buffer: 0,
                    // exclude this layer from layer container nodes
                    displayInLayerSwitcher: true,
                    visibility: false
                }
);

var inpn_reunion_3 = new OpenLayers.Layer.WMS("Terrains_du_Conservatoire_du_Littoral",
    "http://ws.carmencarto.fr/WMS/119/reu_inpn", {
        layers: "Terrains_du_Conservatoire_du_Littoral",
        transparent: true,
        format: "image/gif"
    }, {
                    isBaseLayer: false,
                    buffer: 0,
                    // exclude this layer from layer container nodes
                    displayInLayerSwitcher: true,
                    visibility: false
                }
);

var inpn_reunion_4 = new OpenLayers.Layer.WMS("Arretes_de_protection_de_biotope",
    "http://ws.carmencarto.fr/WMS/119/reu_inpn", {
        layers: "Arretes_de_protection_de_biotope",
        transparent: true,
        format: "image/gif"
    }, {
                    isBaseLayer: false,
                    buffer: 0,
                    // exclude this layer from layer container nodes
                    displayInLayerSwitcher: true,
                    visibility: false
                }
);

var inpn_reunion_5 = new OpenLayers.Layer.WMS("Reserves_naturelles",
    "http://ws.carmencarto.fr/WMS/119/reu_inpn", {
        layers: "Reserves_naturelles",
        transparent: true,
        format: "image/gif"
    }, {
                    isBaseLayer: false,
                    buffer: 0,
                    // exclude this layer from layer container nodes
                    displayInLayerSwitcher: true,
                    visibility: false
                }
);

// var historique = new OpenLayers.Layer.WMS("Historique",
    // "http://www.sig.forum-marais-atl.com/cgi-bin/wmsfma", {
        // layers: [
       // "Carte_Capitaine",
        // "Carte_Cassini"
        // ],
        // transparent: true,
        // format: "image/gif"
    // }, {
                    // isBaseLayer: true,
                    // buffer: 0,
                    // // exclude this layer from layer container nodes
                   // displayInLayerSwitcher: false,
                    // visibility: false
                // }
// );
// map.addLayer(historique);

//Ajout des layers à la carte metropole

//map.addLayer(cbn_territoires_agrem_ligne);

map.addLayer(inpn);
map.addLayer(cbn_territoires_agrem);
map.addLayer(limite_admin_cbn);
map.addLayer(ign_ortho);
map.addLayer(raster_geosignal);
map.addLayer(regions_bio);
map.addLayer(agences_eau);
map.addLayer(scan_1000);
map.addLayer(cours_eau_sandre);
//map.addLayer(corinne_land_cover);
//map.addLayer(departements_metropole);
map.addLayer(relief_metropole);
map.addLayer(synthese_fr10_layer);
map.addLayer(synthese_fr5_layer);
map.addLayer(synthese_commune_layer);




//Ajout des layers à la carte réunion
map2.addLayer(cbn_territoires_agrem_mas);
map2.addLayer(scan_100_mas);
map2.addLayer(synthese_commune_reunion_layer);
map2.addLayer(synthese_utm1_layer);
map2.addLayer(synthese_utm10_layer);
map2.addLayer(inpn_reunion_1);
map2.addLayer(inpn_reunion_2);
map2.addLayer(inpn_reunion_3);
map2.addLayer(inpn_reunion_4);
map2.addLayer(inpn_reunion_5);


//Création de la bbox correspondant à la france metropole et zoom sur cette bbox pour la carte principale
var mapBounds = new OpenLayers.Bounds(50000, 6070000, 1200000, 7080000);
map.zoomToExtent(mapBounds);

//Création de la bbox correspondant à la réunion et zoom sur cette bbox pour la carte réunion
var mapBounds_mas = new OpenLayers.Bounds(297395, 7632671, 396546, 7692704);
map2.zoomToExtent(mapBounds_mas);



//création du type boxbutton
BoxButton = Ext.extend(Ext.BoxComponent, Ext.apply({
        constructor: Ext.Button
    }, Ext.Button.prototype)
);
Ext.reg('boxbutton', BoxButton);

Ext.override(Ext.BoxComponent, {
    adjustSize : function(w, h){
        if(this.autoWidth === true){
            w = 'auto';
        }
        if(this.autoHeight === true){
            h = 'auto';
        }
        return {width : w, height: h};
    }
});

//Création de la variable popup pour synthese communale			 
var popup;
function createPopup(feature) {
   popup = new GeoExt.Popup({
      title: feature.attributes.insee_comm,
      defaults: {
        anchor: '50%',
        xtype: 'boxbutton'
    },
      location: feature,
      width:300,
      maximizable: true,
      buttonAlign : 'center',
      collapsible: false,
      items: [
          {html: "<b>Nom commune: </b>"  + feature.attributes.nom_comm + "<br/>" 
	  +"<b>Nom(s) du(des) taxon(s): </b><br/>"+ feature.attributes.noms_taxon + "<br/>"
		+"<b>Date de première obs.: </b>"+ feature.attributes.date_premiere_obs + "<br/>"
		+"<b>Date de dernière obs.: </b>"+ feature.attributes.date_derniere_obs + "<br/>"
		+"<b>Nb obs. date≥2000: </b>"+ feature.attributes.nb_obs_2001_2013 + "<br/>"
		+"<b>Nb obs. localisation avérée: </b>"+ feature.attributes.nb_obs_averee + "<br/>"
		},
		new Ext.Button({
text : 'Voir les observations',
xtype: 'boxbutton',
width:286,
buttonAlign : 'center',
handler : function() {
Ext.getCmp('commentaires_existants').store.removeAll();
if(typeof commentairepanel =='object'){commentairepanel.getForm().setValues({
id_obj: '',
id_flore_fcbn: '',
});}
			//cas synthese comm + rang taxon choisi uniquement
			if (datasetsynthese == '3' && datasetrang == '1' )
				{
Ext.getCmp('observations_comm_ss_inf').store.removeAll();
Ext.getCmp('observations_comm_ss_inf').store.load({params: {cd_ref: datasetId_tax,id_obj: id_obj_select}});
mapTabPanel.unhideTabStripItem(observationsPanel_comm_ss_inf); 
mapTabPanel.setActiveTab(observationsPanel_comm_ss_inf);
popup.destroy(); 
				}
			else
			//cas synthese comm + rang taxon choisi et inferieur
			if (datasetsynthese == '3' && datasetrang == '2' )
				{
Ext.getCmp('observations_comm').store.removeAll();
Ext.getCmp('observations_comm').store.load({params: {cd_ref: datasetId_tax,id_obj: id_obj_select}});
mapTabPanel.unhideTabStripItem(observationsPanel_comm); 
mapTabPanel.setActiveTab(observationsPanel_comm);
popup.destroy(); 				
				}

}
})
,
new Ext.Button({
text : 'Voir les commentaires',
xtype: 'boxbutton',
width:286,
handler : function() {
mapTabPanel.setActiveTab(commentPanel);
Ext.getCmp('observations_fr5').store.removeAll();
Ext.getCmp('observations_fr10').store.removeAll();
Ext.getCmp('observations_comm').store.removeAll();
Ext.getCmp('observations_fr5_ss_inf').store.removeAll();
Ext.getCmp('observations_fr10_ss_inf').store.removeAll();
Ext.getCmp('observations_comm_ss_inf').store.removeAll();
Ext.getCmp('commentaires_existants').store.removeAll();
Ext.getCmp('commentaires_existants').store.load({params: {cd_ref: datasetId_tax,id_obj: id_obj_select}});
if(typeof commentairepanel =='object'){commentairepanel.getForm().setValues({
id_obj: '',
id_flore_fcbn: '',
});}
popup.destroy(); 
}
})
,
new Ext.Button({
text : 'Commenter cette commune',
disabled: buttonCommentHide,
hidden: buttonCommentHide,
xtype: 'boxbutton',
width:286,
align: 'center',
handler : function() {
if(typeof commentPanel_new =='object'){mapTabPanel.setActiveTab(commentPanel_new);}
Ext.getCmp('observations_fr5').store.removeAll();
Ext.getCmp('observations_fr10').store.removeAll();
Ext.getCmp('observations_comm').store.removeAll();
Ext.getCmp('observations_fr5_ss_inf').store.removeAll();
Ext.getCmp('observations_fr10_ss_inf').store.removeAll();
Ext.getCmp('observations_comm_ss_inf').store.removeAll();
Ext.getCmp('commentaires_existants').store.removeAll();
if(typeof commentairepanel =='object'){commentairepanel.getForm().setValues({
id_obj: id_obj_select,
id_flore_fcbn: '',
});}
popup.destroy(); 
}
})
]
   });
   popup.show();
   var id_obj_select= feature.attributes.insee_comm;
}

//Affichage du popup quand selection d'un objet du layer synthese communale
synthese_commune_layer.events.on({
   featureselected: function(e) {
   if(typeof(popup) != "undefined"){
                popup.destroy();
            }
         createPopup(e.feature);
   }
});

var id_obj_select;

//Création de la variable popup pour synthese communale réuinion (sans bouton pour le moment)			 
var popup_reunion;
function createPopup_reunion(feature) {
   popup_reunion = new GeoExt.Popup({
      title: feature.attributes.insee_comm,
      location: feature,
      width:200,
      maximizable: true,
      collapsible: false,
      html: "<b>Nom commune: </b>"  + feature.attributes.nom_comm + "<br/>" 
	  +"<b>Nom(s) du(des) taxon(s): </b><br/>"+ feature.attributes.noms_taxon + "<br/>"
		+"<b>Date de première obs.: </b>"+ feature.attributes.date_premiere_obs + "<br/>"
		+"<b>Date de dernière obs.: </b>"+ feature.attributes.date_derniere_obs + "<br/>"
		+"<b>Nb obs. date≥2000: </b>"+ feature.attributes.nb_obs_2001_2013 + "<br/>"
		+"<b>Nb obs. localisation avérée: </b>"+ feature.attributes.nb_obs_averee + "<br/>"
   });
   popup_reunion.show();
}


//Affichage du popup quand selection d'un objet du layer synthese communale reunion
synthese_commune_reunion_layer.events.on({
   featureselected: function(e) {
   if(typeof(popup_reunion) != "undefined"){
                popup_reunion.destroy();
            }
         createPopup_reunion(e.feature);
   }
});

//Création de la variable popup pour synthese maille
var popup_maille;
function createPopup_maille(feature) {
   popup_maille = new GeoExt.Popup({
      title: feature.attributes.cd_sig,
      defaults: {
        anchor: '50%',
        xtype: 'boxbutton'
    },
      location: feature,
      width:300,
 //     height:220,
      maximizable: true,
      buttonAlign : 'center',
      collapsible: false,
    items: [
          {html: "<b>Nom(s) du(des) taxon(s): </b><br/>"+ feature.attributes.noms_taxon + "<br/>"
      +"<b>Nb observations: </b>"  + feature.attributes.nb_obs +"<br/>"
		+"<b>Date de première obs.: </b>"+ feature.attributes.date_premiere_obs + "<br/>"
		+"<b>Date de dernière obs.: </b>"+ feature.attributes.date_derniere_obs + "<br/>"
		+"<b>Nb obs. date≥2000: </b>"+ feature.attributes.nb_obs_2001_2013 + "<br/>"
		+"<b>Nb obs. loc. avérée: </b>"+ feature.attributes.nb_obs_averee + "<br/>"
		},
		new Ext.Button({
text : 'Voir les observations',
xtype: 'boxbutton',
width:286,
buttonAlign : 'center',
handler : function() {
Ext.getCmp('commentaires_existants').store.removeAll();
if(typeof commentairepanel =='object'){commentairepanel.getForm().setValues({
id_obj: '',
id_flore_fcbn: '',
});}

			//cas synthese 10 + rang taxon choisi uniquement
			if (datasetsynthese == '1' && datasetrang == '1' )
				{
Ext.getCmp('observations_fr10_ss_inf').store.removeAll();
Ext.getCmp('observations_fr10_ss_inf').store.load({params: {cd_ref: datasetId_tax,id_obj: id_obj_select}});
mapTabPanel.unhideTabStripItem(observationsPanel_fr10_ss_inf); 
mapTabPanel.setActiveTab(observationsPanel_fr10_ss_inf);
popup_maille.destroy(); 
				}
			else
			//cas synthese 10 + rang taxon choisi et inferieur
			if (datasetsynthese == '1' && datasetrang == '2' )
				{
Ext.getCmp('observations_fr10').store.removeAll();
Ext.getCmp('observations_fr10').store.load({params: {cd_ref: datasetId_tax,id_obj: id_obj_select}});
mapTabPanel.unhideTabStripItem(observationsPanel_fr10); 
mapTabPanel.setActiveTab(observationsPanel_fr10);
popup_maille.destroy(); 				
				}
			else
			//cas synthese 5 + rang taxon choisi uniquement
			if (datasetsynthese == '2' && datasetrang == '1' )
			{
Ext.getCmp('observations_fr5_ss_inf').store.removeAll();
Ext.getCmp('observations_fr5_ss_inf').store.load({params: {cd_ref: datasetId_tax,id_obj: id_obj_select}});
mapTabPanel.unhideTabStripItem(observationsPanel_fr5_ss_inf); 
mapTabPanel.setActiveTab(observationsPanel_fr5_ss_inf);
popup_maille.destroy(); 				
				}
			else
			//cas synthese 5 + rang taxon choisi et inferieur
			if (datasetsynthese == '2' && datasetrang == '2' )
				{			
Ext.getCmp('observations_fr5').store.removeAll();
Ext.getCmp('observations_fr5').store.load({params: {cd_ref: datasetId_tax,id_obj: id_obj_select}});
mapTabPanel.unhideTabStripItem(observationsPanel_fr5); 
mapTabPanel.setActiveTab(observationsPanel_fr5);
popup_maille.destroy(); 
				}

}
})
,
new Ext.Button({
text : 'Voir les commentaires',
xtype: 'boxbutton',
width:286,
handler : function() {
mapTabPanel.setActiveTab(commentPanel);
Ext.getCmp('observations_fr5').store.removeAll();
Ext.getCmp('observations_fr10').store.removeAll();
Ext.getCmp('observations_comm').store.removeAll();
Ext.getCmp('observations_fr5_ss_inf').store.removeAll();
Ext.getCmp('observations_fr10_ss_inf').store.removeAll();
Ext.getCmp('observations_comm_ss_inf').store.removeAll();
if(typeof commentairepanel =='object'){commentairepanel.getForm().setValues({
id_obj: '',
id_flore_fcbn: '',
});}
Ext.getCmp('commentaires_existants').store.removeAll();
Ext.getCmp('commentaires_existants').store.load({params: {cd_ref: datasetId_tax,id_obj: id_obj_select}});
popup_maille.destroy(); 
}
})
,
new Ext.Button({
text : 'Commenter cette maille',
disabled: buttonCommentHide,
hidden: buttonCommentHide,
xtype: 'boxbutton',
width:286,
align: 'center',
handler : function() {
if(typeof commentPanel_new =='object'){mapTabPanel.setActiveTab(commentPanel_new);}
Ext.getCmp('commentaires_existants').store.removeAll();
Ext.getCmp('observations_fr5').store.removeAll();
Ext.getCmp('observations_fr10').store.removeAll();
Ext.getCmp('observations_comm').store.removeAll();
Ext.getCmp('observations_fr5_ss_inf').store.removeAll();
Ext.getCmp('observations_fr10_ss_inf').store.removeAll();
Ext.getCmp('observations_comm_ss_inf').store.removeAll();
if(typeof commentairepanel =='object'){commentairepanel.getForm().setValues({
id_obj: id_obj_select,
id_flore_fcbn: '',
});}
popup_maille.destroy(); 
}
})
]
   });
   popup_maille.show();
id_obj_select= feature.attributes.cd_sig;
}

//Création de la variable popup pour synthese maille reunion (sans boutton pour le moment)
var popup_maille_reunion;
function createPopup_maille_reunion(feature) {
   popup_maille_reunion = new GeoExt.Popup({
      title: feature.attributes.cd_sig,
      location: feature,
      width:200,
 //     height:220,
      maximizable: true,
      buttonAlign : 'center',
      collapsible: false,
html: "<b>Nom(s) du(des) taxon(s): </b><br/>"+ feature.attributes.noms_taxon + "<br/>"
      +"<b>Nb observations: </b>"  + feature.attributes.nb_obs +"<br/>"
		+"<b>Date de première obs.: </b>"+ feature.attributes.date_premiere_obs + "<br/>"
		+"<b>Date de dernière obs.: </b>"+ feature.attributes.date_derniere_obs + "<br/>"
		+"<b>Nb obs. date≥2000: </b>"+ feature.attributes.nb_obs_2001_2013 + "<br/>"
		+"<b>Nb obs. loc. avérée: </b>"+ feature.attributes.nb_obs_averee + "<br/>"
   });
   popup_maille_reunion.show();
}

//Création de la variable popup pour commenter observations precise depuis observation maille
var popup_obs;
function createPopup_obs() {
//popup_obs.destroy();
   popup_obs = new Ext.Window({
      title: "ID_FLORE_MERE: "+rec.get('id_flore_mere'),
      defaults: {
        anchor: '50%',
        xtype: 'boxbutton'
    },
      width:300,
      location: rec,
      maximizable: true,
      collapsible: true,
      items: [
new Ext.Button({
text : 'Voir les commentaires',
xtype: 'boxbutton',
width:286,
handler : function() {
mapTabPanel.setActiveTab(commentPanel);
if(typeof commentairepanel =='object'){commentairepanel.getForm().setValues({
id_obj: '',
id_flore_fcbn: '',
});}
Ext.getCmp('commentaires_existants').store.removeAll();
Ext.getCmp('commentaires_existants').store.load({params: {cd_ref: datasetId_tax,id_obj:'',id_flore_fcbn: rec.get('id_flore_fcbn')}});
popup_obs.destroy(); 
}
})
,
new Ext.Button({
text : 'Commenter cette observation',
disabled: buttonCommentHide,
hidden: buttonCommentHide,
xtype: 'boxbutton',
width:286,
handler : function() {
Ext.getCmp('commentaires_existants').store.removeAll();
if(typeof commentPanel_new =='object'){mapTabPanel.setActiveTab(commentPanel_new);}
if (datasetsynthese == '1' || datasetsynthese == '2' )
{
if(typeof commentairepanel =='object'){commentairepanel.getForm().setValues({
id_obj: rec.get('cd_sig'),
id_flore_fcbn: rec.get('id_flore_fcbn')
});}
}
else 
if (datasetsynthese == '3' )
{
if(typeof commentairepanel =='object'){commentairepanel.getForm().setValues({
id_obj: rec.get('insee_comm'),
id_flore_fcbn: rec.get('id_flore_fcbn')
});}
}
popup_obs.destroy(); 
//Ext.MessageBox.alert(rec.get('cd_ref'));
//Ext.MessageBox.alert(Ext.getCmp('observations_fr10').getStore().getAt(0));
//Ext.MessageBox.alert(Ext.getCmp('observations_fr10').getStore().getAt(1));
}
})
]
   });
//   popup_obs.destroy();
   popup_obs.show();
//  var id_obj_select_obs= Ext.getCmp('observations_fr10').getStore().getAt(9);
//  var id_obj_select= feature.attributes.cd_sig;
}

//création du listener pour ouverture popup sur clique dans le gripanel des observations
gridPanel_obs_fr10.addListener("rowclick", function(gridPanel_obs_fr10, rowIndex, e) {
rec = gridPanel_obs_fr10.getStore().getAt(rowIndex);
//popup_obs.destroy();
if(typeof(popup_obs) != "undefined"){
                popup_obs.destroy();
            }
createPopup_obs();
//alert(rec.get('cd_ref'));
}, this);

//création du listener pour ouverture popup sur clique dans le gripanel des observations
gridPanel_obs_fr5.addListener("rowclick", function(gridPanel_obs_fr5, rowIndex, e) {
rec = gridPanel_obs_fr5.getStore().getAt(rowIndex);
//popup_obs.destroy();
if(typeof(popup_obs) != "undefined"){
                popup_obs.destroy();
            }
createPopup_obs();
//alert(rec.get('cd_ref'));
}, this);

//création du listener pour ouverture popup sur clique dans le gripanel des observations
gridPanel_obs_comm.addListener("rowclick", function(gridPanel_obs_comm, rowIndex, e) {
rec = gridPanel_obs_comm.getStore().getAt(rowIndex);
//popup_obs.destroy();
if(typeof(popup_obs) != "undefined"){
                popup_obs.destroy();
            }
createPopup_obs();
//alert(rec.get('cd_ref'));
}, this);

//création du listener pour ouverture popup sur clique dans le gripanel des observations
gridPanel_obs_fr10_ss_inf.addListener("rowclick", function(gridPanel_obs_fr10_ss_inf, rowIndex, e) {
rec = gridPanel_obs_fr10_ss_inf.getStore().getAt(rowIndex);
//popup_obs.destroy();
if(typeof(popup_obs) != "undefined"){
                popup_obs.destroy();
            }
createPopup_obs();
//alert(rec.get('cd_ref'));
}, this);

//création du listener pour ouverture popup sur clique dans le gripanel des observations
gridPanel_obs_fr5_ss_inf.addListener("rowclick", function(gridPanel_obs_fr5_ss_inf, rowIndex, e) {
rec = gridPanel_obs_fr5_ss_inf.getStore().getAt(rowIndex);
//popup_obs.destroy();
if(typeof(popup_obs) != "undefined"){
                popup_obs.destroy();
            }
createPopup_obs();
//alert(rec.get('cd_ref'));
}, this);

//création du listener pour ouverture popup sur clique dans le gripanel des observations
gridPanel_obs_comm_ss_inf.addListener("rowclick", function(gridPanel_obs_comm_ss_inf, rowIndex, e) {
rec = gridPanel_obs_comm_ss_inf.getStore().getAt(rowIndex);
//popup_obs.destroy();
if(typeof(popup_obs) != "undefined"){
                popup_obs.destroy();
            }
createPopup_obs();
//alert(rec.get('cd_ref'));
}, this);

//Affichage du popup quand selection d'un objet du layer synthese maille 10
synthese_fr10_layer.events.on({
   featureselected: function(e) {
   if(typeof(popup_maille) != "undefined"){
                popup_maille.destroy();
            }
	  mapTabPanel.setActiveTab(mapPanel);
         createPopup_maille(e.feature);      
   }
});

//Affichage du popup quand selection d'un objet du layer synthese maille 5
synthese_fr5_layer.events.on({
   featureselected: function(e) {
   if(typeof(popup_maille) != "undefined"){
                popup_maille.destroy();
            }
	  mapTabPanel.setActiveTab(mapPanel);
         createPopup_maille(e.feature);
   }
});

//Affichage du popup quand selection d'un objet du layer synthese maille utm 1
synthese_utm1_layer.events.on({
   featureselected: function(e) {
   if(typeof(popup_maille_reunion) != "undefined"){
                popup_maille_reunion.destroy();
            }
	
         createPopup_maille_reunion(e.feature);
   }
});

//Affichage du popup quand selection d'un objet du layer synthese maille utm 10
synthese_utm10_layer.events.on({
   featureselected: function(e) {
   if(typeof(popup_maille_reunion) != "undefined"){
                popup_maille_reunion.destroy();
            }
         createPopup_maille_reunion(e.feature);
   }
});

//Création de l'onglet contenant la carte principale
var mapPanel = new GeoExt.MapPanel({
map: map,
id:'mapPanel',
region : 'center',
height: 600,
width: 800,
//autofit: true,
title: 'Carte de répartition: Métropole',
collapsible: false,
 });

//A voir si utile
var layerRec0 = mapPanel.layers.getAt(1);

//Création du panneau contenant la carte de la réunion 
 var mapPanel2 = new GeoExt.MapPanel({
map: map2,
region : 'east',
height: 240,
//width: 270,
//autofit: true,
title: 'Carte de répartition: Ile de La Réunion (échelle différente)',
collapsible: true,
});

//Création du type d'arbre de couches personnalisé pour la carte metropole
// create our own layer node UI class, using the TreeNodeUIEventMixin
    var LayerNodeUI = Ext.extend(GeoExt.tree.LayerNodeUI, new GeoExt.tree.TreeNodeUIEventMixin());    
    // using OpenLayers.Format.JSON to create a nice formatted string of the
    // configuration for editing it in the UI
    var treeConfig = new OpenLayers.Format.JSON().write([{
        nodeType: "gx_baselayercontainer",
		expanded: false,
		text: "Fonds de cartes"
    }
    // , {
        // nodeType: "gx_overlaylayercontainer",
		// text: "Autres couches",
        // expanded: false,
        // // render the nodes inside this container with a radio button,
        // // and assign them the group "foo".
        // loader: {
            // baseAttrs: {
                // radioGroup: "foo",
                // uiProvider: "layernodeui"
            // }
        // }
    // }
	, {
        nodeType: "gx_layer",
        layer: "INPN",
        isLeaf: true,
        //expanded: true,
        // create subnodes for the layers in the LAYERS param. If we assign
        // a loader to a LayerNode and do not provide a loader class, a
        // LayerParamLoader will be assumed.
        loader: {
            param: "LAYERS"
        }}
        ,{
        nodeType: "gx_layer",
        layer: "Limites administratives et CBN",
        isLeaf: true,
        //expanded: true,
        // create subnodes for the layers in the LAYERS param. If we assign
        // a loader to a LayerNode and do not provide a loader class, a
        // LayerParamLoader will be assumed.
        loader: {
            param: "LAYERS"
        }},
        {
        nodeType: "gx_layer",
        layer: "Cours d'eau",
        isLeaf: false,
        //expanded: true,
        // create subnodes for the layers in the LAYERS param. If we assign
        // a loader to a LayerNode and do not provide a loader class, a
        // LayerParamLoader will be assumed.
        loader: {
            param: "LAYERS"
        }      
    }
, 
], true);
//Fin de création du type d'arbre de couches personnalisé

// var BaseLayerContainer_reunion=new GeoExt.tree.BaseLayerContainer({
// text: "Fonds de carte",
// layerStore: mapPanel2.layers,
// expanded: false
// });

// //Création du type d'arbre de couches personnalisé pour la carte réunion
// // create our own layer node UI class, using the TreeNodeUIEventMixin
 var LayerNodeUI_2 = Ext.extend(GeoExt.tree.LayerNodeUI, new GeoExt.tree.TreeNodeUIEventMixin());    
    // // using OpenLayers.Format.JSON to create a nice formatted string of the
    // // configuration for editing it in the UI
    // var treeConfig_2 = new OpenLayers.Format.JSON().write([
    // // {
        // // new GeoExt.tree.BaseLayerContainer({
// // text: "Fonds de carte",
// // layerStore: mapPanel2.layers,
// // expanded: false
// // })
    // // },
    // {
        // nodeType: "gx_overlaylayercontainer",
       // // map: map2,
		// text: "Autres couches",
        // expanded: false,
        // // render the nodes inside this container with a radio button,
        // // and assign them the group "foo".
        // loader: {
            // baseAttrs: {
                // radioGroup: "foo",
                // uiProvider: "layernodeui"
            // }
        // }
    // }
	// , {
        // nodeType: "gx_layer",
        // layer: "INPN",
        // isLeaf: false,
        // //expanded: true,
        // // create subnodes for the layers in the LAYERS param. If we assign
        // // a loader to a LayerNode and do not provide a loader class, a
        // // LayerParamLoader will be assumed.
// //        layerStore: mapPanel2.layers,
        // loader: {
            // param: "LAYERS"
        // }}
        // , 
// ], true);
// //Fin de création du type d'arbre de couches personnalisé

//Création de l'arbre des couches pour la carte metropole
var layerTree = new Ext.tree.TreePanel({
border: true,
        region: "east",
        title: "Couches de la carte Métropole",	
		region : 'east',
        collapsible: true,
        autoScroll: true,
		enableDD: true,
		// floating: true,
        // x: 380,
        // y: 0,
		//      width: 270,
		//	   autofit: true,
		//	   layout : 'fit',
		//       collapseMode: "mini",
       split: true,
       collapsible: true,
       autoScroll: true,
        // plugins: [
            // new GeoExt.plugins.TreeNodeRadioButton({
                // listeners: {
                    // "radiochange": function(node) {
                        // alert(node.text + " is now the active layer.");
                    // }
                // }
            // })
        // ],
        loader: new Ext.tree.TreeLoader({
            // applyLoader has to be set to false to not interfer with loaders
            // of nodes further down the tree hierarchy
            applyLoader: false,
            uiProviders: {
                "layernodeui": LayerNodeUI
            }
        }),
        root: {
            nodeType: "async",
            // the children property of an Ext.tree.AsyncTreeNode is used to
            // provide an initial set of layer nodes. We use the treeConfig
            // from above, that we created with OpenLayers.Format.JSON.write.
            children: Ext.decode(treeConfig)
        },
        // listeners: {
            // "radiochange": function(node){
                // alert(node.layer.name + " is now the the active layer.");
            // }
        // },
        rootVisible: false,
		lines: true,
        // bbar: [{
            // text: "Show/Edit Tree Config",
            // handler: function() {
                // treeConfigWin.show();
                // Ext.getCmp("treeconfig").setValue(treeConfig);
            // }
        // }]
    });

// var store_inpn_reunion = new GeoExt.data.LayerStore({
    // map: map2,
    // initDir:1,
    // layers: inpn_reunion
// });
    
//Création du noeud contenant les couches pour la réunion
var layerRoot = new Ext.tree.TreeNode({
text: "Couches de la carte métropole",
expanded: true
});
layerRoot.appendChild(new GeoExt.tree.BaseLayerContainer({
text: "Fonds de carte",
layerStore: mapPanel2.layers,
expanded: false
}));
layerRoot.appendChild(new GeoExt.tree.LayerContainer({
text: "INPN",
layerStore: mapPanel2.layers,
leaf: false,
expanded: false,
loader: {
        filter: function(record) {
           return record.get("layer").name.indexOf("Arretes_de_protection_de_biotope") !== -1
	 || record.get("layer").name.indexOf("Parcs_nationaux") !== -1
	 || record.get("layer").name.indexOf("Reserves_biologiques") !== -1
	 || record.get("layer").name.indexOf("Reserves_naturelles") !== -1
	 || record.get("layer").name.indexOf("Terrains_du_Conservatoire_du_Littoral") !== -1
        }
    }

}));

//Création de l'arbre de couche pour la carte de la réunion	
var layerTree2 = new Ext.tree.TreePanel({
border: true,
        region: "east",
        title: "Couches de la carte Ile de La Réunion",	
		region : 'east',
		//collapseMode: "mini",
		//autofit: true,
		//layout : 'fit',
        rootVisible: false,
        autoScroll: true,
		enableDD: true,
		split: true,
		collapsible: true,
		root: layerRoot,
    });
    
// //Création de l'arbre des couches pour la carte réunion
// var layerTree2 = new Ext.tree.TreePanel({
// border: true,
        // region: "east",

       // // map: map2,
        // title: "Couches de la carte Ile de La Réunion",	
		// region : 'east',
        // collapsible: true,
        // autoScroll: true,
		// enableDD: true,
		// // floating: true,
        // // x: 380,
        // // y: 0,
		// //      width: 270,
		// //	   autofit: true,
		// //	   layout : 'fit',
		// //       collapseMode: "mini",
       // split: true,
       // collapsible: true,
       // autoScroll: true,
        // // plugins: [
            // // new GeoExt.plugins.TreeNodeRadioButton({
                // // listeners: {
                    // // "radiochange": function(node) {
                        // // alert(node.text + " is now the active layer.");
                    // // }
                // // }
            // // })
        // // ],
        // loader: new Ext.tree.TreeLoader({
            // // applyLoader has to be set to false to not interfer with loaders
            // // of nodes further down the tree hierarchy
            // applyLoader: false,
            // uiProviders: {
                // "layernodeui": LayerNodeUI_2
            // }
        // }),
        // root: {
            // nodeType: "async",
            // // the children property of an Ext.tree.AsyncTreeNode is used to
            // // provide an initial set of layer nodes. We use the treeConfig
            // // from above, that we created with OpenLayers.Format.JSON.write.
            // children: Ext.decode(treeConfig_2)
        // },
        // // listeners: {
            // // "radiochange": function(node){
                // // alert(node.layer.name + " is now the the active layer.");
            // // }
        // // },
        // rootVisible: false,
		// lines: true,
        // // bbar: [{
            // // text: "Show/Edit Tree Config",
            // // handler: function() {
                // // treeConfigWin.show();
                // // Ext.getCmp("treeconfig").setValue(treeConfig);
            // // }
        // // }]
    // });    


	
//Création du panneau de droite contenant la carte de la réunion et les deux arbres de couches
var eastPanel = new Ext.Panel({
region : 'east',
border : false,
width : 280,
minSize: 275,
collapsible: true,
autoScroll: true,
//layout: 'fit',
items : [mapPanel2,layerTree2,layerTree,eastPanel_2]
});

//Onglet central avec les explications
var help_panel = new Ext.Panel({
title : 'Utilisation/Bugs',
id:'help_panel',
region : 'center',
layout : 'fit',
collapsible: false,
width : 600,
height : 800,
border: false,
// html: "<b>Nom(s) du(des) taxon(s): </b><br/>"+ feature.attributes.noms_taxon + "<br/>"
      // +"<b>Nombre d'observations: </b>"  + feature.attributes.nb_obs +"<br/>"
		// +"<b>Date de première obs: </b>"+ feature.attributes.date_premiere_obs + "<br/>"
		// +"<b>Date de dernière obs: </b>"+ feature.attributes.date_derniere_obs + "<br/>"
		// +"<b>Nb obs date≥2000: </b>"+ feature.attributes.nb_obs_2001_2013 + "<br/>"
		// +"<b>Nb obs loc avérée: </b>"+ feature.attributes.nb_obs_averee + "<br/>"
html: "<br/><U><b>NOTICE D'UTILISATION : </b></U>"
+"<br/>Le site fonctionne avec les navigateurs Google Chrome, Mozilla Firefox et Internet Explorer, il est cependant plus performant avec Google Chrome."
+"<br/><b>Attention : </b>Ne jamais utiliser le bouton « revenir en arrière » de votre navigateur pour visualiser la page précédente."
+"<br/><a href='./help.htm' target=_blank>Voir la notice détaillée sur le fonctionnement de l'interface</a><br/><br/>"
+"<br/><U><b>SIGNALER UN BUG: </b></U>"
+"<br/>Pour signaler un bug technique, un problème fonctionnel ou faire une demande d'évolution, le forum de la plateforme d'échange doit être utilisée (il faut être connecté sur l'extranet pour que le lien fonctionne):"
+"<br/><a href='http://www.fcbn.fr/extranet/module_forum/index.php?theme=43' target=_blank>/Forums/Interface de consultation du SI Flore/</a><br/><br/>"
});

//Création du panneau principal contenant les onglets carte metropole, obseravation et commentaire
var mapTabPanel = new Ext.TabPanel({
       title:'panel principal',
       activeTab: 0,
		region : 'center',
		collapsible: false,
       items:[mapPanel,observationsPanel_fr10,observationsPanel_fr10_ss_inf,observationsPanel_fr5,observationsPanel_fr5_ss_inf,observationsPanel_comm,observationsPanel_comm_ss_inf,observationsPanel_utm,observationsPanel_utm_ss_inf,commentPanel,help_panel],
       listeners: {
                'tabchange': function(mapTabPanel, tab){
		if(typeof(popup_maille) != "undefined"){
		popup_maille.destroy();
		}
		if(typeof(popup_obs) != "undefined"){
		popup_obs.destroy();
		}
                  
                }
            }
   });

//Création du Viewport contenant les différents panneaux (élement principal)   
/*new Ext.Viewport({
layout: "border",
defaults: {
split: true
},
items: [
westPanel,
southTabPanel,
mapTabPanel,
eastPanel
]
});*/

var MainContainer = new Ext.Container({    
    title:'Main Container',
    layout: "border",
    defaults: {
        split: true
    },
    plugins: [
            new Ext.ux.FitToParent()
    ],
    renderTo: 'SIFloreWrap',
    items: [
        westPanel,
        southTabPanel,
        mapTabPanel,
        eastPanel
    ]
});

southTabPanel.hideTabStripItem(southPanel_taxon_fr5);
southTabPanel.hideTabStripItem(southPanel_taxon_fr5_ss_inf);
southTabPanel.hideTabStripItem(southPanel_taxon_fr10_ss_inf);
southTabPanel.hideTabStripItem(southPanel_taxon_utm_ss_inf);
southTabPanel.hideTabStripItem(southPanel_taxon_comm);
southTabPanel.hideTabStripItem(southPanel_taxon_comm_ss_inf);
southTabPanel.hideTabStripItem(southPanel_comm);
southTabPanel.hideTabStripItem(southPanel_comm_reunion);    
southTabPanel.hideTabStripItem(southPanel_fr5);
southTabPanel.hideTabStripItem(southPanel_utm1);    
southTabPanel.setActiveTab(southPanel_fr10); 
mapTabPanel.hideTabStripItem(observationsPanel_fr10); 
mapTabPanel.hideTabStripItem(observationsPanel_fr10_ss_inf); 
mapTabPanel.hideTabStripItem(observationsPanel_fr5); 
mapTabPanel.hideTabStripItem(observationsPanel_fr5_ss_inf); 
mapTabPanel.hideTabStripItem(observationsPanel_comm); 
mapTabPanel.hideTabStripItem(observationsPanel_comm_ss_inf); 
mapTabPanel.hideTabStripItem(observationsPanel_utm); 
mapTabPanel.hideTabStripItem(observationsPanel_utm_ss_inf); 
//Ferme la fonction init principale

