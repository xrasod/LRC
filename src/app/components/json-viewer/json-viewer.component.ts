import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA, effect,
  ElementRef,
  EventEmitter,
  Input, Signal,
  ViewChild
} from '@angular/core';
import '@alenaksu/json-viewer';
import {JsonPipe} from "@angular/common";
import {debounceTime, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-json-viewer',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './json-viewer.component.html',
  styleUrl: './json-viewer.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JsonViewerComponent implements AfterViewInit {

  @ViewChild('jsonData', {static: true}) view: ElementRef | undefined;

  @Input() json: Signal<string>;
  @Input() filter: Observable<string>;
  @Input() search: Observable<string>;
  @Input() expandAll: EventEmitter<void>;
  @Input() collapseAll: EventEmitter<void>;

  jsonEffect = effect(() => {
    if (this.view) {
      this.view.nativeElement.data = JSON.parse(this.json());
    }
  });

  ngAfterViewInit(): void {
    if (this.view) {
      this.view.nativeElement.data = JSON.parse(this.json());
    }

    this.filter.pipe(
      debounceTime(100),
    ).subscribe((filter: string) => {
      if (this.view) {
        console.log('filter', filter);
        let query = filter !== '' ? new RegExp(`.*${filter}.*`, 'i') : '';
        this.view.nativeElement.filter(query);
        // this.view.nativeElement.filter(filter);
      }
    });

    this.search.pipe(
      debounceTime(100),
    ).subscribe((search: string) => {
      if (this.view) {
        console.log('search', search);
        let res = this.view.nativeElement.search(search);
        res.next();
      }
    });

    // this.expandAll.subscribe(() => {
    //   if (this.view) {
    //     this.view.nativeElement.expandAll();
    //   }
    // });
    //
    // this.collapseAll.subscribe(() => {
    //   if (this.view) {
    //     this.view.nativeElement.collapseAll();
    //   }
    // });

  }

}
