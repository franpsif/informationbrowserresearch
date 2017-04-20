import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { MenuItem} from 'primeng/primeng';

import { PropertyPickerNodeModel} from './property-picker-node-model';
import { PropertyPickerNavModel } from './property-picker-nav-model';


@Component({
  selector: 'u4-ib-property-picker-nav',
  templateUrl: './property-picker-nav.component.html',
  styleUrls: ['./property-picker-nav.component.css']
})
export class PropertyPickerNavComponent implements OnInit {
  @Input() rootObject: string;
  @Output() navigateObject: EventEmitter<any> = new EventEmitter<any>();

  navigationIndex: number = -1;

  private items: MenuItem[];

  constructor() { }

    ngOnInit() {
        const rootProperty: PropertyPickerNodeModel = new PropertyPickerNodeModel({
            text: this.rootObject
        });

        this.items = [];
        this.addStep(rootProperty);
    }

    public addStep(property: PropertyPickerNodeModel): void {
        const me: any = this;
        let propertyNav: PropertyPickerNavModel;

        this.navigationIndex++;

        propertyNav = new PropertyPickerNavModel({
            index: this.navigationIndex,
            property: property
        });

        this.items.push(
            {label: property.text, command: () => {
                me.goToStep(propertyNav);
            }});
    }

    private goToStep(propertyNav: PropertyPickerNavModel): void {
        if (propertyNav.index !== this.navigationIndex) {
            this.items = this.items.slice(0, propertyNav.index + 1);

            this.navigateObject.emit({
                property: propertyNav.property,
                back: true,
                isRoot: (propertyNav.index === 0)
            });
        }

        this.navigationIndex = propertyNav.index;
    }
}
