'use strict';

const Action = require('./Action');
const Typing = require('../../structures/Typing');
const { Events } = require('../../util/Constants');
const Util = require('../../util/Util');

class TypingStart extends Action {
  handle(data) {
    const client = this.client;
    const guild = data.guild_id ? Util.getOrCreateGuild(client, data.guild_id, data.shardId) : void 0;
    const channel = Util.getOrCreateChannel(client, data.channel_id, guild);
    if (!channel) return;

    if (!channel.isText()) {
      this.client.emit(Events.WARN, `Discord sent a typing packet to a ${channel.type} channel ${channel.id}`);
      return;
    }
    let user = client.users.cache.get(data.user_id);
    if (!user) {
      if (data.member?.user) {
        user = client.users._add(data.member.user);
      } else {
        user = client.users._add({ id: data.user_id }, false);
      }
    }
    client.emit(Events.TYPING_START, new Typing(channel, user, data));
  }
}

module.exports = TypingStart;
