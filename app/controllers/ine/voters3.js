import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
	session: service('session'),
	ajax: 	 service('ajax'),
	notify:  service('notify'),
	store: 	 service('store'),

	actions: {
		searchVoters(term) {
			return this.get('store').query('voter', {name: term});
		},

		seeVoter(voter) {
			this.send('transitionToVoterEdit', voter.id);
		},

		deleteVoter(voterId) {
			this.get('store').findRecord('voter', voterId, { backgroundReload: false }).then( voter => {
				voter.destroyRecord().then(() => {
					this.get('notify').alert("Deleted record successfully.", { closeAfter: null});
				}, (err) => {
					console.log(err);
					this.get('notify').alert("Error deleting record.", { closeAfter: null});
				});
			});
		},

		testNotify() {
			this.get('notify').info("Some Message");
		}
	}
});