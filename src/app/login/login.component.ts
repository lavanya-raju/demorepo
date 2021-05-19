import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../service/authenticate.service';
import { delay, first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showModal : boolean;
  registerForm : FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;
  error = '';
  userjson :any;

  constructor(private formBuilder: FormBuilder,
    private authenticationService:AuthenticateService,
    private route: ActivatedRoute,
    private router: Router,
    private http :HttpClient ) { }

  show()
  {
    this.showModal = true; // Show-Hide Modal Check
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });

  this.authenticationService.logout();
  
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  
  }
  get f() { return this.registerForm.controls; }

  async onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    if(this.submitted)
    {
      this.showModal = false;
    }
    this.userjson = await this.http.get("assets/db.json")
    .pipe(delay(1000))
    .toPromise();
    console.log(this.userjson);

    this.authenticationService.login(this.f.username.value, this.f.password.value, this.userjson)
    .pipe(first())
    .subscribe(
        data => {
          if(data.Error){
            alert("Username or Password Incorrect");
            this.loading = false;
          }
          else {
            this.router.navigate(['home']);
          }
        }
    )
}

}
