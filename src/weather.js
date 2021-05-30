const request=require('request');


function weather(place,res,callback) {
    // console.log(place);
    location(place,(data,error)=>{
        if(error)
        {
            return res.send([{error:'Could not get location'}]);
        } else if(data.features.length<1)
        {
            return res.send([{error:'Enter valid location'}]);
        } else
        {
            const info=[data.features[0].center[1],data.features[0].center[0],data.features[0].place_name];
            const url=`http://api.weatherstack.com/current?access_key=4e8613fc875752db4643f7b40c49a3ea&query=${info[0]},${info[1]}`;
            request({url:url,json:true},(error,response)=>{
                callback(response.body.current.weather_descriptions,response.body.current.observation_time,error)
                // console.log(response);
            })
        }
    })
    
}

function location(place,callback) {
    place=place.replace(' ','%20')
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+place+".json?access_token=pk.eyJ1IjoiZ2F1c3MxMDUiLCJhIjoiY2twMWU5NjE1MWFyYjJvbzJpOTJ1dHoydSJ9.nofLkFFlNLVa9SilBZbK_w"
    request({url:url,json:true},(error,response)=>{
        // const data=[response.body.features[0].center[1],response.body.features[0].center[0],response.body.features[0].place_name];
        callback(response.body,error)
    })
}

module.exports={weather,location}