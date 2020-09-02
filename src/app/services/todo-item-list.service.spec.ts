import { TestBed } from '@angular/core/testing';

import { TodoItemListService } from './services/todo-item-list.service';

describe('TodoItemListService', () => {
  let service: TodoItemListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoItemListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
