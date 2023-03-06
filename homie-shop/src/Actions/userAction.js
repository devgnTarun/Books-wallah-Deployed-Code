import axios from "axios";
import { LOGIN_FAIL , LOGIN_SUCCESS , LOGIN_REQUEST, CLEAR_ERROR, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_FAIL, LOGOUT_SUCCESS, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, ALL_USER_REQUEST, ALL_USER_SUCCESS, ALL_USER_FAIL, USERS_DETAIL_REQUEST, USERS_DETAIL_SUCCESS, USERS_DETAIL_FAIL, UPDATE_ADMIN_USER_REQUEST, UPDATE_ADMIN_USER_SUCCESS, UPDATE_ADMIN_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL } from "../Constants/userConstant";


//Login user

export const login = (email , password) => async (dispatch) => {
    try {
        dispatch({type : LOGIN_REQUEST})

        // const config = {headers :{"Content-Type" : 'application/json'} }
        // const {data} =  await axios.post('http://localhost:4000/api/v1/login' ,  {email , password}  , config )


        await axios.post("/api/v1/login", { email, password })
        .then((response) => {
          const token = response.data.token;
          document.cookie = `token=${token};`;
          dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data,
          });
        })

    } catch (error) {
        dispatch({
            type : LOGIN_FAIL,
            payload : error.response.data.message
        })
    }
}


//Register user

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({type : REGISTER_REQUEST})

        const config = {headers :{"Content-Type" : 'multipart/form-data'} }

    
        const {data} = await axios.post('/api/v1/register' , userData , config)

        dispatch({
            type : REGISTER_SUCCESS,
            payload : data,
        })

    } catch (error) {
            dispatch({
                type : REGISTER_FAIL,
                payload : error.response.data.message})
    }
}

//Logout user 

export const logoutUser = () => async (dispatch) => {
    try {
        await axios.get('/api/v1/logout');
        dispatch({
            type : LOGOUT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type : LOGOUT_FAIL,
            payload: error.response.data.message,
        })
    }
}


//Load user --------- 

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({type : LOAD_USER_REQUEST})

        // const {data} =  await axios.get('http://localhost:4000/api/v1/me')

     await  axios
        .get("/api/v1/me" , {withCredentials : true })
        .then((response) => {
            const data = response.data

          dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data
          });
        })
        
    } catch (error) {
        dispatch({
            type : LOAD_USER_FAIL,
            payload : error.response.data.message,
        })
    }
}

//Update user

export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({type : UPDATE_USER_REQUEST})

        const config = {headers :{"Content-Type" : 'multipart/form-data'} }

        
        const {data} = await axios.put('/api/v1/me/update' , userData , config)

        dispatch({
            type : UPDATE_USER_SUCCESS,
            payload : data.success,
        })

    } catch (error) {
            dispatch({
                type : UPDATE_USER_FAIL,
                payload : error.response.data.message})
    }
}


//Update Password

export const updatePassword = (password) => async (dispatch) => {
    try {
        dispatch({type : UPDATE_PASSWORD_REQUEST})

        const config = {headers :{"Content-Type" : 'application/json'} }

        
        const {data} = await axios.put('/api/v1/password/update' , password , config)

        dispatch({
            type : UPDATE_PASSWORD_SUCCESS,
            payload : data.success,
        })

    } catch (error) {
            dispatch({
                type : UPDATE_PASSWORD_FAIL,
                payload : error.response.data.message})
    }
}

//Forgot password

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({type : FORGOT_PASSWORD_REQUEST})

        const config = {headers :{"Content-Type" : 'application/json'} }
        const {data} =  await axios.post('/api/v1/password/forgot' ,  email  , config )

          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message,
          });
        

    } catch (error) {
        dispatch({
            type : FORGOT_PASSWORD_FAIL,
            payload : error.response.data.message
        })
    }
}

//ResetForgot password

export const resetPassword = (token, password) => async (dispatch) => {
    try {
        dispatch({type : RESET_PASSWORD_REQUEST})

        const config = {headers :{"Content-Type" : 'application/json'} }
        const {data} =  await axios.put(`/api/v1/resetPassword/${token}` ,  password  , config )

          dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data.success,
          });
        

    } catch (error) {
        dispatch({
            type : RESET_PASSWORD_FAIL,
            payload : error.response.data.message
        })
    }
}

//Get all  users

export const getAllUsersAction = () => async (dispatch) => {
    try {
        dispatch({type : ALL_USER_REQUEST})
     const {data} =    await axios.get('/api/v1/admin/users');
        dispatch({
            type : ALL_USER_SUCCESS,
            payload : data.users,
        })
    } catch (error) {
        dispatch({
            type : ALL_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}

//Get User Details ----- Admin

export const getUsersDetailAction = (id) => async (dispatch) => {
    try {
        dispatch({type : USERS_DETAIL_REQUEST})
     const {data} = await axios.get(`/api/v1/admin/user/${id}`);
        dispatch({
            type : USERS_DETAIL_SUCCESS,
            payload : data.user,
        })
    } catch (error) {
        dispatch({
            type : USERS_DETAIL_FAIL,
            payload: error.response.data.message,
        })
    }
}

//Update user role --- Admin

export const updateUserRoleAction = ( id, userData) => async (dispatch) => {
    try {
        dispatch({type : UPDATE_ADMIN_USER_REQUEST})

        const config = {headers :{"Content-Type" : 'multipart/form-data'} }

        
        const {data} = await axios.put(`/api/v1/admin/user/${id}` , userData , config)

        dispatch({
            type : UPDATE_ADMIN_USER_SUCCESS,
            payload : data.success,
        })
 
    } catch (error) {
            dispatch({
                type : UPDATE_ADMIN_USER_FAIL,
                payload : error.response.data.message})
    }
}
//DELETE user  --- Admin

export const deleteUserAction = ( id) => async (dispatch) => {
    try {
        dispatch({type : DELETE_USER_REQUEST})

        const {data} = await axios.delete(`/api/v1/admin/user/${id}`)

        dispatch({
            type : DELETE_USER_SUCCESS,
            payload : data,
        })

    } catch (error) {
            dispatch({
                type : DELETE_USER_FAIL,
                payload : error.response.data.message})
    }
}



//Clearing all errors
export const clearError = () => async (dispatch)=>{
    dispatch({type : CLEAR_ERROR})
}


