import { ValidatedMethod } from 'meteor/mdg:validated-method';

import Canciones from '../../collections/canciones';

const cargarCancionesRecomendadas = new ValidatedMethod({
  name: 'cargarCancionesRecomendadas',
  validate: null,
  run() {
    this.unblock();

    return Canciones.find({ userId: { $exists: false } }).fetch();
  },
});

export default cargarCancionesRecomendadas;
