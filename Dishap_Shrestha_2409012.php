

<?php
include("dishap_shrestha_2409012_connection.php");
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

#created a databases
$passed=createdb("127.0.0.1","root","");
if (isset($_GET['place'])){
    $place=$_GET['place'];
}
else{
echo '{"error":"no place"}';
}

#connection to database
$connection = connect_database("127.0.0.1", "root", "", $passed);
$allData = select_weather_data($connection, $place);
$data_there = null;
if ($allData !== null && count($allData) == 0) {
    $data_there = null;
} else {
    $lastIndex = count($allData) - 1;
    $data_there = $allData[$lastIndex];
}

#pastdays data.
$weekdata = get_seven_data($connection,$place);
    if(isset($_GET["history"])){
        echo json_encode($weekdata);
        exit;
    }

#In case of data search checks if the data is presented or not!
if ($data_there){
    $refreshtime=24*60*60;
    $datatimestamp=$data_there["dayanddate"];
    $currenttime=time();
    if ($currenttime-$datatimestamp>$refreshtime){
        $newdata=insert_and_fetch($connection,$place);
        $result=select_weather_data($connection,$place);
        if ($result){
            echo json_encode($result);
        }
        else{
            echo '{"data":"error fetching and inserting the data"}';}
    }else{
        echo json_encode($data_there);
    }
#if data doesn't exist in database it fetches it,inserts it and shows.
}else{
    $newdata1=insert_and_fetch($connection,$place);
    // var_dump($newdata1);
    $result=select_weather_data($connection,$place);
    if($newdata1){
        $dataformating = [
             "temperature" =>$newdata1['main']['temp'],
           "place" =>$newdata1['name'],
           "descript" =>$newdata1['weather'][0]['main'],
           "humidity" =>$newdata1['main']['humidity'],
           "windspeed" =>$newdata1['wind']['speed'],
           "pressure" =>$newdata1['main']['pressure'],
           "dayanddate" =>$newdata1['dt'],
        ];
            echo json_encode($dataformating);
    }else{
        echo "{Error: Failed}";
    }

    // if ($result){
    //     echo json_encode($result);
    // }else{
    //     echo "in 39 line error";
    //     return null;
    // }
}
?>