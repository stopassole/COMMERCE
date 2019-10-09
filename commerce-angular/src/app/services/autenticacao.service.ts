import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';

@Injectable({
    providedIn: 'root'
})
export class AutenticacaoService {
    user: Observable<firebase.User>;

    constructor(
        public afAuth: AngularFireAuth,
        private router: Router,
        private snackbar: SnackbarService
    ) {
        this.user = afAuth.authState;
    }

    public login(mail: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(mail, password).then((response) => {
                localStorage['idUser'] = response.user.uid;
                localStorage['email'] = response.user.email;

                if (response.user.email === "admin@admin.com") {
                    localStorage['administrador'] = true;
                } else {
                    delete localStorage['administrador'];
                }
                this.router.navigate(['/produtos']);

                resolve();
            })
                .catch((error) => {
                    this.snackbar.create({ message: "Ocorreu um erro, verifique seus dados.", class: 'show danger', time: 6000 })
                    this.router.navigate(['/login']);
                });
        })
            .catch((error) => {
                this.snackbar.create({ message: "Ocorreu um erro, verifique seus dados.", class: 'show danger', time: 6000 })
                this.router.navigate(['/login']);
            });
    }

    public resetPassword(email): Promise<any> {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.sendPasswordResetEmail(email);
            resolve();
        }).catch((error) => {
            this.snackbar.create({ message: "Ocorreu um erro, verifique seus dados.", class: 'show danger', time: 6000 })
        });

    }

    public cadastro(email, password): Promise<any> {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(response => {
                this.snackbar.create({ message: "Salvo com sucesso", class: 'show success', time: 6000 })
                setTimeout(() => {
                    this.login(email, password);
                }, 800);
                resolve();
            })
                .catch((error) => {
                    error.code === "auth/email-already-in-use" ? this.snackbar.create({ message: "Email já cadastrado.", class: 'show danger', time: 6000 })
                        : this.snackbar.create({ message: "Ocorreu um erro, verifique seus dados.", class: 'show danger', time: 6000 })
                });
        })

            .catch((error) => {
                this.snackbar.create({ message: "Ocorreu um erro, verifique seus dados.", class: 'show danger', time: 6000 })
            });
    }

    public logout() {
        return this.afAuth.auth.signOut();
    }
}