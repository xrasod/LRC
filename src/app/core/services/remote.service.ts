import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import LadokTuple from "../../../models/ladokTuple";

@Injectable({
  providedIn: 'root',
})
export class RemoteService {

  private _port = signal(3000);
  private _host = signal('localhost');
  private _connectionString = computed(() => `http://${this._host()}:${this._port()}` );
  _httpService = inject(HttpClient);


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

  public getLadokData (type: string, uid: string){
    const url = this._connectionString() + '/debug/' + type + '/' + uid;
    console.log('url', url);
    return this._httpService.get<LadokTuple>(url);
  }

}
