<?php
    $db= new PDO('sqlite:prova.db');//Creazione oggetto PDO collegato a DB locale

    //primo metodo per eseguire una query e printare l'output
    $sql="SELECT * FROM INSEGNANTI";

    foreach ($db->query($sql) as $row) {
        echo $row['nome'] . "\t";
        echo $row['cognome'] . "\t";
        echo $row['materia'] . "\n";
    }
/*
    //secondo metodo per eseguire un comando. Utilizzato soprattutto per comandi diversi da SELECT
    $sql="INSERT INTO sqlite_sequence values ('ciao', 'bello')";
    $prepare= $db->prepare($sql);
    $prepare->execute();

    foreach ($db->query("SELECT * FROM sqlite_sequence") as $row) {
        echo $row['name'] . "\t";
    }
    echo "<br> tuple:".$db->exec($sql);

    //terzo metodo: esegue il comando e dice quante tuple ha modificato, in questo caso dirà quante tuple ha eliminato
    $sql="DELETE FROM sqlite_sequence";
    echo "<br> tuple:".$db->exec($sql);
*/

