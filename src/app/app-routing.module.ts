import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthorizationPageComponent } from './authorization-page/authorization-page.component';
import { ProductsTableComponent } from './products-table/products-table.component';

const routes: Routes = [
  { path: '', component: AuthorizationPageComponent },
  { path: 'home', component: ProductsTableComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard, AuthService],
  exports: [RouterModule],
})
export class AppRoutingModule {}
