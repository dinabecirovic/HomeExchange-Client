import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AdsListComponent } from './pages/ads-list/ads-list.component';
import { CreateAdComponent } from './pages/create-ad/create-ad.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdDetailComponent } from './pages/ad-detail/ad-detail.component';
import { PendingAdsComponent } from './pages/admin/pending-ads/pending-ads.component';
import { PendingUsersComponent } from './pages/admin/pending-users/pending-users.component';
import { AllAdsComponent } from './pages/admin/all-ads/all-ads.component';
import { MyAdComponent } from './pages/my-ad/my-ad.component';

const routes: Routes = [
  { path: '', component: AdsListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'create-ad',
    component: CreateAdComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['HomeOwner'] },
  },
  {
    path: 'my-ad',
    component: MyAdComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['HomeOwner'] },
  },
  {
    path: 'ad-detail/:id',
    component: AdDetailComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['HomeOwner'] },
  },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Administrator'] },
  },
  {
    path: 'pending-users',
    component: PendingUsersComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Administrator'] },
  },
  {
    path: 'pending-ads',
    component: PendingAdsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Administrator'] },
  },
  { path: '**', redirectTo: '' },
  {
    path: 'all-ads',
    component: AllAdsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Administrator'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
