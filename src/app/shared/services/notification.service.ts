import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }



  getAllRequestsNotifications(){

    return this.httpClient.get(`${environment.apiUrl}/get-all-notifications`);


  }


 EmptyNotifications(){

    return this.httpClient.get(`${environment.apiUrl}/empty-notifications`);


  }






}
