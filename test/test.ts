import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{Storage,SqlStorage} from 'ionic-angular';



import {DataService} from '../../providers/data/data';


@Component({
  templateUrl: 'build/pages/test/test.html',
})
export class TestPage {
  

data:any;
todo:any;

id:any;

read:boolean=false;

  
  error:any;

  constructor(private nav: NavController,data:DataService) {

  
this.data=data;

    
    
     this.data.addtodo().then((tx)=>{
    

this.data.getodo().then((tx)=>{

  this.read=true;
  this.id=tx.res.rows[0].id;

this.todo=tx.res.rows[0].todo;
    console.log('data is ' + tx.res.rows[0].id);

},(err)=>{

console.log(err.message);
this.error=err.message;


})



   

  
  },
  function(err){
  console.log(' err is ' + err);
     this.error=err.message;

    
  });
  
  }
}
