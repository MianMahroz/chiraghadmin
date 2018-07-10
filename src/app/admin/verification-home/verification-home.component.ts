import { AdminDTO } from './../../Dto/adminDto';
import { personalInfoDTO } from './../../Dto/personalInfoDTO';
import { PropertyFinancialDTO } from './../../Dto/propertyfinancialDTO';
import { PropertyRentalDetailDTO } from './../../Dto/propertyRentalDTO';
import { PropertyDetailsDto } from './../../Dto/propertymodel';
import { OwnerDetails } from './../../Dto/ownerdetails.model';
import { SellerService } from './../../shared/seller.service';
import { HttpClient } from '@angular/common/http';
import { PropertyService } from './../../shared/property.service';
import { TokenStorage } from './../../core/token.storage';
import { AuthService } from './../../core/auth.service';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import {ModalGalleryModule,Image} from 'angular-modal-gallery';
import { UserService } from './../../shared/user.service';
import { ToasterServiceService } from './../../toaster-service.service';
import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'app-verification-home',
  templateUrl: './verification-home.component.html',
  styleUrls: ['./verification-home.component.css']
})
export class VerificationHomeComponent implements OnInit {
  async ngAfterViewInit() {
    await this.loadScript('./assets/js/common.js');
	}

  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }

  completePropertiesList:any;
  currentProperty:any;
  showsellerdetails=false;
  showsellerhome=false;
  propertyId:number;
  completePropertyArr:any;
  ownerDto=new OwnerDetails();
  propertyDetailsDto=new PropertyDetailsDto();
  propertyRentalDetailDTO=new PropertyRentalDetailDTO();
  propertyFinancialDTO=new PropertyFinancialDTO();
  personalinfoDTO =new personalInfoDTO();
  ownerDetailsEdit=false;
  currentPropertyId:number;
  selectedPassport: FileList
  selectedIdCopy: FileList
  selectedScannedPoa: FileList
  passportFile:File;
  idCopyFile:File;
  images: Image[]=[] ;
  editOwner=false;
  editPOA=false;
  editPropertyDetails=false;
  selectedMorgageNoc: FileList
  morgageNocFile:File;
  selectedScannedTitleDeed: FileList;
  scannedTitleDeedFile:File;
  scannedNotorizedPoaFile:File;
  editFinancialDetails=false;
  editRentalDetails=false;
  scannedTenentContractFile:File;
  selectedscannedTenentContract: FileList;
   myObj=new AdminDTO();
//checklist fields
isPersonalDetailsVerified:string;
isPOADetailsVerified:string;
isPropertyDetailsVerified:string;
acknowledgmentCall:string;
myclassName:string;
ownerIdCopy:string;
ownerPassportCopy:string;
poaIdCopy:string;
poaPassportCopy:string;
poaNotorizedCopy:string;
pdTitleDeedCopy:string;
// myclassName='row tab-pane fade sign-in-row';
// myclassNameActive='row tab-pane fade sign-in-row-active show';



