import { PresupuestoComponent } from './Tables/presupuesto/presupuesto.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule,  } from '@angular/router';
import { PageNotFoundComponent } from './Tables/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: 'ppto/:Id', component: PresupuestoComponent, data: { preload: false }},
//    { path: 'tabla/:Fk', component: TablaComponent, data: { preload: false }},
    { path: '', redirectTo: '/ppto/0', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
