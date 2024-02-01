// student name: Dishap Shrestha
// university id:2409012

//storing api url in a variable 
const api_url="https://api.openweathermap.org/data/2.5/weather?q="
const api_key="21cac01e411ed2c5fe0e10772a8d64f1"

//  address = "copenhagen";
//storing the input from input box in order to use it to invoke function.
const search_input=document.querySelector(".searchin");
var search_btn=document.querySelector(".searchbutton");
var weather_icon=document.querySelector(".sidetemperatureicon");
//using async function 
async function fetchdata(place){
    try{
        //fetching data from api
        //const response=await fetch(api_url+place+`&units=metric&appid=${api_key}`);
        const response= await fetch(`http://localhost/portfolio/Dishap_shrestha_2409012.php?place=${place}`)
        // console.log(response);
        const data=await response.json();
        console.log("data:",data);
        // adding time stamp
        // const timestamp=data.dayanddate
   
        let date= new Date(data.dayanddate*1000).toLocaleDateString('en-US',{
            weekday: 'short',
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            minute: 'numeric'
        })
        // using document.queryselector to get access into innerHTML
        document.querySelector(".timezone").textContent=date;
        document.querySelector(".sideboxtemperature").textContent=Math.round(data.temperature) + "°C";
        document.querySelector(".sidelocation").textContent=data.place;
        document.querySelector(".pressuretext1").textContent=data.pressure;
        document.querySelector(".windtext1").textContent=data.windspeed;
        document.querySelector(".humiditytext1").textContent=data.humidity +"%";
        document.querySelector(".description").textContent=data.descript
        // if condition to change the weather according to different conditions.
        if (data.descript== "Clouds") {
                weather_icon.src = "https://raw.githubusercontent.com/dishav123/prototype/b38a434b381ac1a6e3708039039f3a0b3eed87f7/cloudy%20(1).png";
                document.querySelector(".b7icon").src="https://raw.githubusercontent.com/dishav123/prototype/b38a434b381ac1a6e3708039039f3a0b3eed87f7/cloudy%20(1).png";
            } else if (data.descript == "Clear") {
                weather_icon.src = "https://raw.githubusercontent.com/dishav123/prototype/7e12e03e312c5653d86bb72d459077189cd68208/sun.png";
            } else if (data.descript === "Rain") {
                weather_icon.src = "https://raw.githubusercontent.com/dishav123/prototype/1029223fcacdc8e2f87c8c6e777f170632cef44e/rain.png";
            } else if (data.descript == "Mist" || "Fog") {
                weather_icon.src ="https://raw.githubusercontent.com/dishav123/prototype/1b54aa5d9278a1e246d9597ab395bc4d3ff25594/mist.png";
            } else if (data.descript == "Snow") {
                weather_icon.src = "https://raw.githubusercontent.com/dishav123/prototype/740f4fe70d9636b4c0d0571957888d4d06db5602/snow.png";
            }         
        }
        catch(err){
            console.log("this is error",err);
            alert("location not found!!!")
        }     
    }
    //add event's: if the user clicks the search button it passes the given called "address" into argument
    search_btn.addEventListener("click", async () => {
        address = search_input.value;
        // console.log(address);
        fetchdata(address);
    })
    //adding event listener to fetch the data if the user presses "ENTER" button.
    search_input.addEventListener("keyup", async (press) => {
        if(press.key=="Enter"){
            fetchdata(search_input.value);
            // pastdata(search_input.value);
        }
    });
    fetchdata("copenhagen");
    async function pastdata() {
        try {
            if (search_input.value ==="") {
                place = 'copenhagen';
            } else {
                place = search_input.value;
            }
            let response = await fetch(`http://localhost/portfolio/Dishap_shrestha_2409012.php?place=${place}&history=true`);
            const datapast = await response.json();
            console.log('datapast', datapast);
            // console.log(datapast.length);
            for(let i=0;i<datapast.length;i++){
            let date= new Date(datapast[i].dayanddate*1000).toLocaleDateString('en-US',{
            weekday: 'short',
            day: 'numeric',
            month: 'short',
        })
        // using document.queryselector to get access into innerHTML
            document.querySelector(`#bday${i+1}`).textContent=date;
            //multiple 10 is to show inly one decimal point.
            document.querySelector(`#btemp${i+1}`).textContent=datapast[i].temperature+"°C";
            document.querySelector(`#bhumiditydata${i+1}`).textContent=datapast[i].humidity+"%";
            document.querySelector(`#bpressuredata${i+1}`).textContent=datapast[i].pressure+"Pa";
            document.querySelector(`#bwindspeeddata${i+1}`).textContent=datapast[i].windspeed;
            if (datapast[i].descript== "Clouds") {
                document.querySelector(`.b${i+1}icon`).src = "https://raw.githubusercontent.com/dishav123/prototype/b38a434b381ac1a6e3708039039f3a0b3eed87f7/cloudy%20(1).png";
            } else if (datapast[i].descript == "Clear") {
                document.querySelector(`.b${i+1}icon`).src  = "https://raw.githubusercontent.com/dishav123/prototype/7e12e03e312c5653d86bb72d459077189cd68208/sun.png";
            } else if (datapast[i].descript === "Rain") {
                document.querySelector(`.b${i+1}icon`).src  = "https://raw.githubusercontent.com/dishav123/prototype/1029223fcacdc8e2f87c8c6e777f170632cef44e/rain.png";
            } else if (datapast[i].descript == "Mist" || "Fog" || "Haze") {
                document.querySelector(`.b${i+1}icon`).src  ="https://raw.githubusercontent.com/dishav123/prototype/1b54aa5d9278a1e246d9597ab395bc4d3ff25594/mist.png";
            } else if (datapast[i].descript == "Snow") {
                document.querySelector(`.b${i+1}icon`).src  = "https://raw.githubusercontent.com/dishav123/prototype/740f4fe70d9636b4c0d0571957888d4d06db5602/snow.png";
            }         
            }
        } catch (error) {
            console.error("Error fetching past data:", error);
        }
    }
    // fetchdata("copenhagen");
    // "https://api.openweathermap.org/data/2.5/weather?q=copenhagen&units=metric&appid=21cac01e411ed2c5fe0e10772a8d64f1"
    
    
    // const timestampconversion=Math.floor(Date.now() / 1000) + timestamp;
    // const date = new Date(timestampconversion * 1000);
    // const localDateTime = date.toLocaleString('en-US', {
    //     weekday: 'long',
    //     day: 'numeric',
    //     month: 'long',
    //     year: 'numeric',
    //     hour: 'numeric',
    //     minute: 'numeric',
    //     // second: 'numeric',
    //     timeZone: 'UTC'
    //   });
    