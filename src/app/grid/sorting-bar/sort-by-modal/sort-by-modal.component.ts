import {
  Component, DoCheck, EventEmitter, Input, Output, QueryList,
  ViewChildren
} from '@angular/core';
import {SortButton} from "../SortButton";
import {SortingColumnsProvider} from "../../sorting-columns.provider";
import {SortByModalItemComponent} from "../sort-by-modal-item/sort-by-modal-item.component";

@Component({
  selector: 'u4-ib-sort-by-modal',
  templateUrl: './sort-by-modal.component.html',
  styleUrls: ['./sort-by-modal.component.css']
})
export class SortByModalComponent implements DoCheck {
  @Input() sorters: SortButton[] = [];

  @Output() applySortings: EventEmitter<SortButton[]> = new EventEmitter<SortButton[]>();

  @ViewChildren(SortByModalItemComponent) sortByItems: QueryList<SortByModalItemComponent> = null;

  isValid: boolean = false;

  constructor(public sortingColumnsProvider: SortingColumnsProvider) { }

  ngDoCheck() {
    this.isValid = this.checkValid();
  }

  onAddSorting(event: any) : void {
    this.sorters.push(new SortButton('', 'ASC'));
  }

  onApplySortings() : void {
    this.sortingColumnsProvider.replaceSorters(this.sorters);
    this.applySortings.emit();
  }

  onSorterRemoved(sorter: SortButton) : void {
    let index = this.sorters.indexOf(sorter);
    this.sorters.splice(index, 1);
  }

  checkValid() : boolean {
    return this.sortByItems != null && this.sortByItems.reduce((value, actual) => {
      return value && actual.isValid();
    }, true);
  }
}
