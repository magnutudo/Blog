import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/components/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup

  constructor(private authService:AuthService,private route:Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }


  submit() {
    if (this.form.invalid) {
      return
    }
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken:false

    }
    this.authService.login(user).subscribe(() =>{
      this.route.navigate(['/admin','dashboard'])
    })
    this.form.reset()


  }


}
