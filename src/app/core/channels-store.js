import { URL as ApiUrl } from '../config/api';
import wording from '../config/wording';
import ReactHttp from './react-http';

export class ChannelsStore {

  getChannels() {
    return ReactHttp.fetch(`${ApiUrl}channels`)
    .then(function (response) {
      if (response.status === 204) {
        return [];
      }

      return response.json();
    });
  }

  getChannel(channelId) {
    return ReactHttp.fetch(`${ApiUrl}channels/${channelId}`)
    .then(function (response) {
      return response.json();
    });
  }

  createChannel(channel) {
    if (channel.title === wording.defaultChannel) {
      return new Promise(function (resolve, reject) {
        resolve({
          isInError: true,
          msg: 'Vous ne pouvez pas recréer le channel par défaut ;)',
        });
      });
    }

    return ReactHttp.fetch(`${ApiUrl}channels`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(channel),
    }).then(function (response) {
      if (response.isInError == false) {
        const location = response.headers.get('location');
        const splittedLocation = location.split('/');
        response.channelId = splittedLocation[splittedLocation.length - 1];
      }

      return response;
    });
  }

  joinChannel(channelId) {
    return ReactHttp.fetch(`${ApiUrl}channels/${channelId}/join`);
  }

  quitChannel(channelId) {
    return ReactHttp.fetch(`${ApiUrl}channels/${channelId}/quit`);
  }

}

export default new ChannelsStore();
