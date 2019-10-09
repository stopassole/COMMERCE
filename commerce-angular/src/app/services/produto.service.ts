import { Injectable } from '@angular/core';
import { RequisicaoService } from './requisicao.service';


@Injectable({
    providedIn: 'root'
})
export class ProdutoService {

    constructor(
        private requisicaoService: RequisicaoService
    ) { }

    salvar(produto: any): Promise<any> {
        return new Promise(sucesso => {
            this.requisicaoService.salvar('produto', produto)
                .then(resposta => sucesso(resposta))
                .catch(erro => console.error(erro));
        });
    }

    buscar(): Promise<any> {
        return new Promise(sucesso => {
            this.requisicaoService.buscar(`produto`)
                .then(resposta => sucesso(resposta))
                .catch(erro => console.error(erro));
        });
    }

    deletar(produto) {
        return new Promise(sucesso => {
            this.requisicaoService.salvar(`produto/delete`, produto)
                .then(resposta => sucesso(resposta))
                .catch(erro => console.error(erro));
        });
    }
}