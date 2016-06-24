import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  
  data:any;
  content:string="";
  
  
  
  private addtodo = ()=> {
    
    console.log(this.content);
    
   
    this.data.addtodo(this.content).then(function(tx){
      console.log(tx);
      
    },
    function(err){
      console.log(err);
      
    });
    
    this.nav.pop();
    
    
  }
  
  constructor(private nav: NavController,data:DataService) {
    this.data=data;
    
    
    
  }
}
