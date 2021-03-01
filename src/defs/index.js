/**cdss版本号*/
export const release_version = '1.2'

export const complete_version = '1.2.2'


/*121
* proxy设置本地IP地址
* */
const environment = process.env.NODE_ENV === 'development'
export const config = {
	serverIp: environment? '//localhost' : `//${document.location.hostname}`,
	serverPort: environment? '8989' : document.location.port,
}

export const base_api = `${config.serverIp}:${config.serverPort}`
