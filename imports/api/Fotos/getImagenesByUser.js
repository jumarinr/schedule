import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Meteor } from 'meteor/meteor';
import Fotos from '../../collections/fotos';

const getImagenesByUser = new ValidatedMethod({
  name: 'getImagenesByUser',
  validate: null,
  run() {
    this.unblock();
    const userId = Meteor.userId();

    const fotos = Fotos.find({ userId }).fetch();

    return {
      fotos,
      status: 200,
    };
  },
});

export default getImagenesByUser;
