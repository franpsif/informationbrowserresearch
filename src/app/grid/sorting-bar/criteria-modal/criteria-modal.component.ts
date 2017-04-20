import {Component, DoCheck, QueryList, ViewChildren} from '@angular/core';
import {CriteriaProvider} from "../../../criteria.provider";
import {CriteriaModalItemComponent} from "../criteria-modal-item/criteria-modal-item.component";
import {Criterion} from "../Criterion";

@Component({
  selector: 'u4-ib-criteria-modal',
  templateUrl: './criteria-modal.component.html',
  styleUrls: ['./criteria-modal.component.css']
})
export class CriteriaModalComponent implements DoCheck {
  public criteria: Criterion[] = [];

  @ViewChildren(CriteriaModalItemComponent) criteriaItems: QueryList<CriteriaModalItemComponent> = null;

  isValid: boolean = false;

  constructor(public criteriaProvider: CriteriaProvider) {
    this.criteriaProvider.criteria.forEach((item) => {
      this.criteria.push(item.copy());
    });
  }

  ngDoCheck() {
    this.isValid = this.checkValid();
  }


  onAddCriterion(event) : void {
    this.criteria.push(new Criterion('', 'Like', '', ''));
  }

  onApplyCriteria() : void {
    this.criteriaProvider.replaceCriteria(this.criteria);
  }

  onCriteriaRemoved(criterion: Criterion) : void {
    let index = this.criteria.indexOf(criterion);
    this.criteria.splice(index, 1);
  }

  onClose() : void {
    this.criteria = [];
    this.criteriaProvider.criteria.forEach((item) => {
      this.criteria.push(item.copy());
    });
  }

  checkValid() : boolean {
    return this.criteriaItems != null && this.criteriaItems.reduce((value, actual) => {
        return value && actual.isValid();
      }, true);
  }
}
