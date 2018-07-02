import { TokenStorage } from './../../core/token.storage';
import { Router } from '@angular/router';
import { ToasterServiceService } from './../../toaster-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminsignout',
  templateUrl: './adminsignout.component.html',
  styleUrls: ['./adminsignout.component.css']
})
export class AdminsignoutComponent implements OnInit {

  constructor(private myToast:ToasterServiceService,private router:Router,private token:TokenStorage) { }

    ngOnInit() {
      this.token.signOut();
      this.myToast.Info('Status','Admin Sign Out Successfully');
      this.router.navigate(['/adminsignin']);
    }

}
