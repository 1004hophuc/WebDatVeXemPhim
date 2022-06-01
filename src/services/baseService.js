import axios from "axios"
import { DOMAIN, TOKEN } from "../util/settings/config"

export class baseService {

    // put json về phía backend
    put = (url, model) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            data: model,
            method: 'PUT',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    post = (url, model) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            data: model,
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    get = (url, model) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            data: model,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    delete = (url, model) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            data: model,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
}