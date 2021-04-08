import { AppService } from './../../shared/app.service';
import { MyModalComponent } from './../my-modal/my-modal.component';
import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild,
   ViewContainerRef } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { TABLAS } from './../../tablas';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit {


  @Input() backref: string = null;
  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  id: string = null;
  ref: string = null;
  presupuesto = false;
  presupuesto$: any;
  next = false;
  lgroup: Array<string>;
  compon: Array<string>;
  Tablas = TABLAS;
  table = 'Presupuesto';
  back = this.Tablas[this.table].back;
  componentRef: any;

  msg: string;

  constructor( private crudService: CrudService,
               private resolver: ComponentFactoryResolver,
               private appservice: AppService
               ) { }
  ngOnInit(): void {
    this.compon = this.Tablas[this.table].compon;
    this.presupuesto$ = this.crudService.GetData(this.table, this.backref);
    this.appservice.send.subscribe(s => {
      this.msg = s;
      if ( s === this.table) {
        console.log(this.msg);
        this.presupuesto$ = this.crudService.GetData(this.table, this.backref);
      }

  });
  }

  sgte(ref: string) {
    this.ref = ref;
    this.next = this.next  === true ? false : true;
  }


mostra() {
  this.presupuesto = this.presupuesto === true ? false : true;
  if (this.presupuesto) {
  }


}


 activa_modal(table: string, ref: string, editTabla: boolean, pad: object) {

  // console.log('xxx -> ', table, ref, editTabla, pad);

  if (table) {

      this.entry.clear();

      if (this.componentRef) {
        this.componentRef.destroy();
      }

      const factory = this.resolver.resolveComponentFactory(MyModalComponent);
      this.componentRef = this.entry.createComponent(factory);
      this.componentRef.instance.table = table;
      this.componentRef.instance.editTabla = editTabla;
      this.componentRef.instance.ref = ref;
      this.componentRef.instance.pad = pad;
      }
}


}
