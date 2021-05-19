import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from './about/about.component';
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_guards/auth.guard';
import {GalleryComponent} from './gallery/gallery.component';

const routes: Routes = [
  
  {path : 'about', component: AboutComponent},
  {path : 'home', component: HomeComponent},
  {path : 'login', component: LoginComponent},
  {path : 'gallery', component: GalleryComponent, canActivate: [AuthGuard]},
  {path : 'app', component: AppComponent},
  {path : '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
