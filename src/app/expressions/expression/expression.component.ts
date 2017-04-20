import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Expression} from "../expression";
import {ExpressionsProvider} from "../expressions-provider";
import {GridColumn} from "../../grid/grid-column";

@Component({
  selector: 'u4-ib-expression',
  templateUrl: './expression.component.html',
  styleUrls: ['./expression.component.css']
})
export class ExpressionComponent implements OnInit {
  @Input() expression: Expression = null;
  @Output() expressionModified: EventEmitter<Expression> = new EventEmitter<Expression>();

  expressionText: string;
  name: string;
  description: string;

  constructor(public expressionsProvider: ExpressionsProvider) {
    this.name = this.expression == null ? "" : this.expression.name;
    this.description = this.expression == null ? "" : this.expression.description;
    this.expressionText = this.expression == null ? "" : this.expression.expression;
  }

  ngOnInit() {
  }

  onChanged() : void {
    if (this.expression != null) {
      this.expression.name = this.name;
      this.expression.description = this.description;
      this.expression.expression = this.expressionText;
      this.expressionModified.emit(this.expression);
    }
  }

  onPropertySelected(property: GridColumn) {
    console.log("Selected: " + property.dataIndex);
    this.expression.expression += property.dataIndex;
  }
}
