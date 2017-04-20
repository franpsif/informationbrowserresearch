import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'u4-ib-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent {
  @Output() saveContent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  onSaveContent($event): void {
    this.saveContent.emit();
  }
}
