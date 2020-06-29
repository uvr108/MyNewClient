import { MyModalComponent } from './../my-modal/my-modal.component';
import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { FormBuilder,  FormGroup } from '@angular/forms';

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
  table = 'Item';
  total = 0;
  padre = [];
  flag = true;

  componentRef: any;

  lgroup: Array<string>;
  compon: Array<string>;

  nuevo = false;
  // editTabla: false;
  listForm: FormGroup;

  cabecera = [];

  mostra() {
    this.item = this.item === true ? false : true;

  }

  constructor( private crudService: CrudService, private resolver: ComponentFactoryResolver , private fb: FormBuilder) { }


  ngOnInit(): void {
      console.log(`onInit() item : ref -> ${this.ref} id -> ${this.id}`);
      this.load();


  }

  load(): void {

    console.log(`load() item: table ${this.table} fk -> ${this.ref} id -> ${this.id}`);

    this.crudService.GetData('item', this.id)
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
      // console.log(`load() Master padre ${JSON.stringify(this.padre)}`);
    });
}

// agregar

activa_modal(table: string, ref: string, editTabla: boolean) {


  if (table) {
      this.entry.clear();
      console.log(`activa_modal : table -> ${table}`);
      const factory = this.resolver.resolveComponentFactory(MyModalComponent);
      this.componentRef = this.entry.createComponent(factory);
      this.componentRef.instance.table = table;
      this.componentRef.instance.editTabla = editTabla;
      this.componentRef.instance.fk = ref;

      }

}

}
