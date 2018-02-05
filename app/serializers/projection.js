// Explicitly telling the serializer to look for pary names in caps, since
// fast_jsonapi doesn't decapitalize attributes like AMS did.
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