'use strict';

const Collection = require('../../../util/Collection');
const { Events } = require('../../../util/Constants');
const Util = require('../../../util/Util');

module.exports = (client, { d: data }, shard) => {
  data.shardId = shard.id;
  const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
  if (guild.stickers.cache instanceof LimitedCollection) {
    const stickers = new Collection();
    for (const sticker of data.stickers) {
      stickers.set(sticker.id, guild.stickers._add(sticker));
    }
    client.emit(Events.GUILD_STICKERS_UPDATE, stickers);
  } else {
    client.actions.GuildStickersUpdate.handle(data);
  }
};
