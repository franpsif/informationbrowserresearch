import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { AuthService } from './login/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdDialogModule, MdInputModule, MdButtonModule } from '@angular/material';
import {
  DialogModule, ButtonModule, OverlayPanelModule, CheckboxModule, BreadcrumbModule, TabViewModule,
  PanelModule, DataListModule
} from 'primeng/primeng';

import { InformationBrowserComponent } from './information-browser.component';
import { GridComponent } from './grid/grid/grid.component';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { PivotGridComponent } from './grid/pivot-grid/pivot-grid.component';
import { GridtabsComponent } from './grid/gridtabs.component';
import { SortingBarComponent } from './grid/sorting-bar/sorting-bar.component';
import { SortByModalItemComponent } from './grid/sorting-bar/sort-by-modal-item/sort-by-modal-item.component';
import { SortByModalComponent } from './grid/sorting-bar/sort-by-modal/sort-by-modal.component';
import { CriteriaModalComponent } from './grid/sorting-bar/criteria-modal/criteria-modal.component';
import { CriteriaModalItemComponent } from './grid/sorting-bar/criteria-modal-item/criteria-modal-item.component';
import { ExpressionsComponent } from './expressions/expressions.component';
import { ExpressionComponent } from './expressions/expression/expression.component';
import { ExpressionListItemComponent } from './expressions/expression-list/expression-list-item/expression-list-item.component';
import { ExpressionListComponent } from './expressions/expression-list/expression-list.component';
import { RenamingDialogComponent } from './grid/renaming/renamingdialog.component';
import { PropertyPickerComponent } from './property-picker/property-picker.component';
import { PropertyPickerNodeComponent } from './property-picker/property-picker-node.component';
import { PropertyPickerNavComponent } from './property-picker/property-picker-nav.component';
import { LoginComponent } from './login/login.component';
import { SessionService } from "./session.service";

const appRoutes: Routes = [
  { path: '', component: InformationBrowserComponent},
  { path: 'token', component: LoginComponent}
]


@NgModule({
  declarations: [
    InformationBrowserComponent,
    GridComponent,
    ActionBarComponent,
    PivotGridComponent,
    GridtabsComponent,
    SortingBarComponent,
    SortByModalItemComponent,
    SortByModalComponent,
    CriteriaModalComponent,
    CriteriaModalItemComponent,
    PropertyPickerComponent,
    PropertyPickerNodeComponent,
    PropertyPickerNavComponent,
    ExpressionsComponent,
    ExpressionComponent,
    ExpressionListItemComponent,
    ExpressionListComponent,
    RenamingDialogComponent,
    LoginComponent
  ],
  entryComponents: [
    RenamingDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MdDialogModule,
    MdInputModule,
    MdButtonModule,
    DialogModule,
    ButtonModule,
    OverlayPanelModule,
    CheckboxModule,
    BreadcrumbModule,
    TabViewModule,
    PanelModule,
    DataListModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [InformationBrowserComponent]
})
export class AppModule {
}
