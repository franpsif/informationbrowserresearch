import {Injectable} from "@angular/core";
import {GridColumn} from "../grid/grid-column";
import {Expression} from "./expression";

@Injectable()
export class ExpressionsProvider {
  private expressionsList: Expression[] = [];

  public get expressions() : Expression[] {
    return this.expressionsList;
  }


  public get columns(): GridColumn[] {
    return [
      new GridColumn('Id', 'employeeNo'),
      new GridColumn('Name', 'name'),
      new GridColumn('Date of birth', 'dob'),
      new GridColumn('Join date', 'joinDate'),
      new GridColumn('Notice period', 'noticePeriod'),
      new GridColumn('Email address', 'email'),
      new GridColumn('Rating', 'rating'),
      new GridColumn('Salary', 'salary')
    ];
  }

  public get operators(): string[] {
    return [
      "-",
      "!=",
      "=",
      "-",
      "(",
      ")",
      "*",
      "/",
      "@",
      "#"
    ];
  }

  public get functions(): string[] {
    return [
      "abs",
      "add",
      "concat",
      "datediff",
      "dayadd",
      "daydiff",
      "dayno",
      "daypart",
      "hourpart",
      "if",
      "left",
      "lower",
      "mid"
    ];
  }

  public get macros(): string[] {
    return [
      "$client",
      "$curr_period",
      "$end_period(ID)",
      "$first_period(ID)",
      "$fiscal_year(ID)",
      "$fiscal_year(ID,+/-n)",
      "$now",
      "$ob_period",
      "$open_period(ID)",
      "$open_period(ID,+/-n)",
      "$period(ID)",
      "$period(ID,+/-n)",
      "quarter"
    ];
  }

  public setExpressions(expressions: Expression[]) {
    this.expressionsList = expressions;
  }
}
