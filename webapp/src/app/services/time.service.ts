import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }
  convertGMTToLocalTime(gmt): string {
    const localtime = new Date(gmt);
    return localtime.toLocaleString();
  }
}
