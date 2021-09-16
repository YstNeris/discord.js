'use strict';

const Action = require('./Action');

class GuildStickerDeleteAction extends Action {
  handle(sticker) {
    sticker.guild.stickers.cache.delete(sticker.id);
    sticker.deleted = true;
    return { sticker };
  }
}

module.exports = GuildStickerDeleteAction;
