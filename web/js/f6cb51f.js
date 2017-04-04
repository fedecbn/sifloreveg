buttonCommentHide=false;
//Bouton permettant d'envoyer les commentaires
var save = new Ext.Button({
text : 'Envoyer',
handler : function() {
//On charge les variables avec les valeurs, y compris la valeur du taxon selectionné
var 	cd_ref=datasetId_tax;
var	nom = Ext.getCmp('nom').getValue();
var	comment = Ext.getCmp('comment').getValue();
var	email = Ext.getCmp('email').getValue();
var	type_com = Ext.getCmp('type_com').getValue();
var	priorite_com = Ext.getCmp('priorite_com').getValue();
var	action_com = Ext.getCmp('action_com').getValue();
var       nom_complet=datasetNom_tax;
//Un commentaire étant forcement associé à un taxon, on verifie qu'un taxon est selectionné
if (cd_ref=='')
Ext.MessageBox.alert("Erreur !","Veuillez d'abord sélectionner un taxon");
else
//On verifie si un des champs obligatoires est vide
if (nom=='' || comment=='' || email=='' || type_com=='' || priorite_com=='' || action_com=='')
Ext.MessageBox.alert("Erreur !","Veuillez remplir tous les champs");
else
//On envoi la requete chargant la base avec les valeurs
{
commentairepanel.load({
    url: queryroute+'commentaires',
	//	method: 'GET',
	params: {
	nom: Ext.getCmp('nom').getValue(),
	comment: Ext.getCmp('comment').getValue(),
	prenom: Ext.getCmp('prenom').getValue(),
	email: Ext.getCmp('email').getValue(),
	type_com: Ext.getCmp('type_com').getValue(),
	priorite_com: Ext.getCmp('priorite_com').getValue(),
	action_com: Ext.getCmp('action_com').getValue(),
	cd_ref:datasetId_tax,
	id_obj: Ext.getCmp('id_obj').getValue(),
	id_flore_fcbn: Ext.getCmp('id_flore_fcbn').getValue(),
	nom_complet:datasetNom_tax
	},
	// scope: this,
	// callback: function(records, operation, success) {
	// if (success) {
		// Ext.getCmp('commentaires_existants').store.removeAll();
		// Ext.getCmp('commentaires_existants').store.load({params: {cd_ref: datasetId_tax}});
		// Ext.MessageBox.alert("Enregistrement commentaire","Votre commentaire à bien été pris en compte.");
		// } 
		// else {
		// Ext.MessageBox.alert("Chargement fini","Pas d'observation");
			// }
	// }
});
Ext.MessageBox.alert("Enregistrement commentaire","Votre commentaire à bien été pris en compte.");			
}
}
});


//Formpanel avec les champs pour nouveau commentaire
var commentairepanel = new Ext.FormPanel({
        labelAlign: 'top',
        frame:true,
		id:'commentaires',
		url:queryroute+'commentaires',
//        title: 'Commentaires',
        bodyStyle:'padding:5px 5px 0',
        width: 600,
        id:'commentairepanel',
        items: [{
            layout:'column',
            items:[{
                columnWidth:.33,
                layout: 'form',
                items: [{
                    xtype:'textfield',
                    fieldLabel: 'Nom taxon',
		readOnly:true,
		id:'nom_complet',
                    name: 'nom_complet',
		style : "background-image:none;background-color:#D3D3D3;",
                    anchor:'95%'
                },{
                    xtype:'textfield',
                    fieldLabel: 'Prenom',
					id:'prenom',
                    name: 'prenom',
                    anchor:'95%'
                },{
                    xtype:'combo',
		mode :'local',
		editable : true,
		typeAhead: true,
		selectOnFocus:true,
		forceSelection: true,
		triggerAction: 'all',					
		store: type_com,
		valueField:'id',
		displayField:'type_com',
                    fieldLabel: 'Type de commentaire',
		id:'type_com',
                    name: 'type_com',
		blankText:"Veuillez saisir le type de commentaire.",
                    anchor:'95%'
                }
                ]
            },{
                columnWidth:.33,
                layout: 'form',
                items: [{
                    xtype:'textfield',
                    fieldLabel: 'Code maille / Code insee',
		style : "background-image:none;background-color:#D3D3D3;",
		id:'id_obj',
		readOnly:true,
                    name: 'id_obj',
                    anchor:'95%'
                },{
                    xtype:'textfield',
                    fieldLabel: 'Nom',
					id:'nom',
					allowBlank: false,
					blankText:"Veuillez saisir votre Nom.",
                    name: 'nom',
                    anchor:'95%'
                },{
                    xtype:'combo',
		mode :'local',
		editable : true,
		typeAhead: true,
		selectOnFocus:true,
		forceSelection: true,
		triggerAction: 'all',					
		store: action_com,
		valueField:'id',
		displayField:'action_com',
                    fieldLabel: 'Action demandée',
		id:'action_com',
                    name: 'action_com',
		blankText:"Veuillez saisir l'action demandée.",
                    anchor:'95%'
                }]},{
                columnWidth:.34,
                layout: 'form',
                items: [{
                    xtype:'textfield',
                    fieldLabel: "Code de l'observation",
		style : "background-image:none;background-color:#D3D3D3;",
		readOnly:true,
					id:'id_flore_fcbn',
                    name: 'id_flore_fcbn',
                    anchor:'95%'
                },{
                    xtype:'textfield',
                    fieldLabel: 'Email',
                    id:'email',
					name: 'email',
					vtype: 'email', 	//Vérification type : met un masque d'adresse email sur ce champ
            vtypeText: 'Votre adresse email doit être de la forme de "user@domain.com"', //message si email non valide
            allowBlank: false,   //champ obligatoire pour poster le formulaire
            blankText:"Veuillez saisir votre adresse email." ,  //message si le champ n'est pas rempli
			anchor:'95%'
                },{
                   xtype:'combo',
		mode :'local',
		editable : true,
		typeAhead: true,
		selectOnFocus:true,
		forceSelection: true,
		triggerAction: 'all',					
		store: priorite_com,
		valueField:'id',
		displayField:'priorite_com',
                    fieldLabel: 'Priorité',
		id:'priorite_com',
                    name: 'priorite_com',
		blankText:"Veuillez saisir la priorité.",
                    anchor:'95%'
                }]
            }]
        },{
            xtype:'htmleditor',
            id:'comment',
            fieldLabel:'Commentaire',
			allowBlank: false,
			blankText:"Veuillez saisir votre commentaire.",
            height:200,
            anchor:'98%'
        }],
        buttons: [save]
    });
//Onglet central avec la saisi d'un noveau commentaire
var commentPanel_new = new Ext.Panel({
title : 'Nouveau commentaire',
region : 'center',
id:'commentPanel_new',
layout : 'fit',
collapsible: false,
width : '100%',
height : 300,
border: false,
items : [commentairepanel]
});
mapTabPanel.add(commentPanel_new);



