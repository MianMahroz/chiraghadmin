import { VerificationDTO } from './../Dto/verificationDto';

import { PropertyRentalDetailDTO } from '../Dto/propertyRentalDTO';
import { PropertyFinancialDTO } from '../Dto/propertyfinancialDTO';
import { PropertyDetailsDto } from '../Dto/propertymodel';

import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { TokenStorage } from '../core/token.storage';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class VerificationService {
  private verificationUrl = this.token.getServerpath()+'/api/verification';
  constructor(private http: HttpClient,private token:TokenStorage,private authService:AuthService) { }

  public sentEmail1(verificationDTO:VerificationDTO): Observable<any> {
    return this.http.post<any>(this.verificationUrl + '/sentEmail', verificationDTO,httpOptions);
  }

}