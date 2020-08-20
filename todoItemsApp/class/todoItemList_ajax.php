<?php
require_once  $_SERVER['DOCUMENT_ROOT'] . '/todoItemsApp/class/todoItemsList.php';
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods:PUT, GET, POST, DELETE, OPTIONS");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type application/json,charset-UTF-8");
/**
 * All parameters
 */
$todo_id =  $_GET['todo_id'] ?? 'false';
$title = $_GET['title'] ?? 'false';
$todoText = $_GET['todoText'] ?? 'false';
$action = $_GET["action"] ?? 'false';
/**
 * Getting instance of todo_list_class 
 */
$itemsListInstance = todo_list_class::getInstance();


/**
 * Create new todo item
 */
if ($title != "false" && $todoText != "false") {
    if ($action == "editTodoItem") {
        $res_bool = $itemsListInstance->editTodoItem( $todo_id,$title, $todoText);
        echo $res_bool;
        return;
    } else {

        $res_bool = $itemsListInstance->createTodoItem($title, $todoText);
        echo $res_bool;
        return;
    }
}

// Deleting current todo id from list of todo items.
if ($todo_id != 'false') {
    $bool_res = $itemsListInstance->deleteItem($todo_id);
    echo $bool_res;
} else { //getting all todo items from SQL.
    $res = $itemsListInstance->getItemsList();
    echo  json_encode($res);
}
