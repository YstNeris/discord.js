'use strict';

const Collection = require('../../util/Collection');
const Action = require('./Action');
const Util = require('../../util/Util');

class MessageDeleteBulkAction extends Action {
  handle(data) {
    const client = this.client;
    const guild = data.guild_id ? Util.getOrCreateGuild(client, data.guild_id, data.shardId) : void 0;
    const channel = Util.getOrCreateChannel(client, data.channel_id, guild);
    const deleted = new Collection();
    for (const id of data.ids) {
      const message = Util.getOrCreateMessage(channel, id);
      channel.messages.cache.delete(message.id);
      message.deleted = true;
      deleted.set(id, message);
    }
    return { messages: deleted };
  }
}

module.exports = MessageDeleteBulkAction;
