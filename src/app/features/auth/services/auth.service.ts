import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/service/loader/loader.service';
import { NotificationService } from 'src/app/core/service/notification/notification.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL=environment.backend

  constructor(
    private http:HttpClient, 
    private notificationService:NotificationService,
    private router:Router,
    private loaderService: LoaderService
  ) { }

  register(username:string,email:string,password:string){
    this.loaderService.show()
    this.http.post(this.URL + 'auth/user-register',{username,email,password},{withCredentials:true}).subscribe({
      next:()=>{
        console.log('usuario creado');
        this.notificationService.addNotification('usuario creado','success')
        this.router.navigate(['home'])
        this.loaderService.hide()
      },
      error:(err)=>{
        console.log({message:'error en la peticion', err});
        this.notificationService.addNotification(err.error.message,'error')
        this.loaderService.hide()
      },
      complete:()=>{
        console.log('peticion completa');
        this.loaderService.hide()
      }
    })
  }

  login(email: string, password: string) {
    this.loaderService.show(); // Muestra el indicador de carga
    this.http.post<{ token: string }>(
      this.URL + 'auth/user-login', 
      { email, password },
      { withCredentials: true }
    ).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso');
        localStorage.setItem('token', response.token);
  
        this.notificationService.addNotification('Inicio de sesión exitoso', 'success');
        this.router.navigate(['home']);
        this.loaderService.hide();
      },
      error: (err) => {
        console.log({ message: 'Error en el inicio de sesión', err });
        this.notificationService.addNotification(err.error.message || 'Error en el inicio de sesión', 'error');
        this.loaderService.hide();
      },
      complete: () => {
        console.log('Petición completada');
        this.loaderService.hide();
      },
    });
  }
}
