import { HttpTestsService } from './../../services/HttpTests.service';
import { HttpUsersService } from './../../services/http-users.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, FormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { startWith, map, Observable, Subscriber, observable, BehaviorSubject } from 'rxjs';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { User } from 'src/app/models/User';


@Component({
  selector: 'app-select-with-search',
  templateUrl: './select-with-search.component.html',
  styleUrls: ['./select-with-search.component.css']
})


export class SelectWithSearchComponent implements OnInit {


  public selectedItem: any;
  public selectedChekcBoxItems: User[]=[];

  constructor(
  ){
    
  }
  myControl = new FormControl('',Validators.required);
  filteredOptions:any;
  options: any[] = []
  optionsObs: BehaviorSubject<any[]> = new BehaviorSubject<any[]> ([])
  @Input() label="My Label"
  @Input() config:any={}
  @Input() getDataParent:any
  //which property do you wnat to display
  @Input() propsArr:string[]=[]
  @Input() messageError=""
  @Input() isMultiSelect=false
  inputVal:any
  value=""
  displayBy=""

  @ViewChild("refInput") input:ElementRef | undefined;
  @ViewChild("auto") autocomplete:MatAutocomplete | undefined;

  ngOnInit() {
    this.displayBy=this.config['displayBy'];
    this.value=this.config['value']
    this.RefreshData();
  }

  displayFn=(item: any)=>{
    let _item=this.options.find(f=>f[this.value]==item)
    return _item&&_item[this.displayBy] ? _item[this.displayBy] : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    if(!this.propsArr)
    return this.options.filter(option => option[this.displayBy].toLowerCase().includes(filterValue));
    
    return this.options.filter(option => {
      const arrProp=this.propsArr;
      debugger
      let res=false;
       arrProp.forEach(prop=>{
        res=res||option[prop].toLowerCase().includes(filterValue)
      })
      return res
    }
      );
  }

  //Get selected option if it edit mode Selection
  GetSelectedOptionName(){
    let item;
    if(this.myControl.value)
     item= this.options.find(f=>f[this.value]==this.myControl.value)
    return item&&item.name?item.name:''
  }

  OnUnFocus() {
    if(!this.isMultiSelect)
      {
        if(this.selectedItem!=this.myControl.value)
          this.myControl.setValue("")
      }
  }

  RefreshData(){
    this.getDataParent?.().subscribe((data: any[])=>{
      this.options=data
      this.optionsObs.next(data)
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          // const name = value[this.displayBy];
          const name = value
          return name ? this._filter(name) : this.options.slice();
        })
      );
    })
  }

  SelectOption(event:any){
    this.selectedItem=event.option.value
  }

  SelectCheckBox(event:any,refinput:HTMLInputElement){
    let value=event.source.value
    const isChecked=event.checked
    if(isChecked)
      this.selectedChekcBoxItems.push(value)
    else
      this.selectedChekcBoxItems=this.selectedChekcBoxItems.filter(f=>f.id!=value.id)
      //fill input autocomplete by selected values
            let inputValues="";
            this.selectedChekcBoxItems.forEach((u,i)=>{
              inputValues+=u.firstName;
              if(i<this.selectedChekcBoxItems.length-1)
              inputValues+=","
            })
            refinput.value=inputValues
  }

  PrintValue(option:any){
    debugger
    if(!this.propsArr)
    return false

    const arrProp=this.propsArr
    let value="";
    arrProp.forEach(prop=>{
        value=value+"~"+option[prop]
    })
    value=value.slice(1)
    return value
  }
  
}
