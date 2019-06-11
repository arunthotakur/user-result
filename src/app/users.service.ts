import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor() {}

  getUser() {
    const userData = {
      name: "arun",
      data: [
        { attendedDate: "2019-06-01", result: "pass", score: 98 },
        { attendedDate: "2019-06-05", result: "pass", score: 79 },
        { attendedDate: "2019-06-02", result: "fail", score: 35 },
        { attendedDate: "2019-06-08", result: "fail", score: 45 },
        { attendedDate: "2019-06-25", result: "pass", score: 16 }
      ]
    };
    return userData;
  }

  getPersonColumnChartData() {
    const data = [
      {
        name: "Arun",
        colorByPoint: true,
        data: [
          {
            name: "Pass",
            y: 62.74
          },
          {
            name: "Fail",
            y: 10.22
          }
        ]
      }
    ];
    return data;
  }
}
