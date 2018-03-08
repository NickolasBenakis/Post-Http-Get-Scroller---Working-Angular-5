import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {tokenKey} from "@angular/core/src/view";

var webApihost="http://192.168.0.6:81/EBSWebApi/";
var scrollerid="ES00BACKUP/KHCApp_Items";
@Injectable()

export  class LoginserviceProvider {

  url = webApihost +'api/login';
  params = {
    SubscriptionPassword: 'passx',
    model: {
      BranchID: "01",
      LangID:"el-GR",
      UserID: "khcadmin",
      Password: "P@ssw0rd",
    }
  };

  //scroller code below//
  url2 = webApihost+"api/rpc/SimpleScrollerRootTable/" + scrollerid;
  paramsScroller= {
  headers :{
    Authorization: "Bearer"
  },
  data : {
    Code: "1*"
  }
};
  constructor(public http: HttpClient) {
    console.log('Hello LoginserviceProvider Provider');
    this.url=webApihost+'api/login';
    this.url2 = webApihost+"api/rpc/SimpleScrollerRootTable/" + scrollerid;
    console.log(this.params);
    //scroller code below//


  }

  // //AuthorizationHeader//
  // createAuthorizationHeader(){
  //   var headers =new HttpHeaders();
  //   //get auth token
  //   //append auth token to headers
  //   headers.append("Authorization","3c670359-4b61-4f5e-8bee-6afbec0e05a2");
  //   return headers;
  // }



  getWebApi(url,params):Observable<HttpClient>{
    return this.http.post<HttpClient>
    (this.url,params);

  }


  getScrollerID(url,paramsScroller):Observable<HttpEvent<HttpClient>>{
    return this.http.get<HttpClient>
    (this.url2,paramsScroller);
  }
}


