import { LOGIN_FAIL , LOGIN_SUCCESS , LOGIN_REQUEST, CLEAR_ERROR , REGISTER_SUCCESS , REGISTER_REQUEST ,REGISTER_FAIL , LOAD_USER_SUCCESS , LOAD_USER_REQUEST , LOAD_USER_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_RESET, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_RESET, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_FAIL, RESET_PASSWORD_SUCCESS, ALL_USER_REQUEST, ALL_USER_SUCCESS, ALL_USER_FAIL, USERS_DETAIL_REQUEST, USERS_DETAIL_SUCCESS, USERS_DETAIL_FAIL, UPDATE_ADMIN_USER_REQUEST, UPDATE_ADMIN_USER_SUCCESS, UPDATE_ADMIN_USER_FAIL, UPDATE_ADMIN_USER_RESET, DELETE_USER_REQUEST, DELETE_USER_FAIL, DELETE_USER_SUCCESS, DELETE_USER_RESET } from "../Constants/userConstant";



export const userReducer = (state={user : {} , token : ''}, action ) => {
        switch(action.type) {
            case LOGIN_REQUEST :
             case REGISTER_REQUEST :
            case LOAD_USER_REQUEST:
                return {
                    loading : true,
                    isAuthenticated : false
                }
            case LOGIN_SUCCESS : 
            case REGISTER_SUCCESS:
                return {
                    ...state,
                    loading : false,
                    isAuthenticated : true,
                    user : action.payload.user, 
                }
            case LOAD_USER_SUCCESS:
                return {
                    ...state,
                    loading : false,
                    isAuthenticated : true,
                    user : action.payload.user,
                }
            case LOGOUT_SUCCESS : 
            return {
                user : null,
                isAuthenticated : false,
                loading : false,
            }
            case LOGIN_FAIL :
            case REGISTER_FAIL :
                return {
                    ...state,
                    loading : false,
                    isAuthenticated : false,
                    user : null,
                    error : action.payload
                }
            case LOAD_USER_FAIL:
                return {
                    ...state,
                    loading : false,
                    isAuthenticated : false,
                    user : null,
                    error : action.payload
                }
            case LOGOUT_FAIL : 
            return {
                ...state,
                loading : false,
                error : action.payload
            }
              case CLEAR_ERROR:
                    return {
                      ...state,
                      error : null
                    }

                default :
                return state
        }
}

export const profileReducer = (state={ }, action ) => {
    switch(action.type) {
        case UPDATE_USER_REQUEST :
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_ADMIN_USER_REQUEST: 
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading : true,
            }
        case UPDATE_USER_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS : 
        case UPDATE_ADMIN_USER_SUCCESS:
            return {
                ...state,
                loading : false,
                isUpdated : action.payload,
            }

            case DELETE_USER_SUCCESS:
                return {
                    ...state,
                    loading : false,
                    isDeleted : action.payload.success,
                    message : action.payload.message,
                }
        case UPDATE_USER_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_ADMIN_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        case UPDATE_USER_RESET : 
        case UPDATE_PASSWORD_RESET:
        case UPDATE_ADMIN_USER_RESET:
        return  {
            ...state,
            isUpdated : false,
        }
        case DELETE_USER_RESET:
        return  {
            ...state,
            isDeleted : false,
        }
          case CLEAR_ERROR:
                return {
                  ...state,
                  error : null
                }

            default :
            return state
    }
}



export const forgotPasswordReducer = (state={ }, action ) => {
    switch(action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading : true,
                error : null,
            }
        case RESET_PASSWORD_SUCCESS: 
            return {
                ...state ,
                loading : false,
                success : action.payload,
            }
        case FORGOT_PASSWORD_SUCCESS : 
            return {
                ...state,
                loading : false,
                message : action.payload,
            }
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload
            }
          case CLEAR_ERROR:
                return {
                  ...state,
                  error : null
                }

            default :
            return state
    }
}

// ADMIN REDUCER FOR USER 

export const allUserReducer = (state={ users : [] }, action ) => {
    switch(action.type) {
        case ALL_USER_REQUEST:
            return {
                ...state,
                loading : true,
            }
        case ALL_USER_SUCCESS: 
            return {
                ...state ,
                loading : false,
                users : action.payload,
            }
        case ALL_USER_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload
            }
          case CLEAR_ERROR:
                return {
                  ...state,
                  error : null
                }

            default :
            return state
    }
}

// User details admin 

export const usersDetailReducer = (state={ user : {} }, action ) => {
    switch(action.type) {
        case USERS_DETAIL_REQUEST:
            return {
                ...state,
                loading : true,
            }
        case USERS_DETAIL_SUCCESS: 
            return {
                ...state ,
                loading : false,
                user : action.payload,
            }
        case USERS_DETAIL_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload
            }
          case CLEAR_ERROR:
                return {
                  ...state,
                  error : null
                }

            default :
            return state
    }
}