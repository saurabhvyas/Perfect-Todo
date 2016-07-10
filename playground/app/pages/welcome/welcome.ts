import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MypagePage} from '../mypage/mypage';
import {Slides} from 'ionic-angular';
/*
  Generated class for the WelcomePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/welcome/welcome.html',
})
export class WelcomePage {

 mySlideOptions = {
    initialSlide: 1,
    loop: true,
    pager:true
  };

  constructor(private nav: NavController) {}


  redirect(){
    this.nav.push(MypagePage);

  }
}
