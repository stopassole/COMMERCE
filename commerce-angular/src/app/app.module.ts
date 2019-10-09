import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { MenuComponent } from './components/menu/menu.component';

import { AngularFireModule } from "angularfire2";
import { LoginComponent } from './pages/login/login.component';
import { AngularFireAuth } from 'angularfire2/auth';

import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CadastroProdutosComponent } from './pages/cadastro-produtos/cadastro-produtos.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';

import { AngularCropperjsModule } from 'angular-cropperjs';

export const firebaseConfig = {
  apiKey: "AIzaSyAZL_kfnuSTBEgPiNw6IXneQBOaodGB8kQ",
  authDomain: "commerce-4d0e7.firebaseapp.com",
  databaseURL: "https://commerce-4d0e7.firebaseio.com",
  projectId: "commerce-4d0e7",
  storageBucket: "",
  messagingSenderId: "576838093919",
  appId: "1:576838093919:web:53397e4ed7ad33194cdfea",
  measurementId: "G-ZVHNKH1382"
};

@NgModule({
  declarations: [
    AppComponent,
    PaginaNaoEncontradaComponent,
    ProdutosComponent,
    MenuComponent,
    LoginComponent,
    SnackbarComponent,
    RecuperarComponent,
    CadastroComponent,
    CadastroProdutosComponent,
    CarrinhoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    AngularCropperjsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AngularFireModule, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }