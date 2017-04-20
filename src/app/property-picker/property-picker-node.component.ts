import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertyPickerNodeModel } from './property-picker-node-model';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'u4-ib-property-picker-node',
  templateUrl: './property-picker-node.component.html',
  styleUrls: ['./property-picker-node.component.less'],
  animations: [
    trigger('flyInOut', [
        state('in', style({opacity: 1})),
        transition('void => *', [style({opacity: 0, height: 0}), animate('150ms ease-in')]),
        transition('* => void', [style({opacity: 1}), animate('150ms ease-in')])
      ])
  ]
})

export class PropertyPickerNodeComponent implements OnInit {
  @Input() item: PropertyPickerNodeModel;
  @Input() maxItemsPerGroup: number;

  @Output() navigateObject: EventEmitter<any> = new EventEmitter();

  titleMore = 'More...';
  titleLess = 'Less...';
  moreStatus: boolean;
  maxItemsToShow: number;
  maxItemsExceeded: boolean;
  toggleTitle: string;

  constructor() { }

  ngOnInit() {
    this.maxItemsToShow = this.maxItemsPerGroup = this.calculateMaxItemsToShow();
    this.maxItemsExceeded = this.item.children ? (this.item.children.length > this.maxItemsPerGroup) : false;
    this.toggleTitle = this.titleMore;
    this.moreStatus = true;
  }

  calculateMaxItemsToShow(): number {
    if (this.item.children && (this.item.children.length > this.maxItemsPerGroup)) {
      let maxItems = 0;
      this.item.children.forEach(function (value) {
        if (value.isPropertyCodeChecked || value.isPropertyTextChecked) {
          maxItems++;
        }
      });
      return (maxItems > this.maxItemsPerGroup) ? maxItems : this.maxItemsPerGroup;
    }

    return this.maxItemsPerGroup;
  }

  toggle(): void {
    this.item.expanded = !this.item.expanded;
    this.setMore(true);
  }

  toggleMore(): void {
    this.setMore(!this.moreStatus);
  }

  setMore(status: boolean): void {
    this.moreStatus = status;

    if (this.moreStatus) {
      this.toggleTitle = this.titleMore;
      this.maxItemsToShow = this.maxItemsPerGroup;
    } else {
      this.toggleTitle = this.titleLess;
      this.maxItemsToShow = this.item.children.length;
    }
  }

  onNavigate(): void {
    this.emitNavigateObjectEvent(this.item);
  }

  onNavigateObject(item): void {
    this.emitNavigateObjectEvent(item.property);
  }

  emitNavigateObjectEvent(item): void {
    this.navigateObject.emit(
      {
        property: item,
        back: false,
        isRoot: false
      });
  }
}
