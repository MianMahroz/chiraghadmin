import { AdminSellerDetailsComponent } from '../admin/admin-seller-details/admin-seller-details.component';
import { AdminsignoutComponent } from '../admin/adminsignout/adminsignout.component';
import { VerificationHomeComponent } from '../admin/verification-home/verification-home.component';
import { AdminsellerhomeComponent } from '../admin/adminsellerhome/adminsellerhome.component';
import { AdminhomeComponent } from '../admin/adminhome/adminhome.component';
import { AdminRegisterComponent } from '../admin/admin-register/admin-register.component';

import { AdminLoginComponent } from '../admin/admin-login/admin-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent} from '../user/user.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },

  //admin module path
  {path:'',component:AdminLoginComponent},
  {path:'adminsignin',component:AdminLoginComponent},
  {path:'adminsignup',component:AdminRegisterComponent},
  {path:'adminhome',component:AdminhomeComponent},
  {path:'adminsellerhome',component:AdminsellerhomeComponent},
  {path:'adminverificationhome',component:VerificationHomeComponent},
  {path:'adminsignout',component:AdminsignoutComponent},
  {path:'adminsellerdetails',component:AdminSellerDetailsComponent},
  {path:'adminverificationhome/:action',component:VerificationHomeComponent},
  {path:'adminverificationhome/:action/:propertyId',component:VerificationHomeComponent},
  {path:'adminvaluationhome',component:VerificationHomeComponent},
  {path:'adminbrokeragehome',component:VerificationHomeComponent},

];

@NgModule({
  imports: [
    // ,{useHash:true}
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
