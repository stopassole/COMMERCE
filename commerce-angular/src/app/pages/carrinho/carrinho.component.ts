import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { Paginacao } from 'src/app/utils/paginacao';

declare var $: any;

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  public administrador = localStorage['administrador'] ? true : false;
  public paginador: any = {};
  public produto: any = {};
  public status: Array<any> = [
    { 'status': 'Aguardando Confirmação' },
    { 'status': 'NEGADA' },
    { 'status': 'AUTORIZADA' }
  ]
  public itensPaginados: Array<any> = [];
  public carrinho: Array<any> = [];
  private idDelete: number = null;
  constructor(
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.buscarProdutos();
  }

  buscarProdutos() {
    var idUser;
    this.administrador ? idUser = null : idUser = localStorage['idUser'];

    this.carrinhoService.buscar(idUser).then(response => {
      this.carrinho = response;
    }).then(() => {
      this.iniciarPaginacao(1);
    })
  }

  excluir() {
    this.carrinhoService.deletar(this.idDelete).then(response => {
      this.carrinho = response;
      $('#delete').modal('hide');
    }).then(() => {
      this.buscarProdutos();
    })
  }

  iniciarPaginacao(pagina: number): void {
    this.paginador = Paginacao.paginacao(this.carrinho.length, pagina, 6);

    this.itensPaginados = this.carrinho.slice(this.paginador.posicaoInicial, this.paginador.posicaoFinal + 1);
  }

  deletarModalOpen(id) {
    $('#delete').modal('show');
    this.idDelete = id;
  }

  editarStatusModal(produto) {
    $('#editar').modal('show');
    this.produto = produto;
  }

  editarStatus(id, status) {
    console.log(id, status);

    this.carrinhoService.editar(id, status).then(response => {
      $('#editar').modal('hide');
    }).then(() => {
      this.buscarProdutos();
    });
  }
}
