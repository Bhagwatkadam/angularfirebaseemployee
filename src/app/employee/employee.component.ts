import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { employee } from '../interface/employee';
import { EmpServiceService } from '../service/emp-service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmpServiceService) { }

  model: employee = {};
  employees: employee[] = [];
  ngOnInit(): void {
    this.getEmployee();
  }

  onSubmit() {
    if (this.model.id) {
      this.employeeService.updateEmployee(this.model).then((res: any) =>{
        console.log('Update ', res)
        this.getEmployee();
        this.model = {};
      }).catch(error => {
        console.log(error);
      })
    } else {
      this.employeeService.saveEmployee(this.model).then((res: any) => {
        console.log(res);
        this.model = {};
        this.getEmployee();
      }).catch(error => {
        console.log(error);
      })
    }
  }
  getEmployee() {
    this.employeeService.getEmployee().subscribe(data => {
      this.employees = data.map((item: any) => {
        return {
          id: item.payload.doc.id,
          employeeName: item.payload.doc.data()['employeeName'],
          employeeAge: item.payload.doc.data()['employeeAge'],
          employeeAddress: item.payload.doc.data()['employeeAddress']
        }
      });
    });
    console.log(this.employees);
  }
  update(item: employee) {
    this.model = JSON.parse(JSON.stringify(item));
  }
  delete(item: employee) {
    this.employeeService.deleteEmployee(item.id).then(res => {
      this.getEmployee();
    });
  }
  reset(form: NgForm): void {
    form.resetForm();
  }
}
