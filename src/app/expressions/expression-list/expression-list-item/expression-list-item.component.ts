import {Component, Input, OnInit} from '@angular/core';
import {Expression} from "../../expression";

@Component({
  selector: 'u4-ib-expression-list-item',
  templateUrl: './expression-list-item.component.html',
  styleUrls: ['./expression-list-item.component.css']
})
export class ExpressionListItemComponent implements OnInit {
  @Input() expression: Expression = null;

  constructor() { }

  ngOnInit() {
  }

}
