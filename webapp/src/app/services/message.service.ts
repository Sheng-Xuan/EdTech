import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subject = new Subject<any>();
  // To send message to trigger actions
  sendMessage(message: string) {
    this.subject.next({message: message});
  }
  // To subscribe this service and get messages sent from other components
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
