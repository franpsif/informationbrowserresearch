import {
  Component, AfterViewInit, Input, ElementRef, NgZone, HostListener, state,
  SimpleChanges, OnChanges, ViewChild, Output, EventEmitter
} from '@angular/core';
import {SortButton} from '../sorting-bar/SortButton';
import {SortingBarComponent} from '../sorting-bar/sorting-bar.component';
import {SortingColumnsProvider} from '../sorting-columns.provider';
import {DataProvider} from '../data-provider';
import { MdDialog, MdDialogRef } from '@angular/material';
import { RenamingDialogComponent } from './../renaming/renamingdialog.component';

declare var Ext: any;

@Component({
    selector: 'u4-ib-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class GridComponent implements AfterViewInit, OnChanges {
    @Input() sortBar: SortingBarComponent = null;
    @Output() sortChanged: EventEmitter<SortButton> = new EventEmitter<SortButton>();
    width = '100%';
    height = '100%';

    me: GridComponent;
    nativeElement: any;
    grid: any = null;
    container: any = null;
    loading = true;

    @ViewChild('gridPanelBody') panelBody: ElementRef;

    constructor(public element: ElementRef, private zone: NgZone,
                private sortingColumnsProvider: SortingColumnsProvider,
                private dataProvider: DataProvider,
                public dialog: MdDialog) {
        this.me = this;
        this.nativeElement = element.nativeElement;
    }

    ngAfterViewInit() {
      this.dataProvider.getData(100000).subscribe(data => {
            this.zone.runOutsideAngular(() => {
                const angularComponent : GridComponent = this;
                angularComponent.zone.run(() =>  {
                    angularComponent.loading = false;
                });
                const store: any = this.createStore(data);
                const columns: any[] = this.createColumns();
                const features: any[] = this.createFeatures();

                angularComponent.grid = Ext.create('Ext.grid.Panel', {
                    enableLocking: true,
                    flex: 1,
                    region: 'center',
                    applyTo: 'center',
                    store: store,
                    features: features,
                    columns: columns,
                    plugins: [
                        {
                            ptype: 'gridfilters'
                        },
                        {
                            ptype: 'gridexporter'
                        },
                        {
                            ptype: 'gridrenameheaders'
                        }
                    ],
                    listeners: {
                      headerclick: function (headerContainer, column, event, htmlElement, options) {
                        angularComponent.onHeaderClick(headerContainer, column);
                      },
                      renamingmenuclick: function (columnDataIndex) {
                        angularComponent.onRenamingMenuClick(columnDataIndex);
                      }
                    }
                });

                const headerCt = angularComponent.grid.headerCt;
                let dropTarget: any;
                dropTarget = Ext.create('Ext.dd.DropTarget', this.sortBar.getSortingBarDropElement(), {
                            notifyOver: Ext.Function.bind(this.onNotifyOver, this),
                            notifyDrop: Ext.Function.bind(this.onNotifyDrop, this)
                        });

                dropTarget.addToGroup('header-dd-zone-' + angularComponent.grid.id);

                angularComponent.container = Ext.create('Ext.container.Container', {
                    renderTo: angularComponent.panelBody.nativeElement,
                    width: '100%',
                    height: '100%',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    header: false,
                    border: false,
                    hideBorder: true,
                    items: [
                        angularComponent.grid
                    ]
                });
            });
        });
    }

    onNotifyOver(source, e, data): string {
        if (this.sortBar.canDrop(source.dragData.header.ibData)) {
            return Ext.baseCSSPrefix + 'dd-drop-ok';
        } else {
            return Ext.baseCSSPrefix + 'dd-drop-nodrop';
        }
    }

    onNotifyDrop(source, e, data): boolean {
        return this.sortBar.dropColumn(source.dragData.header.ibData);
    }

    ngOnChanges(changes: SimpleChanges): void {
        for (const property in changes) {
            if (property == 'state' && this.container != null) {
                if (changes[property].currentValue == 'collapsed') {
                    this.container.disable();
                } else {
                    this.container.enable();
                }
            }
        }
    }

    public reload(showMask: boolean): void {
        if (showMask) {
            this.loading = true;
        }
      this.dataProvider.getData(100000).subscribe(data => {
            this.grid.reconfigure(this.createStore(data));
            if (showMask) {
                this.loading = false;
            }
        });
    }

    public save() : void {
        this.loading = true;
        this.dataProvider.getData(100000).subscribe(data => {
            this.grid.reconfigure(this.createStore(data));
            this.loading = false;
            this.grid.saveDocumentAs({
                type: 'html',
                title: 'Information Browser grid',
                fileName: 'myReport.html'
            });
        });
    }

    onGridAnimationDone() : void {
      this.updateLayout();
    }

    public updateLayout() : void {
      if (this.container != null) {
        this.container.updateLayout();
      }
    }

    private createStore(data: any): any {
        const me = this;
        return new Ext.data.Store({
            model: me.createModel(),
            groupField: 'department',
            sorters: [{
                property: 'salary',
                direction: 'ASC'
            }],
            data: data
        });
    }

    private createModel(): any {
        return Ext.create('Ext.data.Model', {
            idField: 'employeeNo',
            fields: [{
                name: 'employeeNo'
            }, {
                name: 'rating',
                type: 'int'
            }, {
                name: 'salary',
                type: 'float'
            }, {
                name: 'name',
                convert: function (value, record) {
                    return record.get('forename') + ' ' + record.get('surname');
                }
            }, {
                name: 'forename'
            }, {
                name: 'surname'
            }, {
                name: 'email'
            }, {
                name: 'department'
            }, {
                name: 'dob',
                type: 'date',
                dateFormat: 'Ymd'
            }, {
                name: 'joinDate',
                type: 'date',
                dateFormat: 'Ymd'
            }, {
                name: 'noticePeriod'
            }, {
                name: 'sickDays',
                type: 'int'
            }, {
                name: 'holidayDays',
                type: 'int'
            }, {
                name: 'holidayAllowance',
                type: 'int'
            }]
        });
    }

    private createColumns(): any[] {
        return [{
            xtype: 'rownumberer',
            width: 130,
            sortable: false
        }, {
            text: 'Id',
            sortable: true,
            dataIndex: 'employeeNo',
            groupable: false,
            width: 70,
            lockable: true,
            filter: {
                type: 'string'
            },
            ibData: {
                publicPath: 'employeeNo'
            }
        }, {
            text: 'Name',
            sortable: true,
            dataIndex: 'name',
            groupable: false,
            width: 120,
            lockable: true,
            filter: {
                type: 'string'
            },
            ibData: {
                publicPath: 'name'
            }
        }, {
            text: 'Date of birth',
            dataIndex: 'dob',
            xtype: 'datecolumn',
            groupable: false,
            filter: {
                type: 'date'
            },
            ibData: {
                publicPath: 'dob'
            }
        }, {
            text: 'Join date',
            dataIndex: 'joinDate',
            xtype: 'datecolumn',
            groupable: false,
            filter: {
                type: 'date'
            },
            ibData: {
                publicPath: 'joinDate'
            }
        }, {
            text: 'Notice period',
            dataIndex: 'noticePeriod',
            filter: {
                type: 'string'
            },
            ibData: {
                publicPath: 'noticePeriod'
            }
        }, {
            text: 'Email address',
            dataIndex: 'email',
            width: 200,
            groupable: false,
            lockable: true,
            renderer: function (v) {
                return '<a href="mailto:' + v + '">' + v + '</a>';
            },
            filter: {
                type: 'string'
            },
            ibData: {
                publicPath: 'email'
            }
        }, {
            text: 'Department',
            dataIndex: 'department',
            hidden: false,
            lockable: true,
            filter: {
                type: 'list'
            },
            ibData: {
                publicPath: 'department'
            }
        }, {
            text: 'Absences',
            columns: [{
                text: 'Illness',
                dataIndex: 'sickDays',
                width: 60,
                groupable: false,
                filter: {
                    type: 'number'
                },
                ibData: {
                    publicPath: 'sickDays'
                }
            }, {
                text: 'Holidays',
                dataIndex: 'holidayDays',
                width: 70,
                groupable: false,
                filter: {
                    type: 'number'
                },
                ibData: {
                    publicPath: 'holidayDays'
                }
            }, {
                text: 'Holiday Allowance',
                dataIndex: 'holidayAllowance',
                width: 125,
                groupable: false,
                filter: {
                    type: 'number'
                },
                ibData: {
                    publicPath: 'holidayAllowance'
                }
            }]
        }, {
            text: 'Rating',
            width: 70,
            sortable: true,
            dataIndex: 'rating',
            groupable: false,
            lockable: true,
            filter: {
                type: 'number'
            },
            renderer: function (value, metaData) {
                switch (value) {
                    case 1:
                        metaData.tdAttr = 'bgcolor="red"';
                        break;
                    case 2:
                        metaData.tdAttr = 'bgcolor="orange"';
                        break;
                    case 3:
                        metaData.tdAttr = 'bgcolor="#cccc00"';
                        break;
                    case 4:
                        metaData.tdAttr = 'bgcolor="orange"';
                        break;
                    case 5:
                        metaData.tdAttr = 'bgcolor="green"';
                        break;
                }
                return value;
            },
            ibData: {
                publicPath: 'rating'
            }
        }, {
            text: 'Salary',
            width: 140,
            sortable: true,
            dataIndex: 'salary',
            align: 'right',
            renderer: Ext.util.Format.usMoney,
            groupable: false,
            summaryType: 'sum',
            lockable: true,
            summaryRenderer: Ext.util.Format.usMoney,
            filter: {
                type: 'number'
            },
            ibData: {
                publicPath: 'salary'
            }
        }];
    }

    private createFeatures(): any[] {
        return [{
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            hideGroupedHeader: false,
            showSummaryRow: true,
            enableGroupingMenu: true
        }];
    }

    @HostListener('window:resize', ['$event'])
    onResize(): void {
        this.updateLayout();
        console.log('Resized');
    }

    public sortToggled(toggledButton: SortButton) : void {
      const store = this.grid.getStore();
      const sorters = store.getSorters();
      sorters.add({
        property: toggledButton.dataIndex,
        direction: toggledButton.sortOrder
      });
    }

    public updateSortings() : void  {
      const sorters = [];

      for (const sorter of this.sortingColumnsProvider.sorters) {
        sorters.push({
          property: sorter.dataIndex,
          direction: sorter.sortOrder
        });
      }

      this.grid.getStore().sorters.clear();
      this.grid.getStore().setSorters(sorters);
    }

    public onHeaderClick(headerContainer, column) : void {
      console.log('Header clicked');
      this.sortChanged.emit(new SortButton(column.dataIndex, column.sortState));
    }

    public onRenamingMenuClick(columnDataIndex) : void {
      console.log('Column rename menu item clicked');
      this.openDialog(columnDataIndex);
    }

    private openDialog(columnDataIndex) {
      const dialogRef = this.dialog.open(RenamingDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const columns: any[] = this.grid.getColumns();
          for (const columnIndex in columns){
            if (columns[columnIndex].dataIndex === columnDataIndex){
                columns[columnIndex].setText(result);
                return;
            }
          }
        }
      });
    }
}
