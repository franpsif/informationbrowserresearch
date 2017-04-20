import {Component, DoCheck, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {SortButton} from "../SortButton";
import {SortingColumnsProvider} from "../../sorting-columns.provider";

@Component({
  selector: 'u4-ib-sort-by-modal-item',
  templateUrl: './sort-by-modal-item.component.html',
  styleUrls: ['./sort-by-modal-item.component.css']
})
export class SortByModalItemComponent implements DoCheck {
  @Input() sorter: SortButton = null;
  @Output() sorterRemoved: EventEmitter<SortButton> = new EventEmitter<SortButton>();

  @ViewChild('propertyNameField') propertyNameField;
  @ViewChild('sortOrderField') sortOrderField;

  public isPropertyNameValid: false;
  public isSortOrderValid: false;

  constructor(public sortingColumnsProvider: SortingColumnsProvider) {
  }

  ngDoCheck(): void {
    this.isPropertyNameValid = this.propertyNameField.nativeElement.checkValidity();
    this.isSortOrderValid = this.sortOrderField.nativeElement.checkValidity();
  }

  onSorterRemoveClicked(sorter: SortButton) : void {
    this.sorterRemoved.emit(sorter);
  }

  public isValid(): boolean {
    return this.isPropertyNameValid && this.isSortOrderValid;
  }
}
