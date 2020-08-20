<?php
//$arr = array("Peter", "Ben", "Joe");
//echo json_encode($arr);
header("Access-Control-Allow-Origin: http://localhost:4200");
require_once  $_SERVER['DOCUMENT_ROOT'] . '/todoItemsApp/helpers/dbConnection.php'; //connection to database with PDO 
error_reporting(E_ERROR);

class todo_list_class
{
    //var_dump ("check2");
    //---variables
    private $error_code;
    private $error_message;
    private $db;
    private static $instance = null;

    public function __construct($db = NULL)
    {
        if (!isset($db))
            $this->db = dbConnection::connect();
        else
            $this->db = $db;
        $this->error_code    = "";

        $this->error_message = "";
    }

    public static function getInstance()
    {
        if (!self::$instance) {
            //creating new instance.
            self::$instance = new todo_list_class();
        }
        // returning instance.
        return self::$instance;
    }
    /**
     * Delete todo item from list
     * @param  $todo_id
     * @return bool
     */
    public function deleteItem($todo_id): bool
    {
        $params = array(":todo_id" => $todo_id);
        $sql = "DELETE  FROM todoitems.todoitem WHERE todo_id = :todo_id";
        try {
            $sql_stmt = $this->db->prepare($sql);
            $sql_stmt->execute($params);
            //check if deleted
            $sql_check = "SELECT todo_id FROM todoitems.todoitem WHERE todo_id = :todo_id";
            $sql_stmt = $this->db->prepare($sql_check);

            $res = $sql_stmt->fetchAll(PDO::FETCH_ASSOC); // assuming i have class PDO
            if (empty($res))
                return true;
            else
                return false;
        } catch (PDOException $e) {
            throw new Exception($e->getMessage());

            return false;
        }
    }
    /**
     * getItemsList getting all todo items from database
     *
     * @return void
     */
    public function getItemsList()
    {
        $sql = "SELECT * FROM todoitems.todoitem";
        try {
            $sql_stmt = $this->db->prepare($sql);
            $result = $sql_stmt->execute();
            if (!$result) {
                echo "Error: sql failed";
                return false;
            }
            $res = $sql_stmt->fetchAll(PDO::FETCH_ASSOC); // assuming i have class PDO
            if (empty($res) == false) {
                return $res;
            } else {
                http_response_code(404);
                return false;
            }
        } catch (PDOException $e) {
            throw new Exception($e->getMessage());
            return false;
        }
    }
    public function __destruct()
    {
        $this->db = null;
    }
    /**
     * createTodoItem creating new todo item in DB.
     *
     * @param [type] $title
     * @param [type] $todoText
     * @return void
     */
    public function createTodoItem($title, $todoText)
    {
        $params = array(":title" => $title, ":todoText" => $todoText);
        $sql = "INSERT INTO todoitems.todoitem(title,todoText) VALUES(:title,:todoText)";
        try {
            $sql_stmt = $this->db->prepare($sql);
            $result = $sql_stmt->execute($params);
            if (!$result) {
                echo "Error: sql failed";
                return false;
            }
            //$sql_stmt->fetchAll(PDO::FETCH_ASSOC);
            return true;
        } catch (PDOException $e) {
            throw new Exception($e->getMessage());
            return false;
        }
    }
    /**
     * Editing todo item in DB
     *
     * @param [type] $todo_id
     * @param [type] $title
     * @param [type] $todoText
     * @return bool
     */
    public function editTodoItem($todo_id, $title, $todoText)
    {
        $params = array(":todo_id" => $todo_id, ":title" => $title, ":todoText" => $todoText);
        $sql = "UPDATE  todoitems.todoitem SET title=:title ,todoText=:todoText WHERE  todo_id=:todo_id";
        try {
            $sql_stmt = $this->db->prepare($sql);
            $result = $sql_stmt->execute($params);
            if (!$result) {
                echo "Error: sql failed";
                return false;
            }
            //$sql_stmt->fetchAll(PDO::FETCH_ASSOC);
            return true;
        } catch (PDOException $e) {
            throw new Exception($e->getMessage());
            return false;
        }
    }
}
