
import { NotFoundComponent } from './notFoundComponent.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Routes, RouterModule } from '@angular/router';
import { AddTodoItemComponent } from './add-todo-item/add-todo-item.component';
import { EditTodoItemComponent } from './edit-todo-item/edit-todo-item.component';
import { TodoItemsListComponent } from './todo-items-list/todo-items-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddTodoItemComponent,
    EditTodoItemComponent,
    TodoItemsListComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: TodoItemsListComponent },
      { path: 'addToDoItem', component: AddTodoItemComponent },
      { path: '**', component: NotFoundComponent },
    ]),
  ],
  providers: [TodoItemsListComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
