import { Component, inject } from '@angular/core';
import { LoginModules } from '../../modules/login.module';
import { LoginRequest } from '../../../../core/interfaces/auth/IAuth';
import { AuthService } from '../../../../core/services/auth/auth-service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [LoginModules],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginRequest: LoginRequest = {
    email: "",
    password: ""
  };

  private authService = inject(AuthService);
  private toastr = inject(ToastrService);

  login(form: NgForm): void {
    if(!form.valid) {
      this.toastr.error("Veuillez remplir tous les champs obligatoires.", "Erreur de validation")
      return;
    }

    this.authService.login(this.loginRequest).subscribe({
      next: () => this.toastr.success("Vous êtes connecté(e) avec succès.", "Bienvenue !"),
      error: () => this.toastr.error("Échec de la connexion.", "Erreur"),
    });;
  }
}
