import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoItemComponent } from '../todo-item.component';

@Injectable({
  providedIn: 'root',
})
export class TodoItemListService {
  constructor(private http: HttpClient) {}
  readonly serviceUrl = 'http//localhost:8080';
  private baseUrl = 'http://localhost/todoItemsApp/class/todoItemList_ajax.php';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  /**
   * Call to API getting all todo items
   */
  public getAllTodoItems(): Observable<TodoItemComponent[]> {
    return this.http.get<TodoItemComponent[]>(
      this.serviceUrl + 'api/allTodoItems'
    );
  }
  /**
   *  API. AddToDoItemApi adding new todo item to list of items - No in Active Now.
   * @param todoItem
   */
  public addToDoItemApi(
    todoItem: TodoItemComponent
  ): Observable<TodoItemComponent> {
    return this.http.post<TodoItemComponent>(
      `${this.serviceUrl}/api/todoItems?title=${todoItem.title}&todoText=${todoItem.todoText}`,
      {},
      this.httpOptions
    );
  }
  editToDoItem(todoItem: TodoItemComponent): Observable<Object> {
    return this.http.post(
      `${this.baseUrl}?action=editTodoItem&todo_id=${todoItem.todo_id}&title=${todoItem.title}&todoText=${todoItem.todoText}`,
      {}
    );
  }
  /**
   *  Getting all todo items.
   */
  getTodoItemsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  /**
   * Delete current todo item.
   * @param id
   */
  deleteToDoItem(id: number) {
    return this.http.get<TodoItemComponent>(
      'http://localhost/todoItemsApp/class/todoitemList_ajax.php?todo_id=' + id
    );
  }
  /**
   * addToDoItem
   * @param todoItem
   */
  addToDoItem(todoItem: TodoItemComponent): Observable<Object> {
    return this.http.post(
      `${this.baseUrl}?title=${todoItem.title}&todoText=${todoItem.todoText}`,
      {}
    );
  }
}
