'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');
const Util = require('../../util/Util');

class ThreadMemberUpdateAction extends Action {
  handle(data) {
    const client = this.client;
    let thread = client.channels.cache.get(data.id);
    if (!thread) {
      const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
      thread = client.channels._add({ id: data.id, type: 11 }, guild, { cache: false, allowUnknownGuild: true });
      Util.makePartial(thread);
    }
    let member = thread.members.cache.get(data.user_id);
    let old;
    if (member) {
      old = member._update(data);
    } else {
      member = thread.members._add(data);
      old = thread.members._add({ user_id: data.user_id }, false);
      old.partial = true;
    }
    client.emit(Events.THREAD_MEMBER_UPDATE, old, member);
    return {};
  }
}

module.exports = ThreadMemberUpdateAction;
