// Explicitly telling the serializer to look for pary names in caps,
// since fast_jsonapi doesn't decapitalize attributes like AMS did, 
// also fast_jsonapi doesn't refactor underscores to hyphens which ember's JsonApi serializer expects to
// so unless it is fixed in the future, we have to create a serializer whenever we use fast_jsonapi for a model
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  attrs: {
    sectionCode:  'section_code',
    muniCode: 		'muni_code',
    stateCode: 		'state_code',
    districtCode: 'district_code',
    nominalList:  'nominal_list',
    totalVotes: 	'total_votes',
    electionType: 'election_type',
    year: 				'year',
    PAN: 	 				'PAN',
    PCONV: 				'PCONV',
    PES:   				'PES',
    PH:    				'PH',
    PMC:   				'PMC',
    PMOR:  				'PMOR',
    PNA:   				'PNA',
    PPM:   				'PPM',
    PRD:   				'PRD',
    PRI:   				'PRI',
    PSD:   				'PSD',
    PSM:   				'PSM',
    PT:    				'PT',
    PVEM:  				'PVEM'
  }
});