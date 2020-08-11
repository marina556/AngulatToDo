import { Component, OnInit } from '@angular/core';
// import {Taskes} from '../../shared/taskes';
import {ItemService} from '../../core/services/item.service';
// import {Item} from '../../core/interfaces/item';
import {ItemData} from '../../itemData';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  taskItem: ItemData[];
  constructor(private itemsServices: ItemService) { }

  ngOnInit(): void {
    this.taskItem = this.itemsServices.getItemsServices();
  }
}
