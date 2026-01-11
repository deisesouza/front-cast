import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BancoService, TransferenciaRequest } from '../../services/Banco';

@Component({
  selector: 'app-transferir',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transferir.html',
  styleUrl: './transferir.css',
})
export class Transferir {
  private fb = inject(FormBuilder);
  private bancoService = inject(BancoService);
  
  transferForm: FormGroup = this.fb.group({
    sourceNumber: ['', Validators.required],
    destinationNumber: ['', Validators.required],
    value: [null, [Validators.required, Validators.min(0.01)]]
  });

  onSubmit() {
    if (this.transferForm.valid) {
      const request: TransferenciaRequest = {
        contaOrigem: this.transferForm.value.sourceNumber,
        contaDestino: this.transferForm.value.destinationNumber,
        valor: this.transferForm.value.value
      };

      this.bancoService.transferir(request).subscribe({
        next: () => {
          alert('Transferido com sucesso!');
          this.transferForm.reset();
        },
        error: (err) => {
          alert('Saldo insuficiente.');
        }
      });
    }
  }
}
