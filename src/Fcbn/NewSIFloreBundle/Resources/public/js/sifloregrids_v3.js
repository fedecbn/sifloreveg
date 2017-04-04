280a281,282
> //Getting the informations for a taxon (for instance an external url-link on the taxon)
> 
299d300
< 
307c308
<     if (typeof showComments == 'function') {
---
>     if (typeof showComments == 'function'|| showReleve =='function') {
311a313,317
>             $('#readReleveBtn').off('click').click(function() {
>                 var urlReleve = 'query/releve_existant?cd_ref=' + SelectedTaxon + '&synthese_option='+SelectedSyntheseOption+'&id_obj=&id_flore_fcbn=' + key;
>                 showReleve(urlReleve, true);
>                 $('#ObservationsModal').modal('hide');
>             });
314c320
<                 var urlComments = 'query/commentaires_existants?cd_ref=' + SelectedTaxon + '&id_obj=&id_flore_fcbn=' + key;
---
>                 var urlComments = 'query/commentaires_existants?cd_ref=' + SelectedTaxon + '&synthese_option='+SelectedSyntheseOption+'&id_obj=&id_flore_fcbn=' + key;
323c329
<         });
---
>       });
