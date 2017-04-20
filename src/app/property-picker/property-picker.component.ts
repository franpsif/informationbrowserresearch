import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { PropertyPickerNodeModel} from './property-picker-node-model';
import { PropertyPickerNavComponent} from './property-picker-nav.component';

@Component({
  selector: 'u4-ib-property-picker',
  templateUrl: './property-picker.component.html',
  styleUrls: ['./property-picker.component.css']
})
export class PropertyPickerComponent implements OnInit {
  @Input() rootObject: string;
  @Input() data: any;
  @Input() maxItemsPerGroup: number;
  @Input() width: any;
  @Input() height: any;

  @ViewChild(PropertyPickerNavComponent) propertyPickerNav: PropertyPickerNavComponent;

  currentObjectTitle: string;
  showNavigation: boolean;

  constructor() { }

  ngOnInit() {
    this.currentObjectTitle = this.rootObject;
    this.showNavigation = false;
  }

  getSelectedProperties(): Array<any> {
    if (this.data && this.data.length > 0 && this.data[0].children)  {
      return this.getChildrenSelectedProperties(this.data[0]);
    }

    return [];
  }

  getChildrenSelectedProperties(node: PropertyPickerNodeModel): Array<any> {
    const me = this;
    const selectedProperties: Array<any> = [];

    if (node.children) {
      node.children.forEach(function (item) {
        if (item.isPropertyCodeChecked || item.isPropertyTextChecked) {
          selectedProperties.push(item.text + (item.isPropertyCodeChecked ? ' (Code) ' : ' (Description)'));
        }

        const children = me.getChildrenSelectedProperties(item);

        if (children.length > 0) {
          selectedProperties.push(children);
        }
      });
    }
    return selectedProperties;
  }

  onNavigateObject(navInfo: any): void {
    this.showNavigation = !navInfo.isRoot;

    if (!navInfo.back) {
      this.propertyPickerNav.addStep(navInfo.property);
    }

    this.currentObjectTitle = navInfo.property.text;

    console.log('Navigate to:' + navInfo.property.text);
  }
}
