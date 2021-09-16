'use strict';

const Action = require('./Action');

class UserUpdateAction extends Action {
  handle(data) {
    const client = this.client;
    let user = client.users.cache.get(data.id);
    let old;
    if (user) {
      old = user._update(data);
    } else {
      user = client.users._add(data);
      old = client.users._add({ id: data.id }, false);
    }
    return {
      old,
      updated: user,
    };
  }
}

module.exports = UserUpdateAction;
