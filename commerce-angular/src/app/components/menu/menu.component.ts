import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public administrador = localStorage['administrador'] ? true : false;
  public click = false;

  constructor(
    private AutenticacaoService: AutenticacaoService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.AutenticacaoService.logout();
    delete localStorage['idUser'];
    this.router.navigate(['/login']);
  }

  redirect(param) {
    this.router.navigate([param]);
  }

  activeMenu() {
    this.click = true;
  }
}
