import { Component, OnInit } from '@angular/core';
import { CrudService } from './shared/crud.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  padre = [];
  name: string = null;

  constructor(private crudService: CrudService , private route: ActivatedRoute, ) {

  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.name = params.name;
    });

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
