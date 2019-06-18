import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { YieldComponent } from './yield/yield.component';
import { RawDataComponent } from './raw-data/raw-data.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},{
  path: 'yield',
  component: YieldComponent
},{
  path: 'rawData',
  component: RawDataComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
