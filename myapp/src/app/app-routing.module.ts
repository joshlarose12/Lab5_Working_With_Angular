import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AddSongComponent } from './add-song/add-song.component';


const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'search',component: SearchComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent},
  {path:'createaccount',component:CreateAccountComponent},
  {path:'addsong',component:AddSongComponent}
  //{path: '',redirectTo: '',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
