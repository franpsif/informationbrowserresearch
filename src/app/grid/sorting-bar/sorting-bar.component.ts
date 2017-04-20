import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SortButton} from "./SortButton";
import {SortingColumnsProvider} from "../sorting-columns.provider";
import {CriteriaProvider} from "../../criteria.provider";

import { PropertyPickerComponent } from '../../property-picker/property-picker.component';
import { PropertyPickerNodeModel } from '../../property-picker/property-picker-node-model';
import {Http} from "@angular/http";
import {Observable} from "rxjs";


@Component({
  selector: 'u4-ib-sorting-bar',
  templateUrl: './sorting-bar.component.html',
  styleUrls: ['./sorting-bar.component.css']
})
export class SortingBarComponent implements OnInit {
  @Output() toggledButton: EventEmitter<SortButton> = new EventEmitter<SortButton>();
  @Output() applySortings: EventEmitter<void> = new EventEmitter<void>();
  @Output() reloadGrid: EventEmitter<void> = new EventEmitter<void>();
  @Output() expressionsButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(PropertyPickerComponent) propertyPicker: PropertyPickerComponent;
  @ViewChild('sortingBarDropElement') sortingBarDropElement: ElementRef;
  data: Array<PropertyPickerNodeModel>;

  private sorters: SortButton[] = [];

  constructor(public element: ElementRef, public sortingColumnsProvider: SortingColumnsProvider,
    public criteriaProvider: CriteriaProvider, private http: Http) {
    this.sortingColumnsProvider.sorters.forEach((item) => {
      this.sorters.push(item.copy());
    });
  }

  ngOnInit() {
    let me:any = this;

    this.getJSON("/property-picker-testdata.json").subscribe(data => {
      this.data = new Array<PropertyPickerNodeModel>();
      this.data.push(<PropertyPickerNodeModel>data.json());
    });
  }

  onClick(clickedButton: SortButton) {
    clickedButton.toggle();
    this.toggledButton.emit(clickedButton);
  }

  onSortChanged(changedSort: SortButton) : void {
    this.sortingColumnsProvider.setSorter(changedSort);
  }

  onApplySortings() : void {
    this.applySortings.emit();
  }

  reload() : void {
    this.reloadGrid.emit();
  }

  showExpressions() : void {
    this.expressionsButtonClicked.emit();
  }

  onShowCriteria() : void {
    alert("I'm a criteria!");
  }

  onApplyCriteria() : void {

  }

  getSortButtonName(dataIndex: string) : string {
    const property = this.sortingColumnsProvider.properties.find(x => x.dataIndex === dataIndex);
    return property ? property.name : '';
  }

  getSortingBarDropElement(): any {
    return this.sortingBarDropElement.nativeElement;
  }

  canDrop(ibData:any): boolean {
    return !this.checkColumnIsAlreadyASorter(ibData.publicPath);
  }

  dropColumn(ibData:any): boolean {
    if (!this.checkColumnIsAlreadyASorter(ibData.publicPath)) {
      const newSortButton: SortButton = new SortButton(ibData.publicPath, 'A');
      this.sortingColumnsProvider.sorters.push(newSortButton);
      this.applySortings.emit();
      return true;
    }

    return false;
  }

  private checkColumnIsAlreadyASorter(publicPath: string): boolean {
    let ret = false;

    for (const item of this.sortingColumnsProvider.sorters) {
      if (item.dataIndex === publicPath) {
        ret = true;
        break;
      }
    }

    return ret;
  }

/*Property picker */
  onGetSelectedProperties(): void {
    let selectedProperties = this.propertyPicker.getSelectedProperties();
    alert(selectedProperties.join());
  }

  private getJSON(filename: string): Observable<any> {
      return this.http.get(filename);
  }  
/* Property picker */
}
