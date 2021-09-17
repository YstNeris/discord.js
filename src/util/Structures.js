'use strict';

/**
 * An extendable structure:
 * * **`ButtonInteraction`**
 * * **`CategoryChannel`**
 * * **`CommandInteraction`**
 * * **`ContextMenuInteraction`**
 * * **`DMChannel`**
 * * **`Guild`**
 * * **`GuildEmoji`**
 * * **`GuildMember`**
 * * **`Message`**
 * * **`MessageReaction`**
 * * **`NewsChannel`**
 * * **`Presence`**
 * * **`Role`**
 * * **`SelectMenuInteraction`**
 * * **`StageChannel`**
 * * **`Sticker`**
 * * **`StickerPack`**
 * * **`StoreChannel`**
 * * **`TextChannel`**
 * * **`ThreadChannel`**
 * * **`ThreadMember`**
 * * **`User`**
 * * **`VoiceChannel`**
 * * **`VoiceState`**
 * * **`WelcomeChannel`**
 * @typedef {string} ExtendableStructure
 */

/**
 * Allows for the extension of built-in Discord.js structures that are instantiated by {@link BaseManager Managers}.
 */
class Structures extends null {
  /**
   * Retrieves a structure class.
   * @param {ExtendableStructure} structure Name of the structure to retrieve
   * @returns {Function}
   */
  static get(structure) {
    if (typeof structure === 'string') return structures[structure];
    throw new TypeError(`"structure" argument must be a string (received ${typeof structure})`);
  }

  /**
   * Extends a structure.
   * <warn> Make sure to extend all structures before instantiating your client.
   * Extending after doing so may not work as expected. </warn>
   * @param {ExtendableStructure} structure Name of the structure class to extend
   * @param {Function} extender Function that takes the base class to extend as its only parameter and returns the
   * extended class/prototype
   * @returns {Function} Extended class/prototype returned from the extender
   */
  static extend(structure, extender) {
    if (!structures[structure]) throw new RangeError(`"${structure}" is not a valid extensible structure.`);
    if (typeof extender !== 'function') {
      const received = `(received ${typeof extender})`;
      throw new TypeError(
        `"extender" argument must be a function that returns the extended structure class/prototype ${received}.`,
      );
    }

    const extended = extender(structures[structure]);
    if (typeof extended !== 'function') {
      const received = `(received ${typeof extended})`;
      throw new TypeError(`The extender function must return the extended structure class/prototype ${received}.`);
    }

    if (!(extended.prototype instanceof structures[structure])) {
      const prototype = Object.getPrototypeOf(extended);
      const received = `${extended.name ?? 'unnamed'}${prototype.name ? ` extends ${prototype.name}` : ''}`;
      throw new Error(
        'The class/prototype returned from the extender function must extend the existing structure class/prototype' +
          ` (received function ${received}; expected extension of ${structures[structure].name}).`,
      );
    }

    structures[structure] = extended;
    return extended;
  }
}

const structures = {
  ButtonInteraction: require('../structures/ButtonInteraction'),
  CategoryChannel: require('../structures/CategoryChannel'),
  CommandInteraction: require('../structures/CommandInteraction'),
  ContextMenuInteraction: require('../structures/ContextMenuInteraction'),
  DMChannel: require('../structures/DMChannel'),
  Guild: require('../structures/Guild'),
  GuildEmoji: require('../structures/GuildEmoji'),
  GuildMember: require('../structures/GuildMember'),
  Message: require('../structures/Message'),
  MessageReaction: require('../structures/MessageReaction'),
  NewsChannel: require('../structures/NewsChannel'),
  Presence: require('../structures/Presence').Presence,
  Role: require('../structures/Role'),
  SelectMenuInteraction: require('../structures/SelectMenuInteraction'),
  StageChannel: require('../structures/StageChannel'),
  Sticker: require('../structures/Sticker'),
  StickerPack: require('../structures/StickerPack'),
  StoreChannel: require('../structures/StoreChannel'),
  TextChannel: require('../structures/TextChannel'),
  ThreadChannel: require('../structures/ThreadChannel'),
  ThreadMember: require('../structures/ThreadMember'),
  User: require('../structures/User'),
  VoiceChannel: require('../structures/VoiceChannel'),
  VoiceState: require('../structures/VoiceState'),
  WelcomeChannel: require('../structures/WelcomeChannel'),
};

module.exports = Structures;
