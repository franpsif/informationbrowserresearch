import {Component, OnInit, ViewChild} from '@angular/core';
import {ExpressionsProvider} from "./expressions-provider";
import {Expression} from "./expression";
import {ExpressionListComponent} from "./expression-list/expression-list.component";

@Component({
  selector: 'u4-ib-expressions',
  templateUrl: './expressions.component.html',
  styleUrls: ['./expressions.component.css'],
  providers: [ExpressionsProvider]
})
export class ExpressionsComponent implements OnInit {
  public isVisible: boolean = false;
  public expressions: Expression[] = [];
  public activeExpression: Expression = null;

  @ViewChild(ExpressionListComponent) expressionList;

  constructor(private expressionsProvider: ExpressionsProvider) {
    this.expressions =  [];
    this.expressionsProvider.expressions.forEach((item) => {
      this.expressions.push(item.copy());
    });
  }

  ngOnInit() {
  }

  public show(): void {
    this.isVisible = true;
  }


  public showMainHelp(): void {
    console.log("Showing help!");
  }

  public onOkClicked(): void {
    console.log("Ok clicked!");
  }

  public onCancelClicked(): void {
    console.log("Ok clicked!");
  }

  public selectedExpression(expression: Expression) : void {
    this.activeExpression = expression;
  }

  public onNewExpression() : void {
    this.activeExpression = new Expression("", "", "");
    this.expressions.push(this.activeExpression);
  }

  public onExpressionModified(expression: Expression) {
    console.log(expression.name + " - " + expression.description + ": " + expression.expression);
  }
}
