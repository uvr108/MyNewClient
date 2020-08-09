import { Component, OnInit } from '@angular/core';
import { Input, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { TABLAS } from './../../tablas';
import { MyModalComponent } from './../my-modal/my-modal.component';

@Component({
  selector: 'app-conecta',
  templateUrl: './conecta.component.html',
  styleUrls: ['./conecta.component.css']
})
export class ConectaComponent implements OnInit {

  @Input() ref: string = null;
  @Input() id: string = null;
  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor( private crudService: CrudService, private resolver: ComponentFactoryResolver) { }

  solicitud = false;
  next = false;
  total = 0;
  cabecera = [];
  padre = [];
  data = [];
  lgroup: Array<string>;
  compon: Array<string>;
  flag = true;
  Tablas = TABLAS;
  table = 'Solicitud';
  seleccion: object = {};
  inverse: object = {};
  nuevo = false;
  back = this.Tablas[this.table].back;
  componentRef: any;

  ngOnInit(): void {
    this.compon = this.Tablas[this.table].compon;

    if (this.back) {
      this.get_select();
      this.obtiene_back();
     }
    this.load();
  }

  obtiene_nombre(valor: number, table: string)
  {
    let out = 'xxx';
    Object.entries(this.seleccion[table]).forEach(([k, v]) => { if (valor === v['id']) { out =  v['nombre']; }});
    return out;
    }


  load() {

    this.crudService.GetData(this.table, this.id)
    .subscribe(data => {

      this.padre = [];
      this.data = data;
      data.forEach((f) => {
        const subresult = [];

        for ( let [key, value]  of Object.entries(f)) {
          if (this.flag) {this.cabecera.push(key); }

          if (this.compon[key] === 'date') { value =  value.toString().substring(0, 10); }
          else if ( this.compon[key] === 'fk'
           || this.compon[key] === 'id')
           { value =  this.obtiene_nombre(+value, this.inverse[key]); }

          subresult.push(value);
      }

        this.padre.push(subresult);
        this.flag = false;
  });
      this.total = this.padre.length;
      this.padre.unshift(this.cabecera);

    });

  }

  sgte(ref: string) {

    this.ref = ref;
    this.next = this.next  === true ? false : true;
  }

get_select() {
  Object.entries(this.back).forEach(([k, v]) => {
    this.crudService.GetData(k, null).subscribe((d) => {
     this.seleccion[k] = d;
     });
     } );
}

mostra() {
  this.solicitud = this.solicitud === true ? false : true;
  if (this.solicitud) {
    this.load();
  }

}

obtiene_back() {
  Object.entries(this.back).forEach(([k, v]) => {
    const   tmp: object = {};
    tmp[k] = v;
    this.inverse[tmp[k]] = k;
    } );
}

activa_modal(table: string, ref: string, editTabla: boolean) {

  let pad = [];

  if (table) {
      this.entry.clear();

      if (editTabla) {

         Object.entries(this.data).forEach(([k, v]) => {
             if (ref[0] === v.id) {
               Object.entries(v).forEach(([u, w]) => { pad.push(w); });
            }
         } );
      }
      else { pad = null; }

      const factory = this.resolver.resolveComponentFactory(MyModalComponent);
      this.componentRef = this.entry.createComponent(factory);
      this.componentRef.instance.table = table;
      this.componentRef.instance.editTabla = editTabla;
      this.componentRef.instance.ref = ref;
      this.componentRef.instance.back = this.back;
      this.componentRef.instance.seleccion = this.seleccion;
      this.componentRef.instance.pad = pad;
      }

}

}
