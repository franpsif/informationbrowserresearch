import {Injectable} from "@angular/core";
import {SortButton} from "./sorting-bar/SortButton";
import {GridColumn} from "./grid-column";

@Injectable()
export class SortingColumnsProvider {
  private sortButtons: SortButton[] = [
    new SortButton("salary", "ASC")
  ];

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

  public get sorters() : SortButton[] {
    return this.sortButtons;
  }

  constructor() {

  }

  public setSorter(sorter: SortButton) {
    this.sortButtons = [sorter];
  }

  public replaceSorters(sorters: SortButton[]) {
    this.sortButtons = sorters;

  }
}
