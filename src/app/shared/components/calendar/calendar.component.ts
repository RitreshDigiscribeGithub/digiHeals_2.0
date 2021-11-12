import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnChanges {
   
  @Input() datePicker: boolean;
  @Input() activeDate;
  @Output() dateChanged = new EventEmitter<string>();
  tagValue
  monthNameList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  items: any[] = [];
  currentDate = new Date();
  currentMonth = moment().format("MMM");
  stopDate = new Date();
  selectedItem = moment().format("YYYY-MM-DD");

  constructor() {
    if (this.activeDate) {
      this.selectedItem = moment(this.activeDate).format("YYYY-MM-DD");
    }
    this.items = this.getDates(
      new Date(),
      moment().add(180, 'days')
    );
    this.items.length == 1 ? 'yes' : 'no';
  }

  ngOnChanges(): void {
    this.selectedItem = moment(this.activeDate).format("YYYY-MM-DD");
  }





  // Common method to create an array of dates
  getDates(startDate: any, stopDate: any) {
    let dateArray = [];
    let currentDate = moment(startDate);
    stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days");
    }
    return dateArray;
  }

  // Get the selected Date
  select(item: any) {
    if (item != this.selectedItem) {
      this.selectedItem = item;
      this.dateChanged.emit(item);
    }
  }

  // Method for changing Month
  changeMonth(e: any) {
    this.currentDate = this.items[e];
    this.currentMonth = new Date(this.currentDate).toLocaleString("default",
      {
        month: "short"
      });
  }

  // Method to get the current weekday of the date showon
  returnWeekDay(item: any) {
    return new Date(item).toLocaleDateString("default", { weekday: "short" });
  }
}

