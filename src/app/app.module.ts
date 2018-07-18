import { VerificationService } from './shared/verification.service';
import { ToasterServiceService } from './toaster-service.service';
import { MaterialModule } from './material/material.component';
import { PaymentsService } from './shared/seller.payments.service';
import { AuctionService } from './shared/auction.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { AppComponent } from './app.component';
import {CustomMaterialModule} from './core/material.module';
import {FormsModule} from '@angular/forms';
import { UserComponent } from './user/user.component';
import {AppRoutingModule} from './core/app.routing.module';
import {ErrorDialogComponent} from './core/error-dialog.component';
import {UserService} from "./shared/user.service";
import { HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AuthService} from "./core/auth.service";
import { Interceptor} from "./core/inteceptor";
import { TokenStorage} from "./core/token.storage";
import { SellerService } from './shared/seller.service';
import { PropertyService } from './shared/property.service';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { CustomFormsModule } from 'ng4-validators';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import {ToastModule} from 'ng2-toastr';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin/admin-register/admin-register.component';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { AdminsellerhomeComponent } from './admin/adminsellerhome/adminsellerhome.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { VerificationHomeComponent } from './admin/verification-home/verification-home.component';
import { AdminsignoutComponent } from './admin/adminsignout/adminsignout.component';
import { AdminSellerDetailsComponent } from './admin/admin-seller-details/admin-seller-details.component';
import 'hammerjs';
import 'mousetrap';
import { MatTableModule } from '@angular/material';

import {ModalGalleryModule} from 'angular-modal-gallery';
import { ValuationHomeComponent } from './admin/valuation-home/valuation-home.component';
// enableProdMode();
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ErrorDialogComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
    AdminhomeComponent,
    AdminsellerhomeComponent,
    AdminHeaderComponent,
    VerificationHomeComponent,
    AdminsignoutComponent,
    AdminSellerDetailsComponent,
    ValuationHomeComponent,
  ],
  imports: [
    MatTableModule,
    ModalGalleryModule.forRoot(),
    ToastModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule, // required animations module
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    PasswordStrengthBarModule,
    CustomFormsModule,
    MaterialModule,


  ],
  entryComponents: [ErrorDialogComponent],
  providers: [VerificationService,ToasterServiceService,ErrorDialogComponent, PaymentsService,AuctionService,UserService,SellerService,AuthService, TokenStorage, TokenStorage,SellerService,PropertyService,
    {provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
