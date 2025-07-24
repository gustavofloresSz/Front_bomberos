import { Component, inject, OnInit, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from "../../../auth/pages/profile/profile.component";
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule,
    ProfileComponent,
    OverlayModule,
    MatIcon,
    CommonModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  isOpen = false;
  miRol: string = '';
  logisticaAbierta = false;

  private userService = inject(UserService);

  ngOnInit() {
    this.userService.getUserActual().subscribe({
      next: (user) => {
        this.miRol = user.rol;
      },
      error: (err) => {
        console.error('Error obteniendo el rol del usuario:', err);
      }
    });
  }
}

