import DS from 'ember-data';

export default DS.Model.extend({

  user_id: DS.attr('number'),

  electoral_id_number: DS.attr('string'),
  expiration_date: DS.attr('number'),
  emission_year: DS.attr('number'),

  first_name: DS.attr('string'),
  first_last_name: DS.attr('string'),
  second_last_name: DS.attr('string'),
  gender: DS.attr('string'),
  date_of_birth: DS.attr('date'),

  electoral_code: DS.attr('string'),
  curp: DS.attr('string'),

  state: DS.attr('string'),
  municipality: DS.attr('string'),
  locality: DS.attr('string'),
  section: DS.attr('number'),
  suburb: DS.attr('string'),
  street: DS.attr('string'),
  outside_number: DS.attr('string'),
  inside_number: DS.attr('string'),
  postal_code: DS.attr('number'),

  state_code: DS.attr('number'),
  municipality_code: DS.attr('number'),
  locality_code: DS.attr('number'),

  home_phone: DS.attr('number'),
  mobile_phone: DS.attr('number'),
  email: DS.attr('string'),
  alternative_email: DS.attr('string'),
  facebook_account: DS.attr('string'),

  highest_educational_level: DS.attr('string'),
  current_ocupation: DS.attr('string'),

  organization: DS.attr('string'),
  party_positions_held: DS.attr('string'),
  is_part_of_party: DS.attr('boolean'),
  has_been_candidate: DS.attr('boolean'),
  popular_election_position: DS.attr('string'),
  election_year: DS.attr('number'),
  won_election: DS.attr('boolean'),
  election_route: DS.attr('string'),
  notes: DS.attr('string'),

});
