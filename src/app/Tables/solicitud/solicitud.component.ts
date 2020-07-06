import { MyModalComponent } from './../my-modal/my-modal.component';
import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { FormBuilder,  FormGroup } from '@angular/forms';
import { TABLAS } from './../../tablas';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  @Input() ref: string = null;
  @Input() id: string = null;
  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  solicitud = false;
  next = false;
  total = 0;
  cabecera = [];
  padre = [];
  lgroup: Array<string>;
  compon: Array<string>;
  flag = true;
  Tablas = TABLAS;
  table = 'Solicitud';
  // fk: string = null;
  seleccion: object = {};
  nuevo = false;
  back = this.Tablas[this.table].back;
  listForm: FormGroup;
  componentRef: any;

  constructor( private crudService: CrudService,
               private resolver: ComponentFactoryResolver,
               private fb: FormBuilder) { }
  ngOnInit(): void {
     this.load();
  }

  load() {
    this.crudService.GetData(this.table, this.id)
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
      // console.log(`load() solicitud padre : ${JSON.stringify(this.padre)}`);
    });
  }

  sgte(ref: string) {
    // alert(ref);
    this.ref = ref;
    this.next = this.next  === true ? false : true;
  }

mostra() {
  this.solicitud = this.solicitud === true ? false : true;
  if (this.solicitud) {
    this.load();
  }
  Object.entries(this.back).forEach(([k, v]) => {
     this.crudService.GetData(k, null).subscribe((d) => {
      this.seleccion[k] = d;
      console.log(`mostra() solicitud : [k,v] -> ${k} : ${v} seleccion -> ${JSON.stringify(this.seleccion[k])}`);
      });
      } );
}


activa_modal(table: string, param: string, editTabla: boolean) {


  if (table) {
      this.entry.clear();
      /*
      console.log(`activa_modal() solicitud : table -> ${table}
      param -> ${JSON.stringify(param)}
      editTabla -> ${editTabla}`);
      */
      const factory = this.resolver.resolveComponentFactory(MyModalComponent);
      this.componentRef = this.entry.createComponent(factory);
      this.componentRef.instance.table = table;
      this.componentRef.instance.editTabla = editTabla;
      this.componentRef.instance.param = param;
      this.componentRef.instance.back = this.back;
      this.componentRef.instance.seleccion = this.seleccion;
      }

}


}
