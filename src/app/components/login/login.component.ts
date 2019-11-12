import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { AngularFire, FirebaseListObservable } from '@angular/fire';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router } from '@angular/router';
//======================Importar Servicios======================================
import { AuthService } from "../../services/auth.service";
//==============================================================================
import { Observable } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensaje:string; //Variable error de tipo srting
  loginForm : FormGroup; //Variable formulario como un FormGroup
  items: AngularFireObject<any[]>;
  email : string;
  password: string;


  constructor(private db: AngularFireDatabase, private auth : AuthService, private router: Router) {
    if(this.auth.checkSession()){
       this.router.navigate(['tienda'])
     }
  };

  ngOnInit() {
    this.email = " ";
    this.password = " ";
    if(this.auth.checkSession()){
      this.router.navigate( ['/tienda'])
    }
    this.loginForm = new FormGroup(
      {
        'email' : new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required),
      }
    )
  }

  checkLogin(){
    if(this.loginForm.valid){
      this.email = this.loginForm.value.email.toLowerCase().replace(/[^a-zA-Z 0-9.]+/g,'').replace(/\./g,'');
      this.password = this.loginForm.value.password;
      let loginUser = `/usuarios/${this.email}`
	  const user = this.db.object(loginUser).valueChanges();
	  user.subscribe(
	  data => {
        if(this.loginForm.value.email ===  data['email']){
  
          if (data['password'] == this.password){
			         
            this.mensaje = "Iniciando Sesión";
            sessionStorage.setItem("Session", this.loginForm.value.email);
            console.log(this.mensaje);
            this.router.navigate(['tienda']);
          }else{
            this.mensaje = 'Contraseña Incorrecta';
          }
        }else{
          this.mensaje = "El usuario " + this.loginForm.value.email + " no existe";
          console.log(this.mensaje)
        }
      }
	  );
    }
  }
}
