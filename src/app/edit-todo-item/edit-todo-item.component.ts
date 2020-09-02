import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoItemListService } from '../services/todo-item-list.service';
import { TodoItemComponent } from '../todo-item.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-todo-item',
  templateUrl: './edit-todo-item.component.html',
  styleUrls: ['./edit-todo-item.component.css'],
})
export class EditTodoItemComponent implements OnInit {
  @Input() selectedTodo: TodoItemComponent = new TodoItemComponent();
  @Output() sendToDoListEvent: EventEmitter<NgForm> = new EventEmitter();

  constructor(private todoItemService: TodoItemListService) {}

  ngOnInit(): void {}
  /**
   * getting all new changes of todo item and  sending to service file.
   * @param todoForm
   */
  sendToDoList(todoForm: NgForm) {
    if (todoForm.value.title == '' || todoForm.value.todoText == undefined)
      return false;
    this.sendToDoListEvent.emit(todoForm.value);
    this.todoItemService.editToDoItem(todoForm.value).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
  }
}
