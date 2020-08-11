import { Injectable } from '@angular/core';
import {Item} from '../interfaces/item';
import {ItemData} from '../../itemData';

@Injectable({
  providedIn: 'root'
})

// this.http.get<Item>('taskItem').subscribe( x => {
//   console.log(x);
// });

export class ItemService {
  private taskItem: ItemData[] = [
    new ItemData(1, 'create components'),
    new ItemData(2, 'create header'),
    new ItemData(3, 'create listItem')];
  constructor() { }

  getItemsServices() {
    return this.taskItem;
  }
  addNewItem(item): void{
    // const newTodoItem = new ItemData(4, 'marina');
    item.id = this.taskItem.length + 1;
    this.taskItem.push(item);
  }
}
