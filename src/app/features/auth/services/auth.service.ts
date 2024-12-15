import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL=environment.backend

  constructor(private http:HttpClient) { }

  register(username:string,email:string,password:string){
    this.http.post(this.URL + 'user-register',{username,email,password},{withCredentials:true}).subscribe({
      next:()=>{
        console.log('usuario creado');
        
      },
      error:(err)=>{
        console.log({message:'error en la peticion', err});
        
      },
      complete:()=>{
        console.log('peticion completa');
        
      }
    })
  }
}
