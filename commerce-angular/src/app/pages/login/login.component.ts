import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public error = false;
  constructor(
    private AutenticacaoService: AutenticacaoService,
    private snackbar: SnackbarService
  ) { }

  logOn(email, password) {
    if (email && password) {
      this.AutenticacaoService.login(email, password);
    } else {
      this.snackbar.create({ message: "Campos obrigatórios não informados", class: 'show danger', time: 6000 })
      this.error = true;
    }
  }
}
