import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'profile',
  imports: [MatButtonModule, MatMenuModule,MatIcon,MatListModule,RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile.component.html',
})
export class ProfileComponent { 
  private authService = inject(AuthService);
  private router = inject(Router);
  fullname = this.authService.fullname;
  
  irConfiguracion(){
    console.log("Ir a configuracion");
  }
  cerrarSesion(){
    console.log("Cerrar sesion");
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }
}
