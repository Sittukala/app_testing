import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted : boolean = false
  constructor(private authService : AuthenticationService, private route : Router ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

  }

  ngOnInit() {

   
}

submit(){  

this.submitted = true
  if(this.loginForm.valid){
    console.log(this.loginForm.value)
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).pipe(first())
    .subscribe(
        user => {
            console.log('user',user)
            this.route.navigate(['/dashboard' , user]);
        },
    )}

}
}