import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { EmploryeeModel } from './employee-dashboard.model';
import { NgConfirmService } from 'ng-confirm-box';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj : EmploryeeModel = new EmploryeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder,
    private api : ApiService,private confirmService: NgConfirmService,private router : Router) { }

  ngOnInit(): void{
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    })
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Successfully")
      let ref = document.getElementById('cancle')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something Went Wrong");
    })
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }
  
  deleteEmployee(row : any){
    this.confirmService.showConfirm("Are you sure?",()=>{ 
    this.api.deleteEmployee(row.id)
    .subscribe({
      next:(res)=>{
      //alert("Delete Success")
      this.getAllEmployee();
      },
      error:()=>{
        alert("Error while deleting the product!")
      }
    })
  },
  ()=>{
     alert("Selected No")
  }
  )

 }
  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = false;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }
  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Update Successfully");
      let ref = document.getElementById('cancle')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
}
