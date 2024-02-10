import {Component, inject} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {RemoteService} from "../../core/services/remote.service";
import {ActivatedRoute} from "@angular/router";
import LadokTuple from "../../../models/ladokTuple";
import {FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {JsonViewerComponent} from "../../components/json-viewer/json-viewer.component";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    FormsModule,
    MatFormField,
    MatButton,
    MatInput,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    JsonPipe,
    JsonViewerComponent,
    AsyncPipe,
  ],
  templateUrl: './debug.component.html',
  styleUrl: './debug.component.scss'
})
export class DebugComponent {
  private _remoteService = inject(RemoteService);
  private _activatedRoute = inject(ActivatedRoute);

  title: string = 'Debug utbildningsinstans';
  type: string = 'utbildninginstans';

  model: {
    uid: string;
  } = {
    uid: ''
  }

  fetchedData: LadokTuple | undefined;
  filter  = new BehaviorSubject<string>("");
  search = new BehaviorSubject<string>("");

  constructor() {
    switch (this._activatedRoute.snapshot.url[this._activatedRoute.snapshot.url.length - 1].path) {
      case 'utbildningstillfalle':
        this.title = 'Debug utbildningstillfalle';
        this.type = 'utbildningstillfalle';
        break;
      case 'utbildningsinstans':
        this.title = 'Debug utbildningsinstans';
        this.type = 'utbildningsinstans';
        break;
      default:
        this.title = 'Debug';
        this.type = 'debug';
    }
  }
  getData() {
    if (this.model.uid === '') {
      return;
    }

    this._remoteService.getLadokData(this.type, this.model.uid).subscribe({
      next: (data: LadokTuple) => {
        this.fetchedData = data;
      },
      error: (error) => {
        console.error(error);
        this.fetchedData = {sourceData: 'Error', mappedData: 'Error'};
      }
    });

  }

  filterData(filter: string) {
    this.filter.next(filter);
  }

  searchData(search: string) {
    this.search.next(search);
  }

}
