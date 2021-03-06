import axios from "axios";

const url = `/api`;
export function PostClient(client) {
  return async (dispatch) => {
    const json = await axios.post(`${url}/clients`, client);
    return dispatch({
      type: "POST_CLIENT",
      payload: client,
    });
  };
}

export const getUserInfoWithToken = (credentials) => {
  const url = "/api/login";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(url, credentials);
      return dispatch({
        type: "GET_USER_WITH_TOKEN",
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

// export function homeClient (id){
//     const {data} = await axios.get(`${url}/client/${id}`)
//     return dispatch({
//         type:'GET_CLIENT_ID',
//         payload:data
//     })
// }
