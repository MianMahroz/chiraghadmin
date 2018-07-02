import { OwnerDetails } from './../Dto/ownerdetails.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { TokenStorage } from '../core/token.storage';
import { AuthService } from '../core/auth.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class SellerService {

  data:Observable<string>;
  constructor(private http: HttpClient,private token:TokenStorage,private authService:AuthService) { }

  private sellerUrl = this.token.getServerpath()+'/api/Propertysellerdetails';

  public getOwners(propertyId:number,userName:string): Observable<OwnerDetails[]> {
    return this.http.get<OwnerDetails[]>(this.sellerUrl + '/getOwners/'+propertyId+'/'+userName);
  }
  public getPoas(propertyId:number,userName:string): Observable<OwnerDetails[]> {
    return this.http.get<OwnerDetails[]>(this.sellerUrl + '/getPoas/'+propertyId+'/'+userName);
  }
  public addOwner(obj:OwnerDetails): Observable<any> {
    return this.http.post<any>(this.sellerUrl + '/post', obj,httpOptions);
  }
  public updateOwner(obj:OwnerDetails): Observable<any> {
    return this.http.put<any>(this.sellerUrl + '/updateOwner', obj,httpOptions);
  }

  public createProperty(userName:string): Observable<any> {
    return this.http.post<any>(this.sellerUrl + '/createProperty', userName,httpOptions);
}

saveDocument(path:string,name:string,userName:string,file: File): Observable<any> {
if(file){
  let formdata: FormData = new FormData();
  formdata.append('file', file);
  const req = new HttpRequest('POST', this.sellerUrl+'/saveDocument'+path+''+name+'/'+userName, formdata, {
    reportProgress: true,
    responseType: 'text'
  });
  return this.http.request(req);
}
else{
  return this.data=new Observable(observer=>{
      // observer.error(new Error('Image Not saved'))
      observer.next('Data');
  });
}//end of else

}






}//end of service class
