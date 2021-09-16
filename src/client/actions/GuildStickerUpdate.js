'use strict';

const Action = require('./Action');

class GuildStickerUpdateAction extends Action {
  handle(current, data) {
    const old = current._update(data);
    return { old, sticker: current };
  }
}

module.exports = GuildStickerUpdateAction;
