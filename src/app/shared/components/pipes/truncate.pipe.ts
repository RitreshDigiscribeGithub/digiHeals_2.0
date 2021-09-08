import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})

export class TruncatePipe implements PipeTransform {

  transform(value: string, stort_desc: string): unknown {
    const limit = stort_desc.length > 0 ? parseInt(stort_desc[0], 10) : 20;
    const trail = stort_desc.length > 1 ? stort_desc[1] : '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

}
