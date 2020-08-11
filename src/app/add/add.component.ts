import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ItemService} from '../core/services/item.service';
import {ItemData} from '../itemData';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
@ViewChild('newTodoName') newTodo: ElementRef;
  constructor(private itemsServices: ItemService , private route: Router){ }

  ngOnInit(): void {
  }

  addNew(): void{
    const newTodoItem = new ItemData(4, this.newTodo.nativeElement.value);
    if(this.newTodo.nativeElement.value === '' ){
      alert('enter name');
    }else {
      this.itemsServices.addNewItem(newTodoItem);
      this.route.navigate(['/home']);
      console.log(newTodoItem);
    }
  }
}
