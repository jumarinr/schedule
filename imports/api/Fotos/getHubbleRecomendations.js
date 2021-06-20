import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { HTTP } from 'meteor/http';
import { Promise } from 'meteor/promise';

import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

export const getImagenesByUser = new ValidatedMethod({
  name: 'getHubbleRecomendations',
  validate: null,
  run() {
    this.unblock();
    const min = 1;
    const max = 184;
    const page = Math.floor(Math.random() * (max - min) + min);
    const fotos = [];

    try {
      const result = HTTP.call(
        'GET',
        `http://hubblesite.org/api/v3/images/all?page=${page}`
      );
      if (result && result.statusCode === 200) {
        const a = Promise.await(
          result.data.map((item, key) => {
            const image = HTTP.call(
              'GET',
              `http://hubblesite.org/api/v3/image/${item.id}`
            );
            fotos.push(image.data);
          })
        );
        // console.log(fotos[0]);
        return fotos;
      }
    } catch (e) {
      console.log(e);
      throw new Meteor.Error('Error al obtener las fotos', e);
    }
  }
});
