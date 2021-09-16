'use strict';

module.exports = (client, packet, shard) => {
  packet.d.shardId = shard.id;
  client.emit('debug', `[VOICE] received voice server: ${JSON.stringify(packet)}`);
  client.voice.onVoiceServer(packet.d);
};
