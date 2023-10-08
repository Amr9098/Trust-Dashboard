import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderChart } from './order-chart';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _http:HttpClient ) { }


  getOrdersChartLine(){

    return this._http.get<OrderChart>(`${environment.apiUrl}/product-chart-line`);
  }


  getVendorMetrics(){

    return this._http.get(`${environment.apiUrl}/dashboard-count`);
  }



}
