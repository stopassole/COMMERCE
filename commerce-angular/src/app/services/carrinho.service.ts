import { Injectable } from '@angular/core';
import { RequisicaoService } from './requisicao.service';


@Injectable({
    providedIn: 'root'
})
export class CarrinhoService {

    constructor(
        private requisicaoService: RequisicaoService
    ) { }

    salvar(carrinho: any): Promise<any> {
        return new Promise(sucesso => {
            this.requisicaoService.salvar('carrinho', carrinho)
                .then(resposta => sucesso(resposta))
                .catch(erro => console.error(erro));
        });
    }

    buscar(idUser): Promise<any> {
        return new Promise(sucesso => {
            this.requisicaoService.salvar(`carrinho/buscar`, idUser)
                .then(resposta => sucesso(resposta))
                .catch(erro => console.error(erro));
        });
    }

    deletar(carrinho): Promise<any> {
        return new Promise(sucesso => {
            this.requisicaoService.salvar(`carrinho/delete`, carrinho)
                .then(resposta => sucesso(resposta))
                .catch(erro => console.error(erro));
        });
    }

    editar(id, status): Promise<any> {
        return new Promise(sucesso => {
            this.requisicaoService.buscar(`carrinho/editar/${id}/${status}`)
                .then(resposta => sucesso(resposta))
                .catch(erro => console.error(erro));
        });
    }
}