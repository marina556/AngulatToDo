import { Component, OnInit } from '@angular/core';
import {Taskes} from '../../shared/taskes';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  taskes: Taskes[];
  constructor() { }

  ngOnInit(): void {
  }

}
