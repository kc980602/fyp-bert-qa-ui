import axios, {AxiosResponse, Method} from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

interface Response extends AxiosResponse {}

class NetworkRequest {
    url: string
    method
    params: { [key: string]: string }
    body: { [key: string]: any } | FormData
    header: { [key: string]: string }

    constructor(url: string, method, params: { [key: string]: string } = {},
                body: object = {}, header: { [key: string]: string } = {}) {
        this.url = url
        this.method = method
        this.params = params
        this.body = body
        this.header = header
    }

    async send(auth: boolean = true): Promise<Response> {
        let rawRes: Response
        try {
            rawRes = await axios.request({
                method: this.method,
                headers: this.header,
                baseURL: process.env.API_DOMAIN,
                params: this.params,
                url: this.url,
                data: this.body,
                validateStatus: function (status) {
                    return (status >= 200 && status < 300) || status === 304
                }
            })
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    if (error.response.data.message) {
                        console.log(error.response.data.message)
                    } else {
                        console.log(error.response.data)
                    }
                } else {
                    console.log(error.response)
                }
            } else if (error.request) {
                console.log(error.request)
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message)
            }
            throw error
        }
        if (rawRes) return rawRes
        throw {message: 'response is void'}
    }
}

function createRequest(url: string, method: Method, params: {} = {}, body: object | FormData = {}, header: { [key: string]: string } = {}): NetworkRequest {
    return new NetworkRequest(url, method, params, body, header)
}

export {
    NetworkRequest,
    createRequest,
    Response
}
