import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';

import Vacunas from '../../collections/vacunas'

export const buscarVacunaPorNombre = new ValidatedMethod({
    name: 'buscarVacunaPorNombre',
    validate: new SimpleSchema({nombre: {type: String}}).validator(),
    run({
        nombre
    }) {
        try {
            let busquedaDeVacuna = Vacunas.findOne({nombre});
            if(busquedaDeVacuna){
                return {
                    status: 200,
                    data: busquedaDeVacuna
                }
            }else{
                return {status: 404}
            }
            
        } catch (error) {
            throw new Meteor.Error(error.message)
        }

    }
});