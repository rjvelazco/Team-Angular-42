import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import Swal from 'sweetalert2';
// Services
import {UsuarioService} from 'src/app/core/services/usuario.service';
import {HeaderService} from '../../../core/services/header.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private headerService: HeaderService,
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.headerService.showLoginBtn.emit(true);
  }

  ngOnDestroy(): void {
    this.headerService.showLoginBtn.emit(false);
  }

  get emailInvalid() {
    return this.form.get('email').hasError('pattern');
  }

  get emailIsEmpty() {
    return this.form.get('email').hasError('required') && this.form.get('email')?.touched;
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }

  async resetPassword() {
    if (this.form.valid) {
      const {email} = this.form.value;
      try {
        await this.usuarioService.resetPassword(email);
        Swal.fire({
          title: 'Email Enviado',
          text: 'Recuerde revisar la bandeja de spam y/o correo no deseado.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      } catch (error) {
        // console.log(error);
      }
    } else {
      Object.values(this.form.controls).forEach(control => control.markAllAsTouched());
    }
  }
}
