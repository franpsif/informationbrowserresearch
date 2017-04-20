import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/observable';

@Injectable()
export class DataProvider {
  private url = 'http://informationbrowserserver.azurewebsites.net/query/results';


  constructor(private http: Http) {
  }

  public getData(maxData: number = 100): Observable<Object[]> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('maxData', maxData.toString());

    return this.http.get(this.url, {
      search: params
    }).map(data => <Object[]> data.json().values);
  }
}
