import axios from "axios"
import { GET_PROPERTY } from "./constants"


export default function getProperty(id) {
    return async function (dispatch) {
        const response = await axios.get(`/api/properties/${id}`)
        return dispatch({
            type: GET_PROPERTY,
            payload: response.data, 
        });
    }
}