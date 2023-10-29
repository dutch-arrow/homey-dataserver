'use strict';

const Homey = require('homey');

class DataServerApp extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('Data Server app has been initialized');
  }

  async sendMetric(body) {
    this.log('Data Server sent me data: ', body);
    this.homey.drivers.getDriver('dataserver').getDevices()[0].setCapabilityValue('data-offered', JSON.stringify(body));
  }

}

module.exports = DataServerApp;
