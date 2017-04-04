<?php

$dbconn = pg_connect("host=192.23.218.10 port=5432 dbname=si_flore_national_v3 user='".$_SERVER['PHP_AUTH_USER']."' password=pUErwasrvIDMrUa");
$varcomment = pg_escape_string($_POST['comment']);  
$insert_commandes="INSERT INTO exploitation.commentaires (prenom,nom,email,comment,utilisateur,cd_ref,id_obj,id_flore_fcbn, date_com, type_com, priorite_com, action_com,nom_complet) values ('".$_POST['prenom']."','".$_POST['nom']."','".$_POST['email']."','" . $varcomment . "','".$_SERVER['PHP_AUTH_USER']."',".$_POST['cd_ref'].",'".$_POST['id_obj']."','".$_POST['id_flore_fcbn']."',CURRENT_DATE,'".$_POST['type_com']."','".$_POST['priorite_com']."','".$_POST['action_com']."','".$_POST['nom_complet']."') returning id;";
$rows = pg_query($dbconn, $insert_commandes);

if (!$rows) {
      echo "An error occured.\n";
        exit;
}
while ($row = pg_fetch_array($rows)) {
    echo $row['id'];
}

     $to      = 'pargass31@gmail.com';
     $subject = 'le sujet';
     $message = 'Bonjour !';
     $headers = 'From: webmaster@example.com' . "\r\n" .
     'Reply-To: webmaster@example.com' . "\r\n" .
     'X-Mailer: PHP/' . phpversion();

     mail($to, $subject, $message, $headers);
	 
pg_close($dbconnect);




?>
