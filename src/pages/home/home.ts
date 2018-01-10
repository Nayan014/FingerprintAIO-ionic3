import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  showButton:boolean = false;

  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private faio: FingerprintAIO) {

    this.fingerprintAvailable();
  }

  async fingerprintAvailable(){
    try{
      await this.platform.ready();
      const available = await this.faio.isAvailable();
      // available == "OK" --> Android
      // available == "Available" --> Ios
      if(available == "OK" || available == "Available"){
        this.showButton = true;
      }
      else{
        this.showButton = false;
      }
    }
    catch(e){
      console.log(e);
    }
  }

  scan(){
    this.faio.show({
      clientId: 'Fingerprint-Demo',
      clientSecret: 'password', //Only necessary for Android
      disableBackup:true,  //Only for Android(optional)
      localizedFallbackTitle: 'Use Pin', //Only for iOS
      localizedReason: 'Please authenticate' //Only for iOS
  })
  .then((result: any) => 
    this.navCtrl.push('ResultPage',{
      result: result
    })
  )
  .catch((error: any) =>  
    this.navCtrl.push('ResultPage',{
      result: error
    }));
  }

}
