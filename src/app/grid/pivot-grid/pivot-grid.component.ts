import {AfterViewInit, Component, ElementRef, HostListener, NgZone, ViewChild} from '@angular/core';
import {DataProvider} from '../data-provider';

declare var Ext: any;

@Component({
  selector: 'u4-ib-pivot-grid',
  templateUrl: './pivot-grid.component.html',
  styleUrls: ['./pivot-grid.component.css']
})
export class PivotGridComponent implements AfterViewInit {
  @ViewChild('pivotGridContainer') pivotGridContainer: ElementRef;
  container: any = null;

  constructor(private zone: NgZone, private dataProvider: DataProvider) { }

  ngAfterViewInit() {
    const angularComponent: PivotGridComponent = this;
    this.dataProvider.getData(100000).subscribe(data => {
      this.zone.runOutsideAngular(() => {
        const store: any = this.createStore(data);
        const columns: any[] = this.createColumns();
        const features: any[] = this.createFeatures();

        this.container = Ext.create('Ext.container.Container', {
          renderTo: angularComponent.pivotGridContainer.nativeElement,
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
            {
              xtype: 'pivotgrid',
              matrix: {
                type: 'local',
                store: store,
                leftAxis: [{
                  dataIndex: 'department',
                  direction: 'DESC',
                  header: 'Department',
                  width: 150
                }],
                topAxis: [{
                  dataIndex: 'rating',
                  header: 'Rating',
                  direction: 'ASC'
                }]
              },
              plugins: [
                'pivotdrilldown',
                {
                  ptype: 'pivotconfigurator',
                  dock: 'top',
                  fields: [
                    {
                      dataIndex: 'department',
                      header: 'Department'
                    },
                    {
                      dataIndex: 'name',
                      header: 'Name'
                    },
                    {
                      dataIndex: 'dob',
                      header: 'Date of Birth'
                    },
                    {
                      dataIndex: 'rating',
                      header: 'Rating'
                    },
                    {
                      dataIndex: 'joinDate',
                      header: 'Join Date'
                    },
                    {
                      dataIndex: 'salary',
                      header: 'Salary'
                    }
                  ]
                }
              ]
            }
          ]
        });
      });
    });
  }

  onGridAnimationDone(): void {
    this.updateLayout();
  }

  public updateLayout(): void {
    if (this.container != null) {
      this.container.updateLayout();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateLayout();
    console.log('Resized');
  }

  private createStore(data: any): any {
    const me = this;

    return new Ext.data.Store({
      model: me.createModel(),
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
      }
    }, {
      text: 'Date of birth',
      dataIndex: 'dob',
      xtype: 'datecolumn',
      groupable: false,
      filter: {
        type: 'date'
      }
    }, {
      text: 'Join date',
      dataIndex: 'joinDate',
      xtype: 'datecolumn',
      groupable: false,
      filter: {
        type: 'date'
      }
    }, {
      text: 'Notice period',
      dataIndex: 'noticePeriod',
      filter: {
        type: 'string'
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
      }
    }, {
      text: 'Department',
      dataIndex: 'department',
      hidden: true,
      lockable: true,
      filter: {
        type: 'string'
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
        }
      }, {
        text: 'Holidays',
        dataIndex: 'holidayDays',
        width: 70,
        groupable: false,
        filter: {
          type: 'number'
        }
      }, {
        text: 'Holiday Allowance',
        dataIndex: 'holidayAllowance',
        width: 125,
        groupable: false,
        filter: {
          type: 'number'
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
}
