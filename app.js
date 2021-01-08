window.addEventListener('load',()=>{
    let city_btn=document.querySelector('.search-city')
    city_btn.addEventListener('click',()=>{
        let city_name=document.querySelector('.search-val').value;

        weatherapi_url = "http://api.openweathermap.org/data/2.5/weather?q=" + city_name + "&appid=05964be4af2fc2a2b7525c680828da7c&units=metric"
        fetch(weatherapi_url).then((data)=>{
            return data.json()
        })
        .then(data=>{
            if(data.cod=="404"){
                alert('Enter Valid City Name :-)');
            }else{
            console.log(data);
            city_temp=data.main.temp;
            let city_timezone=data.name;
            let city_description=data.weather[0].description;
            document.querySelector('.temperature-description').textContent=city_description;
            document.querySelector('.location-timezone').textContent=city_timezone;
            document.querySelector('.temperature-degree').textContent=city_temp;
            }

        });

    })

    let long;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(lat,long)
            const api=`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d9c68d659d3b5e061f806f68d9f26852`
            fetch(api)
                .then(response=>{
                    return response.json();
                })
                .then(data=>{
                    console.log(data);
                    temperature_main=parseInt(data.main.temp-273.15);
                    let timezone=data.name;
                    let description=data.weather[0].description;
                    document.querySelector('.temperature-description').textContent=description;
                    document.querySelector('.location-timezone').textContent=timezone;
                    document.querySelector('.temperature-degree').textContent=temperature_main;
                    
                })
            let span=document.querySelector('.span')
            span.addEventListener('click',()=>{
                console.log('clicked')
                var temperature=document.querySelector('.temperature-degree').textContent
                if(span.textContent=='C'){
                    var fara=(temperature*9/5)+32
                    span.textContent='F';
                    document.querySelector('.temperature-degree').textContent=fara
                }else{
                    document.querySelector('.temperature-degree').textContent=temperature_main
                    span.textContent='C'
                }
            })
        
        })
    }

})