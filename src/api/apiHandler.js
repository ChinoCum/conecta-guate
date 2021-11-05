
import axios from 'axios';
import conf from './conf.json';


// Get current users profile
export const authUser = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let response;
    try {
        const res  = await axios.get(
            conf.base_url+'/auth/user',
            config
        );
        response = {
            valid: true,
            response: res
        }; 
    } catch (err) {
        response = {
            valid: false,
            response: err
        };
    }
    return response;
};


export const loginUser = async (data) => {
    let response;
    const headers = {"Access-Control-Allow-Origin": "*"};

    try {
        const res  = await axios.post(
            conf.base_url+'/auth/login',
            data,
            headers
        );
        response = {
            valid: true,
            response: res
        }; 
    } catch (err) {
        response = {
            valid: false,
            response: err
        };
    }
    return response;
};