import {Injectable} from '@angular/core';
import {GridColumn} from './grid/grid-column';
import {Criterion} from './grid/sorting-bar/Criterion';

@Injectable()
export class CriteriaProvider {
  private criteriaList: Criterion[] = [];

  public get properties(): GridColumn[] {
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

  public get criteria(): Criterion[] {
    return this.criteriaList;
  }

  constructor() {
  }

  public setCriterion(criterion: Criterion) {
    this.criteriaList = [criterion];
  }

  public replaceCriteria(criteria: Criterion[]) {
    this.criteriaList = criteria;

  }
}
