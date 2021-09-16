'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');
const Util = require('../../util/Util');

class ThreadMembersUpdateAction extends Action {
  handle(data) {
    const client = this.client;
    let thread = client.channels.cache.get(data.id);
    let old;
    if (thread) {
      old = thread.members.cache.clone();
      thread.memberCount = data.member_count;
      data._added_members?.forEach(rawMember => {
        thread.members._add(rawMember);
      });
      data.removed_member_ids?.forEach(memberId => {
        thread.members.cache.delete(memberId);
      });
    } else {
      const guild = Util.getOrCreateGuild(client, data.guild_id, data.shardId);
      thread = client.channels._add({ id: data.id, type: 11 }, guild, { cache: false, allowUnknownGuild: true });
      data._added_members?.forEach(rawMember => {
        thread.members._add(rawMember);
      });
      old = new thread.members.cache.constructor();
    }
    client.emit(Events.THREAD_MEMBERS_UPDATE, old, thread.members.cache);
    return {};
  }
}

module.exports = ThreadMembersUpdateAction;
