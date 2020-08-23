import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ItemService} from '../core/services/item.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, Validators} from '@angular/forms';
import {ItemData} from '../core/interfaces/item';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @ViewChild('template3') modificationContinues?: object;
  id: string;
  item: ItemData;
  modalRef: BsModalRef;
  name: string;
  obj: object;
  editForm = this.fb.group({
    editTodoName: [, Validators.required],
    editTodoCheck: []
  });
  constructor(private route: ActivatedRoute,
              private itemsServices: ItemService,
              private rout: Router,
              private modalService: BsModalService,
              private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((p: Params) => {
      this.id = p.get('id');
    });
    this.itemsServices.getItem(this.id).subscribe(data => {
      this.item = data;
      this.editForm.value.e = this.item.completed;
      this.editForm.value.editTodoName = this.item.name;
      });
  }

  editItem(template: TemplateRef<object>): void {
    if ( this.editForm.pristine){
      this.modalRef = this.modalService.show(this.modificationContinues, {class: 'modal-sm'});
    }
    else{
      this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
      this.rout.navigate(['/home']);
      const newTodoItem = {
        id: this.id,
        name:  this.editForm.value.editTodoName,
        completed: this.editForm.value.editTodoCheck
      };
      this.itemsServices.editItem(this.id, newTodoItem);
    }
  }
  confirm(): void {
    this.modalRef.hide();
    this.rout.navigate(['/home']);
  }
  confirm2(): void{
    this.modalRef.hide();
  }
}
