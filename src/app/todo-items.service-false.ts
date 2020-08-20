import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToDoItemsService {
  constructor(private http: HttpClient) {}
  //   getToDoItems() {
  //     return { id: '1', title: '111', todoItemsText: 'new text' };
  //   }
  private baseUrl = 'http://localhost:4200';

  //   getTodoItem(id: number): Observable<any> {
  //     return this.http.get(`${this.baseUrl}/${id}`);
  //   }

      addToDoItem(todoItem: Object): Observable<Object> {
      return this.http.post(`${this.baseUrl}`, todoItem);
    }

  //   updateTodoItem(id: number, value: any): Observable<Object> {
  //     return this.http.put(`${this.baseUrl}/${id}`, value);
  //   }

  //   deleteTodoItem(id: number): Observable<any> {
  //     return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  //   }

  getTodoItemsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
