import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
  @ViewChild('template2') modalValidName;
  taskItem: ItemData[];
  UnCompleted: ItemData[];
  checked;

  modalRef: BsModalRef;
  message: string;
  constructor(private itemsServices: ItemService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.taskItem = this.itemsServices.getItemsServices();
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.itemsServices.deletItem(this.id);
    this.modalRef.hide();
    this.modalRef = this.modalService.show(this.modalValidName, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef.hide();
  }
  deletItem(i): void{
    this.id = +i;
    console.log(i);
  }
  confirm2(): void{
    this.modalRef.hide();
  }
}
