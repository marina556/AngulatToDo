import { Injectable } from '@angular/core';
import {ItemData} from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})

export class ItemService {
  x = 0;
  private taskItem: ItemData[] = [
    {
      id: this.getId(),
      name: 'create components',
      checkItem: true
    },
    {
      id: this.getId(),
      name: 'create header',
      checkItem: false
    },
    {
      id: this.getId(),
      name: 'create listItem',
      checkItem: true
    }];
  constructor() { }

  getItemsServices(): ItemData[] {
    return this.taskItem;
  }
  getId(): number{
    this.x += 1;
    return this.x;
  }
  addNewItem(item: ItemData): void{
    item.id = this.getId();
    this.taskItem.push(item);
  }

  editItem(id: number, val: string, boolVal: boolean): void{
    const indexItem = this.taskItem.findIndex(i => i.id === id);
    this.taskItem[indexItem].name = val;
    this.taskItem[indexItem].checkItem = boolVal;
  }
  deletItem(id: number): void{
    const indexItem = this.taskItem.findIndex(i => i.id === id);
    this.taskItem.splice(indexItem, 1);
  }
}

