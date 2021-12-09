import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';

import _ from 'lodash';

const MIN_PAGE = 1;
const MAX_PAGE = 184;
const URL_PAGE_HUMBLE = 'http://hubblesite.org/api/v3/image/';

const getRandomPage = () => Math.floor(Math.random() * (MAX_PAGE - MIN_PAGE) + MIN_PAGE);

const getIndividualPhoto = (item) => {
  try {
    const image = HTTP.call('GET', `${URL_PAGE_HUMBLE}${item.id}`);

    return image.data;
  } catch (error) {
    return {};
  }
};

const getImagenesByUser = new ValidatedMethod({
  name: 'getHubbleRecomendations',
  validate: null,
  run() {
    this.unblock();

    const page = getRandomPage();

    try {
      const result = HTTP.call('GET', `http://hubblesite.org/api/v3/images/all?page=${page}`);

      const dataPages = _.get(result, 'data', []);

      return dataPages.map(getIndividualPhoto);
    } catch (e) {
      console.log(e);
      throw new Meteor.Error('error_consultando_fotos', 'Error al obtener las fotos');
    }
  },
});

export default getImagenesByUser;
