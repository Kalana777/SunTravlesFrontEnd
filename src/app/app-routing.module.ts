import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewContractComponent } from './new-contract/new-contract.component';
import { ViewContractsComponent } from './view-contracts/view-contracts.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'new-contract' , component: NewContractComponent} ,
  { path: 'view-contracts' , component: ViewContractsComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
