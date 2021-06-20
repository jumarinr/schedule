import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Promise } from 'meteor/promise';

import Canciones from '../../collections/canciones';
import Calendario from '../../collections/calendario';
import Fotos from '../../collections/fotos';
import Notas from '../../collections/notas';

import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

export const estadisticasUsuario = new ValidatedMethod({
  name: 'estadisticasUsuario',
  validate: null,
  run() {
    this.unblock();
    const _id = Meteor.userId();
    const topArtistas = Promise.await(
      Canciones.rawCollection()
        .aggregate([
          { $match: { userId: _id } },
          {
            $group: {
              _id: '$artist',
              count: { $sum: 1 }
            }
          },
          { $sort: { count: -1 } },
          { $limit: 5 }
        ])
        .toArray()
    );
    const ultimaNota = Notas.find(
      { userId: _id },
      { $sort: { _id: -1 }, limit: 1 }
    ).fetch();
    const ultimoEvento = Calendario.find(
      { userId: _id },
      { $sort: { _id: 1 }, limit: 1 }
    ).fetch();
    const ultimaFoto = Fotos.find(
      { userId: _id },
      { $sort: { _id: -1 }, limit: 1 }
    ).fetch();

    return {
      userData: Meteor.users.findOne({ _id }, { fields: { services: 0 } }),
      canciones: Canciones.find({ userId: _id }).count(),
      calendario: Calendario.find({ userId: _id }).count(),
      fotos: Fotos.find({ userId: _id }).count(),
      notas: Notas.find({ userId: _id }).count(),
      topArtistas,
      ultimaNota,
      ultimaFoto,
      ultimoEvento
    };
  }
});
