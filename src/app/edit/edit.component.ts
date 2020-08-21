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
  id = 0 ;
  item: ItemData[] = [];
  modalRef!: BsModalRef;
  editForm = this.fb.group;

  constructor(private route: ActivatedRoute,
              private itemsServices: ItemService,
              private rout: Router,
              private modalService: BsModalService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
      let thisItem;
      this.route.paramMap.subscribe((p: Params) => {
      this.id = +p.get('id');
    });
      this.item = this.itemsServices.getItemsServices();
      const indexItem = this.item.findIndex(i => i.id === this.id);
      thisItem = this.item[indexItem];

      this.editForm({
        editTodoName: [thisItem.name, Validators.required],
        editTodoCheck: [thisItem.checkItem]
      });
  }

  editItem(template: TemplateRef<object>): void {
    if ( this.editForm.arguments.controls.pristine){
      this.modalRef = this.modalService.show(this.modificationContinues, {class: 'modal-sm'});
    }
    else{
      this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
      this.rout.navigate(['/home']);
      this.itemsServices.editItem(this.id, this.editForm.arguments.controls.value.editTodoName,
        this.editForm.arguments.controls.value.editTodoCheck);
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
