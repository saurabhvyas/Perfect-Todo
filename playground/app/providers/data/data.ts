import {Injectable} from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';

@Injectable()
export class DataService {

storage=null;


  constructor() {
    this.storage = new Storage(SqlStorage);
  //  this.storage.query('DROP TABLE todo');
    //this.storage.query('DROP TABLE completed_todo');
    
   this.storage.query('CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY , todo TEXT, description TEXT , priority TEXT)');
    this.storage.query('CREATE TABLE IF NOT EXISTS completed_todo (id INTEGER PRIMARY KEY , todo TEXT, description TEXT , priority TEXT)');
  }

addtodo(todo:string){
 
 var id;
 
  this.storage.query('SELECT MAX(Id) from todo  ').then(function(tx){
    
  id=tx.res;
  
  
  },
  function(err){
  console.log(err);
     
    
  });
  
 var description= "put description here";
 var priority = "put priority here";
 
  
   return this.storage.query('INSERT INTO todo VALUES(? , ?,?,?)',[++id,todo,description,priority]);
}

addcompletedtodo(todo:string){
  
  var id;
 
  this.storage.query('SELECT MAX(Id) from completed_todo  ').then(function(tx){
    
  id=tx.res;
  
  
  },
  function(err){
  console.log(err);
     
    
  });
  
   var description= "put description here";
 var priority = "put priority here";
 
  
   return this.storage.query('INSERT INTO completed_todo VALUES(? , ?,?,?)',[++id,todo,description,priority]);
  
}

removetodo(){
  
  // need to implement this
}

  getodo() {
    return this.storage.query('SELECT id, todo ,description , priority FROM todo');
  }
  
  getcompletedtodo(){
    
    return this.storage.query('SELECT id, todo , description , priority FROM completed_todo');
    
  }
}