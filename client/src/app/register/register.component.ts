import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppMaterialModule } from '../shared/app-material/app-material.module';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, AppMaterialModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }
  onSubmit() {
    if (this.form.valid) {
      const { name, password } = this.form.value;

      this.authService.register(name, password).subscribe(
        (response) => {
          console.log('Conta criada com sucesso', response);
          // Redireciona o usuário para a página principal ou onde for apropriado
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Erro ao criar conta', error);
          // Você pode exibir um snackbar ou uma mensagem de erro aqui
        }
      );
    }
  }

  errorMessage(fieldName : string) {
    const field = this.form.get(fieldName)

    if(field?.hasError('required')) {
      return 'campo obrigatório';
    }
    if(field?.hasError('minlength')) {
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 5;

      return `O tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }
    if(field?.hasError('maxlength')) {
      const requiredLength:number = field.errors ? field.errors['maxlength']['requiredLength'] : 5;

      return `O tamanho máximo excedido de ${requiredLength} caracteres`;
    }

    return 'Campo inválido'
  }
}
