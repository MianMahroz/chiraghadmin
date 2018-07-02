import { registerDTO } from './../../Dto/registerDTO';
import { TokenStorage } from './../../core/token.storage';
import { AuthService } from './../../core/auth.service';
import { Router } from '@angular/router';
import { UserService } from './../../shared/user.service';
import { ToasterServiceService } from './../../toaster-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
  async ngAfterViewInit() {
		await this.loadScript('./../../assets/js/common.js');
	}

  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }
  constructor(private myToast:ToasterServiceService,private userService:UserService,private router: Router,  private authService: AuthService, private token: TokenStorage) { }
  registerdto=new registerDTO();
  public barLabel: string = "Password strength:";
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public strengthLabels = ['(Useless)', '(Weak)', '(Normal)', '(Strong)', '(Great!)'];
  terms=false;
  bar1=false;
  bar2=false;
  point:number;
  status:string;


  passwordFocus1(){
   this.bar1=true;
  }
  passwordFocus2(){
    this.bar1=false;
    this.bar2=true;
   }
  onRegisterAdmin(){
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        console.log(data);
        if(this.token.getToken()!=null){
          this.userService.register(this.registerdto).subscribe(
            data1=>{
              console.log(data1);
                   if(data1.msg=="User Created Successfully"){
                     this.myToast.Success('Status',data1.msg);
                    this.registerdto=new registerDTO();
                    this.router.navigate(['adminsignin']);
                    }//end of if
                }//end of inner data predicate
          );//end of inner subscription
        }//end of if

     }//end of outer data predicate
    );//end of outer subscription

  }//end of onRegister
  checkField(field:string):void{
    if(field!=null||field!='')
      {
           this.point=this.point+1;
      }
   }

   checkForm():string{
       this.checkField(this.registerdto.firstName);
       this.checkField(this.registerdto.lastName);
       this.checkField(this.registerdto.userName);
       this.checkField(this.registerdto.userPassword);
       this.checkField(this.registerdto.confirmPassword);
       this.checkField(this.registerdto.userEmail);
      //  this.checkField(this.registerdto.mobileOtpCode);
       this.checkField(this.registerdto.mobileNo);
       if(this.point==7){
       return 'true';
       }
       else{
            return 'false';
       }//end of else
   }//end of method



}
