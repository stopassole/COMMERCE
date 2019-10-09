import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Paginacao } from 'src/app/utils/paginacao';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ProdutoService } from 'src/app/services/produto.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';

declare var $: any;

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  @ViewChild('entrada', { static: true }) entrada: ElementRef;

  public administrador = localStorage['administrador'] ? true : false;
  public paginador: any = {};
  public itensPaginados: Array<any> = [];
  public produtos: Array<any> = [];
  private idDelete: number = null;
  private idProduto: number = null;

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private router: Router,
    private snackbar: SnackbarService
  ) { }

  ngOnInit() {
    this.buscarProdutos();
    fromEvent(this.entrada.nativeElement, 'keyup')
      .pipe(debounceTime(1000))
      .subscribe(valor => {
        var string = valor['path'][0]['value'];
        if (string !== '') {
          for (let i = 0; i < this.produtos.length; i++) {
            var dado = this.produtos[i];
            if (dado.nome.toUpperCase().includes(string.toUpperCase()) || dado.descricao.toUpperCase().includes(string.toUpperCase()) || Number(dado.valor) === Number(string)) {
            } else {
              this.produtos.splice(i, 1);
              i--;
            }
          }
        } else {
          this.buscarProdutos();
        }
      });
  }

  buscarProdutos() {
    this.produtoService.buscar().then(response => {
      this.produtos = response;

    }).then(() => {
      this.iniciarPaginacao(1);
    })
  }

  salvarCarrinho() {
    var carrinho = {
      idUser: localStorage['idUser'],
      email: localStorage['email'],
      idProduto: this.idProduto,
      status: "Aguardando Confirmação"

    }
    this.carrinhoService.salvar(carrinho).then(response => {
      $('#comprar').modal('hide');
    }).then(() => {
      this.router.navigate(['/carrinho']);
    })
  }


  iniciarPaginacao(pagina: number): void {
    this.paginador = Paginacao.paginacao(this.produtos.length, pagina, 4);

    this.itensPaginados = this.produtos.slice(this.paginador.posicaoInicial, this.paginador.posicaoFinal + 1);
  }

  openModalDelete(id) {
    $('#delete').modal('show');
    this.idDelete = id;
  }

  opnModalComprar(id) {
    $('#comprar').modal('show');
    this.idProduto = id;
  }

  excluir() {
    this.produtoService.deletar(this.idDelete).then(response => {
      $('#delete').modal('hide');
      this.idDelete = null;
      if (response == 1) {
        $('#message').modal('show');
      } else {
        this.snackbar.create({ message: "Deletado com sucesso", class: 'show success', time: 6000 })
      }
    }).then(() => {
      this.buscarProdutos();
    })
  }
}
