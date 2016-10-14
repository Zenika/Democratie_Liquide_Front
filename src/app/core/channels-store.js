import { URL as ApiUrl } from '../config/api_stubs';
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
    return ReactHttp.fetch(`${ApiUrl}channels/${channelId}/join`, { method: 'post' });
  }

  leaveChannel(channelId) {
    return ReactHttp.fetch(`${ApiUrl}channels/${channelId}/leave`, { method: 'post' });
  }

}

export default new ChannelsStore();
