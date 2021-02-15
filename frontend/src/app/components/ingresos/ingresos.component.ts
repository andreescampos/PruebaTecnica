import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Taza } from 'src/app/models/taza';
import { TazaService } from 'src/app/services/taza.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  constructor(private tazaService: TazaService, private toastrService: ToastrService) { }

  tazas: Taza[];

  ngOnInit(): void {
    this.obtenerTazas();
  }

  obtenerTazas(): void {
    this.tazaService.getTazasRequest().subscribe(response => {
      this.tazas = response as Taza[];
    });
  }

  realizarRegistro(idTaza): void {
    const unidadesAIngresar =  Number((document.getElementById(idTaza) as HTMLInputElement).value);
    const peticion = {
      id_taza: idTaza,
      unidades: unidadesAIngresar
    };

    this.tazaService.postIngresoRequest(peticion).subscribe(response => {
      console.log(response);
      this.toastrService.success('Los datos se guardadon satisfactoriamente', 'Registro existoso', {timeOut: 10000});
      this.tazas.find(taza => {
        if (taza.id == idTaza){
          taza.piezas += unidadesAIngresar;
        }
      });
    }, error => {
      console.log(error.message);
      this.toastrService.error(
        'Hubo un error al guardar los datos, intente de nuevo mas tarde.',
         'Lo sentimos mucho',
          {timeOut: 10000});
    });
  }

}
