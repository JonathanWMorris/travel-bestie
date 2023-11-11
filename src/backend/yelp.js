const access_token = "_";

const baseSearchURL = "https://corsproxy.io/?https://api.yelp.com/v3/businesses/search?";

async function sendYelpAPI() {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + access_token);

    try {
        const response = await fetch(
            baseSearchURL + "categories=bars&limit=50&location=New York",
            {
                headers: myHeaders,
            }
        );

        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

async function yelpCity(cityName) {
    const limit = 10;

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + access_token);

    try {
        const response = await fetch(
            baseSearchURL + "&location=" + cityName + "limit=" + limit,
            {
                headers: myHeaders,
            }
        );
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

async function yelpObject(cityName, placeName) {
    const limit = 1;
    const encodedplaceName = encodeURIComponent(placeName);

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + access_token);

    const url =
        baseSearchURL +
        "&location=" +
        cityName +
        "&term=" +
        encodedplaceName +
        "&sort_by=best_match&limit=" +
        limit;

    try {
        const response = await fetch(url, {
            headers: myHeaders,
        });


        if (response.ok) {
            const json = await response.json();
            if (json.businesses.length === 0) {
                return null;
            }
            return json;
          } else {
            return null;
        }

    } catch (error) {
        console.error(error);
    }
}

async function yelpDetailedObject(businesses_id) {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + access_token);

    const url = "https://corsproxy.io/?https://api.yelp.com/v3/businesses/" + businesses_id;

    try {
        const response = await fetch(url, {
            headers: myHeaders,
        });

        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

async function yelpObjects(cityName, arrayPlaces) {
    if (arrayPlaces === undefined || cityName === undefined){
        return;
    }
    
    var results = [];
    for (let i = 0; i < arrayPlaces.length; i++) {
        var result = await yelpObject(cityName, arrayPlaces[i].name);
        if (result !== null) {
            results.push(result);
        }
        
    }
    return results;
}

export { sendYelpAPI, yelpCity, yelpObjects, yelpDetailedObject };
