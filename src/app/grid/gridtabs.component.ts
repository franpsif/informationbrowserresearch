import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {GridComponent} from "./grid/grid.component";
import {PivotGridComponent} from "./pivot-grid/pivot-grid.component";
import {SortingColumnsProvider} from "./sorting-columns.provider";
import {DataProvider} from "./data-provider";

declare var $: any;

@Component({
  selector: 'u4-ib-gridtabs',
  templateUrl: './gridtabs.component.html',
  styleUrls: ['./gridtabs.component.css'],
  providers: [SortingColumnsProvider, DataProvider]
})
export class GridtabsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() showExpressions: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(GridComponent) grid: GridComponent;
  @ViewChild(PivotGridComponent) pivotGrid: PivotGridComponent;
  @ViewChild('gridTabLink') gridTabLink: ElementRef = null;
  @ViewChild('pivotGridTabLink') pivotGridTabLink: ElementRef = null;

  gridShownListenFunc: Function = null;
  pivotGridShownListenFunc: Function = null;


  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    let angularComponent: GridtabsComponent = this;
    if (this.gridTabLink != null) {
      $('#gridTabLink').on('shown.bs.tab', function (event) {
        angularComponent.onGridTabShown();
      });
    }

    if (this.pivotGridTabLink != null) {
      $('#pivotGridTabLink').on('shown.bs.tab', function (event) {
        angularComponent.onPivotGridTabShown();
      });
    }
  }

  ngOnDestroy() : void {
    if (this.gridShownListenFunc != null) {
      this.gridShownListenFunc();
    }
    if (this.pivotGridShownListenFunc != null) {
      this.pivotGridShownListenFunc();
    }
  }

  save() : void {
    this.grid.save();
  }

  public reload() : void {
    this.grid.reload(true);
  }

  //@HostListener('#gridTabLink:shown.bs.tab')
  onGridTabShown() : void {
    if (this.grid != null) {
      this.grid.onGridAnimationDone()
    }
  }

  //@HostListener('#pivotGridTabLink:shown.bs.tab')
  onPivotGridTabShown(): void {
    if (this.pivotGrid != null) {
      this.pivotGrid.onGridAnimationDone()
    }
  }

  onShowExpressions(): void {
    this.showExpressions.emit();
  }
}
