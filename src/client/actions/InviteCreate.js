'use strict';

const Action = require('./Action');
const Util = require('../../util/Util');

class InviteCreateAction extends Action {
  handle(data) {
    const client = this.client;
    if (!data.guild_id) {
      return;
    }
    const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
    const channel = Util.getOrCreateChannel(client, data.channel_id, guild);
    const invite = guild.invites._add(Object.assign(data, { channel, guild }));
    return { invite };
  }
}

module.exports = InviteCreateAction;
