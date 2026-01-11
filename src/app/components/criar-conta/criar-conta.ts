import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BancoService, UsuarioRequest } from '../../services/Banco';

@Component({
  selector: 'app-criar-conta',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './criar-conta.html',
  styleUrl: './criar-conta.css',
})
export class CriarConta {
  private fb = inject(FormBuilder);
  private bancoService = inject(BancoService);
  
  accountForm: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    senha: ['', Validators.required],
    admin: [false]
  });

  onSubmit() {
  if (this.accountForm.valid) {
    const request: UsuarioRequest = this.accountForm.value;
    request.admin = Boolean(request.admin);

    if (request.admin === true) {
      this.bancoService.criarConta(request).subscribe({
        next: (response) => {
          alert(`Conta criada com sucesso!`);
          this.accountForm.reset({ admin: false });
        },
        error: (err) => {
          alert('Erro ao criar conta.');
        }
      });
    } else {
      alert('Apenas administradores podem criar contas.');
    }
  }
}


}
