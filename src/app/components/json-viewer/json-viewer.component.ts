import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EventEmitter,
  Input,
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

  @Input() json: string = '';
  @Input() filter: Observable<string>;
  @Input() search: Observable<string>;
  @Input() expandAll: EventEmitter<void>;
  @Input() collapseAll: EventEmitter<void>;

  ngAfterViewInit(): void {
    console.log('looking for that bish');
    if (this.view) {
      console.log('found that bish');
      this.view.nativeElement.data = JSON.parse(this.json);
    }

    this.filter.pipe(
      debounceTime(50),
    ).subscribe((filter: string) => {
      if (this.view) {
        console.log('filter', filter);
        this.view.nativeElement.filter(filter);
      }
    });

    this.search.pipe(
      debounceTime(50),
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
