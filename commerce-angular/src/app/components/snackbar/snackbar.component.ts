import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {

  class;
  message;

  constructor(
    private snackbar: SnackbarService
  ) {
    this.snackbar.issue.subscribe(response => {
      this.message = response['message'];
      this.class = response['class'];
    });
  }

}
