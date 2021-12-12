document.getElementById("searchbtn").style.display = "none";

var searchinput = document.getElementById("searchinput");

function searchBtnShow() {
    document.getElementById("searchbtn").style.display = "inline";
}

function searchBtnHide() {
    document.getElementById("searchbtn").style.display = "none";
}

var inputVal;
function getInputValue() {
    inputVal = document.getElementById("searchinput").value;
    alert(inputVal);


    // Selecting the input element and get its value 
    // var inputVal = document.getElementById("searchinput").value;

    var geocoder = new google.maps.Geocoder();
    var address = inputVal;

    geocoder.geocode({ 'address': address }, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            alert(latitude);
        }
    });

}
getWeatherData();

function getWeatherData() {
    var days = document.getElementsByTagName("h6");
    var temp1 = document.getElementsByTagName("h5");
    var desc = document.getElementsByClassName("day");
    var cimage = document.getElementsByClassName("cimage");
    var windspeed = document.getElementsByClassName("wind");
    var curr = document.getElementsByClassName("currentDate");
    //alert(cimage.length);
    var imglink = "http://openweathermap.org/img/wn/10d@2x.png";
    var weeks = ["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday", "Sunday"];

    //22.659044098892686, 88.39281091219019

    //AJAX(JQuery)
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=22.659044098892686&lon=88.39281091219019&exclude=minutely,hourly&appid=09ed390aadb804645232d7265e3a4551",
        method: "GET",
        data: {},
        success: function (response) {
            //console.log(response.current.weather[0].description);
            //console.log(response);
            console.log(response.current.dt);
            var dt = response.current.dt;
            var date1 = new Date(dt * 1000);
            curr.innerHTML = date1;
            for (var i = 0; i < 7; i++) {
                //console.log(response.daily[i].dt);
                var timestamp = response.daily[i].dt;
                var date = new Date(timestamp * 1000);
                //console.log(date.getTime())
                //console.log(date)
                //console.log(date.getDay())
                days[i].innerHTML = weeks[date.getDay()];
                //console.log(response.daily[i].weather[0].description);
                desc[i].innerHTML = response.daily[i].weather[0].main;
                cimage[i].src = "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png";
                windspeed[i].innerHTML = response.daily[i].wind_speed + "m/sec";
                temp1[i].innerHTML = response.daily[i].temp.day + "K";
            }



        }
    })
}
src = "https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
integrity = "sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
crossorigin = "anonymous"
