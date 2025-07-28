import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
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
