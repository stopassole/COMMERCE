import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { SnackbarService } from './snackbar.service';

@Injectable({
    providedIn: 'root'
})
export class UploadImagemService {

    public uploadS3: any = {};
    public image = '';
    constructor(
    ) { }

    fileEvent(imagem: any): Promise<any> {
        return new Promise((sucesso, falha) => {
            imagem = Buffer.from(imagem, 'base64');

            AWS.config.update({ accessKeyId: 'AKIAIZ2V5Z2P3XQSQ4UQ', secretAccessKey: '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' });
            const s3 = new AWS.S3({
                params: { Bucket: 'upload-img-stopassole' }
            });

            this.uploadS3 = {
                Key: `${new Date().getTime()} + .webp`,
                Body: imagem,
                ACL: 'public-read',
                ContentEncoding: 'base64',
                ContentType: 'image/webp'
            };

            s3.upload(this.uploadS3).send(function (err, data) {
                if (err) {
                    falha(0);
                } else {
                    sucesso(data.Location);
                }
            });
        });
    }
}
