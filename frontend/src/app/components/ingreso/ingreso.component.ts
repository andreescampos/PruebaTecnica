import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TipoTaza } from 'src/app/models/tipoTaza';
import { TipoTazaService } from 'src/app/services/tipoTaza.service';
import { TazaService } from '../../services/taza.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {



  formGroup: FormGroup;
  titleAlert = 'This field is required';
  post: any = '';
  tipoTazas: TipoTaza[];

  constructor(
    private formBuilder: FormBuilder,
    private tipoTazaService: TipoTazaService,
    private tazaService: TazaService,
    private toastrService: ToastrService
     ) { }

  ngOnInit(): void {
    this.createForm();
    this.obtenerTipoTazas();
  }

  obtenerTipoTazas(): void {
    this.tipoTazaService.getTipoTazasRequest().subscribe(response => {
      this.tipoTazas = response as TipoTaza[];
    }, error => {
      console.log(error);
      this.toastrService.error(
        'Hubo un error al obtener los datos del servidor, intente de nuevo mas tarde.',
         'Lo sentimos mucho',
          {timeOut: 10000});
    });
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      id_tipo: [null , [Validators.required]],
      color: [null, [Validators.required, Validators.minLength(1)]],
      dimensiones: [null, [Validators.required, Validators.minLength(1)]],
      capacidad: [null, [Validators.required, Validators.minLength(1)]],
      modelo: [null, [Validators.required, Validators.minLength(1)]],
      material: [null, [Validators.required, Validators.minLength(1)]],
      piezas: [null, [Validators.required, Validators.min(1)]],
      precio: [null, [Validators.required, Validators.min(0.01)]]
    });
  }



  onSubmit(post): void {
    this.post = post;
    console.log(post);
    this.tazaService.postTazaRequest(post).subscribe(response => {
      console.log(response);
      this.toastrService.success('Los datos se guardadon satisfactoriamente', 'Registro existoso', {timeOut: 10000});
      this.formGroup.clearValidators();
      this.formGroup.reset();
    }, error => {
      console.log(error.message);
      this.toastrService.error(
        'Hubo un error al guardar los datos, intente de nuevo mas tarde.',
         'Lo sentimos mucho',
          {timeOut: 10000});
    });
  }

}
