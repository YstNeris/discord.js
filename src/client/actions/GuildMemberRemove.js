'use strict';

const Action = require('./Action');
const Util = require('../../util/Util');

class GuildMemberRemoveAction extends Action {
  handle(data) {
    const client = this.client;
    const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
    let member = guild.members.cache.get(data.user.id);
    if (!member) {
      member = guild.members._add({ user: data.user }, false);
    }
    member.deleted = true;
    guild.members.cache.delete(data.user.id);
    guild.voiceStates.cache.delete(data.user.id);
    if (guild.memberCount) {
      guild.memberCount--;
    }
    return {
      guild,
      member,
    };
  }
}

module.exports = GuildMemberRemoveAction;
