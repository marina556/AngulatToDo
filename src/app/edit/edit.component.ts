import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ItemService} from '../core/services/item.service';
import {ItemData} from '../itemData';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @ViewChild('element') element: ElementRef;
  checkval = 'Uncompleted';
  @ViewChild('editTodoName') editTodoName: ElementRef;
  id: number;
  item: ItemData[];
  thisItem;
  checkvalue: any;

  constructor(private route: ActivatedRoute, private itemsServices: ItemService, private rout: Router) {
  }

  ngOnInit(): void {
      this.route.paramMap.subscribe((p: Params) => {
      this.id = +p.get('id');
      console.log(+p.get('id'));
    });
      this.item = this.itemsServices.getItemsServices();
      const indexItem = this.item.findIndex(i => i.id === this.id);
      this.thisItem = this.item[indexItem];
      this.checkvalue = this.thisItem.checkItem;
      console.log('item : ', this.thisItem);
  }

  editItem(): void {
    const val = this.editTodoName.nativeElement.value;
    const boolVal = this.element.nativeElement.checked;
    if (val === '') {
      alert('enter name');
    } else {
      console.log(val);
      this.itemsServices.editItem(this.id, val, boolVal);
      this.rout.navigate(['/home']);
    }
  }
  chaneitem(){
    this.checkval = this.element.nativeElement.checked ? 'Completed' : 'Uncompleted';
  }
}
