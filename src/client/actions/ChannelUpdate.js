'use strict';

const Action = require('./Action');
const Channel = require('../../structures/Channel');
const { ChannelTypes } = require('../../util/Constants');
const Util = require('../../util/Util');

class ChannelUpdateAction extends Action {
  handle(data) {
    const client = this.client;
    const guild = data.guild_id ? Util.getOrCreateGuild(client, data.guild_id, data.shardId) : void 0;
    let channel = client.channels.cache.get(data.id);
    let old;
    if (channel) {
      old = channel._update(data);
      if (ChannelTypes[channel.type] !== data.type) {
        const changedChannel = Channel.create(client, data, guild);
        for (const [id, message] of channel.messages.cache) {
          changedChannel.messages.cache.forceSet(id, message);
        }
        channel = changedChannel;
        client.channels.cache.set(channel.id, channel);
        channel.guild?.channels.cache.set(channel.id, channel);
      }
    } else {
      channel = client.channels._add(data, guild);
      old = client.channels._add({ id: data.id, type: data.type }, guild, { cache: false, allowUnknownGuild: true });
      Util.makePartial(old);
    }
    return {
      old,
      updated: channel,
    };
  }
}

module.exports = ChannelUpdateAction;
