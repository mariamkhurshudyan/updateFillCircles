import { UserRegisterComponent } from './user/user-register/user-register.component'; 
import { UserLoginComponent } from './user/user-login/user-login.component'; 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasComponent } from './canvas/canvas.component';

const routes : Routes = [
  {path: '', component: UserLoginComponent},
  {path: 'register', component: UserRegisterComponent},
  {path: 'canvas', component: CanvasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRouterModule { }
