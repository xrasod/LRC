import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavComponent} from "./components/nav/nav.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { RemoteService } from './core/services/remote.service';
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, DashboardComponent, MatInput],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  _remoteService = inject(RemoteService);
  title = 'Ladok Remote Control';
  _host = this._remoteService.getHost();
  _port = this._remoteService.getPortNumber();
  constructor() {
    this._remoteService.setHost('localhost');
    this._remoteService.setPortNumber(3000);
  }
}

