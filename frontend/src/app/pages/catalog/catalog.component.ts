import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  public productsList: Array<Product> = null;

  constructor(
    private _catalogService: CatalogService
  ) { }

  ngOnInit() {
    this._catalogService.getProductsList().subscribe(data => this.productsList = data);
  }

}
