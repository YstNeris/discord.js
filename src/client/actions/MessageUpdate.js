'use strict';

const Action = require('./Action');
const Util = require('../../util/Util');

class MessageUpdateAction extends Action {
  handle(data) {
    const client = this.client;
    const guild = data.guild_id ? Util.getOrCreateGuild(client, data.guild_id, data.shardId) : void 0;
    const channel = Util.getOrCreateChannel(client, data.channel_id, guild);
    let message = channel.messages.cache.get(data.id);
    let old;
    if (message) {
      old = message._update(data, true);
    } else {
      message = channel.messages._add(data);
      old = channel.messages._add({ id: data.id }, false); // has built in partial
    }
    return {
      old,
      updated: message,
    };
  }
}

module.exports = MessageUpdateAction;
