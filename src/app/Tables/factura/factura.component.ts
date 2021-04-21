import { AppService } from './../../shared/app.service';
import { MyModalComponent } from './../my-modal/my-modal.component';
import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { CrudService } from '../../shared/crud.service';

// import { FormBuilder,  FormGroup } from '@angular/forms';
import { TABLAS } from './../../tablas';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  @Input() backref: string = null;
  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  factura = true;
  next = true;
  ref: string = null;

  lgroup: Array<string>;
  compon: Array<string>;

  Tablas = TABLAS;
  table = 'Factura';

  factura$: any;

  nuevo = false;

  componentRef: any;

  msg:string;

  constructor( private crudService: CrudService,
               private resolver: ComponentFactoryResolver,
               private appservice: AppService

               ) { }
  ngOnInit(): void {

    this.compon = this.Tablas[this.table].compon;
    this.factura$ = this.crudService.getData(this.table, this.backref);

    this.appservice.send.subscribe(s => {
      this.msg = s;
      if ( s === this.table) {
        console.log(this.msg);
        this.factura$ = this.crudService.getData(this.table, this.backref);
      }
  });

  }

   sgte(ref: string) {

    this.ref = ref;
    this.next = this.next  === true ? false : true;
  }


mostra() {
  this.factura = this.factura === true ? false : true;
}

activa_modal(table: string, ref: string, editTabla: boolean, pad:Array<object>)  {

      this.entry.clear();

      const factory = this.resolver.resolveComponentFactory(MyModalComponent);
      this.componentRef = this.entry.createComponent(factory);
      this.componentRef.instance.table = table;
      this.componentRef.instance.editTabla = editTabla;
      this.componentRef.instance.ref = ref;
      this.componentRef.instance.pad = pad;
      }



}
