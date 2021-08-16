import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.model';
import { LocalStorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  users: User[] = [];
  wrongValues: boolean = false;
  loginForm: any;

  constructor(private storage: LocalStorageService, private route: Router, private userService: UserService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const email = this.storage.get('currentUser');
    if (email) {
      this.login(email);
    }
  }
  email() {
    return this.loginForm.get('email') as FormControl;
  }
  password() {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit(): void {

    if (this.loginForm.valid) {
      this.wrongValues = true;
      const users = this.userService.getUsers();
      users.map(item => {
        if (item.email === this.email().value && item.password === this.password().value) {
          this.login(item.email);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  login(email: string): void {
    this.wrongValues = false;
    this.storage.set('currentUser', email);
    this.route.navigate(['/canvas']);
  }
}