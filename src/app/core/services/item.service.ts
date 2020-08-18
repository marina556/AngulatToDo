import { Injectable } from '@angular/core';
import {ItemData} from '../../itemData';

@Injectable({
  providedIn: 'root'
})

export class ItemService {
  x = 0;
  private taskItem: ItemData[] = [
    new ItemData(this.getId(), 'create components', false),
    new ItemData(this.getId(), 'create header', false),
    new ItemData(this.getId(), 'create listItem', false)];
  constructor() { }

  getItemsServices() {
    return this.taskItem;
  }
  getId(): number{
    this.x += 1;
    return this.x;
  }
  addNewItem(item): void{
    item.id = this.getId();
    this.taskItem.push(item);
  }

  editItem(id, val, boolVal): void{
    const indexItem = this.taskItem.findIndex(i => i.id === id);
    this.taskItem[indexItem].name = val;
    this.taskItem[indexItem].checkItem = boolVal;
  }
  deletItem(id): void{
    const indexItem = this.taskItem.findIndex(i => i.id === id);
    this.taskItem.splice(indexItem, 1);
  }
}
