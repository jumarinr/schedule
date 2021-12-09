import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Promise } from 'meteor/promise';
import { Meteor } from 'meteor/meteor';

import BlueBird from 'bluebird';

import Canciones from '../../collections/canciones';
import Calendario from '../../collections/calendario';
import Fotos from '../../collections/fotos';
import Notas from '../../collections/notas';

const estadisticasUsuario = new ValidatedMethod({
  name: 'estadisticasUsuario',
  validate: null,
  run() {
    this.unblock();
    const _id = Meteor.userId();

    const CancionesRawCollection = Canciones.rawCollection();
    const NotasRawCollection = Notas.rawCollection();
    const CalendarioRawCollection = Calendario.rawCollection();
    const FotosRawCollection = Fotos.rawCollection();
    const UsersRawCollection = Meteor.users.rawCollection();

    const topArtistasPromesa = CancionesRawCollection
      .aggregate([
        {
          $match: {
            userId: _id,
          },
        }, {
          $group: {
            _id: '$artist',
            count: {
              $sum: 1,
            },
          },
        }, {
          $sort: {
            count: -1,
          },
        }, {
          $limit: 5,
        },
      ])
      .toArray();

    const ultimaNotaPromesa = NotasRawCollection.findOne({
      userId: _id,
    }, {
      $sort: { _id: -1 },
      limit: 1,
      readPreference: 'secondaryPreferred',
    });

    const ultimoEventoPromesa = CalendarioRawCollection.findOne({
      userId: _id,
    }, {
      $sort: { _id: 1 },
      limit: 1,
      readPreference: 'secondaryPreferred',
    });

    const ultimaFotoPromesa = FotosRawCollection.findOne({ userId: _id }, {
      $sort: { _id: -1 },
      limit: 1,
      readPreference: 'secondaryPreferred',
    });

    const cancionesPromesa = CancionesRawCollection.count({ userId: _id });
    const calendarioPromesa = CalendarioRawCollection.count({ userId: _id });
    const fotosPromesa = FotosRawCollection.count({ userId: _id });
    const notasPromesa = NotasRawCollection.count({ userId: _id });
    const userDataPromesa = UsersRawCollection.findOne({
      _id,
    }, {
      fields: {
        services: 0,
      },
      readPreference: 'secondaryPreferred',
    });

    const statsPromise = BlueBird.props({
      topArtistas: topArtistasPromesa,
      ultimaNota: ultimaNotaPromesa,
      ultimoEvento: ultimoEventoPromesa,
      ultimaFoto: ultimaFotoPromesa,
      canciones: cancionesPromesa,
      calendario: calendarioPromesa,
      fotos: fotosPromesa,
      notas: notasPromesa,
      userData: userDataPromesa,
    });

    const stats = Promise.await(statsPromise);

    return { ...stats };
  },
});

export default estadisticasUsuario;
