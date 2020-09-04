import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ItemService} from '../core/services/item.service';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @ViewChild('template2') modalValidName?: ElementRef;
  checkVal = 'Uncompleted';
  modalRef?: BsModalRef;
  addForm = this.fb.group({
    element: [false],
    newTodoName: ['', Validators.required]
  });

  constructor(private itemsServices: ItemService,
              private route: Router,
              private modalService: BsModalService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  addNew(successTemplate: TemplateRef<object>, errorTemplate: TemplateRef<object>): void {
    const newTodoItem = {
      id: '4',
      name: this.addForm.value.newTodoName,
      completed: this.addForm.value.element
    };
    this.itemsServices.addNewItem(newTodoItem).subscribe(() => {
      this.modalRef = this.modalService.show(successTemplate, {class: 'modal-sm'});
    }, error => {
      this.modalRef = this.modalService.show(errorTemplate, {class: 'modal-sm'});
    });
  }

  chaneItem(): void {
    this.checkVal = this.addForm.value.element ? 'Completed' : 'Uncompleted';
  }

  AddNewItem(): void {
    this.modalRef?.hide();
    this.addForm.reset();
  }

  confirm(): void {
    this.modalRef?.hide();
    this.route.navigate(['/home']);
    this.modalRef = this.modalService.show(this.modalValidName, {class: 'modal-sm'});
  }
}
