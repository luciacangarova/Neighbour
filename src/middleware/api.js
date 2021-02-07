import axios from "axios";

const SERVER_URL = "https://8r3b4690l4.execute-api.eu-west-2.amazonaws.com/dev";

const HEADERS = {
    'content-type': 'text/plain',
    'accept' : '*',
}

export const postRecords = async (urlString, data) => {
    const url = new URL(SERVER_URL+urlString);

    try{
        const response = await axios(url.href, {
            method: "POST",
            headers: HEADERS,
            data: {"body" : data}
        });
        if (response.status) return response;
    } catch (error) {
        console.log(error);
    }
}

export const putRecords = async (urlString, data) => {
    const url = new URL(SERVER_URL+urlString);

    try{
        const response = await axios(url.href, {
            method: "PUT",
            headers: HEADERS,
            data: {"body" : data}
        });
        if (response.status) return response;
    } catch (error) {
        console.log(error);
    }
}

export const getRecords = async (urlString, additionalHeaders) => {
    const url = new URL(SERVER_URL+urlString);

    try{
        const response = await axios(url.href, {
            method: "GET",
            headers: {...HEADERS, ...additionalHeaders}
        });
        if (response.status) {
            if (response.data.body){return await response.data.body;}
            else {return response.data;}
        }
    } catch (error) {
        console.log(error);
    }
}