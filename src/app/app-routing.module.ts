import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './features/auth/register/register.component';

const routes: Routes = [{
  path:'login',
  component:LoginComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
