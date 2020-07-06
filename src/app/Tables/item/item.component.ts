import { MyModalComponent } from './../my-modal/my-modal.component';
import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild,
   ViewContainerRef } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { FormBuilder,  FormGroup } from '@angular/forms';
import { TABLAS } from './../../tablas';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() ref: string = null;
  @Input() id: string = null;
  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  item = false;
  next = false;
  total = 0;
  cabecera = [];
  padre = [];
  lgroup: Array<string>;
  compon: Array<string>;
  flag = true;
  Tablas = TABLAS;
  table = 'Item';
  fk: string = null;

  nuevo = false;

  listForm: FormGroup;
  componentRef: any;

  constructor( private crudService: CrudService,
               private resolver: ComponentFactoryResolver,
               private fb: FormBuilder) { }
  ngOnInit(): void {

  }

  sgte(ref: string) {
    console.log(`sgte() item : ref -> ${ref}`);

    // this.ref = ref;
    // this.next_item = true;
    this.next = this.next  === true ? false : true;
  }

mostra() {
  this.item = this.item === true ? false : true;
  if (this.item) {
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
      // console.log(`load() Master padre : ${JSON.stringify(this.padre)}`);
    });
  }
}

activa_modal(table: string, param: string, editTabla: boolean) {


  if (table) {
      this.entry.clear();
      console.log(`activa_modal() item : table -> ${table}
      param -> ${JSON.stringify(param)}
      editTabla -> ${editTabla}`);

      if (this.componentRef) { console.log('Destroy componentRef'); this.componentRef.destroy(); }

      const factory = this.resolver.resolveComponentFactory(MyModalComponent);
      this.componentRef = this.entry.createComponent(factory);
      this.componentRef.instance.table = table;
      this.componentRef.instance.editTabla = editTabla;
      this.componentRef.instance.param = param;

      }

}


}
