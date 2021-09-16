'use strict';

const Action = require('./Action');

class GuildStickerCreateAction extends Action {
  handle(guild, createdSticker) {
    const sticker = guild.stickers._add(createdSticker);
    return { sticker };
  }
}

module.exports = GuildStickerCreateAction;
