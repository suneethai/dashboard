import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	list$: Observable<string[]>;
	private selectedProduct : string;

  constructor(private appService: AppService) { }

  ngOnInit() {
  	this.getProductsList();
  }

  toggleSideNav() {
    this.appService.toggle();
  }

  getProductsList() {
  	this.list$ = this.appService.getProductsList();
  }

  onChangeProduct(selectedProduct) {
  	this.selectedProduct = selectedProduct;
    this.appService.updateProduct(selectedProduct);
  }
}
