export class Expression {
  runningTotal: boolean;

  public get isValid() : boolean {
    return this.isValidName() && this.isValidDescription() && this.isValidExpression();
  }

  constructor(public name: string, public description: string, public expression: string) {
    this.runningTotal = false;
  }

  public copy() : Expression {
    let copy: Expression = new Expression(this.name, this.description, this.expression);
    copy.runningTotal = this.runningTotal;
    return copy;
  }

  private isValidName() : boolean {
    return this.name != null && this.name.trim().length > 0;
  }

  private isValidDescription() : boolean {
    return this.description != null && this.description.trim().length > 0;
  }

  private isValidExpression() : boolean {
    return this.expression != null && this.expression.trim().length > 0;
  }
}
