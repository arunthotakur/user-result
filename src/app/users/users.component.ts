import { UsersService } from "./../users.service";
import { Component, OnInit } from "@angular/core";
import { disableDebugTools } from "@angular/platform-browser";
import { Chart } from "angular-highcharts";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  startDate = "";
  endDate = "";
  errMessage: string;
  curDate: Date;
  today = new Date();
  dd = this.today.getDate();
  mm = this.today.getMonth() + 1;
  yyyy = this.today.getFullYear();
  currentDate =
    this.yyyy + "-" + (this.mm > 9 ? this.mm : "0" + this.mm) + "-" + this.dd;
  userlist = [];
  userData: any;
  chart = new Chart({
    chart: {
      type: "line"
    },
    title: {
      text: "Linechart"
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: "Line 1",
        data: [1, 2, 3]
      }
    ]
  });
  chart41: Chart;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userData = this.userService.getUser();
    this.getColumnChart();
  }

  checkDateValidation() {
    this.userlist = [];
    this.errMessage = "";

    if (new Date(this.startDate) > new Date(this.endDate)) {
      this.errMessage = "End Date should be greater than start date";
    }
    if (new Date(this.startDate) === new Date(this.endDate)) {
      this.errMessage = "Start date should not be same as end date";
    }
    // if (new Date(this.endDate) < new Date((this.currentDate))) {
    //   this.errMessage = 'Start date should not be before today.';
    // }
    for (let i = 0; i < this.userData.data.length; i++) {
      if (
        new Date(this.startDate) <=
          new Date(this.userData.data[i].attendedDate) &&
        new Date(this.endDate) >= new Date(this.userData.data[i].attendedDate)
      ) {
        this.userlist.push(this.userData.data[i]);
      }
    }
  }

  // add point to chart serie
  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }

  getColumnChart() {
    this.chart41 = new Chart({
      chart: {
        type: "column"
      },

      xAxis: {
        type: "category"
      },

      plotOptions: {
        column: {
          cursor: "pointer",
          point: {
            events: {}
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },

      series: this.userService.getPersonColumnChartData()
    });
  }
}
