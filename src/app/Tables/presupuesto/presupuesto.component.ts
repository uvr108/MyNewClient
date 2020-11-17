import { MyModalComponent } from './../my-modal/my-modal.component';
import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { FormBuilder,  FormGroup } from '@angular/forms';
import { TABLAS } from './../../tablas';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


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

  presuId: any;
  selectedId: number;


  constructor( private crudService: CrudService,
               private resolver: ComponentFactoryResolver,
               private route: ActivatedRoute,
               ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
        this.presuId = params.get('Id');
        // console.log(`presuId : ${this.presuId}`);
        this.load();
      });

    }

  sgte(ref: string) {
    // console.log(`presupuesto : sgte() ref -> ${ref} next -> ${this.next}`);
    this.ref = ref;
    this.next = this.next  === true ? false : true;
  }

load() {

  if (this.presuId > 0) {
  this.crudService.GetByPk(this.table, this.presuId)
  .subscribe( data => {
    this.padre = [];
    const subresult = [];
    for (const [key, value] of Object.entries(data)) {
      subresult.push(value);
    }
    console.log(subresult);
    this.padre.push(['id', 'nombre', 'monto']);
    this.padre.push(subresult);
    this.total = 1;

  }
  );
  this.padre.unshift(this.cabecera);
  console.log(this.padre);
}
else {

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
      /* console.log(`activa_modal() presupuesto : table -> ${table}
      param -> ${JSON.stringify(ref)}
      editTabla -> ${editTabla}`);
      */
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
