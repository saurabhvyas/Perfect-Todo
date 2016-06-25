import { Component } from '@angular/core';
import { NavParams,NavController } from 'ionic-angular';
import {NewpagePage} from '../newpage/newpage';
import {Storage} from 'ionic-angular';
import {SqlStorage,Alert} from 'ionic-angular';
import {todo} from '../todo';

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
  todoitems:todo[]=[
    
    {
    
    id:1,
    todo:'eat chole bature' ,
    description:  'test',
    priority:'high'
    
    
  },
  
  
  {
    id:2,
    todo:'wake up at 5 am',
    description: 'test',
    priority:'low'
    
  }];
  
  
  
  likedtodo:string="";
  
  alert:any;
  
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

this.data.getcompletedtodo().then((tx)=> {
  
  console.log(tx.res.rows);
  
  
   var newarr = Array.from(tx.res.rows);
 
 console.log(newarr);
 
 var newar2=newarr.map((i)=>{
   
  // console.log(i);
   
   return i.todo;
   
   
 });
 
 this.completeditems=newar2;
  
  
},
(err)=> {
  
  console.log('err' + err);
  
  
});
    
  }
  
  private remove=(item,i)=> {
    
    var alert = Alert.create({
      
      title:'Are you sure you want to delete this todo ?',
      buttons:[
        {text:'yes',
      handler:()=> {
        
        console.log("yes clicked");
        
         console.log("removed " + i );
    
    this.items.splice(i,1);
        
      }
    },
    {
      text:'no',
      role:'cancel',
      handler:()=> {
        
        console.log("cancel clicked");
        
      }
    }
      ]
    });
    
    this.nav.present(alert);
    
    
   
    
  }
  
  private newpage=()=>{
    
   this.nav.push(NewpagePage);
   
    
  }
  
  private like=(value:any,i:number)=>{
    
    


   this.items.splice(i,1);
   this.completeditems.push(value);
   
   // this.items[i]="I liked " + this.items[i];
    
  this.data.addcompletedtodo(value).then((tx)=> {
    
    console.log(tx.res);
    
    
  },(err)=>{
    
    console.log('err ' + err);
    
  });  
    
    console.log("liked " + i);
    
    
    
  }
  
  

  constructor(private nav: NavController,params:NavParams,data:DataService  ){
    this.alert=alert;
    
    console.log('constructor visited');
    this.data=data;
    
 
   

  }
}
