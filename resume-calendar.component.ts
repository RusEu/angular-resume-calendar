import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Moment } from 'moment';
import { Ranges } from './resume-calendar.model';
import { _range } from './utils';

import * as moment from 'moment';


@Component({
  selector: 'app-resume-calendar',
  templateUrl: './resume-calendar.component.html',
  styleUrls: ['./resume-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumeCalendarComponent implements OnInit {

  public ranges = Object.keys(Ranges).map((name) => ({name, value: Ranges[name]}));
  public weekDays = moment.weekdaysShort(true);
  public userDates = [];

  constructor(private _cd: ChangeDetectorRef) { }

  ngOnInit() {

    this.userDates = _range(200)
      .map((index) => moment().startOf('week').startOf('day').add(index, 'hours'))
      .map((date: Moment) => date.toISOString())
      .filter((_, index) => Math.floor((Math.random() * 10) + 1) <= index / 20);

    this._cd.markForCheck();

  }

  getBusyLevel(shortDay: string, range: string) {

    const [startHour, endHour] = range.split('-').map((item) => parseInt(item.split(':')[0], 10));
    const startDate = moment(shortDay, 'ddd').hour(startHour).startOf('hour').toISOString();
    const endDate = moment(shortDay, 'ddd').hour(endHour).startOf('hour').toISOString();
    const dates = this.userDates.filter((date) => date >= startDate && date <= endDate);

    return dates.length > 5 ? 5 : dates.length;

  }

}
