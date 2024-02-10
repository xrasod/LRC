import {Component, EventEmitter, inject} from '@angular/core';
import {RemoteService} from "../../core/services/remote.service";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatGridList} from "@angular/material/grid-list";

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [
    MatInput,
    MatFormField,
    FormsModule,
    MatLabel,
    MatButton,
    MatGridList,
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent {
  private _remoteService = inject(RemoteService);
  private _dialogRef: MatDialogRef<ConfigComponent> = inject(MatDialogRef);
  private _snackBar: any = inject(MatSnackBar);
  private _host = this._remoteService.getHost();
  private _port = this._remoteService.getPortNumber();


  model: {
    host: string,
    port: number
  } = {
    host: this._host(),
    port: this._port()
  }

  save() {
    if (this.model.host === '' || this.model.port === 0) {
      return;
    }

    this._remoteService.setHost(this.model.host);
    this._remoteService.setPortNumber(this.model.port);
    this._snackBar.open('Configuration saved', 'OK', {
      duration: 5000,
    });
    this._dialogRef.close('saved');
  }

  close(dirty: boolean) {
    if (dirty) {
      this._snackBar.open('Configuration not saved', 'OK', {
        duration: 5000,
      });
    }
    this._dialogRef.close('closed');
  }

}
