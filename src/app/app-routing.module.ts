import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {LogedGuard} from './core/guard/loged.guard';
import {NotLogedGuard} from './core/guard/not-loged.guard';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', canActivate: [LogedGuard], component: HomeComponent},
  {path: 'login', canActivate: [NotLogedGuard], component: LoginComponent},
  {path: 'register', canActivate: [NotLogedGuard], component: RegisterComponent},
  {path: 'new', canActivate: [LogedGuard], component: AddComponent},
  {path: 'edit/:id', canActivate: [LogedGuard], component: EditComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
