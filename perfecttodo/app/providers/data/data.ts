import {Injectable} from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';

@Injectable()
export class DataService {

storage:any;


  constructor() {
    this.storage = new Storage(SqlStorage);
  
  //  this.storage.clear(); // this will remove all kv pairs and always show start screen , remove on production

  
   this.storage.query('CREATE TABLE IF NOT EXISTS saurabh_todo (id INTEGER  , todo TEXT, description TEXT , priority TEXT)');
    this.storage.query('CREATE TABLE IF NOT EXISTS saurabh_completed_todo (id INTEGER  , todo TEXT, description TEXT , priority TEXT)');
  }


cleancompletedtodo(){

  this.storage.query('DELETE FROM saurabh_completed_todo').then(()=>{
  
  console.log('successfully completed clean completedtodo');
  

  });
}
  cleantodo(){



this.storage.query('DELETE  FROM saurabh_todo').then(()=>{

this.storage.query('DELETE  FROM saurabh_completed_todo').then(function(){

console.log('nested query perfomed');


});

});




  



   
    

  }

addtodo(todo:string,priority:string,description:string){
 


// promise for first query 

 let p1 =  this.storage.query('SELECT MAX(id) from saurabh_todo ');



 // return the final promise (insertion promise) , promises are nested 

 return p1.then((tx)=>{
    
    let id = 0;
console.log(' id tx');

if (tx.res.rows[0]['MAX(id)']===null){


}

else{
id = (tx.res.rows[0]['MAX(id)']);
}


  
id= id + 1;

console.log('new value of id is ' + id);


 this.storage.query('INSERT INTO saurabh_todo VALUES(?,?,?,?)',[id,todo,description,priority]).then((tx)=>{

console.log(id);

   console.log('insertion tx');
   console.log(tx);

return Promise.resolve(tx);

 },(err)=>{

   console.log(err);

return Promise.reject(err);

 })


 })
 

 

   
     

     

     

     
  
 


}


 



addcompletedtodo(todo:string,priority:string,description:string){
  
  
 
 console.log('in data.ts file going to run query to insert a completed todo');
 console.log(todo);
 
// this is the promise for first query 
 let p1 =  this.storage.query('SELECT MAX(id) from saurabh_completed_todo  ');
 
 // this will return the promise for nested query
 return p1.then((tx)=>{
    
    let id=0;

  id=tx.res.rows[0]['MAX(id)'];

  if(id===null) {

id=0;


  }

  else {

id=id+1;

  }
  
console.log('new value of id is '+ id );


 this.storage.query('INSERT INTO saurabh_completed_todo(id,todo,description,priority) VALUES(? , ?,?,?)',[id,todo,description,priority]).then((tx)=>{


console.log('in data .ts returning completed todo tx');
console.log(tx);

return Promise.resolve(tx);


 },(err)=>{

return Promise.reject(err);


 })

 })


  
  
 
  
  
 

  

  
  /* var description= `Removing the line-height indeed makes your text align with your placeholder-text, but it doesn't properly solve your problem since you need to adapt your design to this flaw (it's not a bug). Adding vertical-align won't do the deal either. I haven't tried in all browsers, but it doesn't work in Safari 5.1.4 for sure.

I have heard of a jQuery fix for this, that is not cross-browser placeholder support (jQuery.placeholder), but for styling placeholders, but I haven't found it yet.

In the meantime, you can resolve to the table on this page which shows different browser support for different styles.

Edit: Found the plugin! jquery.placeholder.min.js provides you with both full styling capabilities and cross-browser support into the bargain.`;
 var priority = "medium";
 
 */
  
   
  
}

removetodo(id:number){
  
  // need to implement this
  console.log(id);

  
   return this.storage.query("DELETE  FROM saurabh_todo WHERE id=' " + id + " ' ") ;
   
   
  
}

  getodo() {
    return this.storage.query('SELECT id, todo ,description , priority FROM saurabh_todo');
  }
  
  getcompletedtodo(){
    
    return this.storage.query('SELECT id, todo , description , priority FROM saurabh_completed_todo');
    
  }
}