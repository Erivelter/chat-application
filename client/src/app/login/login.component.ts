import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, AppMaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Inicializando o formulário com os controles e validações
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    });
  }

  onLogin() {
    if (this.form.valid) {
      const { name, password } = this.form.value; // Usa os valores do formulário

      // Passa os campos esperados pelo backend
      this.authService.login(name, password).subscribe(
        (response) => {
          console.log('Login bem-sucedido!', response);
          this.router.navigate(['/']); // Redireciona para a página principal
        },
        (error) => {
          console.error('Erro no login:', error);
          this.message = 'Usuário ou senha inválidos.'; // Exibe mensagem de erro ao usuário
        }
      );
    } else {
      this.message = 'Por favor, preencha os campos corretamente.';
    }
  }



  errorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório.';
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors?.['minlength'].requiredLength;
      return `O tamanho mínimo é de ${requiredLength} caracteres.`;
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors?.['maxlength'].requiredLength;
      return `O tamanho máximo é de ${requiredLength} caracteres.`;
    }

    return 'Campo inválido.';
  }
}