checklistData(data:any):void{
  this.myclassName='row tab-pane fade sign-in-row';
//   console.log('admin data')
//   console.log(data);
//   this.isPersonalDetailsVerified=null;
//   Array.from(data.propertysellerdetailses).forEach((obj) => {
//     if(obj.ownerType=='owner'){
//       console.log('owner');
//       this.isPersonalDetailsVerified=obj.isPersonalDetailsVerified;
//       console.log(this.isPersonalDetailsVerified);
//    }
//   else if(obj.ownerType=='poa'){
//     console.log('poa');
//     this.isPOADetailsVerified=obj.isPersonalDetailsVerified;
//     console.log(this.isPOADetailsVerified);
//   }

//     // eachObj.name = that.firms[data.firmid - 1].name;
// });
//   this.isPropertyDetailsVerified=data.isPropertyDetailsVerified;

//  if(this.isPersonalDetailsVerified=='false'){
//   this.isPersonalDetailsVerified='';
// }
// if(this.isPOADetailsVerified=='false'){
//   this.isPOADetailsVerified='';
// }
// if(this.isPropertyDetailsVerified=='false'){
//   this.isPropertyDetailsVerified='';
// }
}//end of checklist





  grantEditAccessToFinancialDetails():void{
    this.editFinancialDetails=true;
  }
  grantEditAccessToRentalDetails():void{
    this.editRentalDetails=true;
  }
  grantEditAccess():void{
    this.editOwner=true;
  }
  grantEditAccessToPOA():void{
    this.editPOA=true;
  }
  grantEditAccessToPropertyDetails():void{
    this.editPropertyDetails=true;
  }
  selectPassport(event) {
    this.selectedPassport = event.target.files;
    this.passportFile=this.selectedPassport.item(0);
    event.srcElement.value = null;
    // console.log(this.passportFile);
  }
  selectIdCopy(event) {
    this.selectedIdCopy = event.target.files;
    this.idCopyFile=this.selectedIdCopy.item(0);
    // console.log(this.idCopyFile);
    event.srcElement.value = null;
 }
 selectScannedTitleDeed(event) {
  this.selectedScannedTitleDeed = event.target.files;
  this.scannedTitleDeedFile=this.selectedScannedTitleDeed.item(0);
  event.srcElement.value = null;
}
scannedTenantContract(event) {
  this.selectedscannedTenentContract = event.target.files;
  this.scannedTenentContractFile=this.selectedscannedTenentContract.item(0);
  event.srcElement.value = null;
}
selectMorgageNoc(event) {
  this.selectedMorgageNoc = event.target.files;
  this.morgageNocFile=this.selectedMorgageNoc.item(0);
  event.srcElement.value = null;
}

  ownerVerified(isVerified:string): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
          this.ownerDto.isPersonalDetailsVerified=isVerified;
          this.ownerDto.userName=this.token.getAdminuserName();
          this.ownerDto.propertyId=this.currentPropertyId;
         this.sellerService.updateOwner(this.ownerDto).subscribe(
           data=>{
                     this.mytoastr.Info('Status','Owner Verified Successfully');
                     this.ownerDto=new OwnerDetails();
                     this.getCompleteProperties();
                     this.refreshDto();
           }//end of
         );
        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser

  financialDetailsVerified(isVerified:string): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
          this.propertyFinancialDTO.isPropertyFinancialDetailsVerified=isVerified;
          this.propertyFinancialDTO.userName=this.token.getAdminuserName();
          this.propertyFinancialDTO.propertyId=this.currentPropertyId;
          this.propertyService.updatePropertyFinancials(this.propertyFinancialDTO).subscribe(
           data=>{
                     this.mytoastr.Info('','Property Financial Details Verified Successfully');
                     this.propertyFinancialDTO=new PropertyFinancialDTO();
                     this.getCompleteProperties();
                     this.refreshDto();
           }//end of
         );
        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser

  rentalDetailsVerified(isVerified:string): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
          this.propertyRentalDetailDTO.isPropertyRentalDetailsVerified=isVerified;
          this.propertyRentalDetailDTO.userName=this.token.getAdminuserName();
          this.propertyRentalDetailDTO.propertyId=this.currentPropertyId;
          this.propertyService.updatePropertyRental(this.propertyRentalDetailDTO).subscribe(
           data=>{
                     this.mytoastr.Info('','Property Rental Details Verified Successfully');
                     this.propertyRentalDetailDTO=new PropertyRentalDetailDTO();
                     this.getCompleteProperties();
                     this.refreshDto();
           }//end of
         );
        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser

  propertyDetailsVerified(isVerified:string): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
          this.propertyDetailsDto.isPropertyDetailsVerified=isVerified;
          this.propertyDetailsDto.sellerUserName=this.propertyDetailsDto.sellerUserName;
          this.propertyDetailsDto.userName=this.token.getAdminuserName();
          this.propertyDetailsDto.propertyId=this.currentPropertyId;
          this.propertyService.updateProperty(this.propertyDetailsDto).subscribe(
           data=>{
                     this.mytoastr.Info('Status','Property Details Verified Successfully');
                     this.propertyDetailsDto=new PropertyDetailsDto();
                     this.getCompleteProperties();
                     this.refreshDto();
           }//end of
         );
        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser


  refreshDto():void{
    //  this.images=null;
     this.ownerDto=new OwnerDetails();
     this.propertyDetailsDto=new PropertyDetailsDto();
     this.propertyFinancialDTO=new PropertyFinancialDTO();
     this.propertyRentalDetailDTO=new PropertyRentalDetailDTO();
     this.editPropertyDetails=false;
     this.editFinancialDetails=false;
     this.editRentalDetails=false;
     this.editOwner=false;
     this.editPOA=false;
     this.images=[];
    //  this.getCompleteProperties();
  }//end of refresh dto

  setCurrentProperty(prop:any){

    this.currentPropertyId=prop.propertyId;
    this.currentProperty=prop;
    console.log(this.currentProperty);
    this.token.saveUserName(prop.sellerUserName);
  }


  getPropertyDetailsImages():void{
    this.images = [
      new Image(
        0,
        { // modal
          img: ''+this.token.getImagepath()+'propertyId-'+this.currentPropertyId+'/'+this.propertyDetailsDto.scannedTitleDeed,
          extUrl: 'http://demo.chiragh.com/'
        }
      )];
}//end of get owner details

  getOwnerImages():void{
      this.images = [
        new Image(
          0,
          { // modal
            img: ''+this.token.getImagepath()+'propertyId-'+this.currentPropertyId+'/'+this.ownerDto.scannedIdCopy,
            extUrl: 'http://demo.chiragh.com/'
          }
        ),
        new Image(
          1,
          { // modal
            img: ''+this.token.getImagepath()+'propertyId-'+this.currentPropertyId+'/'+this.ownerDto.passportCopyUpload,
            extUrl: 'http://demo.chiragh.com/'
          }
        )];
  }//end of get owner details

  getPOAImages():void{
    this.images = [
      new Image(
        0,
        { // modal
          img: ''+this.token.getImagepath()+'propertyId-'+this.currentPropertyId+'/'+this.ownerDto.scannedIdCopy,
          extUrl: 'http://demo.chiragh.com/'
        }
      ),
      new Image(
        1,
        { // modal
          img: ''+this.token.getImagepath()+'propertyId-'+this.currentPropertyId+'/'+this.ownerDto.passportCopyUpload,
          extUrl: 'http://demo.chiragh.com/'
        }
      ),
      new Image(
        2,
        { // modal
          img: ''+this.token.getImagepath()+'propertyId-'+this.currentPropertyId+'/'+this.ownerDto.scannedNotorizedCopy,
          extUrl: 'http://demo.chiragh.com/'
        }
      )
    ];
}//end of get owner details

