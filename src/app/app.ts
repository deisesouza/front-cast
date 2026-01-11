import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriarConta } from './components/criar-conta/criar-conta';
import { Credito } from './components/creditar/credito';
import { Debito } from './components/debitar/debito';
import { Transferir } from './components/transferir/transferir';
import { Extrato } from './components/extrato/extrato';

@Component({
  selector: 'app-root',
  imports: [CommonModule, CriarConta, Credito, Debito, Transferir, Extrato],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  activeForm: string | null = null;

  showForm(formName: string) {
    this.activeForm = formName;
  }
}
