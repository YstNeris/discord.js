'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');
const Util = require('../../util/Util');

class GuildStickersUpdateAction extends Action {
  handle(data) {
    const client = this.client;
    const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
    const deletions = new Map(guild.stickers.cache);
    for (const sticker of data.stickers) {
      const cached = guild.stickers.cache.get(sticker.id);
      if (cached) {
        deletions.delete(sticker.id);
        if (!cached.equals(sticker)) {
          const result = client.actions.GuildStickerUpdate.handle(cached, sticker);
          this.client.emit(Events.GUILD_STICKER_UPDATE, result.old, result.sticker);
        }
      } else {
        const result = client.actions.GuildStickerCreate.handle(guild, sticker);
        this.client.emit(Events.GUILD_STICKER_CREATE, result.sticker);
      }
    }
    for (const deleted of deletions.values()) {
      const result = client.actions.GuildStickerDelete.handle(deleted);
      this.client.emit(Events.GUILD_STICKER_DELETE, result.sticker);
    }
  }
}

module.exports = GuildStickersUpdateAction;
