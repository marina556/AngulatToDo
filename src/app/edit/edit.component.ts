import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ItemService} from '../core/services/item.service';
import {ItemData} from '../itemData';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @ViewChild('editTodoName') editTodoName: ElementRef;
  @ViewChild('template2') modalValidName;
  @ViewChild('template3') modificationContinues;
  id: number;
  item: ItemData[];
  thisItem;
  oldCheckVal: boolean;
  modalRef: BsModalRef;
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
      this.oldCheckVal = this.thisItem.checkItem;
  }

  editItem(template: TemplateRef<any>): void {
    const val = this.editTodoName.nativeElement.value;
    if (val === '') {
      this.modalRef = this.modalService.show(this.modalValidName, {class: 'modal-sm'});
    } else if ((val === this.thisItem.name && (this.oldCheckVal === this.thisItem.checkItem) )) {
      console.log(this.oldCheckVal);
      console.log(this.thisItem.checkItem);
      this.modalRef = this.modalService.show(this.modificationContinues, {class: 'modal-sm'});
    }
    else{
      this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
      this.rout.navigate(['/home']);
    }
  }
  confirm(): void {
    const val = this.editTodoName.nativeElement.value;
    this.itemsServices.editItem(this.id, val, this.thisItem.checkItem);
    this.modalRef.hide();
    this.rout.navigate(['/home']);
  }
  confirm2(): void{
    this.modalRef.hide();
  }
}
