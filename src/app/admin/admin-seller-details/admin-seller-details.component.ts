import { MatDialog } from '@angular/material';
import { AuthService } from './../../core/auth.service';
import { TokenStorage } from './../../core/token.storage';
import { HttpClient } from '@angular/common/http';
import { UserService } from './../../shared/user.service';
import { ToasterServiceService } from './../../toaster-service.service';
import { PropertyService } from './../../shared/property.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-admin-seller-details',
  templateUrl: './admin-seller-details.component.html',
  styleUrls: ['./admin-seller-details.component.css']
})
export class AdminSellerDetailsComponent implements OnInit {
  constructor(private route:ActivatedRoute,private propertyService:PropertyService,private mytoastr:ToasterServiceService,private userService:UserService,private http: HttpClient,private router: Router, public dialog: MatDialog, private authService: AuthService, private token: TokenStorage) {
  }
  @Input() propertyId:any;
   data:any;


  ngOnInit() {
    console.log('admin seller details');
    console.log(this.propertyId);
    this.getPropertyById();
  }



  getPropertyById(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
           this.propertyService.getPropertyByIdadmin(this.propertyId,this.token.getAdminuserName())
           .subscribe(
                   chiraghProperty=>{
                       console.log('CHiragh Property');
                       console.log(chiraghProperty);
                       this.data=chiraghProperty;
                   }//end of chiragh property
           );//end of subscribe
        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser


}//end of class
