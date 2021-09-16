'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');
const Util = require('../../util/Util');

class VoiceStateUpdate extends Action {
  handle(data) {
    const client = this.client;
    const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
    if (data.member?.user) {
      const user = client.users.cache.get(data.user_id) || client.users._add(data.member.user);
      if (data.member.user.username && !user.equals(data.member.user)) {
        const { old, updated } = client.actions.UserUpdate.handle(data.member.user);
        client.emit(Events.USER_UPDATE, old, updated);
      }
      const member = guild.members.cache.get(data.user_id);
      if (member) {
        member._update(data.member);
      } else {
        guild.members._add(data.member);
      }
    }
    const oldState =
      guild.voiceStates.cache.get(data.user_id)?._clone() || guild.voiceStates._add({ user_id: data.user_id });
    const newState = guild.voiceStates._add(data);
    client.emit(Events.VOICE_STATE_UPDATE, oldState, newState);
    if (data.user_id === client.user.id) {
      client.emit('debug', `[VOICE] received voice state update: ${JSON.stringify(data)}`);
      client.voice.onVoiceStateUpdate(data);
    }
  }
}

module.exports = VoiceStateUpdate;
