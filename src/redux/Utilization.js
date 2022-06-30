
import API from './common'
import { localstorageHelper } from './core/data/storage';
import handler from './handling'
import { baseURLMiddlewareHelper } from './middleware/urlMiddleware';

class FormService {
	service_updateroute(route) {
		const request = API.connect().put(`developers/branchroute/pushroute/uid/${localstorageHelper.load('key_identifier')}`,
		{
			route : route
		})
		return request;
	}
	service_tokenization_scanned(value){
		const request = API.connect().get(
			`developers/tokenidentify/${value}`
			)
		return request;
	}
	service_login(object){
		const request = API.connect().post(
			'developers/devlogin',
			handler.HTTPLogin(object)
		)
		return request;
	}
	service_checkdev(username) {
		const request = API.connect().get(
			baseURLMiddlewareHelper('mdrusers/usercheck', username)
		)
		return request;
	}
	service_devcreate(object) {
		const request = API.connect().post(
			'mdrusers/devregistration',
			handler.HTTPManual(object)
		)
		return request
	}
	service_signout(uid){
		const request = API.connect().put(
			baseURLMiddlewareHelper('developers/devbranch/signout/uid', uid)
		  )
		return request
	}
	service_dev_getallusers(){
		const request = API.connect().get('developers/getallusers')
		return request;
	}
}

export default new FormService()