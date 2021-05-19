import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-head',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  userDisplayName : any;
  isLoggedin : any;
  
  constructor(private authenticationService : AuthenticateService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser != undefined) {
      console.log(currentUser);
      this.userDisplayName = currentUser.username;
      this.isLoggedin = true;
    }
    else {
      this.isLoggedin = false;
    }
 
  }

  ngDoCheck (){
    console.log("hgshgs");
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser != undefined) {
      console.log(currentUser);
      this.userDisplayName = currentUser.username;
      this.isLoggedin = true;
    }
  }

  logout() {
    this.authenticationService.logout();
    this.isLoggedin = false;
    this.router.navigate(['home']);
  }

}
