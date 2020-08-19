import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ItemService} from '../core/services/item.service';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @ViewChild('template2') modalValidName;
  checkVal = 'Uncompleted';
  modalRef: BsModalRef;
  addForm = this.fb.group({
    element : [false],
    newTodoName : ['', Validators.required]
  });
  constructor(private itemsServices: ItemService,
              private route: Router,
              private modalService: BsModalService,
              private fb: FormBuilder){}
  ngOnInit(): void {
  }
  addNew(template: TemplateRef<any>): void{
    const newTodoItem = {
        id: 4,
        name: this.addForm.value.newTodoName,
        checkItem: this.addForm.value.element
      };
    this.itemsServices.addNewItem(newTodoItem);
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  chaneitem(): void{
    this.checkVal = this.addForm.value.element ? 'Completed' : 'Uncompleted';
  }
  AddNewItem(): void{
    this.modalRef.hide();
    this.addForm.reset();
  }
  confirm(): void {
    this.modalRef.hide();
    this.route.navigate(['/home']);
    this.modalRef = this.modalService.show(this.modalValidName, {class: 'modal-sm'});
  }
}
