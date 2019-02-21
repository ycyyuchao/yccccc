import React from 'react';

const url = 'http://10.31.156.76:3000/people?_sort=id&_order=desc';

export const getData = async () => {
    try {
        let response = await fetch(url);
        let responseJson = await response.json();
        return responseJson;
    } catch (e) {
        console.log(e)
    }
};


export const getPage = async params => {
    try {
        let response = await fetch(url+'&_page='+params.page+'&_limit=10');
        let responseJson = await response.json();
        return responseJson;
    } catch (e) {
        console.log(e)
    }
};