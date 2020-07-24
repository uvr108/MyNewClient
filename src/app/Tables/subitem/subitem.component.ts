import { MyModalComponent } from './../my-modal/my-modal.component';
import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
// import { FormBuilder,  FormGroup } from '@angular/forms';
import { TABLAS } from './../../tablas';

@Component({
  selector: 'app-subitem',
  templateUrl: './subitem.component.html',
  styleUrls: ['./subitem.component.css']
})
export class SubitemComponent implements OnInit {
  @Input() ref: string = null;
  @Input() id: string = null;
  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  subitem = false;
  next = false;
  total = 0;
  cabecera = [];
  padre = [];
  lgroup: Array<string>;
  compon: Array<string>;
  flag = true;
  Tablas = TABLAS;
  table = 'SubItem';
  // fk: string = null;
  seleccion: object = {};
  nuevo = false;
  back = this.Tablas[this.table].back;
  // listForm: FormGroup;
  componentRef: any;

  constructor( private crudService: CrudService,
               private resolver: ComponentFactoryResolver,
               // private fb: FormBuilder
               ) { }
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
      // console.log(`load() subitem padre : ${JSON.stringify(this.padre)}`);
    });
  }

  sgte(ref: string) {
    // alert(ref);
    this.ref = ref;
    this.next = this.next  === true ? false : true;
  }

get_select() {
  Object.entries(this.back).forEach(([k, v]) => {
    this.crudService.GetData(k, null).subscribe((d) => {
     this.seleccion[k] = d;
     // console.log(`mostra() subitemtud : [k,v] -> ${k} : ${v} seleccion -> ${JSON.stringify(this.seleccion[k])}`);
     });
     } );
}

mostra() {
  this.subitem = this.subitem === true ? false : true;
  if (this.subitem) {
    this.load();
  }
  if (this.back) {
   this.get_select();
  }
}


activa_modal(table: string, ref: string, editTabla: boolean, pad: any = null) {


  if (table) {
      this.entry.clear();

      console.log(`activa_modal() subitem : table -> ${table}
      ref -> ${JSON.stringify(ref)}
      editTabla -> ${editTabla}`);


      console.log(`pad : ${JSON.stringify(pad)}`);
      // console.log(`padre : ${JSON.stringify(this.padre)}`);

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
