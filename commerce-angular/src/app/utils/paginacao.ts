export class Paginacao {

    constructor() { }

    static paginacao(itens: number, paginaAtual: number = 1, tamanhoPaginacao: number = 10) {
        let paginasTotais = Math.ceil(itens / tamanhoPaginacao);

        if (paginaAtual < 1) {
            paginaAtual = 1;
        } else if (paginaAtual > paginasTotais) {
            paginaAtual = paginasTotais;
        }

        let paginaInicial: number;
        let paginaFinal: number;

        if (paginasTotais <= 10) {
            paginaInicial = 1;
            paginaFinal = paginasTotais;
        } else {
            if (paginaAtual <= 6) {
                paginaInicial = 1;
                paginaFinal = 10;
            } else if (paginaAtual + 4 >= paginasTotais) {
                paginaInicial = paginasTotais - 9;
                paginaFinal = paginasTotais;
            } else {
                paginaInicial = paginaAtual - 5;
                paginaFinal = paginaAtual + 4;
            }
        }

        let posicaoInicial = (paginaAtual - 1) * tamanhoPaginacao;
        let posicaoFinal = Math.min(posicaoInicial + tamanhoPaginacao - 1, itens - 1);

        let paginas = Array.from(Array((paginaFinal + 1) - paginaInicial).keys()).map(i => paginaInicial + i);

        return {
            itens: itens,
            paginaAtual: paginaAtual,
            tamanhoPaginacao: tamanhoPaginacao,
            paginasTotais: paginasTotais,
            paginaInicial: paginaInicial,
            paginaFinal: paginaFinal,
            posicaoInicial: posicaoInicial,
            posicaoFinal: posicaoFinal,
            paginas: paginas
        }
    }

}
