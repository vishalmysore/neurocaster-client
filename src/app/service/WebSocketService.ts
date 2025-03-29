import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: WebSocket | null = null;  // Use native WebSocket
  private responseSubject: Subject<any> = new Subject<any>();  // For emitting responses

  constructor() {}






  // Establish WebSocket connection
  connect(url: string): Observable<any> {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.socket = new WebSocket(url);

      // Handle incoming messages
      this.socket.onmessage = (event) => {
        try {
          console.log(event.data);

          const response = JSON.parse(event.data);  // Parse the JSON response
          console.log("here i am "+response);
          this.responseSubject.next(response);  // Emit the response
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
          this.responseSubject.error(error);
        }
      };

      // Handle connection errors
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.responseSubject.error(error);
      };

      // Handle connection closure
      this.socket.onclose = () => {
        console.log('WebSocket connection closed');
        this.responseSubject.complete();
        this.socket = null;  // Clean up the socket reference
      };
    }

    return this.responseSubject.asObservable();
  }

  // Send the query via WebSocket
  sendQuery(message: any): void {
    console.log('Sending to WebSocket:', message);
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));  // Send message as JSON
    } else {
      console.error('WebSocket is not connected');
    }
  }




  // Close the WebSocket connection (if needed)
  closeConnection(): void {
    if (this.socket) {
      this.socket.close();
      console.log('WebSocket closed');
      this.socket = null;
    }
  }
}
