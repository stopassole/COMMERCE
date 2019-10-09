import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {

    issue = new EventEmitter<Object>();

    constructor() { }

    create(data: Object) {
        this.issue.emit(data);

        setTimeout(() => {
            this.destroy();
        }, data['time']);
    }

    destroy() {
        this.issue.emit({ message: '', class: 'hidden' });
    }

}
