import { MyModalComponent } from './../my-modal/my-modal.component';
import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
// import { FormBuilder,  FormGroup } from '@angular/forms';
import { TABLAS } from './../../tablas';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  @Input() backref: string = null;
  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  solicitud = true;
  next = false;
  ref: string = null;
  total = 0;
  cabecera = [];
  padre = [];
  data = [];
  lgroup: Array<string>;
  compon: Array<string>;
  flag = true;
  Tablas = TABLAS;
  table = 'Solicitud';
  type = [];

  seleccion: object = {};
  inverse: object = {};
  nuevo = false;
  back = this.Tablas[this.table].back;

  componentRef: any;

  constructor( private crudService: CrudService,
               private resolver: ComponentFactoryResolver,

               ) { }
  ngOnInit(): void {
    this.compon = this.Tablas[this.table].compon;
    // console.log(`backRef -> ${this.backref}`);
    if (this.back) {
      this.get_select();
      // console.log(`seleccion -> ${JSON.stringify(this.seleccion)}`);
      this.obtiene_back();

      // console.log(`Solicitud init back -> ${JSON.stringify(this.back)}`);
     }
    this.load();
  }

  obtiene_nombre(valor: number, table: string)
  {
    // console.log(`obtiene nombre -> ${valor} | ${table} | ${JSON.stringify(this.seleccion)}`);
    let out = valor;
    Object.entries(this.seleccion[table]).forEach(([k, v]) => { if (valor === v['id']) { out =  v['nombre']; }});
    return out;
    }


  load() {
    console.log(`solicitud load() table -> ${this.table} backref -> ${this.backref}`);
    for ( const [key , value]  of Object.entries(this.compon)) {

         this.type.push(value);
      }
    // console.log(`solicitud type -> ${JSON.stringify(this.type)}`);

    this.crudService.GetData(this.table, this.backref)
    .subscribe(data => {

      this.padre = [];
      this.data = data;
      // console.log(`data xxx : ${JSON.stringify(data)}`);
      data.forEach((f) => {
        const subresult = [];

        for ( let [key, value]  of Object.entries(f)) {
          if (this.flag) {this.cabecera.push(key); }

          if (this.compon[key] === 'date' ) {

            if (value === null) {
              // console.log(`key : ${this.compon[key]} value : ${value}`);
            } else {
              value =  value.toString().substring(0, 10);
            }
          }
          else if ( this.compon[key] === 'fk'
          || this.compon[key] === 'id')
          {
            // value =  this.obtiene_nombre(+value, this.inverse[key]);
            // console.log('xxxx : value, key ', +value, key,  this.inverse[key]);
          }

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
  // console.log(`get_select() back -> ${JSON.stringify(this.back)}`);
  Object.entries(this.back).forEach(([k, v]) => {
    // console.log(`k -> ${k}`);
    this.crudService.GetData(k).subscribe((d) => {
     this.seleccion[k] = d;
     // console.log(`get_select() solicitud : [k,v] -> ${k} : ${v} seleccion -> ${JSON.stringify(this.seleccion[k])}`);
     });
     } );
  // console.log(`Solicitud seleccion -> ${JSON.stringify(this.seleccion)}`);
}

mostra() {
  this.solicitud = this.solicitud === true ? false : true;
  if (this.solicitud) {
    // this.load();
  }

}

obtiene_back() {
  // console.log(`obtiene_back back -> ${JSON.stringify(this.back)}`);
  // console.log(`obtiene_back seleccion -> ${JSON.stringify(this.seleccion)}`);

  Object.entries(this.back).forEach(([k, v]) => {
    const   tmp: object = {};
    tmp[k] = v;
    this.inverse[tmp[k]] = k;
    } );

  // console.log(`obtiene_back inverse -> ${JSON.stringify(this.inverse)}`);
}

activa_modal(table: string, ref: string, back: string, seleccion: object, editTabla: boolean, pad: Array<any> = [])  {
  // activa_modal(table: string, ref: string, editTabla: boolean) {
  // pad = [29, 'xxxs', '2020-08-14', '1000', 1, 2, 32];
  // console.log('ref  ', ref[0] );
  // console.log('DATA : ', JSON.stringify(this.data) );
  // console.log(`activa_modal : pad -> ${pad}`);


  if (table) {
      this.entry.clear();

      if (editTabla) {

         Object.entries(this.data).forEach(([k, v]) => {
             if (ref[0] === v.id) {
               Object.entries(v).forEach(([u, w]) =>
              {
               // console.log('u w : ', u, w);
               pad.push(w);
              });
            }
         } );
      }
      else { pad = null; }

      // console.log(`activa_modal() solicitud : pad -> ${JSON.stringify(pad)}`);
      // console.log(`activa_modal() solicitud : editTable -> ${editTabla}`);

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
