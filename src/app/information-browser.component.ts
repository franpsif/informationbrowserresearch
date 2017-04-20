import {Component, OnInit, HostListener, ViewChild, ElementRef, ContentChild} from '@angular/core';
import {CriteriaProvider} from './criteria.provider';
import {ExpressionsComponent} from './expressions/expressions.component';

declare var Ext: any;

@Component({
  selector: 'u4-ib-information-browser',
  templateUrl: './information-browser.component.html',
  styleUrls: ['./information-browser.component.css'],
  providers: [CriteriaProvider]
})
export class InformationBrowserComponent implements OnInit {
    @ViewChild(ExpressionsComponent) expressionComponent;

    constructor() {
    }

    ngOnInit() {
    }

    @HostListener('document:DOMContentLoaded', ['$event'])
    onDomContentLoaded(event): void {
        console.log('OnDomReady');
        Ext.manifest = 'modern';
        Ext.env.Ready.fireReady();
    }

    showExpressions(): void {
      this.expressionComponent.show();
    }
}
