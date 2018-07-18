import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';
const TOKEN_Refresh_KEY = 'refresh_token';
const TOKEN_EXPIRES_IN = 'expires_in';


@Injectable()
export class TokenStorage {

  serverPath:string='http://ec2-52-14-137-61.us-east-2.compute.amazonaws.com/ChiraghServer';
  // serverPath:string='http://localhost:8082';
  imagepath:string='http://ec2-52-14-137-61.us-east-2.compute.amazonaws.com/ChiraghDocuments/';
  // imagepath:string='http://localhost:8082/ChiraghDocuments/';

  constructor() { }


  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(TOKEN_Refresh_KEY);
    window.sessionStorage.removeItem(TOKEN_EXPIRES_IN);
    window.sessionStorage.clear();
  }


  public saveToken(token: string,refreshToken:string,expiresIn:string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(TOKEN_Refresh_KEY);
    window.sessionStorage.removeItem(TOKEN_EXPIRES_IN);

    window.sessionStorage.setItem(TOKEN_KEY,  token);
    window.sessionStorage.setItem(TOKEN_Refresh_KEY,  refreshToken);
    window.sessionStorage.setItem(TOKEN_EXPIRES_IN,  expiresIn);
  }

  public saveUserRole(role:string){
    window.sessionStorage.setItem("role",  role);
  }
  public getUserRole(): string {
    return sessionStorage.getItem("role");
  }

  public saveAdminUserName(userName:string){
    window.sessionStorage.setItem("adminUserName",  userName);
  }
  public getAdminuserName(): string {
    return sessionStorage.getItem("adminUserName");
  }
  public saveTempUser(userName:string){
    window.sessionStorage.setItem("tempUser",  userName);
  }
  public getTempUser(): string {
    return sessionStorage.getItem("tempUser");
  }
    public saveUserName(userName:string){
      window.sessionStorage.setItem("userName",  userName);
    }
    public getuserName(): string {
      return sessionStorage.getItem("userName");
    }
    public savePropertyId(propertyId:string){
      window.sessionStorage.setItem("propertyId",  propertyId);
    }
    public getPropertyId(): number {
      return Number(sessionStorage.getItem('propertyId'));
    }
    public saveAdminPropertyId(propertyId:string){
      window.sessionStorage.setItem("adminPropertyId",  propertyId);
    }
    public getAdminPropertyId(): number {
      return Number(sessionStorage.getItem('adminPropertyId'));
    }
    public getPropertyIdString(): string {
      return sessionStorage.getItem('propertyId');
    }
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getRefreshToken(): string {
    return sessionStorage.getItem(TOKEN_Refresh_KEY);
  }

  public getExpiresIn(): number {
    return Number(sessionStorage.getItem(TOKEN_EXPIRES_IN));
  }

  public getServerpath():string{
    return this.serverPath;
  }
  public getImagepath():string{
    return this.imagepath;
  }

}
