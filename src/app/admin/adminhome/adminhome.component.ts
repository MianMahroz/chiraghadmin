import { TokenStorage } from './../../core/token.storage';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterServiceService } from './../../toaster-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  constructor(private myToast:ToasterServiceService,private route:ActivatedRoute,private router: Router, private token: TokenStorage) { }


  ngOnInit() {
    if(this.token.getAdminuserName()==null){
      console.log('Invalid Session');
      this.myToast.Error('','Invalid Session!')
      this.router.navigate(['/adminsignin']);
      return "Invalid Session";
    }//end of if
  }

}
