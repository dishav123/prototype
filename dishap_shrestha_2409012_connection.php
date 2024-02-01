

<?php
header('Access-Control-Allow-Origin: *');
// creates new database 
function createdb($server, $username, $password){
    $connect = new mysqli($server, $username, $password);
    // Create a new database named "weather_api"
    $databaseName = "weather_api";
    $createDatabaseQuery = "CREATE DATABASE IF NOT EXISTS $databaseName";
    if ($connect->query($createDatabaseQuery) === FALSE) {
        echo " Error Database created successfully";
    }
        // Select the created database.
        $connect->select_db($databaseName);
        //creates a new table if not exists.
        $createTableQuery = "CREATE TABLE IF NOT EXISTS weather_info(
            id INT AUTO_INCREMENT PRIMARY KEY,
            temperature FLOAT,
            place TEXT,
            descript TEXT,
            humidity FLOAT,
            windspeed FLOAT,
            pressure FLOAT,
            dayanddate TEXT)";
        if ($connect->query($createTableQuery) === false) {
            echo "error Table created successfully";
            echo "<br>";
        }
        return $databaseName;
        // Close the MySQL connection
        $connect->close();
    } 
//function which connects to the database.
function connect_database($server,$username,$password,$dbname){
    $connect= null;
    try{
        $connect_db= new mysqli($server,$username,$password,$dbname);
        if ($connect_db->connect_errno){
            echo'Connection failed:'.$connect->connect_errno;
        }
        else{
            return $connect_db;   
        }
    }
    //Here errortype is a user variable which store the error type.
    catch(exception $errortype){ 
        echo"in exception";
    }};

    #function to select the given data by user.
function select_weather_data($connection,$place){
    try{
        $result=$connection-> query("SELECT * FROM weather_info WHERE place = '$place';");
        if ($result) {
        // Fetch the result as an associative array
        $row = $result->fetch_all(MYSQLI_ASSOC);
        // var_dump($row);
        return $row;
        }else{
            echo"else block";
        return null;
        }
        }
    catch(exception $TH){
        echo"catch block";
    return null;
    }
}
#function to get the data of history.
function get_seven_data($connection, $city)
{
    try {
        $result = $connection->query('SELECT * FROM weather_info WHERE place= "'.$city.'" ORDER BY dayanddate DESC LIMIT 8;');

        if ($result) {
            $data = $result->fetch_all(MYSQLI_ASSOC);
            return $data;
        } else {
            // Provide more information about the error
            echo json_encode(["error" => "Database query error: " . $connection->error]);
            exit;
        }
    } catch (Exception $th) {
        // Provide more information about the exception
        echo json_encode(["error" => "Exception: " . $th->getMessage()]);
        exit;
    }
}
//function which fetch the data from api and insert into database table.
function insert_and_fetch($connect,$searchTerm){
    $apiUrl="https://api.openweathermap.org/data/2.5/weather?q=".$searchTerm."&units=metric&appid=21cac01e411ed2c5fe0e10772a8d64f1";
    $api_data=file_get_contents($apiUrl);
    $api_data=json_decode($api_data,true);
    // var_dump( $api_data);
    $value1=$api_data['main']['temp'];
    $value2=$api_data['name'];
    $value3=$api_data['weather'][0]['main'];
    $value4=$api_data['main']['humidity'];
    $value5=$api_data['wind']['speed'];
    $value6=$api_data['main']['pressure'];
    $value7=$api_data['dt'];
    $sql="INSERT INTO weather_info(temperature,place,descript,humidity,windspeed,pressure,dayanddate) VALUES('$value1','$value2','$value3','$value4','$value5','$value6','$value7')";
    if($connect->query($sql)==false){
        echo"Data inserted!!!";
        echo "<br>";
    }
    return($api_data);
}
?>