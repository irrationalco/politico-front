import Ember from 'ember';

const {
	Component,
	inject: { service }
} = Ember;

export default Component.extend({
	session: service('session'),
	notify:	 service('notify'),

	actions: {
		authenticate() {
		let { identification, password } = this.getProperties('identification', 'password');
		this.get('session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
		console.log(reason);
		this.get('notify').alert('Error: Asegurate que tu contraseña y usuario sean correctos.', { closeAfter: null });
      });
    }
	}
});
