import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ItemService} from '../core/services/item.service';
import {ItemData} from '../itemData';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @ViewChild('template3') modificationContinues;
  id: number;
  item: ItemData[];
  thisItem;
  modalRef: BsModalRef;
  editForm;

  constructor(private route: ActivatedRoute,
              private itemsServices: ItemService,
              private rout: Router,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
      this.route.paramMap.subscribe((p: Params) => {
      this.id = +p.get('id');
    });
      this.item = this.itemsServices.getItemsServices();
      const indexItem = this.item.findIndex(i => i.id === this.id);
      this.thisItem = this.item[indexItem];

      this.editForm = new FormGroup({
        editTodoName: new FormControl(this.thisItem.name, Validators.required),
        editTodoCheck: new FormControl(this.thisItem.checkItem)
      });
  }

  editItem(template: TemplateRef<any>): void {
    if ( this.editForm.pristine){
      this.modalRef = this.modalService.show(this.modificationContinues, {class: 'modal-sm'});
    }
    else{
      this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
      this.rout.navigate(['/home']);
      this.itemsServices.editItem(this.id, this.editForm.value.editTodoName, this.editForm.value.editTodoCheck);
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
