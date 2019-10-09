import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public error = false;
  public usuario: any = {};

  constructor(
    private snackbar: SnackbarService,
    private AutenticacaoService: AutenticacaoService) { }

  ngOnInit() {
  }

  save() {
    if (this.usuario.email && this.usuario.password && this.usuario.conf_password) {
      if (this.usuario.password.length >= 6) {
        if (this.usuario.password ===
          this.usuario.conf_password) {
          this.error = false;
          this.AutenticacaoService.cadastro(this.usuario.email, this.usuario.password);
        } else {
          this.snackbar.create({ message: "Verifique as senhas.", class: 'show danger', time: 6000 })
        }
      } else {
        this.snackbar.create({ message: "A senha deve conter no minimo 6 dígitos.", class: 'show danger', time: 6000 })
      }
    } else {
      this.snackbar.create({ message: "Campos obrigatórios não informados.", class: 'show danger', time: 6000 })
      this.error = true;
    }
  }

}
