'use strict';

const { Driver } = require('homey');

class DataServerDriver extends Driver {

  /**
   * onInit is called when the driver is initialized.
   */
  async onInit() {
    this.log('Data server has been initialized');
  }

  async onPair(session) {
    this.log('OnPair()');

    session.setHandler('device_input', async (data) => {
      this.log('device_input', data);
      if (!data.devicename) {
        throw new Error(this.homey.__('pair.invalid_device_name'));
      } else if (!data.url) {
        throw new Error(this.homey.__('pair.missing_url'));
      }
    });
  }

}

module.exports = DataServerDriver;
