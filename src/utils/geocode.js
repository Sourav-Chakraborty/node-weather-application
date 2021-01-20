const request = require("request")



const geocode=(address,callback)=>{
    const url1='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic291cmF2MTE1IiwiYSI6ImNramxvbTlzbjBhdngydXFweXYwNnVvOXMifQ.yHKr6hyZA1y8faodZxFekg&limit=1'
    request({url:url1,json:true},(error,{body})=>{
        if(error)
            callback('unable to get the data',undefined)
         else if(body.features.length==0)
            callback('unable to get the data',undefined)
        else
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })

    })
}
module.exports=geocode
