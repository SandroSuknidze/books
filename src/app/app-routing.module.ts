import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/manager',
        pathMatch: 'full',
    },
    {
        path: 'manager',
        loadChildren: () =>
            import('./pages/manager/manager.module').then(
                (m) => m.ManagerModule
            ),
    },
    {
        path: 'user',
        loadChildren: () =>
            import('./pages/user/user.module').then((m) => m.UserModule),
    },
    {
        path: 'user/cart',
        loadChildren: () =>
            import('./pages/cart/cart.module').then((m) => m.CartModule),
    },

    {
        path: '**',
        component: ErrorComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
