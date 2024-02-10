import {Component, inject, Input} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfigComponent} from "../config/config.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
  ]
})
export class NavComponent {
  private _breakpointObserver = inject(BreakpointObserver);
  private _dialog = inject(MatDialog);
  private _dialogRef: MatDialogRef<any> | undefined;
  @Input() title: string = 'Ladok Remote Control';

  isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  openConfig() {
    this._dialogRef = this._dialog.open(ConfigComponent);
  }

}
