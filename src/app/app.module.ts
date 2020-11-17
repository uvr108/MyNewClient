import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PresupuestoComponent } from './Tables/presupuesto/presupuesto.component';
import { ItemComponent } from './Tables/item/item.component';

import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';


import { CrudService } from './shared/crud.service';
import { HttpClientModule } from '@angular/common/http';


import {NgxPaginationModule} from 'ngx-pagination';
import { SubitemComponent } from './Tables/subitem/subitem.component';
import { SolicitudComponent } from './Tables/solicitud/solicitud.component';
import { MyModalComponent } from './Tables/my-modal/my-modal.component';
import { PageNotFoundComponent } from './Tables/page-not-found/page-not-found.component';
import { OrdencompraComponent } from './Tables/ordencompra/ordencompra.component';
import { FacturaComponent } from './Tables/factura/factura.component';

@NgModule({
  declarations: [
    AppComponent,
    PresupuestoComponent,
    ItemComponent,
    SubitemComponent,
    SolicitudComponent,
    MyModalComponent,
    PageNotFoundComponent,
    OrdencompraComponent,
    FacturaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
