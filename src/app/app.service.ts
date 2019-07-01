import { Injectable, Output, EventEmitter } from '@angular/core'
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {
	private ROOT_URL = environment.apiUrl;

  isOpen = true;
  selectedProduct = '';

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Output() updateLinesStations: EventEmitter<Object[]> = new EventEmitter();

  constructor(private http: HttpClient){}

  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }

  getProductsList() {
  	return this.http.get<string[]>(this.ROOT_URL+'/productsList');
  }

  getLinesStationsData(product) {
    this.http.get<Object[]>(this.ROOT_URL+'/'+product).subscribe(data => {

    });
    //this.updateLinesStations.emit(data);
  }

  updateProduct(product) {
    this.selectedProduct = product;
    this.getLinesStationsData(product);
  }

}