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
  @ViewChild('element') element: ElementRef;
  @ViewChild('newTodoName') newTodo: ElementRef;
  checkval = 'Uncompleted';
  constructor(private itemsServices: ItemService , private route: Router){ }
  ngOnInit(): void {
    // this.checkval = (this.element.nativeElement.checked) ? ('Completed') : ('Uncompleted');
  }
  addNew(): void{
    const newTodoItem = new ItemData(4, this.newTodo.nativeElement.value , this.element.nativeElement.checked);
    if ( this.newTodo.nativeElement.value === '' ){
      alert('enter name');
    }else {
      this.itemsServices.addNewItem(newTodoItem);
      this.route.navigate(['/home']);
      console.log(newTodoItem);
      console.log('check ' , this.element.nativeElement.checked);
      console.log(this.checkval);
    }
  }
  chaneitem(){
    this.checkval = this.element.nativeElement.checked ? 'Completed' : 'Uncompleted';
  }
  // changeSelection(){
  //   this.isChecked = this.isChecked ? true : false ;
  // }
}
