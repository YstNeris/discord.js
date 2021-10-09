'use strict';

const { Events } = require('../../../util/Constants');
const Util = require('../../../util/Util');

module.exports = (client, { d: data }, shard) => {
  const guild = data.guild_id ? Util.getOrCreateGuild(client, data.guild_id, shard.id) : void 0;
  const channel = Util.getOrCreateChannel(client, data.channel_id, guild);
  const time = data.last_pin_timestamp ? new Date(data.last_pin_timestamp).getTime() : null;
  if (channel) {
    channel.lastPinTimestamp = time;
    client.emit(Events.CHANNEL_PINS_UPDATE, channel, time);
  }
};
