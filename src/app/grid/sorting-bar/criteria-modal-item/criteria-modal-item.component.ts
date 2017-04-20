import {Component, DoCheck, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CriteriaProvider} from "../../../criteria.provider";
import {Criterion} from "../Criterion";

@Component({
  selector: 'u4-ib-criteria-modal-item',
  templateUrl: './criteria-modal-item.component.html',
  styleUrls: ['./criteria-modal-item.component.css']
})
export class CriteriaModalItemComponent implements DoCheck {
  @Input() criterion: Criterion = null;
  @Output() criterionRemoved: EventEmitter<Criterion> = new EventEmitter<Criterion>();

  @ViewChild('propertyNameField') propertyNameField;
  @ViewChild('operatorField') operatorField;
  @ViewChild('valueFromField') valueFrom;
  @ViewChild('valueToField') valueTo;

  public isPropertyNameValid: false;
  public isOperatorValid: false;
  public isValueFromValid: false;
  public isValueToValid: false;

  ngDoCheck() : void {
    this.isPropertyNameValid = this.propertyNameField.nativeElement.checkValidity();
    this.isOperatorValid = this.operatorField.nativeElement.checkValidity();
    this.isValueFromValid = this.valueFrom.nativeElement.checkValidity();
    this.isValueToValid = this.valueTo.nativeElement.checkValidity();
  }

  constructor(public criteriaProvider: CriteriaProvider) { }

  public isValid(): boolean {
    return this.isPropertyNameValid && this.isOperatorValid &&
      this.isValueFromValid && this.isValueToValid;
  }

  onOperatorSelected(operator: string) : void {
    this.criterion.operator = operator;
  }

  onPropertyClicked(columnName: string) : void {
    this.criterion.propertyName = columnName;
  }

  onCriterionRemoveClicked(criterion: Criterion) : void {
    this.criterionRemoved.emit(criterion);
  }
}
