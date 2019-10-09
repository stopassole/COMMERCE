import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        console.log(localStorage['token'], 'token');
        console.log("VALIDATE");

        if (localStorage['token'] != null && localStorage['idUser'] != 'undefined') {
            return true;
        } else {
            this.router.navigate(['/login']);
        }

    }

}
