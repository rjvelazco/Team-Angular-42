import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])]
      ),
      password: new FormControl('', [Validators.required , Validators.minLength(5)]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: this.validatePassword('password','confirmPassword')
    });
  }

  async createUser(form){
    const { email, password } = form;

    if (this.form.invalid) {
      Swal.fire({
        title: '¡Error!',
        text: 'Complete el registro, por favor',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
      this.markAsTouched();
    } else {
      try {
        const { user} = await this.authService.register(email, password);
        Swal.fire({
          title: '¡Bienvenido!',
          text: `Verifica tu email [${user.email}] para continuar`,
          icon: 'success',
          confirmButtonText: 'Cool'
        });
        this.form.reset();
        this.router.navigateByUrl('/login');
      } catch (error) {
        Swal.fire({
          title: '¡Error!',
          text: 'El email ya ha sido registrado.',
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      } 
    }
  }

  get usernameInvalid() {
    return this.form.get('username').invalid && this.form.get('username').touched
  }
  get emailInvalid() {
    return this.form.get('email').invalid && this.form.get('email').touched
  }
  get passwordInvalid() {
    return this.form.get('password').invalid && this.form.get('password').touched
  }

  get confirmPasswordInvalid() {
    const password1 = this.form.get('password').value;
    const password2 = this.form.get('confirmPassword').value;
    return (password1 !== password2);
  }

  validatePassword(p1: string, p2: string){
    return ( formGroup: FormGroup ) => {
      const p1Control = formGroup.controls[p1];
      const p2Control = formGroup.controls[p2];

      if( p1Control.value === p2Control.value){
        p2Control.setErrors(null);
      }else{
        p2Control.setErrors({noEsIgual: true});
      }
    }
  }

  markAsTouched(){
    Object.values(this.form.controls).forEach(control => control.markAllAsTouched());
  }


}
