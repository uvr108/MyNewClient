import { MyModalComponent } from './../my-modal/my-modal.component';
import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild,
   ViewContainerRef } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
// import { FormBuilder,  FormGroup } from '@angular/forms';
import { TABLAS } from './../../tablas';

@Component({
  selector: 'app-subitem',
  templateUrl: './subitem.component.html',
  styleUrls: ['./subitem.component.css']
})
export class SubitemComponent implements OnInit {


  @Input() backref: string = null;
  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  id: string = null;
  ref: string = null;
  subitem = false;
  next = false;
  total = 0;
  cabecera = [];
  padre = [];
  data = [];
  lgroup: Array<string>;
  compon: Array<string>;
  flag = true;
  Tablas = TABLAS;
  table = 'SubItem';
  // fk: string = null;
  seleccion: object = {};
  inverse: object = {};
  nuevo = false;
  back = this.Tablas[this.table].back;
  // listForm: FormGroup;
  componentRef: any;

  constructor( private crudService: CrudService,
               private resolver: ComponentFactoryResolver,
               // private fb: FormBuilder
               ) { }
  ngOnInit(): void {
    this.compon = this.Tablas[this.table].compon;

    if (this.back) {
      this.get_select();
      this.obtiene_back();

      // console.log(`mostra() selection -> ${JSON.stringify(this.seleccion)}`);
     }
    this.load();
  }

  obtiene_nombre(valor: number, table: string)
  {
    // console.log(`seleccion -> ${valor} | ${table} | ${JSON.stringify(this.seleccion)}`);
    let out = 'xxx';
    Object.entries(this.seleccion[table]).forEach(([k, v]) => { if (valor === v['id']) { out =  v['nombre']; }});
    return out;
    }


  load() {

    // console.log(`subitem load() table -> ${this.table} backref -> ${this.backref}`);

    this.crudService.GetData(this.table, this.backref)
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
    // alert(ref);
    this.ref = ref;
    // this.next_presupuesto = true;
    this.next = this.next  === true ? false : true;
  }

get_select() {
  Object.entries(this.back).forEach(([k, v]) => {
    this.crudService.GetData(k, null).subscribe((d) => {
     this.seleccion[k] = d;
     // console.log(`mostra() solicitud : [k,v] -> ${k} : ${v} seleccion -> ${JSON.stringify(this.seleccion[k])}`);
     });
     } );
}

mostra() {
  this.subitem = this.subitem === true ? false : true;
  if (this.subitem) {
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

activa_modal(table: string, ref: string, back: string, seleccion: object, editTabla: boolean, pad: object) {

  if (table) {

      this.entry.clear();
      // console.log(`activa_modal() presupuesto : table -> ${table}
      // param -> ${JSON.stringify(ref)}
      // editTabla -> ${editTabla}`);

      if (this.componentRef) {
        // console.log('Destroy componentRef');
        this.componentRef.destroy();
      }

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
