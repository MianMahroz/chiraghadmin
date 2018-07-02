import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { TokenStorage } from '../core/token.storage';
import { AuthService } from '../core/auth.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class AuctionService {
  private auctionUrl = this.token.getServerpath()+'/api/auction';

  constructor(private http: HttpClient,private token:TokenStorage,private authService:AuthService) { }

//   public saveAuction(auctiondto:auctionDTO): Observable<any> {
//     return this.http.post<any>(this.auctionUrl + '/saveAuction', auctiondto,httpOptions);
// }
}
