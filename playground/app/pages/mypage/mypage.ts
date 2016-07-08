import { Component } from '@angular/core';
import { NavParams,NavController } from 'ionic-angular';
import {NewpagePage} from '../newpage/newpage';
import {Storage} from 'ionic-angular';
import {SqlStorage,Alert} from 'ionic-angular';
import {todo} from '../todo';
import {Modal,ViewController} from 'ionic-angular';

import {DataService} from '../../providers/data/data';

/*
  Generated class for the MypagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/




@Component({
  template: `
  <ion-content padding>
    <h2>{{todo.todo}}</h2>
    
 <h3>  Description </h3>
 
 <p> {{todo.description}} </p>
 
 <h3>
 
 Priority
 
 </h3>
 
 <p>
 
 {{todo.priority}}
 </p>
   
    <button (click)="close()">Close</button>
  </ion-content>`
})
class MyModal {
  
  todo:todo;

  
  
  constructor(params:NavParams,
    private viewCtrl: ViewController) {
      
      this.todo=params.get('todo');
      
      
    }

  close() {
    this.viewCtrl.dismiss();
  }
}


@Component({
  templateUrl: 'build/pages/mypage/mypage.html',
})



export class MypagePage {
  
    completed:boolean=false;
    
    
  
 // items:string[]=['Pasta','Pizza','Chocolate Cake','Noodles','Origami Sheet'];
  todoitems:todo[]=[];
  
  
  
  
  likedtodo:string="";
  
  alert:any;
  
  newitem : string ="";
  
  data:any;
  
  completeditems:todo[]=[];
  
  toggle:boolean=false;
  
  error:any;

  clickeventhandler=(tod:todo)=>{
    
    var  todomodal = Modal.create(MyModal,{"todo":tod});
    
    this.nav.present(todomodal);
    
    
    
  
    
    
  }
  
  evaluatefinished=()=> {
       if (this.todoitems.length===0) {
      
      this.completed=true;
      console.log('completed!');
      
    }
    
    else{
      this.completed=false;
      
      console.log('length of todo items is' +this.todoitems.length);
      
      console.log('not completed');
      
    }
    
    
  }
  
  ionViewWillEnter=()=>  {
    
     
     
    console.log("I'm alive!");
  //  console.log(this.newitem)
   // this.items.push(this.newitem);
   
   
   
   this.data.getodo().then(
  
  
  
  (tx) => {
  
  console.log(tx.res.rows);
  
 var newarr = Array.from(tx.res.rows);
 
 console.log('teffffst');
 
 console.dir(  newarr[0]);
 
 
 var newar2=newarr.map((i)=>{
   
  
   
   return {
     id:i.id,
     todo:i.todo,
     description:i.description,
     priority:i.priority
     
   };
   
   
   
 });
 this.todoitems=newar2;
 
 
 this.evaluatefinished();
// this.items=newar2;
 
 
 
 
 console.log(newar2);
 
 
 
},function(err){
  
  this.toggle=true;
  this.error=err.message;
  console.log('err is ' + err.message);
  
}


);

this.data.getcompletedtodo().then((tx)=> {
  
  console.log(tx.res.rows);
  
  
   var newarr = Array.from(tx.res.rows);
 
 console.log(newarr);
 
 var newar2=newarr.map((i)=>{
   
  // console.log(i);
   
   return {
     id:i.id,
     todo:i.todo,
     description:i.description,
     priority:i.priority     
   }
   
   
   
 });
 
 this.completeditems=newar2;
  
  
},
(err)=> {
  
  console.log('err' + err);
  
  
});
    
  }
  
  private remove=(item,i)=> {
    
    
  //  this.evaluatefinished();
    
    
    var alert = Alert.create({
      
      title:'Are you sure you want to delete this todo ?',
      buttons:[
        {text:'yes',
      handler:()=> {
        
        console.log("yes clicked");
        
       
        
        
        this.data.removetodo(item.id).then((tx)=> {
         
          console.log(tx.res.rows);
          this.todoitems.splice(i,1);
          
           this.evaluatefinished();
        },
       (err)=> {
          
          console.log('err' + err);
          
        });
        
        
         console.log("removed " + i );
    
    
        
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
  
  private like=(item:any,i:number)=>{
   
    
    


   this.todoitems.splice(i,1);
   
          this.data.removetodo(item.id).then((tx)=> {
         
          console.log(tx.res.rows);
          this.todoitems.splice(i,1);
           this.evaluatefinished();
          
        },
       (err)=> {
          
          console.log('err' + err);
          
        });
   
   this.completeditems.push(item);
   
   
   // this.items[i]="I liked " + this.items[i];
    
  
    
  this.data.addcompletedtodo(item.todo,item.priority,item.description).then((tx)=> {
    
    console.log(tx.res);
    
    
  },(err)=>{
    
    console.log('err ' + err);
    
  });  
    
    console.log("liked " + i);
    
    
    
  }
  
  

  constructor(private nav: NavController,params:NavParams,data:DataService  ){
    this.alert=alert;
    
 //   console.log(this.todoitems);
    
    
this.evaluatefinished();

    
    
    console.log('constructor visited');
    this.data=data;
    
 
   

  }
}
