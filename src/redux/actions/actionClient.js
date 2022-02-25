import axios from 'axios';

export function PostClient(client) {

    return async (dispatch) => {
        const json = await axios.post(`http://localhost:3001/api/clients`, client)
        return dispatch({
            type: 'POST_CLIENT',
            payload: json
        })
    }
}
