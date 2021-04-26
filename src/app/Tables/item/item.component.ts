import { MyModalComponent } from './../my-modal/my-modal.component';
import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild,
   ViewContainerRef } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { TABLAS } from './../../tablas';
import { AppService } from 'src/app/shared/app.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {


  @Input() backref: string = null;
  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  id: string = null;
  ref: string = null;
  item = false;
  item$: any;
  next = false;
  lgroup: Array<string>;
  compon: Array<string>;
  Tablas = TABLAS;
  table = 'Item';
  back = this.Tablas[this.table].back;
  componentRef: any;

  msg:string;

  constructor( private crudService: CrudService,
               private resolver: ComponentFactoryResolver,
               private appservice: AppService
               ) { }
  ngOnInit(): void {

    this.compon = this.Tablas[this.table].compon;

    this.item$ = this.crudService.GetData(this.table);

    this.appservice.send.subscribe(s => {
      this.msg = s;


      if (  s === this.table) {
        // console.log(this.table);

        this.item$ = this.crudService.GetData(this.table);
        this.next = true;

        }

      });

  }

  sgte(ref: string) {
    this.ref = ref;
    this.next = this.next  === true ? false : true;
  }


mostra() {
  this.item = this.item === true ? false : true;
  // console.log(`item -> ${this.item}`);
  if (this.item) {
  }


}


activa_modal(table: string, ref: string, editTabla: boolean, pad: object) {



  if (table) {


      // console.log(`table -> ${table} ref -> ${ref} editTabla ->  ${editTabla} pad -> ${JSON.stringify(pad)}`);

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
