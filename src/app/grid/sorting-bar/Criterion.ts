export class Criterion {
  constructor(public propertyName: string, public operator: string, public valueFrom: string, public valueTo: string) {

}

public copy() : Criterion {
  return new Criterion(this.propertyName, this.operator, this.valueFrom, this.valueTo);
}
}
