import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {
  // @ViewChild('email', { static: true }) email: ElementRef;

  public form: any = {};
  public error = false
  constructor(
    private AutenticacaoService: AutenticacaoService,
    private snackbar: SnackbarService) { }

  ngOnInit() {
  }

  resetPassword() {
    if (this.form.email) {
      this.AutenticacaoService.resetPassword(this.form.email);
      this.snackbar.create({ message: "Email enviado.", class: 'show success', time: 6000 })
      // this.email.nativeElement.value = '';
    } else {
      this.snackbar.create({ message: "Campos obrigatórios não informados", class: 'show danger', time: 6000 })
      this.error = true;
    }
  }

}
