import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from 'src/app/core/service/notification.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL=environment.backend

  constructor(private http:HttpClient, private notificationService:NotificationService) { }

  register(username:string,email:string,password:string){
    this.http.post(this.URL + 'user-register',{username,email,password},{withCredentials:true}).subscribe({
      next:()=>{
        console.log('usuario creado');
        this.notificationService.addNotification('usuario creado','success')
      },
      error:(err)=>{
        console.log({message:'error en la peticion', err});
        this.notificationService.addNotification('error al crear el usuario','error')
      },
      complete:()=>{
        console.log('peticion completa');
        
      }
    })
  }
}
