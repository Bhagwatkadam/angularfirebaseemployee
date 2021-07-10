import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
const routes: Routes = [
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  {path:'employee', component: EmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})], //, { preloadingStrategy: PreloadAllModules, useHash: true } 
  exports: [RouterModule]
})
export class AppRoutingModule { }
