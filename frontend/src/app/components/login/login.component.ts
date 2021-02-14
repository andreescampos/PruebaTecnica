import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginInfo, TipoUsuario } from 'src/app/models/login-info';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService, private toastrService: ToastrService) { }

  esVisible = false; // Variable para mensaje de error

  public loginInfo: LoginInfo = {
    email: '',
    password: '',
    tipo: TipoUsuario.admin
  };

  ngOnInit(): void {
    if (this.auth.getCurrentUserToken() != null){
      this.router.navigate(['/home']);
    }
  }

  recuperarPw() {
    this.router.navigateByUrl('/recover');
  }

  onSubmit() {
    this.esVisible = false;
    this.auth.loginRequest(this.loginInfo).subscribe(response => {
      if (response == null) {
        setTimeout(() => {this.esVisible = true; }, 500); // simula una actualización del aviso
        return;
      }
      // console.log(response);
      this.auth.saveSessionInfo(response.token, {
        idusuario: response.idusuario,
        usuario: response.usuario,
      });
      this.router.navigateByUrl('/home');
    }, error => {
      if (error.status === 401) {
        // this.toastrService.info("Credenciales incorrectas");
        setTimeout(() => {this.esVisible = true; }, 500);
      } else {
        console.log(error.message);
        // this.toastrService.info(error.message);
      }
    });
  }

}
