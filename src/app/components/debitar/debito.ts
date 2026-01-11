import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BancoService, OperacaoRequest } from '../../services/Banco';

@Component({
  selector: 'app-debito',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './debito.html',
  styleUrl: './debito.css',
})
export class Debito {
  private fb = inject(FormBuilder);
  private bancoService = inject(BancoService);
  
  debitForm: FormGroup = this.fb.group({
    accountNumber: ['', Validators.required],
    branch: ['', Validators.required],
    value: [null, [Validators.required, Validators.min(0.01)]]
  });

  onSubmit() {
    if (this.debitForm.valid) {
      const request: OperacaoRequest = {
        numeroConta: this.debitForm.value.accountNumber,
        valor: this.debitForm.value.value
      };

      this.bancoService.debitar(request).subscribe({
        next: () => {
          alert('Debitado com sucesso!');
          this.debitForm.reset();
        },
        error: (err) => {
          alert('Saldo insuficiente.');
        }
      });
    }
  }
}
