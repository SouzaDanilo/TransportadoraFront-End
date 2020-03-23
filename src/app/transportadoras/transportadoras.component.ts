import { Component, OnInit, Input } from '@angular/core';
import { TransportadorasService } from '../transportadoras.service';
import { TransportadoraModel } from './transportadora.model';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngbd-modal-content',
  template: `
    <div class='modal-header'>
      <h4 class='modal-title'>Hi there!</h4>
      <button type='button' class='close' aria-label='Close' (click)='activeModal.dismiss("Cross click")'>
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
    <div class='modal-body'>
      <p>Hello, {{name}}!</p>
    </div>
    <div class='modal-footer'>
      <button type='button' class='btn btn-outline-dark' (click)='activeModal.close("Close click")'>Close</button>
    </div>
  `
})
// tslint:disable-next-line: component-class-suffix
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) { }
}


@Component({
  selector: 'app-transportadoras',
  templateUrl: './transportadoras.component.html',
  styleUrls: ['./transportadoras.component.css']
})
export class TransportadorasComponent implements OnInit {

  transportadora: TransportadoraModel = new TransportadoraModel();
  transportadoras: Array<any> = new Array();
  closeResult = '';
  mensagem: string;

  constructor(private transportadorasService: TransportadorasService, private modalService: NgbModal) { }

  ngOnInit() {

    this.listarTransportadora();

  }


  atualizarTransportadora(id: number) {
    this.transportadorasService.atualizarTransportadora(id, this.transportadora).subscribe(transportadoras => {
      this.transportadora = new TransportadoraModel();
      this.listarTransportadora();

    }, error => {
      console.log(error);
      this.mensagem = 'Erro ao Atualizar';
    });

  }

  deletarTransportadora(id: number) {
    console.log(id);
    this.transportadorasService.deletarTransportadora(id).subscribe(transportadoras => {
      this.transportadora = new TransportadoraModel();
      this.listarTransportadora();

    }, error => {
      console.log(error);
      this.mensagem = 'Erro ao deletar registro';
    });
  }

  cadastrarTransportadora() {
    this.transportadorasService.cadastrarTransportadora(this.transportadora).subscribe(transportadoras => {
      this.transportadora = new TransportadoraModel();
      this.listarTransportadora();

    }, error => {
      console.log(error);
      this.mensagem = 'Erro ao Cadastrar';
    });
  }

  listarUfs() {
    this.transportadorasService.listarUfs().subscribe(transportadoras => {
      this.transportadoras = transportadoras;
    }, error => {
      console.log(error);
      this.mensagem = 'Erro ao listar Estados';
    });

  }

  listarCidades() {
    this.transportadorasService.listarTransportadora().subscribe(transportadoras => {
      this.transportadoras = transportadoras;
    }, error => {
      console.log(error);
      this.mensagem = 'Erro ao listar cidades';
    });

  }

  listarModais() {
    this.transportadorasService.listarModais().subscribe(transportadoras => {
      this.transportadoras = transportadoras;
    }, error => {
      console.log(error);
      this.mensagem = 'Erro ao listar modais';
    });

  }

  listarTransportadora() {
    this.transportadorasService.listarTransportadora().subscribe(transportadoras => {
      this.transportadoras = transportadoras;
    }, error => {
      console.log(error);
      this.mensagem = 'Erro ao listar';
    });

  }

  openDeleta(content3) {
    this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openAtualiza(content2) {
    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCadastro(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
