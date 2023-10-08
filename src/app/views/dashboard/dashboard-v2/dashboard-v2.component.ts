import { Component, OnInit } from "@angular/core";
import { echartStyles } from "src/app/shared/echart-styles";
import { OrderChart } from "../order-chart";
import { DashboardService } from "../dashboard.service";

@Component({
  selector: "app-dashboard-v2",
  templateUrl: "./dashboard-v2.component.html",
  styleUrls: ["./dashboard-v2.component.scss"],
})
export class DashboardV2Component implements OnInit {
  chartPie1: any;
  chartLineOption3: any;
  products$: any;
  OrdersChartLine: OrderChart;
  VendorMetrics: any;
  showSpinner = true;
  OrdersSummary: any;
  loading: boolean = true;
  loading2: boolean = true;
  style = {
    width: "800px",
    height: "300px",
    background: "linear-gradient(to right, #c9d6ff, #e2e2e2)",
  };
  style2 = {
    width: "100%",
    height: "350px",
    background: "linear-gradient(to right, #c9d6ff, #e2e2e2)",
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.get_vendore_statics();
    this.dashboardService.getOrdersChartLine().subscribe((res) => {
      this.loading = false;
      this.OrdersChartLine = res;
      setTimeout(() => {
        this.Chart();
      }, 300);
    });


  }

  Chart() {
    this.chartLineOption3 = {
      ...echartStyles.lineNoAxis,
      ...{
        series: [
          {
            data: this.OrdersChartLine.count,
            lineStyle: {
              color: "rgba(102, 51, 153, .86)",
              width: 3,
              shadowColor: "#FFCE49",
              shadowOffsetX: -1,
              shadowOffsetY: 8,
              shadowBlur: 20,
            },
            label: { show: true, color: "#212121" },
            type: "line",
            smooth: true,
            itemStyle: {
              borderColor: "#FFCE49",
            },
          },
        ],
      },
    };
    this.chartLineOption3.xAxis.data = this.OrdersChartLine.day;
  }

  get_vendore_statics() {
    this.dashboardService.getVendorMetrics().subscribe(
      (res) => {
        //   console.log(this.VendorMetrics);

        this.VendorMetrics = res;
        this.showSpinner = false;

        console.log(res);
      },
      (error) => {}
    );
  }


}
