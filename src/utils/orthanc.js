import { SHA1 } from 'crypto-js'
import join from 'lodash/join'
import orderBy from 'lodash/orderBy'
import { fetchStudies } from '@requests'
import moment from 'moment'

export function getOrthancId(list) {
	let hash = SHA1(join(list, '|')).toString()
	let orthancId = ''
	let delimiter = ''
	for (let i = 0; i < hash.length; i = i + 8) {
		orthancId = orthancId + delimiter + hash.substring(i, i + 8)

		if (i === 0) {
			delimiter = '-'
		}
	}

	return orthancId
}

export function getStudies(data) {
	return new Promise(resolve => {
		fetchStudies(data, {
			headers: {
				"Authorization": `Basic ${sessionStorage.getItem('token')}`
			}
		}).then(res => {
			if (res.data.data.patients.length > 0) {
				const studies = res.data.data.patients[0]['Studies'].map(study => {
					const uid = study["StudyInstanceUID"]
					const datetime = `${study["StudyDate"]}${study["StudyTime"]}`
					return { 'studyUid': uid, 'studyDate': datetime }
				})
				orderBy(studies, function (o) {
					return moment(o.studyDate, 'YYYYMMDDHHmmss').format()
				}, ['desc']);
				resolve(studies)
			} else {
				resolve([])
			}
		}).catch(err => {
			resolve([])
		})
	})


}
