'use strict';

const Action = require('./Action');

class GuildUpdateAction extends Action {
  handle(data) {
    const client = this.client;
    let guild = client.guilds.cache.get(data.id);
    let old;
    if (guild) {
      old = guild._update(data);
    } else {
      guild = client.guilds._add(data);
      old = client.guilds._add({ id: data.id, shardId: data.shardId }, false);
      old.partial = true;
    }
    return {
      old,
      updated: guild,
    };
  }
}

module.exports = GuildUpdateAction;
