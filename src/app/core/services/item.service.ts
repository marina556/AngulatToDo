import { Injectable } from '@angular/core';
import {ItemData} from '../interfaces/item';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ItemService {
  x = 0;
  private taskItem: ItemData[] = [];
  constructor(
    private httpClient: HttpClient
  ) {
  }

  // this.httpClient.get('http://localhost:3000/todos').subscribe(data => {
  //   console.log(data);
  //   this.
  // });
    // [
    // {
    //   id: this.getId(),
    //   name: 'create components',
    //   checkItem: true
    // },
    // {
    //   id: this.getId(),
    //   name: 'create header',
    //   checkItem: false
    // },
    // {
    //   id: this.getId(),
    //   name: 'create listItem',
    //   checkItem: true
    // }];
  getItemsServices(): Observable<ItemData[]> {
    return this.httpClient.get<ItemData[]>('http://localhost:3000/todos');
  }

  getItem(id: string): Observable<ItemData> {
    return this.httpClient.get<ItemData>(`http://localhost:3000/todos/${id}`);
  }
  // getId(): number{
  //   this.x += 1;
  //   return this.x;
  // }
  addNewItem(item: ItemData): void{
    this.httpClient.post<ItemData>('http://localhost:3000/todos', item ).subscribe(data => {
      console.log(data);
    });
  }

  editItem(id: string, item: ItemData): void{
    this.httpClient.put(`http://localhost:3000/todos/${id}`, item).subscribe(data => {
      console.log(data);
    });
  }
  deletItem(id: string): void{
    this.httpClient.delete(`http://localhost:3000/todos/${id}`).subscribe();
    this.getItemsServices().subscribe();
  }
}

