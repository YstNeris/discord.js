'use strict';

const Collection = require('../../../util/Collection');
const { Events } = require('../../../util/Constants');
const Util = require('../../../util/Util');

module.exports = (client, { d: data }, shard) => {
  const guild = Util.getOrCreateGuild(client, data.guild_id, shard.id);
  const members = new Collection();
  for (const member of data.members) {
    members.set(member.user.id, guild.members._add(member));
  }
  if (data.presences) {
    for (const presence of data.presences) {
      guild.presences._add(Object.assign(presence, { guild }));
    }
  }
  client.emit(Events.GUILD_MEMBERS_CHUNK, members, guild, {
    count: data.chunk_count,
    index: data.chunk_index,
    nonce: data.nonce,
  });
};
