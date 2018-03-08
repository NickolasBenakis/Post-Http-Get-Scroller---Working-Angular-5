import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginserviceProvider} from "../../providers/loginservice/loginservice";
import * as xml2js from 'xml2js';
var webApihost="http://192.168.0.6:81/EBSWebApi/";
var scrollerid = "ES00BACKUP/KHCApp_Items";
var commandid = "";
var ScrollerDatasetTest = "";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  url: string;
  params: {
    SubscriptionPassword: string;
    model: {
      BranchID: string;
      LangID: string;
      UserID: string;
      Password: string;
    }
  };
  public token: string;

  //scroller code below//

  paramsScroller: {
    headers: {
      Authorization: string;
    },
    data: {
      Code: string;
    }
  };

  constructor(public navCtrl: NavController,
              private loginserviceprovider: LoginserviceProvider) {
  }


  ionViewWillLoad() {
    this.url = webApihost+'api/login';

    this.params = {
      SubscriptionPassword: 'passx',
      model: {
        BranchID: "01",
        LangID: "el-GR",
        UserID: "khcadmin",
        Password: "P@ssw0rd",
      }
    };
    this.token = "";
    console.log("Token prin" + this.token);
    return this.loginserviceprovider.getWebApi(this.url, this.params)
      .subscribe(data => {
          console.log(data);
          this.token = data.Model.WebApiToken;

          console.log("Μόλις πήρα το Token -> " + this.token);


          //Scroller Code Below//

           this.url= webApihost+ "api/rpc/SimpleScrollerRootTable/" + scrollerid;
          this.paramsScroller = {
            headers: {
              Authorization: 'Bearer ' + this.token
            },
            data: {
              Code: "1*"
            },
          };
        console.log("Πέρασε το Token μέσα στο scroller -> " + this.token);

          return this.loginserviceprovider.getScrollerID(this.url,this.paramsScroller)
            .subscribe(Scroller => {
              console.log(Scroller);
            })

        }
      );


  }
}


//scroller functions//

//  ionViewDidEnter(){
//
//    this.urlScroller="http://192.168.0.6:81/EBSWebApi/api/rpc/ScrollerCommand";
//    this.headers={
//      Authorization:'Bearer '+ this.token
//    };
//    console.log("Token headers   "+this.token);
//    this.paramsScroller = {
//      data: {
//        ScrollerID:scrollerid
//      }
//    };
//
// return this.loginserviceprovider.getScrollerID(this.urlScroller,this.headers,this.paramsScroller)
//   .subscribe(scroller=>{
//     console.log(scroller);
//   })
//  }


// Palioi Parametroi//

// this.paramsScroller = {
//   data: {
//     ScrollerID:scrollerid,
//     CommandID: commandid,
//     ScrollerDataset: ScrollerDatasetTest,
//     ReturnTargetDatasets: true, // we want to get the resulting dataset back
//     ReturnScrollerDataset: true, // as well
//     OnlyPrepareTargetDatasets: false
//   }
// };



//
// this.paramsScroller.Surl = "http://192.168.0.6:81/EBSWebApi/api/rpc/SimpleScrollerRootTable/" + scrollerid;
// this.paramsScroller.headers = {
//   Authorization: 'Bearer ' + this.token
// };
// console.log("Πέρασε το Token μέσα στο scroller -> " + this.token);
//
// this.paramsScroller.data = {
//   Code: "1*"
// };

