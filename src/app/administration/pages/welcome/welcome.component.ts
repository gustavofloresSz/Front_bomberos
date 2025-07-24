import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatOption, MatSelect } from '@angular/material/select';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [
    MatButton,
    RouterModule,

  ],
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent {

}
