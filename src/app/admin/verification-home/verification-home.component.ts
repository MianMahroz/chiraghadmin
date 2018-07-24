
import { VerificationService } from '../../shared/verification.service';
import { AdminDTO } from '../../Dto/adminDto';
import { personalInfoDTO } from '../../Dto/personalInfoDTO';
import { PropertyFinancialDTO } from '../../Dto/propertyfinancialDTO';
import { PropertyRentalDetailDTO } from '../../Dto/propertyRentalDTO';
import { PropertyDetailsDto } from '../../Dto/propertymodel';
import { OwnerDetails } from '../../Dto/ownerdetails.model';
import { SellerService } from '../../shared/seller.service';
import { HttpClient } from '@angular/common/http';
import { PropertyService } from '../../shared/property.service';
import { TokenStorage } from '../../core/token.storage';
import { AuthService } from '../../core/auth.service';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import {ModalGalleryModule,Image} from 'angular-modal-gallery';
import { UserService } from '../../shared/user.service';
import { ToasterServiceService } from '../../toaster-service.service';
import { Component, OnInit ,Input } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AfterViewInit, ViewChild} from '@angular/core';
import { VerificationDTO } from '../../Dto/verificationDto';
import { PropertyActivityLogs } from '../../Dto/PropertyActivityLogs';
import { ThrowStmt } from '../../../../node_modules/@angular/compiler';
@Component({
  selector: 'app-verification-home',
  templateUrl: './verification-home.component.html',
  styleUrls: ['./verification-home.component.css']
})


export class VerificationHomeComponent implements OnInit {



  firstOwner=true;
  firstPoa=true;
  taskArr:any;
  userPropertyActivityLogs=new PropertyActivityLogs();
  propertyActivityLogs=new PropertyActivityLogs();
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
  scannedFloorPlanFile:File;
  selectedFloorPlan:FileList;
   myObj=new AdminDTO();
//checklist fields
isPersonalDetailsVerified:string;
isPOADetailsVerified:string;
isPropertyDetailsVerified:string;
isPropertyRentalDetailsVerified:string;
isPropertyMorgageDetailsVerified:string;

acknowledgmentCall:string;
myclassName:string;
owner1=new OwnerDetails();
body:string;
verificationDto=new VerificationDTO();

ownerIdCopy:string;
ownerPassportCopy:string;
poaNotorizedCopy:string;
titleDeedCopy:string;
floorPlanCopy:string;
tenancyContractCopy:string;
morgageNocCopy:string;

poaIdCopy:string;
poaPassportCopy:string;

pdTitleDeedCopy:string;
currentPropertySystemLogs=new PropertyActivityLogs();
valuationReportPath:string;
bankList:any[];
paymentScheduleList:any[];
scannednocuploadPath:string;
scannedTenantContractUploadPath:string;
idcopyuploadPath:string;
passportcopyuploadPath:string;
notorizedcopyPath:string;
currentOwner:number;
//files names;
idCopyFileName:string;
passportCopyFileName:string;
scannedNotorizedCopyFileName:string;
titleDeedFileName:string;
floorPlanFileName:string;
morgageNocFileName:string;
tenancyContractFileName:string;
count1:number;
count2:number;
poaCount1:number;
poaCount2:number;

// myclassName='row tab-pane fade sign-in-row';
// myclassNameActive='row tab-pane fade sign-in-row-active show';

constructor(private verificationService:VerificationService,private sellerService:SellerService,private route:ActivatedRoute ,private propertyService:PropertyService,private mytoastr:ToasterServiceService,private userService:UserService,private http: HttpClient,private router: Router, public dialog: MatDialog, private authService: AuthService, private token: TokenStorage) {
}
async ngAfterViewInit() {
  await this.loadScript('./assets/js/common.js');
}

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
displayedColumns = ['Sr','userName','lastActionPerformed','dateReceived','lastAction','actionPerformedBy'];
dataSource = new MatTableDataSource();

applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}
rowClicked(row: any): void {
  console.log('Here it is');
  // console.log(row);
  this.currentPropertyId=row.propertyId;
  this.currentProperty=row;
  // console.log(this.currentProperty);
  this.token.saveUserName(row.sellerUserName);
 this.getFirstOwner();
}

getFirstOwner():void{
this.firstOwner=true;
      Array.from(this.currentProperty.propertysellerdetailses).forEach(obj2 => {
    var obj=null;
    obj=JSON.parse(JSON.stringify(obj2));
    console.log(obj.ownerType);
    if(obj.ownerType=='owner'){
       console.log('inside first owner');
      //  console.log(obj);
    //  this.ownerDto=obj;
    if(this.firstOwner){
      console.log(obj);
      this.getOwnerDetails(obj);
      this.firstOwner=false;
    }
    }
});//end of for each
// this.ownerDto=this.a[0];
}//end of getFirstOwner


getFirstPOA():void{
  this.firstPoa=true;
this.ownerDto=new OwnerDetails();
  Array.from(this.currentProperty.propertysellerdetailses).forEach(obj2 => {
    var obj=null;
    obj=JSON.parse(JSON.stringify(obj2));
    console.log(obj.ownerType);
    if(obj.ownerType=='poa'){
      if(this.firstPoa){
        console.log(this.ownerDto);
        this.getPOADetails(obj);
        this.firstPoa=false;
      }

    }
});//end of for each
// this.ownerDto=this.a[0];
}//end of getFirstOwner


