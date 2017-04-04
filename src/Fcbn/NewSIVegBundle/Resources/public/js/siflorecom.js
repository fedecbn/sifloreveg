function fillgridComments(datacollection) {
    $('#readcomments *').remove();
    var msg = "<table id='ReadCommentsTable' class='table table-striped table-hover'><thead><tr><th>Nom taxon</th><th>Code maille / insee</th><th>Code de l'observation</th><th>Utilisateur</th><th>Commentaires</th><th>Prénom</th><th>Nom</th><th>Date</th><th>Type commentaire</th><th>Priorité</th><th>Action demandée</th></tr></thead><tbody>";
    for (var i = 0; i < datacollection["rows"].length; i++) {
        msg = msg + '<tr>'; //open row
        msg = msg + '<td>' + datacollection["rows"][i]["nom_complet"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["id_obj"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["id_flore_fcbn"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["utilisateur"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["comment"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["prenom"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["nom"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["date_com"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["type_com"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["priorite_com"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["action_com"] + '</td>';
        msg = msg + '</tr>'; //close row
    }
    msg = msg + '</tbody></table>';
    $('#readcomments').append(msg);
    $('#ReadCommentsTable').dataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bSort": true,
        "bInfo": false,
        "bAutoWidth": false
    });
}




function showComments(url,goTo){
    $.ajax({
        url: url,
        dataType: "json",
    }).done(function(data) {
        fillgridComments(data);
        if (goTo){
            $('#MainTabs a[href="#readcomments"]').tab('show');
        }
    });
}


$('#commentform').on('submit',function(e){
    e.preventDefault();
    $("#inputNomTaxon").prop('disabled', false);
    $("#inputCodeObject").prop('disabled', false);
    $("#inputCodeObs").prop('disabled', false);
    $('.CommMessage').addClass('hidden');
    $.ajax({
        type     : "POST",
        cache    : false,
        url      : $(this).attr('action'),
        data     : $(this).serialize(),
        success  : function(data) {
            if(data!=''){
                $('#SuccesCommMessage').removeClass('hidden');
            }else{
                $('#ErrCommMessage').removeClass('hidden');
            }
            $('#NewCommentModal').modal('show');
        }
    });
    $("#inputNomTaxon").prop('disabled', true);
    $("#inputCodeObject").prop('disabled', true);
    $("#inputCodeObs").prop('disabled', true);

});
