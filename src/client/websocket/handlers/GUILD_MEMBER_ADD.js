'use strict';

const { Events } = require('../../../util/Constants');
const Util = require('../../../util/Util');

module.exports = (client, { d: data }, shard) => {
  const guild = Util.getOrCreateGuild(client, data.guild_id, shard.id);
  const member = guild.members._add(data);
  if (Number.isInteger(guild.memberCount)) {
    guild.memberCount++;
  }
  client.emit(Events.GUILD_MEMBER_ADD, member);
};
