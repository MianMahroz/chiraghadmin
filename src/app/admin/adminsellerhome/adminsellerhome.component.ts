import { PropertyService } from './../../shared/property.service';
import { ChiraghUser } from './ChiraghUserPOJO';

import { ToasterServiceService } from './../../toaster-service.service';
import { SellerService } from './../../shared/seller.service';
import { UserService } from './../../shared/user.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../core/auth.service';
import { TokenStorage } from './../../core/token.storage';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild, AfterViewInit,Input } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-adminsellerhome',
  templateUrl: './adminsellerhome.component.html',
  styleUrls: ['./adminsellerhome.component.css']
})
export class AdminsellerhomeComponent implements AfterViewInit,OnInit {


    displayedColumns = ['Sr','userName','lastActionPerformed','dateReceived','lastAction','actionPerformedBy'];
    dataSource = new MatTableDataSource();
    showsellerhome=false;
    chiraghPropertyArr:any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  constructor(private propertyService:PropertyService,private myToast:ToasterServiceService,private route:ActivatedRoute,private sellerService:SellerService,private userService:UserService,private http: HttpClient,private router: Router, private authService: AuthService, private token: TokenStorage) {

  }


  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }

  ngAfterViewInit() {
    // this.loadScript('./assets/js/common.js');//i comment this line because rowClicked Function is not working
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  rowClicked(row: any): void {
    // console.log(row.propertyId);
    this.router.navigate(['/sellerOwnerDetails']);
    this.token.saveAdminPropertyId(row.propertyId);
  }

  ngOnInit() {
      this.getAdminSellerHomeData();
  }

  getAdminSellerHomeData(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
            this.propertyService.getAdminSellerHomeData(this.token.getAdminuserName()).subscribe(
             sellerHomePageData=>{
                  console.log(sellerHomePageData);
                  this.dataSource.data=sellerHomePageData;
             }

            );
        }//end of if

     }//end of outer data predicate
    );//end of outer subscription

  }//end of loginChiraghUser
}//end of class
