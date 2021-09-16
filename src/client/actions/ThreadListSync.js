'use strict';

const Collection = require('../../util/Collection');
const Action = require('./Action');
const { Events } = require('../../util/Constants');
const Util = require('../../util/Util');

class ThreadListSyncAction extends Action {
  handle(data) {
    const client = this.client;
    const guild = data.guild_id ? Util.getOrCreateGuild(client, data.guild_id, data.shardId) : void 0;
    if (data.channel_ids) {
      for (const id of data.channel_ids) {
        const channel = client.channels.resolve(id);
        if (channel) {
          this.removeStale(channel);
        }
      }
    } else {
      for (const channel of guild.channels.cache.values()) {
        this.removeStale(channel);
      }
    }
    const syncedThreads = data.threads.reduce((coll, rawThread) => {
      const thread = client.channels._add(rawThread);
      return coll.set(thread.id, thread);
    }, new Collection());
    for (const rawMember of Object.values(data.members)) {
      const thread = client.channels.cache.get(rawMember.id) || syncedThreads.get(rawMember.id);
      if (thread) {
        thread.members._add(rawMember);
      }
    }
    client.emit(Events.THREAD_LIST_SYNC, syncedThreads);
    return { syncedThreads };
  }

  removeStale(channel) {
    channel.threads?.cache.forEach(thread => {
      if (!thread.archived) {
        this.client.channels._remove(thread.id);
      }
    });
  }
}

module.exports = ThreadListSyncAction;
