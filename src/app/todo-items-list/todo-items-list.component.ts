import { TodoItemComponent } from '../todo-item.component';
import { TodoItemListService } from '../services/todo-item-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-items-list',
  templateUrl: './todo-items-list.component.html',
  styleUrls: ['./todo-items-list.component.css'],
})
export class TodoItemsListComponent implements OnInit {
  constructor(private _service: TodoItemListService) {}

  title = 'List of todo items';
  todoItems: TodoItemComponent[];
  selectedTodo: TodoItemComponent = new TodoItemComponent();
  alert: boolean = false;
  alert_error: boolean = false;
  alert_error_mess = '';
  alert_succ_mess = '';

  ngOnInit(): void {
    this._service.getTodoItemsList().subscribe((data: TodoItemComponent[]) => {
      this.todoItems = data;
      console.log(this.todoItems);
    });
  }
  /**
   * Deleting current todo item from list of Items.
   * @param TodoItem
   */
  deleteTodoItems(todoItem: TodoItemComponent): void {
    console.log(todoItem);
    this._service.deleteToDoItem(todoItem['todo_id']).subscribe((data) => {
      this.todoItems = this.todoItems.filter((u) => u !== todoItem);
      this.alert = true;
      this.alert_succ_mess = 'Your data has been deleted successfully!';
    });
  }
  /**
   *
   * @param TodoItem
   */
  editTodo(todoItem: TodoItemComponent) {
    console.log('edit to do: ', todoItem);
    this.selectedTodo = todoItem;
  }
  /**
   * Event to update todo item
   */
  sendToDoListEventHandler(todoItem: TodoItemComponent) {
    console.log('todoitems=', this.todoItems, todoItem);
    this.todoItems.forEach((el, index, array) => {
      if (el.todo_id === todoItem['todo_id']) {
        console.log(
          'sendToDoListEventHandler',
          el.todo_id,
          todoItem.todo_id,
          todoItem.todoText
        );
        array[index].todoText = todoItem.todoText;
        array[index].title = todoItem.title;
      }
    });
    this.alert = true;
    this.alert_succ_mess = 'Your data has been updated successfully!';
    this.selectedTodo = null;
  }
}
