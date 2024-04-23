import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Subject<any>;
  private wsUrl = 'ws://localhost:8080';
  
  constructor() {
    const isBrowser = typeof window !== 'undefined';
    
    if (isBrowser) {
      this.socket = webSocket(this.wsUrl);
    } else {
      this.socket = new Subject<any>();
    }
  }

  getMessages(): Observable<any> {
    return this.socket.asObservable();
  }

  sendMessage(msg: any): void {
    this.socket.next(msg)
  }

  close(): void {
    this.socket.complete();
  }
}
