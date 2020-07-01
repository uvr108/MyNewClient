import { MyModalComponent } from './../my-modal/my-modal.component';
import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { FormBuilder,  FormGroup } from '@angular/forms';
import { TABLAS } from './../../tablas';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit {

  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  presupuesto = false;
  next = false;
  ref: string = null;
  id: string = null;
  total = 0;
  cabecera = [];
  padre = [];
  lgroup: Array<string>;
  compon: Array<string>;
  flag = true;
  Tablas = TABLAS;
  table = 'Presupuesto';
  // fk: string = null;

  nuevo = false;

  listForm: FormGroup;
  componentRef: any;

  constructor( private crudService: CrudService,
               private resolver: ComponentFactoryResolver,
               private fb: FormBuilder) { }
  ngOnInit(): void {
    this.crudService.GetData(this.table, null)
    .subscribe(data => {
      // console.log(data);
      this.padre = [];
      data.forEach((f) => {
        const subresult = [];
        // console.log(f);
        for (const [key, value] of Object.entries(f)) {
          if (this.flag) {this.cabecera.push(key); }
          subresult.push(value);
      }
        this.padre.push(subresult);
        this.flag = false;
  });
      this.total = this.padre.length;
      // console.log(`load() Master padre : ${JSON.stringify(this.padre)}`);
    });
  }

  sgte(ref: string) {
    // alert(ref);
    this.ref = ref;
    // this.next_presupuesto = true;
    this.next = this.next  === true ? false : true;
  }

mostra() {
  this.presupuesto = this.presupuesto === true ? false : true;
}

 enviar(msg: string) {
   console.log(`enviar() presupuesto : msg -> ${msg} `);
 }

activa_modal(table: string, param: string, editTabla: boolean) {


  if (table) {
      this.entry.clear();
      console.log(`activa_modal() presupuesto : table -> ${table}
      param -> ${JSON.stringify(param)}
      editTabla -> ${editTabla}`);
      const factory = this.resolver.resolveComponentFactory(MyModalComponent);
      this.componentRef = this.entry.createComponent(factory);
      this.componentRef.instance.table = table;
      this.componentRef.instance.editTabla = editTabla;
      this.componentRef.instance.param = param;

      }

}

}
