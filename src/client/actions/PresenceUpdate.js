'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');
const Util = require('../../util/Util');
const LimitedCollection = require('../../util/LimitedCollection');

class PresenceUpdateAction extends Action {
  handle(data) {
    const client = this.client;
    if (data.user.username) {
      const user = client.users.cache.get(data.user.id) || client.users._add(data.user);
      if (!user.equals(data.user)) {
        const { old, updated } = client.actions.UserUpdate.handle(data.user);
        client.emit(Events.USER_UPDATE, old, updated);
      }
    }
    const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
    let old = guild.presences.cache.get(data.user.id)?._clone();
    if (!old) {
      old = guild.presences._add({ user: { id: data.user.id }, guild }, false);
      old.partial = true;
    }
    const presence = guild.presences._add(Object.assign(data, { guild }));
    if (client.listenerCount(Events.PRESENCE_UPDATE) && (old.partial || !presence.equals(old))) {
      client.emit(Events.PRESENCE_UPDATE, old, presence);
    }
    if (
      !(guild.members.cache instanceof LimitedCollection) &&
      !guild.members.cache.has(data.user.id) &&
      data.status !== 'offline'
    ) {
      const member = guild.members._add({
        user: data.user,
        deaf: false,
        mute: false,
      });
      client.emit(Events.GUILD_MEMBER_AVAILABLE, member);
    }
  }
}

module.exports = PresenceUpdateAction;
