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
  id = '';
  @ViewChild('element1') element1?: object;
  @ViewChild('template2') modalValidName?: object;
  taskItem: ItemData[];

  modalRef: BsModalRef;
  message!: string;
  constructor(private itemsServices: ItemService,
              private modalService: BsModalService) {
  }
  ngOnInit(): void {
    // this.taskItem = this.itemsServices.getItemsServices();
    this.itemsServices.getItemsServices().subscribe(data => {
      this.taskItem = data;
      console.log(data);
  });
  }
  openModal(template: TemplateRef<object>, i: string): void {
    this.id = i;
    console.log(this.id);
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
  // deletItem(i: string): void{
  //   // this.itemsServices.deletItem(i);
  //   this.id = i;
  // }
  confirm2(): void{
    this.modalRef.hide();
  }
}
