import { Component, OnInit } from '@angular/core';
import { CrudService } from './shared/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  padre = [];

  constructor(private crudService: CrudService) {

  }

  ngOnInit() {

    this.crudService.GetData('presupuesto', null)
    .subscribe(data => {
      // console.log(data);
      this.padre = [];
      data.forEach((f) => {
        const subresult = [];
        // console.log(f);
        for (const [key, value] of Object.entries(f)) {

          subresult.push(value);
      }
        this.padre.push(subresult);

  });
});

}

}
