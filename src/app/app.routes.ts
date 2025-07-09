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
        ]
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'welcome', component: WelcomeComponent
    },
    {
        path: '**', redirectTo: 'welcome', pathMatch: 'full'
    },

];