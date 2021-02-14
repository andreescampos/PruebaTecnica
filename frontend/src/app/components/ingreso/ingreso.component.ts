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
    });
  }


  get name(): FormControl {
    return this.formGroup.get('name') as FormControl;
  }

  checkPassword(control): any {
    const enteredPassword = control.value;
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { requirements: true } : null;
  }

  checkInUseEmail(control): any {
    // mimic http database access
    const db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        const result = (db.indexOf(control.value) !== -1) ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }

  getErrorEmail(): any {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword(): any {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
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
