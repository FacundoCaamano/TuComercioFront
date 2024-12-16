import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private authService:AuthService, private notificationService:NotificationService){
  }
  controlName= new FormControl('',Validators.required)
  controlEmail= new FormControl<string>('',Validators.required)
  controlPassword = new FormControl<string>('',Validators.required)
  repeatPassword = new FormControl<string>('',Validators.required)


  formRegister = new FormGroup({
    username: this.controlName,
    email:this.controlEmail,
    password: this.controlPassword,
    repeatPassword: this.repeatPassword
  })


  register(){
    if(this.formRegister.invalid){
      this.formRegister.markAllAsTouched()
    }
    else{
      const userData = {
        username:this.formRegister.value.username as string, 
        email: this.formRegister.value.email as string,
        password: this.formRegister.value.password as string
      }
      if(this.formRegister.value.password == this.formRegister.value.repeatPassword) 
        this.authService.register(userData.username,userData.email,userData.password)
    }
  }
  notificatinPush(){
   
    this.notificationService.addNotification('el usuario se creo','success')
  }
  notificatinPushErr(){
    
    this.notificationService.addNotification('el usuario no se creo','error')
  }
}
