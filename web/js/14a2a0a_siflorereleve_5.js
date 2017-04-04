function fillgridReleve(datacollection) {
    $('#readreleve *').remove();
    var msg = "<table id='ReadReleveTable' class='table table-striped table-hover'><thead><tr><th>Nom taxon</th><th>Abondance-dominance</th><th>Rang de l'observation</th><th>Référentiel mère</th><th>Date début</th><th>Date fin</th><th>Altitude</th><th>Exposition</th><th>Pente</th><th>Type de strate</th><th>organisme d'origine</th><th>Code de l'observation</th><th>Code du relevé</th><th>Code maille / insee</th></tr></thead><tbody>";
    for (var i = 0; i < datacollection["rows"].length; i++) {
        msg = msg + '<tr>'; //open row
        msg = msg + '<td>' + datacollection["rows"][i]["nom_obs_mere"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["coef_ab_dom_obs"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["rang_obs_mere"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["referentiel_mere"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["date_debut_obs"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["date_fin_obs"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["altitude_releve"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["exposition_releve"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["pente_releve"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["type_strate_obs"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["origine_donnee_organisme"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["id_flore_fcbn"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["id_releve_fcbn"] + '</td>';
        msg = msg + '<td>' + datacollection["rows"][i]["id_obj"] + '</td>';
        msg = msg + '</tr>'; //close row
    }
    msg = msg + '</tbody></table>';
    $('#readreleve').append(msg);
    $('#ReadReleveTable').dataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bSort": true,
        "bInfo": false,
        "bAutoWidth": false
    });
}




function showReleve(url,goTo){
    $.ajax({
        url: url,
        dataType: "json",
    }).done(function(data) {
        fillgridReleve(data);
        if (goTo){
            $('#MainTabs a[href="#readreleve"]').tab('show');
        }
    });
}

