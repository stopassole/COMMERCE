import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class RequisicaoService {

    constructor(
        private httpClient: HttpClient
    ) { }

    public buscar(enderecoConsumo: string): Promise<any> {
        return new Promise(sucesso => {
            this.httpClient.get(`http://localhost:8080/${enderecoConsumo}`, { headers: new HttpHeaders().set('Content-Type', 'application/json') })
                .subscribe(resposta => sucesso(resposta));
        });
    }

    public salvar(enderecoConsumo: string, item: any): Promise<any> {
        return new Promise(sucesso => {
            this.httpClient.post(`http://localhost:8080/${enderecoConsumo}`, item, { headers: new HttpHeaders().set('Content-Type', 'application/json') })
                .subscribe(resposta => sucesso(resposta));
        });
    }
}
