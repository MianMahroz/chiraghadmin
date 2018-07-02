import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {User} from './user.model';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';
import {TokenStorage} from '../core/token.storage';

@Component({
  selector: 'app-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns = ['userId', 'userName', 'userEmail'];
  dataSource = new MatTableDataSource<User>();
  constructor(private token:TokenStorage,private router: Router, private userService: UserService) {
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => {
        console.log(data);
        this.dataSource.data = data;
      }
    );
  }


  getServerSession():void{
    if(this.token.getToken()!=null){
      
      this.userService.getSessionUser().subscribe(
        data=>{
                console.log('Tomcat Session User:'+data);
        }
      );
    }
}//end of getSessionUser



}

