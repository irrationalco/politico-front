import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  notify:  service('notify'),

  years: [],

  states: [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Coahuila",
    "Colima",
    "Chiapas",
    "Chihuahua",
    "Distrito Federal",
    "Durango",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "México",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas"
  ],

  dayOfBirth: NaN,

  monthOfBirth: NaN,

  yearOfBirth: NaN,

  init() {
    this._super(...arguments);
    this.set('years', this.getYears(10));
  },

  didReceiveAttrs() {
    var dob = this.voter.get('date_of_birth');
    if (dob) {
      this.set('dayOfBirth', dob.getDate() + 1);
      this.set('monthOfBirth', dob.getMonth() + 1);
      this.set('yearOfBirth', dob.getFullYear());
    }
  },

  getYears(ammount) {
    var from = (new Date()).getFullYear();
    var years = [from];
    for (var i = 1; i <= ammount; i++) {
      years.push(from + i);
    }
    return years;
  },

  actions: {

    save(voter) {
      // Setting default values
      voter.set('date_of_birth', new Date(this.yearOfBirth, this.monthOfBirth - 1, this.dayOfBirth));
      voter.gender = voter.gender || 'H';
      voter.highestEducationalLevel = voter.highestEducationalLevel || 'PRIMARIA';
      voter.currentOcupation = voter.currentOcupation || 'SECTOR PUBLICO';
      voter.electionRoute = voter.electionRoute || 'MAYORIA RELATIVA';

      voter.save()
      .then(() => {
        this.get('notify').success("Registro guardado exitosamente.");
        this.sendAction('transitionToVoters');
      })
      .catch(err => {
        console.log(err);
        this.get('notify').alert("El registro no pudo ser guardado.");
      });
    },

    updateGender(voter, value) {
      voter.set('gender', value);
      document.getElementById(value+'-btn').classList.add('active');
      document.getElementById((value==='H'?'M':'H')+'-btn').classList.remove('active');
    },

    updateEducation(voter, value) {
      voter.set('highest_educational_level', value);
    },

    updateOcupation(voter, value) {
      voter.set('current_ocupation', value);
    },

    updateOrganization(voter, value) {
      voter.set('organization', value);
    },

    updateElectionRoute(voter, value) {
      voter.set('election_route', value);
    },

    updateExpirationDate(voter, value) {
      voter.set('expiration_date', value);
    },

    updateState(voter, value) {
      voter.set('state_code', value + 1);
      voter.set('state', this.states[value]);
    },
  }
});
