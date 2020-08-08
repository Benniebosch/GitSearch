import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { FavoriteComponent } from './favorite/favorite.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'search', component: SearchComponent, canActivate: [ AuthGuard ] },
  { path: 'favorite', component: FavoriteComponent, canActivate: [ AuthGuard ] },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
