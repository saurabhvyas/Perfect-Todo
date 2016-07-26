import { Component,OnInit } from '@angular/core';
import { NavParams,NavController } from 'ionic-angular';
import {NewpagePage} from '../newpage/newpage';


import {Alert} from 'ionic-angular';
import {todo} from '../todo';
import {Modal,ViewController} from 'ionic-angular';
import{Storage,SqlStorage} from 'ionic-angular';
import {WelcomePage} from '../welcome/welcome';
import {DataService} from '../../providers/data/data';

/*
  Generated class for the MypagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

 


@Component({
  
  template: `
  




  <ion-content padding>
    <h2 primary>{{todo.todo}}</h2>

    <button (click)="removetodo()" outline danger> Remove </button>


    <hr>

    
 <h3>  Description </h3>
 

<ion-item *ngIf="editmode_enabled">

  <ion-textarea [(ngModel)]="model_description"></ion-textarea>
</ion-item>

 
 <p *ngIf="editmode_enabled===false"> {{todo.description}} </p>
 <hr>

 <h3>
 
 Priority
 
 </h3>

 <ion-item  *ngIf="editmode_enabled">

  <ion-input placeholder="{{todo.priority}}"  [(ngModel)]="model_priority" type="text" >  </ion-input>
 
 </ion-item>

 <div  *ngIf="editmode_enabled===false">
<p *ngIf="evaluatepriority('high')"  id="strip" >        {{todo.priority}}             </p>
<p *ngIf="evaluatepriority('medium')"  id="strip_yellow" >        {{todo.priority}}             </p>

 <p *ngIf="evaluatepriority('low')"  id="strip_pink" >        {{todo.priority}}             </p>
 
 </div>

<span id="cta" (click)="clickhandler()">
  <ion-icon ios="ios-add" md="md-add"></ion-icon>

  </span>

   
    <button style="width:90%; margin-left:10px; position:fixed; bottom:10px; margin-right:10px; " (click)="close()">Back</button>
  </ion-content>`,
 
})
class MyModal implements OnInit {

  evaluatepriority(type:string):boolean{

   if(this.model_priority.indexOf(type)>=0){

     return true;


   }
   else {

 return false;

   }

  }
  
  todo:todo;
  
  model_id:any;
  model_todo:any;
  model_priority:any;
  model_description:any;
  editmode_enabled:any=false;

  ngOnInit()    { 
this.model_id=this.todo.id;
this.model_todo=this.todo.todo;

this.model_description=this.todo.description;
this.model_priority=this.todo.priority;

   }

   clickhandler(){

     
     if(this.editmode_enabled===false){
     this.editmode_enabled=true;

     }

else if(this.editmode_enabled===true){

console.log(`the model priority is ${this.model_priority}`);

this.data.modifytodo(this.model_todo,this.model_priority,this.model_description,this.model_id).then((tx)=>{

this.editmode_enabled=false;

console.log('done');



},(err)=>{

console.log(err);


});

}





   }

removetodo(){

  var alert = Alert.create({
      
      title:'Are you sure you want to delete this todo ?',
      buttons:[
        {text:'yes',
      handler:()=> {
        
        console.log("yes clicked");
        
       
        
        
        this.data.removetodo(this.todo.id).then((tx)=> {
         
          console.log(tx.res.rows);
          
          

          
           
        },
       (err)=> {
          
          console.log('err' + err);
          
        });
        
        
         console.log("removed ");
    
    
        
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

  
  constructor(params:NavParams,private nav:NavController,
    private viewCtrl: ViewController,private data:DataService) {
      
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
    
    todomodal.onDismiss((data)=>{

    console.log(`data is ${data}`);


    });
    
  
    
    
  }

  cleancompletedtodo(){

this.completeditems=[];

 console.log('test');
    this.data.cleancompletedtodo();

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
 

 
 
 var newar2=newarr.map((i:any)=>{
   
  
   
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
 
 var newar2=newarr.map((i:any)=>{
   
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
   
       console.log('completed item is');
   console.log(item);
    
console.log('completed a todo');


  // this.todoitems.splice(i,1);


          
          this.data.removetodo(item.id).then((tx)=> {
         
         console.log('delete query transaction');
         
         console.log('deleted todo tx');

          console.log(tx);

          this.todoitems.splice(i,1);
          this.evaluatefinished();
          
        },
       (err)=> {
          
          console.log('err' + err);
          
        });
   


   this.completeditems.push(item);
   
   
   // this.items[i]="I liked " + this.items[i];
   console.log("completed items");
   
   console.log(this.completeditems);

  
    
  this.data.addcompletedtodo(item.todo,item.priority,item.description).then((tx)=> {
    
    console.log('completetodo tx');

    console.log(tx);
    
    
  },(err)=>{
    
    console.log('err ' + err);
    
  });  
    
    console.log("liked " + i);
    
    
    
  }
  
  

  constructor(private nav: NavController,params:NavParams,data:DataService  ){

let storage = new Storage(SqlStorage);



// data.cleantodo(); 


storage.get('First').then((data) => {

console.log(data);

if (data === 'false'){

console.log('not the first visit');


}
else if (data === undefined)   {

storage.set('First', 'false').then((tx)=>{
  console.log(tx);

},
(err)=>{
  console.log(err);

}
)

console.log('First  visit');


// navigate to slides page
 nav.push(WelcomePage);


}

},(err)=>{

  console.log('error in retrieving firstvisit key ');
});









    this.alert=alert;
  
    
 //   console.log(this.todoitems);
    
    
this.evaluatefinished();

    
    
    console.log('constructor visited');
    this.data=data;
    
 
   
  }
  
}
