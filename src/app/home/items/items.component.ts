import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ItemService} from '../../core/services/item.service';
import {ItemData} from '../../itemData';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  id: number;
  @ViewChild('element1') element1;
  taskItem: ItemData[];
  UnCompleted: ItemData[];
  checked;

  modalRef: BsModalRef;
  message: string;
  constructor(private itemsServices: ItemService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.taskItem = this.itemsServices.getItemsServices();
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    // this.message = 'Confirmed!';
    this.itemsServices.deletItem(this.id);
    this.modalRef.hide();
  }

  decline(): void {
    // this.message = 'Declined!';
    this.modalRef.hide();
  }
  deletItem(i): void{
    this.id = +i;
    console.log(i);
  }
}
