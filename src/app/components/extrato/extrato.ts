import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BancoService, ExtratoRequest, ExtratoResponse } from '../../services/Banco';

@Component({
  selector: 'app-extrato',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './extrato.html',
  styleUrl: './extrato.css',
})
export class Extrato {
  private fb = inject(FormBuilder);
  private bancoService = inject(BancoService);
  
  statementData = signal<ExtratoResponse | null>(null);
  
  statementForm: FormGroup = this.fb.group({
    accountNumber: ['', Validators.required],
    branch: ['', Validators.required]
  });

  onSubmit() {
    if (this.statementForm.valid) {
      const request: ExtratoRequest = {
        numeroConta: this.statementForm.value.accountNumber,
        agencia: this.statementForm.value.branch
      };

      this.bancoService.extrato(request).subscribe({
        next: (response) => {
          this.statementData.set(response);
        },
        error: (err) => {
          alert('Erro ao buscar extrato.');
          this.statementData.set(null);
        }
      });
    }
  }
}
