import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EgresosComponent } from './components/egresos/egresos.component';
import { HomeComponent } from './components/home/home.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DetallePedidoComponent } from './components/pedidos/detalle-pedido/detalle-pedido.component';
import { ListaPedidosComponent } from './components/pedidos/lista-pedidos/lista-pedidos.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'ingreso', component: IngresoComponent, pathMatch: 'full' },
  { path: 'egreso', component: EgresosComponent, pathMatch: 'full' },
  { path: 'pedidos', component: ListaPedidosComponent, pathMatch: 'full' },
  { path: 'pedidos/:id', component: DetallePedidoComponent, pathMatch: 'full' },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
