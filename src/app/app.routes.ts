import { Routes } from '@angular/router';
import { MainComponent } from './administration/pages/main/main.component';
import { WelcomeComponent } from './administration/pages/welcome/welcome.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { isAuthenticatedGuard } from './auth/guards/is-authenticate.guard';
import { SimbViewerComponent } from './administration/pages/simb-viewer/simb-viewer.component';
import { ImboxComponent } from './administration/pages/imbox/imbox.component';
import { ImboxDialogComponent } from './administration/pages/imbox/imbox-dialog/imbox-dialog.component';
import { UsersComponent } from './administration/pages/users/users.component';
import { UserSettingsComponent } from './auth/pages/profile/user-settings/user-settings.component';
import { ComentarioComponent } from './administration/pages/welcome/comentario/comentario.component';
import { CrudComentarioComponent } from './administration/pages/welcome/crud-comentario/crud-comentario.component';
import { InventarioComponent } from './administration/pages/inventario/inventario.component';
import { ContactosComponent } from './administration/pages/welcome/contactos/contactos.component';
import { ControlOperacionesComponent } from './administration/pages/operaciones/operativo/control-operaciones/control-operaciones.component';
import { ControlHectareaComponent } from './administration/pages/operaciones/hectarea/control-hectarea/control-hectarea.component';
import { GraficoPastelComponent } from './report/grafico-pastel-inventario/grafico-pastel-inventario.component';
import { GraficoPastelOperativoComponent } from './report/grafico-pastel-operativo/grafico-pastel-operativo.component';

export const routes: Routes = [
    {
        path:'main', 
        component: MainComponent,
        canActivate: [isAuthenticatedGuard],
        children: [
            {
                path: 'seccion', loadComponent:()=>
                    import('./administration/pages/seccion/seccion.component'),
            },
            {
                path: 'users', component: UsersComponent
            },
            {
                path: 'chat/:usuarioId', component: ImboxDialogComponent
            },
            {
                path: 'imbox', component: ImboxComponent
            },
            {
                path: 'simb-viewer', component: SimbViewerComponent
            },
            {
                path: 'user-settings', component: UserSettingsComponent
            },
            {
                path: 'crud-cometario', component: CrudComentarioComponent
            },
            {
                path: 'inventario', component: InventarioComponent
            },
            {
                path: 'control-operaciones', component: ControlOperacionesComponent
            },
            {
                path: 'control-hectarea', component: ControlHectareaComponent
            },
            {
                path: 'grafico-inventario', component: GraficoPastelComponent
            },
            {
                path: 'grafico-operativo', component: GraficoPastelOperativoComponent
            },
        ]
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'welcome', component: WelcomeComponent
    },
    {
        path: 'comentario', component: ComentarioComponent
    },
    {
        path: 'contactos', component: ContactosComponent
    },
    {
        path: '**', redirectTo: 'welcome', pathMatch: 'full'
    },

];