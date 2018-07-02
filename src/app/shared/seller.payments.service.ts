import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { TokenStorage } from '../core/token.storage';
import { AuthService } from '../core/auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class PaymentsService {

constructor(private http: HttpClient,private token:TokenStorage,private authService:AuthService) { }

private sellerpaymentUrl = this.token.getServerpath+'/sellerpayments';




// public postsellersecuritypayments(sellersecuritypaymentdto:sellersecuritysspaymentDTO): Observable<any> {
//   return this.http.post<any>(this.sellerpaymentUrl + '/post', sellersecuritypaymentdto,httpOptions);

// }
}
