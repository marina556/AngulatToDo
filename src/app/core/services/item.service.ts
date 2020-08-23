import { Injectable } from '@angular/core';
import {ItemData} from '../interfaces/item';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ItemService {
  x = 0;
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
  addNewItem(item: ItemData): void{
    this.httpClient.post<ItemData>('http://localhost:3000/todos', item ).subscribe();
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

