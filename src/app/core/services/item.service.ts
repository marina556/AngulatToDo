import { Injectable } from '@angular/core';
import {ItemData} from '../interfaces/item';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {exhaustMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ItemService {
  user = new BehaviorSubject(null);
  nameValid: number;
  constructor(
    private httpClient: HttpClient
  ) {
  }
  getItemsServices(): Observable<ItemData[]> {
    return this.httpClient.get<ItemData[]>(`${environment.apiUrl}/todos`);
    // return this.user.pipe(take(1), exhaustMap(user => {
    //   return this.httpClient.get<ItemData[]>(`${environment.apiUrl}/todos`);
    // }));
  }

  getItem(id: string): Observable<ItemData> {
    return this.httpClient.get<ItemData>(`${environment.apiUrl}/todos/${id}`);
  }
  addNewItem(item: ItemData): Observable<{ message: string }> {
    return this.httpClient.post<{message: string}>(`${environment.apiUrl}/todos`, item );
  }

  editItem(id: string, item: ItemData): void{
    this.httpClient.put(`${environment.apiUrl}/todos/${id}`, item).subscribe();
  }
  deleteItem(id: string): void{
    this.httpClient.delete(`${environment.apiUrl}/todos/${id}`).subscribe();
  }

  editItemCheck(obj: ItemData): void{
      this.httpClient.put(`${environment.apiUrl}/todos/${obj.id}`, obj).subscribe();
  }
}
