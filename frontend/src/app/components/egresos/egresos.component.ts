import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Taza } from 'src/app/models/taza';
import { PedidoService } from 'src/app/services/pedido.service';
import { TazaService } from 'src/app/services/taza.service';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.css']
})
export class EgresosComponent implements OnInit {

  tazas: Taza[];
  tazasParaMostrar: Taza[];
  tazasBajaCalidad: Taza[];
  cuenta = [];

  constructor(private tazaService: TazaService,
              private toastrService: ToastrService,
              private pedidoService: PedidoService,
              private router: Router) { }

  ngOnInit(): void {
    this.obtenerTazas();
  }

  obtenerTazas(): void {
    this.tazaService.getTazasRequest().subscribe(response => {
      this.tazas = response as Taza[];
      this.tazasParaMostrar = this.tazas.slice(0, 6);
      this.tazasBajaCalidad = this.tazas.filter(taza => taza.descripcion === 'Calidad baja');
    }, error => {
      console.log(error);
      this.toastrService.error(
        'Hubo un error al obtener los datos del servidor, intente de nuevo mas tarde.',
        'Lo sentimos mucho',
        { timeOut: 10000 });
    });
  }

  onPageChange($event): void {
    this.tazasParaMostrar = this.tazas.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
  }

  onKey($event): void {
    const max = Number($event.target.max);
    const value = Number($event.target.value);
    if (value > max) {
      $event.target.value = max;
    }
    if (value < 0) {
      $event.target.value = 0;
    }
  }

  onItemValueChange($event): void {
    const modelo = $event.target.name;
    const value = Number($event.target.value);

    this.tazas.find(x => {
      if (x.modelo === modelo) {
        x.cantidad = value;
        return true;
      }
      return false;
    });
  }

  onItemPromocionValueChange($event): void {
    const modelo = $event.target.name;
    const value = Number($event.target.value);

    let cantidad = 0;
    const cantidadPromocion = this.obtenerPromocion();

    this.tazas.forEach(taza => {
      if (taza.cantidadPromo && taza.modelo !== modelo) {
        cantidad += taza.cantidadPromo;
      }
    });

    if (cantidad + value <= cantidadPromocion) {
      this.tazas.find(x => {
        if (x.modelo === modelo) {
          x.cantidadPromo = value;
          return true;
        }
        return false;
      });
    } else {
      this.tazas.find(x => {
        if (x.modelo === modelo) {
          $event.target.value = x.cantidadPromo == null ? 0 : x.cantidadPromo;
          return true;
        }
        return false;
      });
    }


  }

  obtenerTotal(): number {
    let total = 0;

    this.tazas.forEach(taza => {
      if (taza.cantidad) {
        total += taza.cantidad * taza.precio;
      }
    });
    return total;
  }

  obtenerPromocion(): number {
    let tazasBajaCalidad = 0;
    let tazasAltaCalidad = 0;
    this.tazas.forEach(taza => {
      if (taza.cantidad) {
        if (taza.descripcion === 'Calidad alta') {
          tazasAltaCalidad += taza.cantidad;
        } else if (taza.descripcion === 'Calidad baja') {
          tazasBajaCalidad += taza.cantidad;
        }
      }
    });

    let promocion = 0;

    promocion += Math.floor(tazasAltaCalidad / 10) * 3;
    promocion += Math.floor(tazasBajaCalidad / 10) * 2;

    return promocion;
  }

  obtenerTazasPedido(): Taza[] {
    return this.tazas.filter(taza => taza.cantidad != null);
  }

  obtenerTazasPromocion(): Taza[] {
    return this.tazas.filter(taza => taza.cantidadPromo != null);
  }


  registrarPedido(): void {
    const pedido = {
      compra: this.obtenerTazasPedido(),
      promocion: this.obtenerTazasPromocion()
    };

    this.pedidoService.postPedidoRequest(pedido).subscribe(response => {
      console.log(response);
      this.toastrService.success('Los datos se guardadon satisfactoriamente', 'Registro existoso', { timeOut: 10000 });
      this.router.navigate(['/home']);
    }, error => {
      console.log(error.message);
      this.toastrService.error(
        'Hubo un error al guardar los datos, intente de nuevo mas tarde.',
        'Lo sentimos mucho',
        { timeOut: 10000 });
    });
    console.log(pedido);
  }
}
