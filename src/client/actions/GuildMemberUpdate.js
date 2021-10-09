'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');
const Util = require('../../util/Util');

class GuildMemberUpdateAction extends Action {
  handle(data) {
    const client = this.client;
    if (data.user.username) {
      const user = client.users.cache.get(data.user.id);
      if (!user) {
        client.users._add(data.user);
      } else if (!user._equals(data.user)) {
        const { old, updated } = client.actions.UserUpdate.handle(data.user);
        client.emit(Events.USER_UPDATE, old, updated);
      }
    }
    const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
    let member = guild.members.cache.get(data.user.id);
    let old;
    if (member) {
      old = member._update(data);
      if (!member.equals(old)) {
        client.emit(Events.GUILD_MEMBER_UPDATE, old, member);
      }
    } else {
      member = guild.members._add(data);
      old = guild.members._add({ user: data.user }, false);
      client.emit(Events.GUILD_MEMBER_UPDATE, old, member);
    }
  }
}

module.exports = GuildMemberUpdateAction;
