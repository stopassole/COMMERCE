import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AngularCropperjsComponent, ImageCropperResult } from 'angular-cropperjs';
import { UploadImagemService } from 'src/app/services/upload-imagem.service';
import { ProdutoService } from 'src/app/services/produto.service';

declare var $: any;

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css']
})
export class CadastroProdutosComponent implements OnInit {
  @ViewChild('arquivo', { static: true }) arquivo: ElementRef;
  @ViewChild('angularCropper', { static: true }) angularCropper: AngularCropperjsComponent;

  public config = {
    minContainerHeight: 350,
    minContainerWidth: 495,
  };
  public resultResult = null;
  public produto: any = {};
  public erro = false;
  public imagem = null;
  constructor(
    private snackbar: SnackbarService,
    private uploadService: UploadImagemService,
    private produtoService: ProdutoService,

  ) { }

  ngOnInit() {
  }

  save() {
    if (this.produto.nome && this.produto.valor && this.produto.descricao && this.produto.link) {
      this.uploadService.fileEvent(this.produto.link.replace("data:image/png;base64,", "")).then(result => {
        if (result != 0 || result != '0') {
          this.erro = false
          this.snackbar.create({ message: "Upload realizado com sucesso", class: 'show success', time: 3000 })
          this.produto.link = result;

          this.produtoService.salvar(this.produto).then(response => {

            this.snackbar.create({ message: "Salvo com sucesso", class: 'show success', time: 3000 })
            this.produto = {};
          })
        } else {
          this.snackbar.create({ message: "Falha no upload.", class: 'show danger', time: 6000 })
        }
      })

    } else {
      this.snackbar.create({ message: "Campos obrigatórios não informados.", class: 'show danger', time: 6000 })
      this.erro = true;
    }
  }

  carregarImagem(event?) {
    if (event.target.files && event.target.files.length) {
      const reader = new FileReader();
      const [file] = event.target.files;

      reader.readAsDataURL(file);

      reader.onload = () => {
        var anexo = reader.result;
        this.imagem = anexo;
        $('#crop').modal('show');
      }
    }
  }

  cropMe() {
    this.resultResult = this.angularCropper.cropper.getCroppedCanvas({
      height: 200,
    });
    this.angularCropper.exportCanvas();
    this.produto.link = this.resultResult.toDataURL();
  }

  closeModal() {
    $('#crop').modal('hide');
    this.angularCropper.cropper.destroy();
  }
}
