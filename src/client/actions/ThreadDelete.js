'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');
const Util = require('../../util/Util');

class ThreadDeleteAction extends Action {
  handle(data) {
    const client = this.client;
    let channel = client.channels.cache.get(data.id);
    if (!channel) {
      const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
      channel = client.channels._add(data, guild, { cache: false, allowUnknownGuild: true });
      Util.makePartial(channel);
    }
    for (const message of channel.messages.cache.values()) {
      message.deleted = true;
    }
    client.channels._remove(channel.id);
    channel.deleted = true;
    client.emit(Events.THREAD_DELETE, channel);
    return { channel };
  }
}

module.exports = ThreadDeleteAction;
