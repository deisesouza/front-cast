import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BancoService, OperacaoRequest } from '../../services/Banco';

@Component({
  selector: 'app-credito',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './credito.html',
  styleUrl: './credito.css',
})
export class Credito {
  private fb = inject(FormBuilder);
  private bankService = inject(BancoService);
  
  creditForm: FormGroup = this.fb.group({
    accountNumber: ['', Validators.required],
    branch: ['', Validators.required],
    value: [null, [Validators.required, Validators.min(0.01)]]
  });

  onSubmit() {
    if (this.creditForm.valid) {
      const request: OperacaoRequest = {
        numeroConta: this.creditForm.value.accountNumber,
        valor: this.creditForm.value.value
      };

      this.bankService.creditar(request).subscribe({
        next: () => {
          alert('Creditado com sucesso!');
          this.creditForm.reset();
        },
        error: (err) => {
          alert('Erro ao creditar conta.');
        }
      });
    }
  }
}
