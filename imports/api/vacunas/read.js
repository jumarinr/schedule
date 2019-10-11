import { ValidatedMethod } from 'meteor/mdg:validated-method';

import SimpleSchema from 'simpl-schema';

import Vacunas from '../../collections/vacunas'

export const leerVacuna = new ValidatedMethod({
    name: 'leerVacuna',
    validate: new SimpleSchema({}).validator(),
    run({}) {
        try {
            let busquedaDeVacuna = Vacunas.find({}).fetch();
            return {
                status: 200,
                data: busquedaDeVacuna
            }
        } catch (error) {
            throw new Meteor.Error(error.message)
        }

    }
});