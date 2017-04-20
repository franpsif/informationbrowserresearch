export class GridColumn {
  constructor(public name: string, public dataIndex: string) {

  }

  public copy() : GridColumn {
    return new GridColumn(this.name, this.dataIndex);
  }
}
