import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ItemService} from '../../core/services/item.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ItemData} from '../../core/interfaces/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  id = 0;
  @ViewChild('element1') element1?: object;
  @ViewChild('template2') modalValidName?: object;
  taskItem!: ItemData[];

  modalRef!: BsModalRef;
  message!: string;
  constructor(private itemsServices: ItemService,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.taskItem = this.itemsServices.getItemsServices();
  }

  openModal(template: TemplateRef<object>): void {
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
  deletItem(i: string | number): void{
    this.id = +i;
  }
  confirm2(): void{
    this.modalRef.hide();
  }
}
