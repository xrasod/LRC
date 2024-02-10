import {computed, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

  _port = signal(3000);
  _host = signal('localhost');

  constructor() {
  }

  /**
   * Set the port number for the remote service
   * @param port
   */
  public setPortNumber(port: number): void {
    this._port.set(port);
  }

  public getPortNumber() {
    return computed(() => this._port())
  }

  /**
   * Set the host for the remote service
   * @param host
   */
  public setHost(host: string): void {
    this._host.set(host);
  }

  public getHost() {
    return computed(() => this._host())
  }

}
