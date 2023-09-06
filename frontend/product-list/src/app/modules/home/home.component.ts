import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  signupForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  onSubmitLoginForm(): void {
    console.log("DADOS DO FORMULARIO", this.loginForm.value);
  }

  onSubmitSignupForm(): void {
    if(this.signupForm.value && this.signupForm.valid) {
      this.userService.signupUser(
        this.signupForm.value as SignupUserRequest)
        .subscribe({
        next: (response) => {
          if(response) {
            alert('Usuario teste Criado')
          }
        },
        error: (err) => console.log(err)
      });
    }
  }
}
