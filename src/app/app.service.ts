import { Injectable, Output, EventEmitter } from '@angular/core'
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {
	const API_URL = environment.apiUrl;

  isOpen = true;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient){}

  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }

  getProductsList() {

  }

  getLinesStationsData() {
  	
  }

}