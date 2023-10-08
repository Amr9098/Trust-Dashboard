import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private _http:HttpClient) { }




  getAllBranches(){

    return this._http.get(`${environment.apiUrl}/get-all-branches`);


  }


  request_rider(data){

      console.log(data);

    return this._http.post(`${environment.apiUrl}/add-request`,data);


  }


  getAllRequests(){

    return this._http.get(`${environment.apiUrl}/admin-all-products`).pipe(map(x=> x["data"]));
    ;


  }




}
