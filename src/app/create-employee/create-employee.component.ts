import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  employeeinfo:FormGroup;
  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
    this.employeeinfo =new FormGroup({
      'id': new FormControl(),
      'name': new FormControl(null,[Validators.required,Validators.minLength(3)]),
      'location': new FormControl(null,[Validators.required,Validators.minLength(3)]),
      'emailId': new FormControl(null,[Validators.required,Validators.email]),
      'mobileno': new FormControl(null,[Validators.required,Validators.pattern('^[0-9]{10}$')])
      
    })
  }

  saveEmployee(){
    this.employeeService.createEmployee(this.employee).subscribe( data =>{
      console.log(data);
      this.goToEmployeeList();
    },
    error => console.log(error));
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }
  
  onSubmit(){
    console.log(this.employee);
    this.saveEmployee();
  }
}
