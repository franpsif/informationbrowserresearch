import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Expression} from "../expression";

@Component({
  selector: 'u4-ib-expression-list',
  templateUrl: './expression-list.component.html',
  styleUrls: ['./expression-list.component.css']
})
export class ExpressionListComponent implements OnInit {
  @Input() expressions: Expression[] = [];
  @Output() expressionClicked: EventEmitter<Expression> = new EventEmitter<Expression>();
  constructor() { }

  ngOnInit() {
  }

  selectedExpression(expression: Expression) : void {
    this.expressionClicked.emit(expression);
  }
}
