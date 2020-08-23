import { Injectable } from '@angular/core';
import {ItemData} from '../interfaces/item';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ItemService {
  nameValid: number;
  constructor(
    private httpClient: HttpClient
  ) {
  }
  getItemsServices(): Observable<ItemData[]> {
    return this.httpClient.get<ItemData[]>('http://localhost:3000/todos');
  }

  getItem(id: string): Observable<ItemData> {
    return this.httpClient.get<ItemData>(`http://localhost:3000/todos/${id}`);
  }
  addNewItem(item: ItemData): Observable<{ message: string }> {
    return this.httpClient.post<{message: string}>('http://localhost:3000/todos', item );
  }

  editItem(id: string, item: ItemData): void{
    this.httpClient.put(`http://localhost:3000/todos/${id}`, item).subscribe();
  }
  deleteItem(id: string): void{
    this.httpClient.delete(`http://localhost:3000/todos/${id}`).subscribe();
  }

  editItemCheck(obj: ItemData): void{
      this.httpClient.put(`http://localhost:3000/todos/${obj.id}`, obj).subscribe();
  }
}
