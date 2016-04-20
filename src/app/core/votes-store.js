import { URL as ApiUrl} from '../config/api';
import ReactHttp from './react-http';

export class VotesStore {

  voteFor(subjectId, propositionArray, pointsArray) {
    var choices = []
    propositionArray.forEach(function(proposition, index){
      choices.push({
        propositionId:proposition.id,
        points: pointsArray[index]
      })
    })
    const requestBody = {
      choices: choices
    };

    return ReactHttp.fetch(`${ApiUrl}votes/${subjectId}`, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    }).then(function(response) {
      return response;
    });
  }

}

export default new VotesStore();
