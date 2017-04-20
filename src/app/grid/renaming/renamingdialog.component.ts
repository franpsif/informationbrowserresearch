import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'u4-ib-renamingdialog',
  templateUrl: './renamingdialog.component.html'
})
export class RenamingDialogComponent {

  constructor(public dialogRef: MdDialogRef<RenamingDialogComponent>) {}
}
