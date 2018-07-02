import { TokenStorage } from './../../core/token.storage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private tokenService:TokenStorage) { }
  userName:string;
  ngOnInit() {
    if(this.tokenService.getAdminuserName()!=null)
    this.userName=this.tokenService.getAdminuserName();
  }

}