selectScannedPoa(event) {
  this.selectedScannedPoa = event.target.files;
  this.scannedNotorizedPoaFile=this.selectedScannedPoa.item(0);
  event.srcElement.value = null;
}
  getOwnerDetails(data:any):void{
   console.log(' Owner Clicked!!');
   if(data.ownerType=='owner'){
      this.ownerDto=data;
      this.ownerPassportCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.ownerDto.passportCopyUpload;
      this.ownerIdCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.ownerDto.scannedIdCopy;
      this.editOwner=false;
      this.mytoastr.Info('','Owner Data loaded Successfully');
   }
  }
  getPOADetails(data:any):void{
    console.log(' POA Clicked!!');
    if(data.ownerType=='poa'){
      this.ownerDto=data;
      this.poaPassportCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.ownerDto.passportCopyUpload;
      this.poaIdCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.ownerDto.scannedIdCopy;
      this.poaNotorizedCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.ownerDto.scannedNotorizedCopy;
      this.editPOA=false;
      this.mytoastr.Info('','POA Data loaded Successfully');
    }
   }
   getPropertyFinancialDetailsImages():void{
    this.images = [
      new Image(
        0,
        { // modal
          img: ''+this.token.getImagepath()+'propertyId-'+this.currentPropertyId+'/'+this.propertyFinancialDTO.morgageNoc,
          extUrl: 'http://demo.chiragh.com/'
        }
      )];
}//end of get owner details
getPropertyRentalDetailsImages():void{
  this.images = [
    new Image(
      0,
      { // modal
        img: ''+this.token.getImagepath()+'propertyId-'+this.currentPropertyId+'/'+this.propertyRentalDetailDTO.tenancyContractUpload,
        extUrl: 'http://demo.chiragh.com/'
      }
    )];
}//end of get owner details

   getPropertyDetails(data:any):void{
    console.log(' Property Clicked!!');
    this.propertyDetailsDto=data;
    this.pdTitleDeedCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.propertyDetailsDto.scannedTitleDeed;
    this.mytoastr.Info('','Property Details loaded Successfully');
   }


   getPropertyRentalDetails(data:any):void{
    console.log(' Property Clicked!!');
    this.propertyRentalDetailDTO=data;
    this.getPropertyRentalDetailsImages();
    this.mytoastr.Info('','Property Rental Details loaded Successfully');
   }

   getPropertyFinancialDetails(data:any):void{
    console.log(' Property Clicked!!');
    this.propertyFinancialDTO=data;
    this.getPropertyFinancialDetailsImages();
    this.mytoastr.Info('','Property Financial Details loaded Successfully');
   }

   getpersonalinfoDetails(data:any):void{
    console.log(' Personal info Clicked!!');
    this.personalinfoDTO=data;
   }
  constructor(private sellerService:SellerService,private route:ActivatedRoute ,private propertyService:PropertyService,private mytoastr:ToasterServiceService,private userService:UserService,private http: HttpClient,private router: Router, public dialog: MatDialog, private authService: AuthService, private token: TokenStorage) {

  }

  showSellerHome(){
    this.showsellerhome=true;
      }
  ngOnInit() {
    this.myclassName='row tab-pane fade sign-in-row-active show';
    if(this.token.getAdminuserName()==null){
      console.log('Invalid Session');
      this.mytoastr.Error('','Invalid Session!')
      this.router.navigate(['/adminsignin']);
      return "Invalid Session";
    }//end of if
    this.showsellerhome=false;
    this.showsellerdetails=false;
    this.showsellerdetails=this.route.snapshot.params['action'];
    this.propertyId=this.route.snapshot.params['propertyId'];
    this.getCompleteProperties();
  }//end of oninit


  getCompleteProperties(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        // console.log(data);
        if(this.token.getToken()!=null){
            this.propertyService.getCompleteProperties(this.token.getAdminuserName()).subscribe(
                   data=>{

                    console.log('Output of service call');
                            this.completePropertyArr=data;
                            console.log(this.completePropertyArr);

                   }//end of data of getCompleteProperties
            );//end of getProperties subscribe
        }//end of if

     }//end of outer data predicate
    );//end of outer subscription

  }//end of loginChiraghUser

  getAdminSellerHomeData(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
            this.propertyService.getAdminSellerHomeData(this.token.getuserName()).subscribe(
             sellerHomePageData=>{
                  console.log(sellerHomePageData);
                  this.completePropertyArr=sellerHomePageData;
             }

            );
        }//end of if

     }//end of outer data predicate
    );//end of outer subscription

  }//end of loginChiraghUser

//code of ngx-galary

loadData(){
  this.currentProperty='';
  // this.mytoastr.Success('','Properties loaded Successfully');
}






}//end of class
