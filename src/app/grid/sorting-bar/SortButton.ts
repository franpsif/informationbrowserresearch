export class SortButton {
  public get sortSymbol(): string {
    return this.sortOrder == "ASC" ? "⇈" : "⇊";
  };

  constructor(public dataIndex: string, public sortOrder: string) {

  }

  public toggle() : void {
    if (this.sortOrder == "ASC") {
      this.sortOrder = "DESC";
    } else {
      this.sortOrder = "ASC";
    }
  }

  public copy() : SortButton {
    return new SortButton(this.dataIndex, this.sortOrder);
  }
}
