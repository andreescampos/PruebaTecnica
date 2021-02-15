import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {

  idpedido: number;
  detallespedido: any[];
  total = 0;

  constructor(private route: ActivatedRoute,
              private pedidoService: PedidoService ) { }

  ngOnInit(): void {
    this.idpedido = Number(this.route.snapshot.paramMap.get('id'));
    this.getPedido();
  }

  getPedido(): void {
      this.pedidoService.getPedidosByIDRequest(this.idpedido).subscribe(response =>{
      this.detallespedido = response;
      this.detallespedido.forEach(element => {
        this.total += element.cantidad * element.precio;
      });
      console.log(this.detallespedido);
      });
  }

}
