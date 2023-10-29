module.exports = {

  async sendMetric({ homey, body }) {
    // access the post body and perform some action on it.
    return homey.app.sendMetric(body);
  },

};
