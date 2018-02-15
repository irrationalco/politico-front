import DS from 'ember-data';

export default DS.Model.extend({

  userId: DS.attr('number'),

  electoralIdNumber: DS.attr('string'),
  expirationDate: DS.attr('number'),
  emissionYear: DS.attr('number'),

  firstName: DS.attr('string'),
  firstLastName: DS.attr('string'),
  secondLastName: DS.attr('string'),
  gender: DS.attr('string'),
  dateOfBirth: DS.attr('date'),

  electoralCode: DS.attr('string'),
  curp: DS.attr('string'),

  state: DS.attr('string'),
  municipality: DS.attr('string'),
  locality: DS.attr('string'),
  section: DS.attr('number'),
  suburb: DS.attr('string'),
  street: DS.attr('string'),
  outsideNumber: DS.attr('string'),
  insideNumber: DS.attr('string'),
  postalCode: DS.attr('number'),

  stateCode: DS.attr('number'),
  municipalityCode: DS.attr('number'),
  localityCode: DS.attr('number'),

  homePhone: DS.attr('number'),
  mobilePhone: DS.attr('number'),
  email: DS.attr('string'),
  alternativeEmail: DS.attr('string'),
  facebookAccount: DS.attr('string'),

  highestEducationalLevel: DS.attr('string'),
  currentOcupation: DS.attr('string'),

  organization: DS.attr('string'),
  partyPositionsHeld: DS.attr('string'),
  isPartOfParty: DS.attr('boolean'),
  hasBeenCandidate: DS.attr('boolean'),
  popularElectionPosition: DS.attr('string'),
  electionYear: DS.attr('number'),
  wonElection: DS.attr('boolean'),
  electionRoute: DS.attr('string'),
  notes: DS.attr('string'),

});
