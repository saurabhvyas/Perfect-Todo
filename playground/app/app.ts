import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {MypagePage} from './pages/mypage/mypage';
import{Splashscreen} from 'ionic-native';

import {DataService} from './providers/data/data';
import {TestPage} from './pages/test/test';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers:[DataService]
})
export class MyApp {

  private rootPage:any;

  constructor(private platform:Platform) {
    this.rootPage = MypagePage;

    
    

    platform.ready().then(() => {
      
Splashscreen.hide();

        
/* if(navigator && navigator.splashscreen) {
setTimeout(()=> {
navigator.splashscreen.hide();
}, 100);
}

*/

    //  console.log('testttt');
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp)
