import { Component } from '@angular/core';
import { NavController,Alert } from 'ionic-angular';
import {MypagePage} from '../mypage/mypage';

import {DataService} from '../../providers/data/data';
/*
  Generated class for the NewpagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/newpage/newpage.html',
})
export class NewpagePage {
  
  description:string="";
  
  data:any;
  todo:string="";
  priority:string="";
  
  
  
  private addtodo = ()=> {
    
    console.log(this.todo,this.priority,this.description);
    
   
    this.data.addtodo(this.todo,this.priority,this.description).then((tx)=>{
      console.log(tx);
      
         this.nav.pop();
    },
    function(err){
      console.log(err);
      
    });
    
 
    
    
  }
  
    setpriority() {
    let alert = Alert.create();
    alert.setTitle('Choose Priority');

    alert.addInput({
      type: 'radio',
      label: 'High',
      value: 'high',
      checked: false
    });
    
    
    alert.addInput({
      type: 'radio',
      label: 'Medium',
      value: 'medium',
      checked: true
    });
    
     alert.addInput({
      type: 'radio',
      label: 'Low',
      value: 'low',
      checked: false
    });


    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
       this.priority=data;
       console.log('priority is ' + this.priority);
       
      }
    });
    
    this.nav.present(alert);
    
   // console.log('test');
    
  
    }
    
  constructor(private nav: NavController,data:DataService) {
    this.data=data;
    
    
    
  }
}
