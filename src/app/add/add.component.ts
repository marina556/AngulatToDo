import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ItemService} from '../core/services/item.service';
import {ItemData} from '../itemData';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @ViewChild('element') element: ElementRef;
  @ViewChild('newTodoName') newTodo: ElementRef;
  @ViewChild('template2') modalValidName;
  checkval = 'Uncompleted';
  modalRef: BsModalRef;
  constructor(private itemsServices: ItemService,
              private route: Router,
              private modalService: BsModalService){}
  ngOnInit(): void {
  }
  addNew(template: TemplateRef<any>): void{
    const newTodoItem = new ItemData(4,this.newTodo.nativeElement.value , this.element.nativeElement.checked);
    if ( this.newTodo.nativeElement.value === '' ){
      this.modalRef = this.modalService.show(this.modalValidName, {class: 'modal-sm'});
    }else {
      this.itemsServices.addNewItem(newTodoItem);
      this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }
  }
  chaneitem(): void{
    this.checkval = this.element.nativeElement.checked ? 'Completed' : 'Uncompleted';
  }

  AddNewItem(): void{
    this.modalRef.hide();
    this.newTodo.nativeElement.value = '';
    this.element.nativeElement.checked = false;
  }
  confirm(): void {
    this.modalRef.hide();
    this.route.navigate(['/home']);
  }
  confirm2(): void{
    this.modalRef.hide();
  }
}
