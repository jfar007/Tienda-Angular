import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //Inyectar los componentes de formularios
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2'; //Inyectar los componentes de angularfire2
//======================Importar Servicios====================================
import { AuthService} from "./services/auth.service";
import { TiendaService } from './services/tienda.service';
import { CarritoService } from './services/carrito.service'
//======================Importar Componentes====================================
import { AppComponent } from './app.component';
import { TiendaRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { DetalleProductoComponent } from './components/tienda/detalle-producto/detalle-producto.component';
//==============================================================================

export const firebaseConfig = {
  apiKey: "AIzaSyAwVJxLbR9rq2KpprlC9KjoJWbYsyjU7Oo",
  authDomain: "tienda-4abdd.firebaseapp.com",
  databaseURL: "https://tienda-4abdd.firebaseio.com",
  projectId: "tienda-4abdd",
  storageBucket: "tienda-4abdd.appspot.com",
  messagingSenderId: "1007427309461"
};

@NgModule({
  declarations: [
    AppComponent,
    BarraSuperiorComponent,
    LoginComponent,
    TiendaComponent,
    CarritoComponent,
    DetalleProductoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ReactiveFormsModule, //Inyectar el módulo ReactiveForms
    TiendaRoutingModule //Agregar el modulo TareasRouting para el manejo de las URL
  ],
  providers: [AuthService, TiendaService, CarritoService], //Inyectar los servicios TiendaDatabaseService y DatabaseService dentro de la aplicacion
  bootstrap: [AppComponent]
})
export class AppModule { }
