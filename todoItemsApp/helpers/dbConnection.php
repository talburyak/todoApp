<?php
define('DB_USER', 'root');
define('DB_PASS', '');

class dbConnection
{
    private static $instance = null;
    private $connection;
    private $error;

    private function __construct()
    {
        $indexPath = "/public_html/index.php";
        $options = array( // to allow working with hebrew chars.
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
            PDO::ATTR_PERSISTENT => true,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        );
        try {
            $this->connection = new PDO('mysql:host=localhost;dbname=todoitems', DB_USER, DB_PASS);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $error = null;
        } catch (PDOException $e) {
            $feedback = "PDO database connection problem: " . $e->getMessage();
            $this->connection = null;
            $error = [$e->getCode(), $feedback];
            $path = " <meta http-equiv='refresh' content='3;URL= $indexPath'>";
            printf($path);
        } catch (Exception $e) {
            $feedback = "General problem: " . $e->getMessage();
            $this->connection = null;
            $error = [$e->getCode(), $feedback];
            $path = " <meta http-equiv='refresh' content='3;URL= $indexPath'>";
            printf($path);
        }
    }
    
    public static function getInstance()
    {
        if (!self::$instance) {
            //creating new instance.
            self::$instance = new dbConnection();
        }
        // returning instance.
        return self::$instance;
    }

    /**
     * Connect to the database
     * 
     * @return bool false on failure / MySql PDO object instance on success
     */
    public static function connect()
    {
        $inst = self::getInstance();
        if (is_array($inst))
            return $inst->error;
        return $inst->connection;
    }
}
