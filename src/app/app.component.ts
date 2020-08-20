import { todoItem } from './models/todoItems';
import { Component, OnInit } from '@angular/core';
import { TodoItemListService } from './services/todo-item-list.service';
import { TodoItemComponent } from './todo-item.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'todoApp';
  todoItems: TodoItemComponent[] = null;
  constructor(private todoService: TodoItemListService) {}
  ngOnInit() {}
}
