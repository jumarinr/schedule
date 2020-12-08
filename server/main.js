import './../imports/api';
import './../imports/collections';

import { Enlaces } from './../imports/collections';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  const enlacesPorDefecto = [
    { url: '/Musica', title: 'Musica' },
    { url: '/Inicio', title: 'Inicio' },
    { url: '/Contacto', title: 'Contacto' },
    { url: '/Fotos', title: 'Fotos' },
    { url: '/Notas', title: 'Notas' },
    { url: '/CuentaRegresiva', title: 'CuentaRegresiva' },
  ];
  const totalEnlaces = Enlaces.find().count();

  if (!totalEnlaces) {
    enlacesPorDefecto.forEach((enlace) => Enlaces.insert(enlace));
  }

});
