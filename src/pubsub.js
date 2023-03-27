export { pubSub as default };

const pubSub = {
  // an object with properties(eventNames) which store arrays of callbacks (ie. eventName: [callback1, callback2, etc])
  // so when an event is published we find the event by name and call all of the callbacks in it
  events: {},

  subscribe: function (eventName, callback) {
    // check if that event already exists
    // if it does do nothing, otherwise store a new property(eventName) with an empty array
    // push our new callback to either the existing event or to the new one we created
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(callback);
  },

  unsubscribe: function (eventName, callback) {
    // if that event does indeed exist
    // loop over its callback array
    // if the callback we're trying to unsub from exists:
    // splice it from the callback array on that event
    if (this.events[eventName]) {
      for (var i = 0; i <= this.events[eventName].length; ) {
        if (this.events[eventName][i] == callback) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  },

  publish: function (eventName, data) {
    // if the desired event does exist, loop through its callbacks and execute each with our data
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        callback(data);
      });
    }
  },
};
