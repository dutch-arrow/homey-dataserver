/* eslint-disable eqeqeq */

'use strict';

const Homey = require('homey');
const axios = require('axios');

class DataServerDevice extends Homey.Device {

  /**
   * onInit is called when the device is initialized.
   */
  async onInit() {
    const instance = this;
    this.log('DataServerDevice has been initialized');

    const { url } = this.getSettings();

    const cardConditionAvailable = this.homey.flow.getConditionCard('available');
    cardConditionAvailable.registerRunListener(async () => {
      let res = 0;
      axios.post(`${url}/ping`)
        .then((response) => {
          instance.log('Ok');
          res = 1;
        })
        .catch((error) => {
          if (error.response.status == 404) {
            instance.log(`${url}/ping is not implemented on Data Server`);
          } else {
            instance.log('Error: ', error.response.status);
          }
          res = -1;
        });
      while (res == 0) {
        await instance.sleep(100);
      }
      return res == 1;
    });

    const cardActionSendData = this.homey.flow.getActionCard('send-data');
    cardActionSendData.registerRunListener(async (data) => {
      await axios.post(url, data);
    });
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * onAdded is called when the user adds the device, called just after pairing.
   */
  async onAdded() {
    this.log('DataServerDevice has been added');
  }

  /**
   * onSettings is called when the user updates the device's settings.
   * @param {object} event the onSettings event data
   * @param {object} event.oldSettings The old settings object
   * @param {object} event.newSettings The new settings object
   * @param {string[]} event.changedKeys An array of keys changed since the previous version
   * @returns {Promise<string|void>} return a custom message that will be displayed
   */
  async onSettings({ oldSettings, newSettings, changedKeys }) {
    this.log('DataServerDevice settings where changed');
    this.url = newSettings.url;
  }

  /**
   * onRenamed is called when the user updates the device's name.
   * This method can be used this to synchronise the name to the device.
   * @param {string} name The new name
   */
  async onRenamed(name) {
    this.log("DataServerDevice was renamed to '", name, "'");
  }

  /**
   * onDeleted is called when the user deleted the device.
   */
  async onDeleted() {
    this.log('DataServerDevice has been deleted');
  }

}

module.exports = DataServerDevice;
