'use strict';

const Action = require('./Action');
const Util = require('../../util/Util');

class InviteDeleteAction extends Action {
  handle(data) {
    const client = this.client;
    if (!data.guild_id) {
      return;
    }
    const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
    let invite = guild.invites.cache.get(data.code);
    if (!invite) {
      const channel = Util.getOrCreateChannel(client, data.channel_id, guild);
      invite = guild.invites._add(Object.assign(data, { channel, guild }), false);
      invite.partial = true;
    }
    guild.invites.cache.delete(invite.code);
    return { invite };
  }
}

module.exports = InviteDeleteAction;
