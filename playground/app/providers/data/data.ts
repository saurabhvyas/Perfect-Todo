import {Injectable} from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';

@Injectable()
export class DataService {

storage=null;


  constructor() {
    this.storage = new Storage(SqlStorage);
    this.storage.query('CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY , todo TEXT)');
    this.storage.query('CREATE TABLE IF NOT EXISTS completed_todo (id INTEGER PRIMARY KEY , todo TEXT)');
  }

addtodo(todo:string){
 
 var id;
 
  this.storage.query('SELECT MAX(Id) from todo  ').then(function(tx){
    
  id=tx.res;
  
  
  },
  function(err){
  console.log(err);
     
    
  });
  
   return this.storage.query('INSERT INTO todo VALUES(? , ?)',[++id,todo]);
}

addcompletedtodo(todo:string){
  
  var id;
 
  this.storage.query('SELECT MAX(Id) from completed_todo  ').then(function(tx){
    
  id=tx.res;
  
  
  },
  function(err){
  console.log(err);
     
    
  });
  
   return this.storage.query('INSERT INTO completed_todo VALUES(? , ?)',[++id,todo]);
  
}

  getodo() {
    return this.storage.query('SELECT id, todo FROM todo');
  }
  
  getcompletedtodo(){
    
    return this.storage.query('SELECT id, todo FROM completed_todo');
    
  }
}