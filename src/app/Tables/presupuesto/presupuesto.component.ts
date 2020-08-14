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
    this.load();
  }

  sgte(ref: string) {
    this.ref = ref;
    this.next = this.next  === true ? false : true;
  }

load() {

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
      this.padre.unshift(this.cabecera);
    });

}

mostra() {
  this.presupuesto = this.presupuesto === true ? false : true;
  if (this.presupuesto) {
     this.load();
  }
}

activa_modal(table: string, ref: string, back: string, seleccion: object, editTabla: boolean, pad: object) {

  if (table) {

      this.entry.clear();
      console.log(`activa_modal() presupuesto : table -> ${table}
      param -> ${JSON.stringify(ref)}
      editTabla -> ${editTabla}`);

      if (this.componentRef) { console.log('Destroy componentRef'); this.componentRef.destroy(); }

      const factory = this.resolver.resolveComponentFactory(MyModalComponent);
      this.componentRef = this.entry.createComponent(factory);
      this.componentRef.instance.table = table;
      this.componentRef.instance.editTabla = editTabla;
      this.componentRef.instance.ref = ref;
      this.componentRef.instance.back =  back;
      this.componentRef.instance.seleccion =  seleccion;
      this.componentRef.instance.pad = pad;
      }
}

}
