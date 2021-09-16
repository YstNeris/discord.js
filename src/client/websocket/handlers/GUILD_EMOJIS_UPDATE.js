'use strict';

const Collection = require('../../../util/Collection');
const { Events } = require('../../../util/Constants');
const Util = require('../../../util/Util');

module.exports = (client, { d: data }, shard) => {
  data.shardId = shard.id;
  const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
  if (guild.emojis.cache instanceof LimitedCollection) {
    const emojis = new Collection();
    for (const emoji of data.emojis) {
      emojis.set(emoji.id, guild.emojis._add(emoji));
    }
    client.emit(Events.GUILD_EMOJIS_UPDATE, emojis);
  } else {
    client.actions.GuildEmojisUpdate.handle(data);
  }
};
