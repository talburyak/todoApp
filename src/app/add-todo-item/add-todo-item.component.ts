import { TodoItemListService } from '../services/todo-item-list.service';
import { TodoItemComponent } from '../todo-item.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo-item',
  templateUrl: './add-todo-item.component.html',
  styleUrls: ['./add-todo-item.component.css'],
})
export class AddTodoItemComponent implements OnInit {
  todoItem: TodoItemComponent = new TodoItemComponent();
  submitted = false;
  alert: boolean = false;
  alert_error: boolean = false;
  alert_error_mess = '';

  constructor(
    private todoItemService: TodoItemListService,
    private router: Router,
    private FormBuilder: FormBuilder
  ) {}
  addForm: FormGroup;

  ngOnInit(): void {
    this.addForm = this.FormBuilder.group({
      title: ['', Validators.required],
      todoText: ['', Validators.required],
    });
  }

  newTodoItem(): void {
    this.submitted = false;
    this.todoItem = new TodoItemComponent();
  }

  onSubmit() {
    console.log(this.addForm.value);
    if (
      this.addForm.value.title == '' ||
      this.addForm.value.todoText == undefined
    ) {
      this.alert_error = true;
      this.alert_error_mess = 'Parameters cant be empty!';
      return false;
    }
    this.submitted = true;
    this.save();
  }
  save() {
    this.todoItemService.addToDoItem(this.addForm.value).subscribe(
      (data) => console.log(data),
      (error) => (this.alert_error = true)
      );
      this.alert = true;
    this.todoItem = new TodoItemComponent();
    this.gotoList();
  }

  gotoList() {
    this.alert = true;
    this.router.navigate(['/']);
  }
}
