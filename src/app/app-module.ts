import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { LoginComponent } from './features/auth/login/login.component';
import { AdsListComponent } from './pages/ads-list/ads-list.component';
import { CreateAdComponent } from './pages/create-ad/create-ad.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AdDetailComponent } from './pages/ad-detail/ad-detail.component';
import { PendingAdsComponent } from './pages/admin/pending-ads/pending-ads.component';
import { PendingUsersComponent } from './pages/admin/pending-users/pending-users.component';
import { AllAdsComponent } from './pages/admin/all-ads/all-ads.component';
import { MyAdComponent } from './pages/my-ad/my-ad.component';

@NgModule({
  declarations: [
    App,
    LoginComponent,
    AdsListComponent,
    CreateAdComponent,
    AdminDashboardComponent,
    NavbarComponent,
    RegisterComponent,
    AdDetailComponent,
    PendingAdsComponent,
    PendingUsersComponent,
    AllAdsComponent,
    MyAdComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
