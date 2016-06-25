import { Component } from '@angular/core';
import { NavParams,NavController } from 'ionic-angular';
import {NewpagePage} from '../newpage/newpage';
import {Storage} from 'ionic-angular';
import {SqlStorage} from 'ionic-angular';

import {DataService} from '../../providers/data/data';
/*
  Generated class for the MypagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/mypage/mypage.html',
})
export class MypagePage {
  
  items:string[]=['Pasta','Pizza','Chocolate Cake','Noodles','Origami Sheet'];
  
  newitem : string ="";
  
  data:any;
  
  completeditems:string[]=[];
  
  
  ionViewWillEnter=()=>  {
    
    console.log("I'm alive!");
  //  console.log(this.newitem)
   // this.items.push(this.newitem);
   
   
   
   this.data.getodo().then(
  
  
  
  (tx) => {
  
  console.log(tx.res.rows);
  
 var newarr = Array.from(tx.res.rows);
 
 console.log(newarr);
 
 var newar2=newarr.map((i)=>{
   
  // console.log(i);
   
   return i.todo;
   
   
 });
 
 this.items=newar2;
 
 
 
 
 console.log(newar2);
 
 
 
},function(err){
  
  console.log(err);
  
}


);

    
  }
  
  private remove=(item,i)=> {
    
    
    console.log("removed " + i );
    
    this.items.splice(i,1);
    
  }
  
  private newpage=()=>{
    
   this.nav.push(NewpagePage);
   
    
  }
  
  private like=(value:any,i:number)=>{
    
    

   this.items.splice(i,1);
   this.completeditems.push(value);
   
   // this.items[i]="I liked " + this.items[i];
    
    
    
    console.log("liked " + i);
    
    
    
  }
  
  

  constructor(private nav: NavController,params:NavParams,data:DataService ){
    
    console.log('constructor visited');
    this.data=data;
    
 
   

  }
}
