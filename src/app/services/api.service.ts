import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postProduct(data : any){
    return this.http.post<any>("http://localhost:3000/productList/",data);
  }
  getProduct(){
    return this.http.get<any>("http://localhost:3000/productList/");
  }
  putProduct(data:any,id : number){
    return this.http.put<any>("http://localhost:3000/productList/"+id ,data);
  }
  deleteProduct(id:number){
    return this.http.delete<any>("http://localhost:3000/productList/"+id);
  }

  postEmployee(data : any){
    return this.http.post<any>("http://localhost:3000/postEmployeeDetails/",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getEmployee(){
    return this.http.get<any>("http://localhost:3000/postEmployeeDetails/")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateEmployee(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/postEmployeeDetails/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteEmployee(id:number){
    return this.http.delete<any>("http://localhost:3000/postEmployeeDetails/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
