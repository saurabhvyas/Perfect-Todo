import {Injectable} from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';

@Injectable()
export class DataService {

storage:any;


  constructor() {
    this.storage = new Storage(SqlStorage);
   // this.storage.query('DROP TABLE todo');
    //this.storage.query('DROP TABLE completed_todo');
    
   this.storage.query('CREATE TABLE IF NOT EXISTS saurabh_todo (id INTEGER  , todo TEXT, description TEXT , priority TEXT)');
    this.storage.query('CREATE TABLE IF NOT EXISTS saurabh_completed_todo (id INTEGER  , todo TEXT, description TEXT , priority TEXT)');
  }

addtodo(todo:string,priority:string,description:string){
 


  var id;
 
  this.storage.query('SELECT MAX(id) from saurabh_todo  ').then(function(tx){
    
  id=tx.res;
  console.log(id);

  
  },
  function(err){
  console.log('select max err is ' + err);
     
    
  });
  
  

/* var description= `Removing the line-height indeed makes your text align with your placeholder-text, but it doesn't properly solve your problem since you need to adapt your design to this flaw (it's not a bug). Adding vertical-align won't do the deal either. I haven't tried in all browsers, but it doesn't work in Safari 5.1.4 for sure.

I have heard of a jQuery fix for this, that is not cross-browser placeholder support (jQuery.placeholder), but for styling placeholders, but I haven't found it yet.

In the meantime, you can resolve to the table on this page which shows different browser support for different styles.

Edit: Found the plugin! jquery.placeholder.min.js provides you with both full styling capabilities and cross-browser support into the bargain.`;
 
 */

 // var priority = "medium";
 
  id=id+1;
 
 
  
  // return this.storage.query('INSERT INTO saurabh_todo VALUES(?,?,?,?)',[id,todo,description,priority]);
   
    return this.storage.query('INSERT INTO saurabh_todo(id,todo,description,priority) VALUES(?,?,?,?)',[id,todo,description,priority]);
}

addcompletedtodo(todo:string,priority:string,description:string){
  
  var id;
 
  this.storage.query('SELECT MAX(id) from saurabh_completed_todo  ').then(function(tx){
    
  id=tx.res;
  
  
  },
  function(err){
  console.log(err);
     
    
  });
  
  /* var description= `Removing the line-height indeed makes your text align with your placeholder-text, but it doesn't properly solve your problem since you need to adapt your design to this flaw (it's not a bug). Adding vertical-align won't do the deal either. I haven't tried in all browsers, but it doesn't work in Safari 5.1.4 for sure.

I have heard of a jQuery fix for this, that is not cross-browser placeholder support (jQuery.placeholder), but for styling placeholders, but I haven't found it yet.

In the meantime, you can resolve to the table on this page which shows different browser support for different styles.

Edit: Found the plugin! jquery.placeholder.min.js provides you with both full styling capabilities and cross-browser support into the bargain.`;
 var priority = "medium";
 
 */
  
   return this.storage.query('INSERT INTO saurabh_completed_todo(id,todo,description,priority) VALUES(? , ?,?,?)',[++id,todo,description,priority]);
  
}

removetodo(id:number){
  
  // need to implement this
  
   return this.storage.query("DELETE  FROM saurabh_todo WHERE id=' " + id + " ' ") ;
   
   
  
}

  getodo() {
    return this.storage.query('SELECT id, todo ,description , priority FROM saurabh_todo');
  }
  
  getcompletedtodo(){
    
    return this.storage.query('SELECT id, todo , description , priority FROM saurabh_completed_todo');
    
  }
}