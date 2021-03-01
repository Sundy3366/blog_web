import Translate from '../json/translate.json'

export const translate = (text) => {
	const languageCode = sessionStorage.getItem('language')
	return (text in Translate)? Translate[text][languageCode] : text
}