private loadScript(scriptUrl: string) {
  return new Promise((resolve, reject) => {
    const scriptElement = document.createElement('script');
    scriptElement.src = scriptUrl;
    scriptElement.onload = resolve;
    document.body.appendChild(scriptElement);
  })
}
  checklistData(data:any):void{
    // this.getCompleteProperties();
      this.propertyDetailsDto=data;
      this.myclassName='row tab-pane fade sign-in-row';
      console.log('admin data')
      this.isPersonalDetailsVerified=null;
      this.count1=0;
      this.count2=0;
      Array.from(data.propertysellerdetailses).forEach(obj2 => {
      var obj= JSON.parse(JSON.stringify(obj2));
      console.log(obj);
      if(obj.ownerType=='owner'){
        this.count1=this.count1+1;
        console.log('owner');
        if(obj.isPersonalDetailsVerified=='true'){
            this.count2=this.count2+1;
        }
        this.isPersonalDetailsVerified=obj.isPersonalDetailsVerified;
        console.log(this.isPersonalDetailsVerified);
    }
    else if(obj.ownerType=='poa'){
      console.log('poa');
      this.poaCount1=this.poaCount1+1;
      console.log('owner');
      if(obj.isPOADetailsVerified=='true'){
          this.poaCount2=this.poaCount2+1;
      }
      this.isPOADetailsVerified=obj.isPersonalDetailsVerified;
      console.log(this.isPOADetailsVerified);
    }

      // eachObj.name = that.firms[data.firmid - 1].name;
  });
    this.isPropertyDetailsVerified=data.isPropertyDetailsVerified;
    this.isPropertyMorgageDetailsVerified=data.isPropertyFinancialDetailsVerified;
    this.isPropertyRentalDetailsVerified=data.isPropertyRentalDetailsVerified;

    if(data.isAcknowledgementCall=='true')
      this.acknowledgmentCall=data.isAcknowledgementCall;

    if(this.count1!=this.count2){
      this.isPersonalDetailsVerified='';
    }
    if(this.isPOADetailsVerified=='false'){
      this.isPOADetailsVerified='';
    }
    if(this.poaCount1!=this.poaCount2){
      this.isPropertyDetailsVerified='';
    }

    if(this.acknowledgmentCall=='false'){
      this.acknowledgmentCall='';
    }

console.log('acknoledgement call');
console.log(this.acknowledgmentCall);
    this.propertyDetailsDto.isPersonalDetailsVerified=this.isPersonalDetailsVerified;
    this.propertyDetailsDto.isPOADetailsVerified=this.isPOADetailsVerified;
    this.propertyDetailsDto.isAcknowledgementCall=this.acknowledgmentCall;
    this.propertyDetailsDto.isPropertyDetailsVerified=this.isPropertyDetailsVerified;

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
  selectPassport(event):string {
    console.log('event');
    console.log(event);

    if (event.target.files && event.target.files[0]) {
     var FileSize = event.target.files[0].size / 1024 / 1024; // in MB
      if (FileSize > 2) {
          this.mytoastr.Error('File size exceeds 2 MB');
          this.mytoastr.Warning('Accepted file size less than 2Mb');
          return 'File size excced !'
      }}

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
      this.ownerPassportCopy = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    this.selectedPassport = event.target.files;
    this.passportFile=this.selectedPassport.item(0);
    // this.ownerDto.passportCopyUpload=this.passportFile.name;
    // this.passportcopyuploadPath=''+this.token.getImagepath()+'propertyId-'+this.token.getPropertyId()+'/'+this.ownerDto.passportCopyUpload;
    event.srcElement.value = null;
    this.saveImage('passportCopy',this.passportFile);

  }
  selectIdCopy(event):string {

    if (event.target.files && event.target.files[0]) {
      var FileSize = event.target.files[0].size / 1024 / 1024; // in MB
       if (FileSize > 2) {
           this.mytoastr.Error('File size exceeds 2 MB');
          //  this.myToast.Warning('Accepted file size less than 2Mb');
           return 'File size excced !'
       }}

     if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.ownerIdCopy = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);

    }
    this.selectedIdCopy = event.target.files;
    this.idCopyFile=this.selectedIdCopy.item(0);
    // this.ownerDto.scannedIdCopy=this.idCopyFile.name;
    // console.log(this.idCopyFile);
    // this.idcopyuploadPath=''+this.token.getImagepath()+'propertyId-'+this.ownerDto.propertyId+'/'+this.ownerDto.scannedIdCopy;
     event.srcElement.value = null;

     this.saveImage('idCopy',this.idCopyFile);
    return "";
 }
 selectScannedPoa(event) {

  if (event.target.files && event.target.files[0]) {
    var FileSize = event.target.files[0].size / 1024 / 1024; // in MB
     if (FileSize > 2) {
         this.mytoastr.Error('File size exceeds 2 MB');
        //  this.myToast.Warning('Accepted file size less than 2Mb');
         return 'File size excced !'
     }}

     if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.poaNotorizedCopy = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
      this.selectedScannedPoa = event.target.files;
      this.scannedNotorizedPoaFile=this.selectedScannedPoa.item(0);
      // this.ownerDto.scannedNotorizedCopy=this.scannedNotorizedPoaFile.name;
      // this.notorizedcopyPath=''+this.token.getImagepath()+'propertyId-'+this.ownerDto.propertyId+'/'+this.ownerDto.scannedIdCopy;
      event.srcElement.value = null;
      this.saveImage('scannedNotorizedCopy',this.scannedNotorizedPoaFile);

}
selectFloorPlan(event):string {

  if (event.target.files && event.target.files[0]) {
    var FileSize = event.target.files[0].size / 1024 / 1024; // in MB
     if (FileSize > 2) {
         this.mytoastr.Error('File size exceeds 2 MB');
        //  this.myToast.Warning('Accepted file size less than 2Mb');
         return 'File size excced !'
     }}

     if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.floorPlanCopy= (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
      this.selectedFloorPlan = event.target.files;
      this.scannedFloorPlanFile=this.selectedFloorPlan.item(0);
      // this.propertyDetailsDto.floorplanupload=this.scannedFloorPlanFile.name;
    // this.titledeeduploadPath=''+this.token.getImagepath()+'propertyId-'+this.propertyDetailsDto.propertyId+'/'+this.propertyDetailsDto.scannedTitleDeed;
      // this.floorplanPath=''+this.token.getImagepath()+'propertyId-'+this.propertyDetailsDto.propertyId+'/'+this.propertyDetailsDto.floorplanupload;
      event.srcElement.value = null;
      this.saveImage('floorPlanCopy',this.scannedFloorPlanFile);

}
 selectScannedTitleDeed(event) {
  if (event.target.files && event.target.files[0]) {
    var FileSize = event.target.files[0].size / 1024 / 1024; // in MB
     if (FileSize > 2) {
         this.mytoastr.Error('File size exceeds 2 MB');
        //  this.myToast.Warning('Accepted file size less than 2Mb');
         return 'File size excced !'
     }}

     if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.titleDeedCopy = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
   this.selectedScannedTitleDeed = event.target.files;
   this.scannedTitleDeedFile=this.selectedScannedTitleDeed.item(0);
   event.srcElement.value = null;
   this.saveImage('titleDeedCopy',this.scannedTitleDeedFile);

}



scannedTenantContract(event):string {

  if (event.target.files && event.target.files[0]) {
    var FileSize = event.target.files[0].size / 1024 / 1024; // in MB
     if (FileSize > 2) {
         this.mytoastr.Error('File size exceeds 2 MB');
        //  this.myToast.Warning('Accepted file size less than 2Mb');
         return 'File size excced !'
     }}

     if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.tenancyContractCopy = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
      this.selectedscannedTenentContract = event.target.files;
      this.scannedTenentContractFile=this.selectedscannedTenentContract.item(0);
      // this.propertyRentalDetailDTO.tenancyContractUpload=this.scannedTenentContractFile.name;
      // this.scannedTenantContractUploadPath=''+this.token.getImagepath()+'propertyId-'+this.propertyRentalDetailDTO.propertyId+'/'+this.propertyRentalDetailDTO.tenancyContractUpload;
      event.srcElement.value = null;
      this.saveImage('tenancyContractCopy',this.scannedTenentContractFile);
}


selectMorgageNoc(event) {

  if (event.target.files && event.target.files[0]) {
    var FileSize = event.target.files[0].size / 1024 / 1024; // in MB
     if (FileSize > 2) {
        //  this.mytoastr.Error('File size exceeds 2 MB');
         this.mytoastr.Warning('Accepted file size less than 2Mb');
         return 'File size excced !'
     }}

     if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.morgageNocCopy = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
      this.selectedMorgageNoc = event.target.files;
      this.morgageNocFile=this.selectedMorgageNoc.item(0);
      // this.propertyFinancialDTO.morgageNoc=this.morgageNocFile.name;
      // this.scannednocuploadPath=''+this.token.getImagepath()+'propertyId-'+this.propertyFinancialDTO.propertyId+'/'+this.propertyFinancialDTO.morgageNoc;
      event.srcElement.value = null;
      this.saveImage('morgageNocCopy',this.morgageNocFile);
    }

selectValuationReport(event) {
this.valuationReportPath='Document Uploaded';
console.log('Document Uploaded');

}


getRole():string{
  // console.log(this.propertyDetailsDto);
  return this.token.getUserRole();
}


ownerVerified(isVerified:string):void{
  window.sessionStorage.removeItem('AuthToken');
  this.authService.attemptAuth().subscribe(
    data => {
      this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
      if(this.token.getToken()!=null){
        this.ownerDto.isPersonalDetailsVerified=isVerified;
        this.ownerDto.userName=this.token.getAdminuserName();
        this.ownerDto.propertyId=this.currentPropertyId;
        Array.from(this.currentProperty.propertyactivitylogses).forEach(obj2 => {
          var obj=null;
          obj=JSON.parse(JSON.stringify(obj2));
          if(obj.taskType=='system'){
            this.propertyActivityLogs=obj;
          }
    });//end of for each

    if(this.passportFile){
     console.log('Inside passport file');
      this.ownerDto.passportCopyUpload= this.passportCopyFileName;
      this.passportFile=null;
    }
    if(this.idCopyFile){
      console.log('Inside IDcopy  file');
      this.ownerDto.scannedIdCopy=this.idCopyFileName;
      this.idCopyFile=null;
      }
    if(this.scannedNotorizedPoaFile){
        console.log('Inside poaimage file');
        this.ownerDto.scannedNotorizedCopy=this.scannedNotorizedCopyFileName;
        this.scannedNotorizedPoaFile=null;
    }
        this.sellerService.updateOwner(this.ownerDto).subscribe(
          data=>{
               console.log('Owner Verified Successfully');
                if(isVerified=='true'){
                  this.systemTask(this.ownerDto.propertyId,this.ownerDto.ownerType+' '+this.ownerDto.propertySellerId+' is Verifed');
                  this.mytoastr.Success('',this.ownerDto.ownerType+' Verified Successfully');
                }
                else{
                  this.mytoastr.Success('',this.ownerDto.ownerType+' Update Successfully');
                }

                this.editOwner=false;
                this.editPOA=false;

                this.getCompleteProperties();
              });



      }//end of if of token condition
    }//end of data of token
  );//end of subscription of token
}//end of owner verified method

  ownerVerified1(isVerified:string): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
          this.ownerDto.isPersonalDetailsVerified=isVerified;
          this.ownerDto.userName=this.token.getAdminuserName();
          this.ownerDto.propertyId=this.currentPropertyId;
          // this.checklistData(this.currentProperty);
         this.sellerService.updateOwner(this.ownerDto).subscribe(
           data=>{
             this.currentOwner=data;
            //  if(isVerified=='true'){
                // this.mytoastr.Success('',this.ownerDto.ownerType+' Verified Successfully');
                console.log('Owner Verified Successfully');
                  Array.from(this.currentProperty.propertyactivitylogses).forEach(obj2 => {
                    var obj=null;
                    obj=JSON.parse(JSON.stringify(obj2));
                    if(obj.taskType=='system'){
                      this.propertyActivityLogs=obj;
                    }
              });//end of for each

//code start here
          this.sellerService.saveDocument('/propertyId-'+this.token.getPropertyId()+'/',data+',Sowner-passport,'+this.currentPropertyId,this.token.getAdminuserName(),this.passportFile).subscribe(
                            data2=>{
                              console.log(data2);
                                  if(data2.type==3){
                                     console.log('type 3');
                                    this.ownerDto.passportCopyUpload= data2.partialText;
                        this.sellerService.saveDocument('/propertyId-'+this.token.getPropertyId()+'/',data+',Sowner-IdCopy'+this.currentPropertyId,this.token.getAdminuserName(),this.idCopyFile).subscribe(
                                      data3=>{
                                        // console.log(data3);
                                            if(data3.type==3){
                                      if(this.ownerDto.ownerType=='owner'){

                                              this.ownerDto.scannedIdCopy= data3.partialText;
                                              this.sellerService.updateOwner(this.ownerDto).subscribe(
                                                data5=>{
                                                  console.log('Update owner');
                                                  console.log(data5);
                                                  this.systemTask(this.ownerDto.propertyId,this.ownerDto.ownerType+' '+this.ownerDto.propertySellerId+' is Verifed');

                                                  if(isVerified=='true'){
                                                    this.mytoastr.Success('',this.ownerDto.ownerType+' Verified Successfully');
                                                  }
                                                  else{
                                                    this.mytoastr.Success('',this.ownerDto.ownerType+' Update Successfully');
                                                  }
                                                }//end of update owner data
                                              );//end of update owner subscription
                                      }//end of if of owner and poa condition
                                      else if(this.ownerDto.ownerType=='poa'){
                                        this.ownerDto.scannedIdCopy= data3.partialText;
                                        this.sellerService.saveDocument('/propertyId-'+this.token.getPropertyId()+'/',data+'-Spoa-scannedNotorizedPoaCopy'+this.currentPropertyId,this.token.getAdminuserName(),this.scannedNotorizedPoaFile).subscribe(
                                          poaimgdata=>{

                                           if(poaimgdata.type==3){
                                            console.log('POA Image');
                                            console.log(poaimgdata);
                                           }
//                                             this.ownerDto.scannedNotorizedCopy= poaimgdata.partialText;
//                                             this.ownerDto.userName=this.token.getAdminuserName();
//                                             this.ownerDto.isPersonalDetailsVerified='false';
// //update owner code start
//                                         this.sellerService.updateOwner(this.ownerDto).subscribe(
//                                           data51=>{
//                                             console.log('Inside poa');
//                                             console.log(data51);
//                                             this.systemTask(this.ownerDto.propertyId,this.ownerDto.ownerType+' '+this.ownerDto.propertySellerId+' is Verifed');

//                                             if(isVerified=='true'){
//                                               this.mytoastr.Success('',this.ownerDto.ownerType+' Verified Successfully');
//                                             }
//                                             else{
//                                               this.mytoastr.Success('',this.ownerDto.ownerType+' Update Successfully');
//                                             }
//                                           }//end of update owner data
//                                         );//end of update owner subscription

//update owner code ends

                                          }//end of poa img data
                                        );//end of poa img subscription
                                      }//end of else if
                                              }//end of if checking type==3 of data3
                                          } //end of IdCopy Data
                                    );//end of IdCopy subscription
                                  }//end of if  checking type ==3 of data 2

                                }//end of data2
                          );//end of Passport subscription


              //code end here

                  // }//end of task
              // else{
              //   this.mytoastr.Success('',this.ownerDto.ownerType+' Update Successfully');
              //       console.log('owner unverified Successfully');
              // }
              this.getCompleteProperties();
           }//end of
         );
        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser


  saveImage(imageOf:string,file:File): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
          // var randomString = require('random-string');
          // var x = randomString(); // x contains now a random String with the length of 8
          this.sellerService.saveDocument('/propertyId-'+this.currentPropertyId+'/','-'+imageOf+'-'+this.currentPropertyId+'-'+Math.random().toString(12),this.token.getAdminuserName(),file).subscribe(
            image=>{
                   if(image.type==3){
                         this.mytoastr.Success('','Image Saved Successfully');

                         if(imageOf=='passportCopy'){
                           console.log(image);
                              this.passportCopyFileName=image.partialText;
                         }
                         else if(imageOf=='idCopy'){
                          console.log(image);
                             this.idCopyFileName=image.partialText;
                         }
                         else if(imageOf=='scannedNotorizedCopy'){
                          console.log(image);
                          this.scannedNotorizedCopyFileName=image.partialText;
                         }
                         else if(imageOf=='titleDeedCopy'){
                          console.log(image);
                          this.titleDeedFileName=image.partialText;
                         }
                         else if(imageOf=='floorPlanCopy'){
                          console.log(image);
                          this.floorPlanFileName=image.partialText;
                         }
                         else if(imageOf=='tenancyContractCopy'){
                          console.log(image);
                          this.tenancyContractFileName=image.partialText;
                         }
                         else if(imageOf=='morgageNocCopy'){
                          console.log(image);
                          this.morgageNocFileName=image.partialText;
                         }

                        }//end of if
            }//end of image
          );//end of image subscription

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
          if(this.morgageNocFile){
               this.propertyFinancialDTO.morgageNoc=this.morgageNocFileName;
               this.morgageNocFile=null;
          }
          Array.from(this.currentProperty.propertyactivitylogses).forEach(obj2 => {
            var obj=null;
            obj=JSON.parse(JSON.stringify(obj2));
            if(obj.taskType=='system'){
              this.propertyActivityLogs=obj;
            }
      });//end of for each
          this.propertyService.updatePropertyFinancials(this.propertyFinancialDTO).subscribe(
           data=>{
              if(isVerified=='true'){
                this.systemTask(this.currentPropertyId,'propertyId'+this.currentPropertyId +' Morgage Details is Verifed');
                this.mytoastr.Success('','Morgage Verified Successfully');
              }
              else{
                this.mytoastr.Success('','Morgage Update Successfully');
              }
                this.getCompleteProperties();
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

          if(this.scannedTenentContractFile){
            this.propertyRentalDetailDTO.tenancyContractUpload=this.tenancyContractFileName;
            this.scannedTenentContractFile=null;
          }
          Array.from(this.currentProperty.propertyactivitylogses).forEach(obj2 => {
            var obj=null;
            obj=JSON.parse(JSON.stringify(obj2));
            if(obj.taskType=='system'){
              this.propertyActivityLogs=obj;
            }
      });//end of for each
          this.propertyService.updatePropertyRental(this.propertyRentalDetailDTO).subscribe(
           data=>{

            if(isVerified=='true'){
              this.systemTask(this.currentPropertyId,'propertyId'+this.currentPropertyId +' Rental Details is Verifed');
              this.mytoastr.Success('','Rental Details Verified Successfully');
            }
            else{
              this.mytoastr.Success('','Rental Details Update Successfully');
            }
                     this.propertyRentalDetailDTO=new PropertyRentalDetailDTO();
                     this.getCompleteProperties();
                     this.refreshDto();
           }//end of
         );
        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser

  propertyDetailsVerified(isVerified:string,checkList:string){
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){

          // if(checkList=='false'){

          // }
          // else if(checkList=='true'){
          //   console.log('checklist confirmed true');
          //   // this.checklistData(this.currentProperty);
          // }

          this.propertyDetailsDto.isPropertyDetailsVerified=isVerified;
          this.propertyDetailsDto.sellerUserName=this.propertyDetailsDto.sellerUserName;
          this.propertyDetailsDto.userName=this.token.getAdminuserName();
          this.propertyDetailsDto.propertyId=this.currentPropertyId;
          if(this.scannedFloorPlanFile){
            console.log('inside floor plan');
            this.propertyDetailsDto.floorPlanUpload=this.floorPlanFileName;
            this.scannedFloorPlanFile=null;
          }
          if(this.scannedTitleDeedFile){
            console.log('inside title deed file');
            this.propertyDetailsDto.scannedTitleDeed=this.titleDeedFileName;
            this.scannedTitleDeedFile=null;
          }
          Array.from(this.currentProperty.propertyactivitylogses).forEach(obj2 => {
            var obj=null;
            obj=JSON.parse(JSON.stringify(obj2));
            if(obj.taskType=='system'){
              this.propertyActivityLogs=obj;
            }
      });//end of for each

      this.propertyService.updateProperty(this.propertyDetailsDto).subscribe(
        propdata=>{
          console.log(propdata);
          if(isVerified=='true'){
             this.mytoastr.Info('Status','Property Details Verified Successfully');
             this.systemTask(this.propertyDetailsDto.propertyId,'Property Verifed Successfully');
            }else{
             this.mytoastr.Info('Status','Property Details Update Successfully');
            }

             this.getCompleteProperties();
          });//end of update property subscription

        }//end of if of token
      });//end of save token
      // this.refreshPropertyDetails();
  }
  propertyDetailsVerified1(isVerified:string,checkList:string): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        if(this.token.getToken()!=null){
          if(checkList=='false'){
            this.propertyDetailsDto.isPropertyDetailsVerified=isVerified;
          }
          else if(checkList=='true'){
            console.log('checklist confirmed true');
            // this.checklistData(this.currentProperty);
          }
          console.log(this.propertyDetailsDto.isPropertyDetailsVerified);

          this.propertyDetailsDto.sellerUserName=this.propertyDetailsDto.sellerUserName;
          this.propertyDetailsDto.userName=this.token.getAdminuserName();
          this.propertyDetailsDto.propertyId=this.currentPropertyId;
          Array.from(this.currentProperty.propertyactivitylogses).forEach(obj2 => {
            var obj=null;
            obj=JSON.parse(JSON.stringify(obj2));
            if(obj.taskType=='system'){
              this.propertyActivityLogs=obj;
            }
      });//end of for each
          this.sellerService.saveDocument('/propertyId-'+this.currentPropertyId+'/','S-titleDeedCopy'+this.currentPropertyId,this.propertyDetailsDto.userName,this.scannedTitleDeedFile).subscribe(imageData=>{
            console.log(imageData);
            if(imageData.type==3){
            this.propertyDetailsDto.scannedTitleDeed=imageData.partialText;
            this.propertyService.updateProperty(this.propertyDetailsDto).subscribe(
              data=>{
                if(isVerified=='true'){
                   this.mytoastr.Info('Status','Property Details Verified Successfully');
                   this.systemTask(this.propertyDetailsDto.propertyId,'Property Verifed Successfully');

                  }else{
                   this.mytoastr.Info('Status','Property Details Update Successfully');

                  }
                  //  this.propertyDetailsDto=new PropertyDetailsDto();
                   this.refreshDto();
                   this.getCompleteProperties();

              }//end of
            );
          }//end of if of imagetype
          else if(imageData=="Data"){
            this.propertyService.updateProperty(this.propertyDetailsDto).subscribe(
              data=>{
                if(isVerified=='true'){
                   this.mytoastr.Info('Status','Property Details Verified Successfully');
                   this.systemTask(this.propertyDetailsDto.propertyId,'Property Verifed Successfully');

                  }else{
                   this.mytoastr.Info('Status','Property Details Update Successfully');
                  }
                  //  this.propertyDetailsDto=new PropertyDetailsDto();
                   this.refreshDto();
                   this.getCompleteProperties();

              }//end of
            );
          }//end of else if
          });

        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser


  systemTask(propertyId:number,taskStatus:string):void{
    this.propertyActivityLogs.propertyId=propertyId;
    this.propertyActivityLogs.taskStatus=taskStatus
    this.propertyActivityLogs.taskCompleteDate=new Date();//current date
    this.propertyActivityLogs.adminUserName=this.token.getAdminuserName();
    this.verificationService.createTask(this.propertyActivityLogs).subscribe(
      data1=>{
        console.log(data1);
                  //  this.mytoastr.Success('',data1);
                  //  this.ownerDto=new OwnerDetails();
                  //  this.propertyDetailsDto=new PropertyDetailsDto();
                  //  this.getCompleteProperties();
                  //  this.refreshDto();
            }//end of data of create task
   );//end of subscription of create task
  }

  refreshPropertyDetails():void{
    this.propertyService.getPropertyById(this.currentPropertyId,this.token.getAdminuserName()).subscribe(
      data=>{
        // this.refreshDto();
        this.currentProperty=data;


      }
    );
  }

  refreshDto():void{
    //  this.images=null;
    //  this.ownerDto=new OwnerDetails();
    //  this.propertyDetailsDto=new PropertyDetailsDto();
    //  this.propertyFinancialDTO=new PropertyFinancialDTO();
    //  this.propertyRentalDetailDTO=new PropertyRentalDetailDTO();
     this.editPropertyDetails=false;
     this.editFinancialDetails=false;
     this.editRentalDetails=false;
     this.editOwner=false;
     this.editPOA=false;
     this.images=[];
    //  this.ownerPassportCopy='';
    //  this.ownerIdCopy='';

     this.idCopyFileName='';
     this.passportCopyFileName='';
     this.scannedNotorizedCopyFileName='';

     this.poaPassportCopy='';
     this.poaIdCopy='';
     this.poaNotorizedCopy='';
     this.ownerIdCopy='';
     this.ownerPassportCopy='';
     this.titleDeedCopy='';
     this.morgageNocCopy='';
     this.tenancyContractCopy='';


     this.notorizedcopyPath='';
    //  this.getCompleteProperties();
  }//end of refresh dto

  setCurrentProperty(prop:any){
    this.currentPropertyId=prop.propertyId;
    this.currentProperty=prop;

    console.log('current Property');
    console.log(this.currentProperty);
    console.log(this.currentPropertySystemLogs);
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


  getOwnerDetails(data:any):void{
   console.log(data);
   this.ownerDto=new OwnerDetails();
   this.ownerPassportCopy='';
   this.ownerIdCopy='';

   if(data.ownerType=='owner'){
    console.log('in owner details');
      this.ownerDto=data;
      this.ownerPassportCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.ownerDto.passportCopyUpload;
      this.ownerIdCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.ownerDto.scannedIdCopy;
      this.editOwner=false;
      this.mytoastr.Info('','Owner Data loaded Successfully');
   }
  }
  getPOADetails(data:any):void{
    console.log(' POA Clicked!!');
    this.ownerDto=new OwnerDetails();
   this.ownerPassportCopy='';
   this.ownerIdCopy='';
   this.poaNotorizedCopy='';

    if(data.ownerType=='poa'){
      this.ownerDto=data;
      this.ownerPassportCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.ownerDto.passportCopyUpload;
      this.ownerIdCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.ownerDto.scannedIdCopy;
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
    this.titleDeedCopy='';
    this.floorPlanCopy='';
    this.propertyDetailsDto=new PropertyDetailsDto();
    console.log(' Property Clicked!!');
    this.propertyDetailsDto=data;
    this.titleDeedCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.propertyDetailsDto.scannedTitleDeed;
    this.floorPlanCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.propertyDetailsDto.floorPlanUpload;
    this.mytoastr.Info('','Property Details loaded Successfully');
   }

   getPropertyRentalDetails(data:any):void{
    console.log(' Property Clicked!!');
    this.propertyRentalDetailDTO=data;
    this.tenancyContractCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.propertyRentalDetailDTO.tenancyContractUpload;
    this.mytoastr.Info('','Property Rental Details loaded Successfully');
   }

   getPropertyFinancialDetails(data:any):void{
    console.log(' Property Clicked!!');
    this.propertyFinancialDTO=data;
    this.morgageNocCopy=''+this.token.getImagepath()+'propertyId-'+this.currentProperty.propertyId+'/'+this.propertyFinancialDTO.morgageNoc;
    this.mytoastr.Info('','Property Financial Details loaded Successfully');
   }

   getpersonalinfoDetails(data:any):void{
    console.log(' Personal info Clicked!!');
    this.personalinfoDTO=data;
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

    this.bankList=[
      'Abu Dhabi Commercial Bank',
      'Abu Dhabi Islamic Bank',
      'Ajman Bank',
      'Al Ahli Bank of Kuwait',
      'Al Hilal Bank',
      'Al Khaliji (France) S. A.',
      'Al Masraf',
      'Arab African International Bank',
      'Arab Bank PLC',
      'Arab Emirates Investment Bank',
      'Bank Meli Iran',
      'Bank of Baroda',
      'Bank of Sharjah',
      'Bank Saderat Iran',
      'Barclays',
      'Blom Bank France',
      'BNP Paribas',
      'Citibank',
      'Commercial Bank International',
      'Commercial Bank of Dubai',
      'Credit Agricole - Corporate and Investment Bank',
      'Doha Bank',
      'Dubai Bank',
      'Dubai Islamic Bank',
      'El Nilein Bank',
      'Emirates Bank International / meBank',
      'Emirates Islamic Bank',
      'Emirates NBD Bank',
      'First Gulf Bank',
      'Habib Bank Ltd.',
      'HSBC Bank Middle East',
      'Invest Bank',
      'Janata Bank',
      'Lloyds TSB Bank',
      'Mashreq Bank',
      'National Bank of Abu Dhabi',
      'National Bank of Bahrain',
      'National Bank of Fujairah',
      'National Bank of Kuwait.',
      'National Bank of Oman',
      'National Bank of Ras Al Khaimah (RAKBank)',
      'National Bank of Sharjah',
      'National Bank of Umm Al Quwain',
      'Noor Islamic Bank',
      'Rafidain Bank',
      'RAKBANK',
      'Royal Bank of Scotland (RBS) (formerly ABN Amro)',
      'SAMBA',
      'Sharjah Islamic Bank',
      'Standard Chartered Bank',
      'The Royal Bank of Scotland N.V.',
      'Union National Bank',
      'United Arab Bank',
      'United Bank Limited',
      'Other'
     ];
     this.paymentScheduleList=[
       '1',
       '2',
       '3',
       '4',
       '5',
       '6',
       '7',
       '8',
       '9',
       '10',
       '11',
       '12',
       '13',
       '14',
       '15',
       '16',
       '17',
       '18',
       '19',
       '20',
       '21',
       '22',
       '23',
       '24',
       '25',
       '26',
       '27',
       '28',
       '29',
       '30'
      ];


  }//end of oninit



  getCompleteProperties(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        // console.log(data);
        if(this.token.getToken()!=null){
            this.propertyService.getCompleteProperties(this.token.getAdminuserName()).subscribe(
                   completeProeprtiesData=>{

if(this.currentPropertyId){
  Array.from(completeProeprtiesData).forEach(obj2 => {
    var obj=null;
    obj=JSON.parse(JSON.stringify(obj2));
    if(obj.propertyId==this.currentPropertyId){
      this.currentProperty=obj;
    }
});//end of for each
}

                      console.log('Output of service call');
                      this.completePropertyArr=completeProeprtiesData;
                      this.dataSource.data = completeProeprtiesData;
                      console.log(this.completePropertyArr);
                      this.refreshDto();

                            // this.router.navigate(['adminverificationhome']);
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

sentEmail():void{
  console.log('email sent data');
      console.log(this.token.getuserName());
  window.sessionStorage.removeItem('AuthToken');
  this.authService.attemptAuth().subscribe(
    data => {
      this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
      console.log(data);
      if(this.token.getToken()!=null){
        console.log(this.body);
        this.verificationDto.data=this.body;
        this.verificationDto.userName=this.token.getAdminuserName();
        this.verificationDto.role=this.token.getUserRole();
        this.verificationDto.userName=this.token.getuserName();
        this.verificationDto.adminUser=this.token.getAdminuserName();
        this.verificationDto.subject='Chiragh Verification Departement Changes Request';
        this.verificationService.sentEmail1(this.verificationDto).subscribe(
          data=>{
                    console.log(data);
          }//end of data
        );
      }//end of if

   }//end of outer data predicate
  );//end of outer subscription

}//end of onRegister
//

//task management service calls start from here

createNewTask(propertyId:number,taskStatus:string): void {
  window.sessionStorage.removeItem('AuthToken');
  this.authService.attemptAuth().subscribe(
    data => {
      this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
      if(this.token.getToken()!=null){
             this.verificationService.getSystemGeneratedTaskByPropertyId(propertyId).subscribe(
                task=>{
                              console.log(task);
                             this.propertyActivityLogs=task;
                             this.propertyActivityLogs.taskStatus=taskStatus;
                             this.propertyActivityLogs.taskCompleteDate=new Date();//current date
             this.verificationService.createTask(this.propertyActivityLogs).subscribe(
                data1=>{
                             this.mytoastr.Success('',data1);
                      }//end of data of create task
             );//end of subscription of create task
                }//end of task
             );//end of get system generated task  subscription
      }//end of if
   }//end of outer data predicate
  );//end of outer subscription
}//end method

CreateUserTask(): void {
  window.sessionStorage.removeItem('AuthToken');
  this.authService.attemptAuth().subscribe(
    data => {
      this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
      if(this.token.getToken()!=null){

        if(this.currentPropertyId)
        this.userPropertyActivityLogs.propertyId=this.currentPropertyId;

        this.userPropertyActivityLogs.taskType='user';
        this.userPropertyActivityLogs.adminUserName=this.token.getAdminuserName();
         this.verificationService.createTask(this.userPropertyActivityLogs).subscribe(
          data2=>{
                       this.mytoastr.Success('','New Task is Created Successfully');

                       if(this.getRole()=='VerificationHod'||this.getRole()=='ValuationHod'||this.getRole()=='BrokerageHod'){
                            this.getTask();
                       }//end of if
                       else{
                            console.log('inside task');
                            this.getTaskByPropertyId();
                       }
          }//end of data2
         );//end of create user task service
      }//end of if of token
      });//end of token service call
}//end method
getTaskByPropertyId(): void {
  window.sessionStorage.removeItem('AuthToken');
  this.authService.attemptAuth().subscribe(
    data => {
      this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
      if(this.token.getToken()!=null){
      this.verificationService.getTaskByPropertyId(this.currentPropertyId).subscribe(
         data2=>{
           console.log('Task By Property Id');
           console.log(data2);
            this.taskArr=data2;
            // console.log(this.taskArr);
         }
       );
      }//end of if of token
      });//end of token service call
}//end method
getTask(): void {
  window.sessionStorage.removeItem('AuthToken');
  this.authService.attemptAuth().subscribe(
    data => {
      this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
      if(this.token.getToken()!=null){
      this.verificationService.getUserGeneratedTask().subscribe(
         data2=>{
            this.taskArr=data2;
            console.log(this.taskArr);
         }
       );
      }//end of if of token
      });//end of token service call
}//end method
getTaskByUserName(): void {
  window.sessionStorage.removeItem('AuthToken');
  this.authService.attemptAuth().subscribe(
    data => {
      this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
      if(this.token.getToken()!=null){
      this.verificationService.getSystemGeneratedTaskByUserName(this.token.getAdminuserName()).subscribe(
         data2=>{
            this.taskArr=data2;
            console.log(this.taskArr);

         }
       );
      }//end of if of token
      });//end of token service call
}//end method

}//end of class
