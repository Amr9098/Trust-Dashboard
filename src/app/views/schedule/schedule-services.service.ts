import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ScheduleInterface } from "./schedule-interface";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class ScheduleServicesService {
  constructor(private _http: HttpClient) {}

  getAllRidersSchedule() {
    return this._http.get<ScheduleInterface>(
      `${environment.apiUrl}/view-all-users`
    ).pipe(map(x=> x["data"]));
  }


  AddNewRiderSchedule(data:any){
    return this._http.post(`${environment.apiUrl}/rider-schedule`,data);

}

DeleteUser(id:number){
  return this._http.delete(`${environment.apiUrl}/delete-user/${id}`);

}
BanUser(id:number){
  return this._http.get(`${environment.apiUrl}/ban-user/${id}`);

}





}
