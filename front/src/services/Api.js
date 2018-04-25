export function get(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: `${__API_URL__}${url}`,
            xhrFields: { withCredentials: true },
            success: function(res) {
                resolve(res)
            },
            error: function(err) {
                reject(err.responseJSON)
            }
        })
    })
}

export function post(url, params) {
    let details = params;
    let formBody = [];
    for(let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: `${__API_URL__}${url}`,
            xhrFields: { withCredentials: true },
            data: formBody,
            success: function (res) {
                resolve(res)
            },
            error: function(err) {
                reject(err.responseJSON)
            }
        })
    });
}




/*
export function get(url, params){
    let query = '';

    if(typeof params === 'object'){
        query = Object.keys(params)
            .map( k => (encodeURIComponent(k) + '=' + encodeURIComponent(params[k])) )
            .join('&');
    }

    let headers = new Headers(),
        options = {
            method  : 'GET',
            headers : headers,
            cache   : 'default'
        };



    return new Promise((resolve, reject)=>{
        if(!__PRODUCTION__)
            console.warn(`[ Call: GET ${__API_URL__ + url + '?' + query} ]`, params);

        fetch(__API_URL__ + url + '?' + query, options)
            .then(response=>{
                let contentType = response.headers.get("content-type");

                if(response.ok){
                    if(contentType && contentType.indexOf("application/json") !== -1) {
                        return response.json();
                    } else {
                        return response.text();
                    }
                } else {
                    throw { code : response.status, message : response.statusText };
                }
            })
            .then(data=>{
                resolve(data.data);
            })
            .catch(error=>{
                if(!__PRODUCTION__){
                    console.error("[ Error: GET " + __API_URL__ + url + " ]");
                    console.error(`[ Error: ${error.message} ]`);
                }
                reject(error);
            })
    });
}

export function post(url, params){
    let data = new FormData();

    data.append( "json", JSON.stringify( typeof params === 'object' ? params : {}) );

    let headers = new Headers(),
        options = {
            method  : 'POST',
            headers : headers,
            cache   : 'default',
            body: data
        };

    return new Promise((resolve, reject)=>{
        if(!__PRODUCTION__)
            console.warn(`[ Call: POST ${__API_URL__ + url} ]`, params);

        fetch(__API_URL__ + url, options)
            .then(response=>{
                let contentType = response.headers.get("content-type");

                if(response.ok){
                    if(contentType && contentType.indexOf("application/json") !== -1) {
                        return response.json();
                    } else {
                        return response.text();
                    }
                } else {
                    throw { code : response.status, message : response.statusText };
                }
            })
            .then(data=>{
                resolve(data.data);
            })
            .catch((error)=>{
                if(!__PRODUCTION__){
                    console.error(`[ Error: POST ${(__API_URL__ + url)} ]`);
                    console.error(`[ Error: ${error.message} ]`);
                }
                reject(error);
            })
    });
}


*/