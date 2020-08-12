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
  @ViewChild('editTodoName') editTodoName: ElementRef;
  id: number;
  item: ItemData[];
  thisItem: any;

  constructor(private route: ActivatedRoute, private itemsServices: ItemService, private rout: Router) {
  }

  ngOnInit(): void {
      this.route.paramMap.subscribe((p: Params) => {
      this.id = +p.get('id');
    });
      this.item = this.itemsServices.getItemsServices();
      const indexItem = this.item.findIndex(i => i.id === this.id);
      this.thisItem = this.item[indexItem];
  }

  editItem(): void {
    const val = this.editTodoName.nativeElement.value;
    const boolVal = this.element.nativeElement.checked;
    if (val === '') {
      alert('enter name');
    } else {
      this.itemsServices.editItem(this.id, val, boolVal);
      this.rout.navigate(['/home']);
    }
  }
}
