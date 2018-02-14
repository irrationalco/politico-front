import Ember from 'ember';
import config from '../config/environment';

const { service } = Ember.inject;

export default Ember.Component.extend({
  ajax:    service('ajax'),
  notify:  service('notify'),
  store:   service('store'),
  session: service('session'),

  voterObject(voter, headerName, headerValue) {
    voter.set('date_of_birth', new Date(this.yearOfBirth, this.monthOfBirth - 1, this.dayOfBirth));
    return {
      headers: {
        [headerName]: headerValue
      },
      data: {
        attributes: {
          user_id: this.get('session.currentUser').id,

          electoral_id_number: voter.get('electoralIdNumber'),
          expiration_date: voter.get('expirationDate'),
          emission_year: voter.get('emissionYear'),

          first_name: voter.get('firstName'),
          first_last_name: voter.get('firstLastName'),
          second_last_name: voter.get('secondLastName'),
          gender: voter.get('gender') || "H",
          date_of_birth: voter.get('dateOfBirth'),
          electoral_code: voter.get('electoralCode'),
          curp: voter.get('curp'),

          section: voter.get('section'),
          street: voter.get('street'),
          outside_number: voter.get('outsideNumber'),
          inside_number: voter.get('insideNumber'),
          suburb: voter.get('suburb'),
          locality_code: voter.get('localityCode'),
          locality: voter.get('locality'),
          municipality_code: voter.get('municipalityCode'),
          municipality: voter.get('municipality'),
          state_code: voter.get('stateCode'),
          state: voter.get('state'),
          postal_code: voter.get('postalCode'),

          home_phone: voter.get('homePhone'),
          mobile_phone: voter.get('mobilePhone'),
          email: voter.get('email'),
          alternative_email: voter.get('alternativeEmail'),
          facebook_account: voter.get('facebookAccount'),

          highest_educational_level: voter.get('highestEducationalLevel') || "PRIMARIA",
          current_ocupation: voter.get('currentOcupation') || "SECTOR PUBLICO",

          organization: voter.get('organization') || "JOVENES",
          party_positions_held: voter.get('partyPositionsHeld'),
          is_part_of_party: voter.get('isPartOfParty'),
          has_been_candidate: voter.get('hasBeenCandidate'),
          popular_election_position: voter.get('popularElectionPosition'),
          election_year: voter.get('electionYear'),
          won_election: voter.get('wonElection'),
          election_route: voter.get('electionRoute') || "MAYORIA RELATIVA",
          notes: voter.get('notes')
        }
      }
    };
  },

  getYears(ammount) {
    var from = (new Date()).getFullYear();
    var years = [from];
    for (var i = 1; i <= ammount; i++) {
      years.push(from + i);
    }
    return years;
  },

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

  actions: {

    create(voter) {
      voter.set('date_of_birth', new Date(this.yearOfBirth, this.monthOfBirth - 1, this.dayOfBirth));
      voter.save()
      .then(() => {
        this.sendAction("refreshVoters");
        this.get('notify').success("Registro guardado exitosamente.");
        this.sendAction('transitionToVoters');
      })
      .catch(err => {
        console.log(err);
        this.get('notify').alert("El registro no pudo ser guardado.");
      });
    },

    update(voter) {
      this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
        this.get('ajax').put(config.host + '/api/voters/' + voter.get('id'), this.voterObject(voter, headerName, headerValue))
          .then(() => {
            voter.deleteRecord();
            this.sendAction('transitionToVoters');
          })
          .catch(err => {
            console.log(err);
            this.get('notify').alert("Make sure all fields are filled correctly.");
          });
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
