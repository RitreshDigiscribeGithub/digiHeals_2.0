import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convert24to12Hour',
})
export class Convert24to12HourPipe implements PipeTransform {
  transform(time: any): any {
    let hour = time.split(':')[0];
    let min = time.split(':')[1];
    let part = hour > 12 ? 'PM' : 'AM';
    min = (min + '').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour + '').length == 1 ? `0${hour}` : hour;
    return `${hour}:${min} ${part}`;
  }
}
