import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';
import '@angular/common/locales/global/es-MX';

import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AgregarTazaComponent } from './components/taza/taza.component';
import { EgresosComponent } from './components/egresos/egresos.component';
import { ListaPedidosComponent } from './components/pedidos/lista-pedidos/lista-pedidos.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DetallePedidoComponent } from './components/pedidos/detalle-pedido/detalle-pedido.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';














@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AgregarTazaComponent,
    EgresosComponent,
    ListaPedidosComponent,
    DetallePedidoComponent,
    PageNotFoundComponent,
    IngresosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    MatIconModule,
    MatStepperModule,
    MatTableModule,
    MatExpansionModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-MX',
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
