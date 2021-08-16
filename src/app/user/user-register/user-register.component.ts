import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComparePassword } from 'src/app/customvalidator.validator';
import { User } from 'src/app/interfaces/user.model';
import { LocalStorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerForm: any;
  users: User[] = [];
  submitted = false;
  constructor(private formBuilder: FormBuilder, private storage: LocalStorageService, private userService: UserService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: [ComparePassword('password', 'confirmPassword')],
    });
  }

  email() {
     return this.registerForm.get('email') as FormControl;
  }

  firstName() {
    return this.registerForm.get('firstName') as FormControl;
  }

  lastName() {
    return this.registerForm.get('lastName') as FormControl;
  }
  password() {
    return this.registerForm.get('password') as FormControl;
  }

  confirmPassword() {
    return this.registerForm.get('confirmPassword') as FormControl;
  }

  onSubmit(): void {    
    if (this.registerForm.valid) {
      this.users.push(new User(this.email().value, this.firstName().value, this.lastName().value, this.password().value));
      const usersStr = JSON.stringify(this.users);
      this.storage.set(this.userService.userListName, usersStr);
      this.storage.set('currentUser', this.email().value);
      this.router.navigate(['']);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }
}
