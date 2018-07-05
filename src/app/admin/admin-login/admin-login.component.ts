import { loginDTO } from './../../Dto/loginDTO';

import { TokenStorage } from './../../core/token.storage';
import { AuthService } from './../../core/auth.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from './../../shared/user.service';
import { ToasterServiceService } from './../../toaster-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {



  ngOnInit() {
    if(this.token.getAdminuserName()){
      this.router.navigate(['/adminhome']);
    }
  }
  constructor(private mytoastr:ToasterServiceService,private userService:UserService,private http: HttpClient,private router: Router, public dialog: MatDialog, private authService: AuthService, private token: TokenStorage) {

      }

       logindto=new loginDTO();
      loginAdminUser(): void {
        window.sessionStorage.removeItem('AuthToken');
        this.authService.attemptAuth().subscribe(
          data => {
            this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
            if(this.token.getToken()!=null){
              this.userService.login(this.logindto.userName,this.logindto.userPassword).subscribe(
                data1=>{
                  console.log(data1);
                  this.mytoastr.Success('Login','Admin Login Successfully');
                       if(data1.msg=="Login Successfully"){
                         if(data1.role=='admin'){
                        // this.mytoastr.Success('Login',data1.msg);
                           this.token.saveAdminUserName(this.logindto.userName);
                           this.token.saveUserRole(data1.role);
                           this.router.navigate(['/adminverificationhome']);
                         }
                       }//end of if
                    }//end of inner data predicate
              );//end of inner subscription
            }//end of if

         }//end of outer data predicate
        );//end of outer subscription

      }//end of loginChiraghUser




    }


