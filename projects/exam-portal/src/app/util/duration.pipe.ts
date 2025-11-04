import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(totalSeconds: number): string {
    if (typeof totalSeconds !== 'number' || totalSeconds < 0) {
      return '';
    }  
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (num: number): string => (num < 10 ? '0' : '') + num;

    const parts = [];
    if (hours > 0) {
      parts.push(`${hours} hr`);
    }
    parts.push(`${pad(minutes)} min`);
    parts.push(`${pad(seconds)} sec`);

    return parts.join(' ');
  }

}
