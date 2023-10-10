
/* overlay */
$(window).on('load', function(){ 
    $( ".overlay" ).fadeOut(100, function() { 
      $( ".overlay" ).remove(); 
    }); 
}); 

/* sidebar */
document.querySelectorAll('.sidebar .list-group a').forEach(titleA=>{
    titleA.addEventListener('click',(e)=>{
        e.target.closest('.list-group').querySelectorAll('a').forEach(titleB=>{
            titleB.classList.remove('active')
        })
        e.target.classList.add('active')
    })
})

document.querySelectorAll('section').forEach(mysections=>{
    mysections.addEventListener('mouseover',(e)=>{
        e.currentTarget.classList.forEach(classNameSection=>{
            document.querySelectorAll('.sidebar-main .list-group a').forEach(mySidebarLinks=>{
                if(classNameSection === mySidebarLinks.href.slice(mySidebarLinks.href.indexOf("#") + 1).replace('-title','')) {
                    document.querySelectorAll('.sidebar-main .list-group a').forEach(mySidebarLinksTwo=>{
                        mySidebarLinksTwo.classList.remove('active')
                    })
                    mySidebarLinks.classList.add('active')
                }
            })
        })
    })
}) 

document.querySelectorAll('h3').forEach(mytitles=>{
    mytitles.addEventListener('mouseover',(e)=>{
        document.querySelectorAll('.sidebar-main .list-group a').forEach(mySidebarLinksOne=>{
            if(e.currentTarget.id === mySidebarLinksOne.href.slice(mySidebarLinksOne.href.indexOf("#") + 1)) {
                document.querySelectorAll('.sidebar-main .list-group a').forEach(mySidebarLinksTwo=>{
                    mySidebarLinksTwo.classList.remove('active')
                })
                mySidebarLinksOne.classList.add('active')
            }
        }) 
    })
}) 

if(matchMedia('(width <= 1200px)').matches) {
    $('.sidebar').addClass('active');
}else {
    $('.sidebar').removeClass('active');
}

$('.navbar-btn').on('click', function () {
    $('.sidebar').toggleClass('active');
    document.querySelector('.sidebar').classList.forEach((className)=>{
        if(className == 'active') {
            $('.sidebar').css('margin-left','-250px')
            $('.navbar-btn').css('left', "0")
            $('.content').css('margin-left','0px')
        }else {
            $('.sidebar').css('margin-left','0')
            $('.navbar-btn').css('left', "250px")
            if(matchMedia('(width > 1200px)').matches) {
                $('.content').css('margin-left','250px')
            }
        }
        /* close sidebar when click outside it */
        if(matchMedia('(width <= 1200px)').matches) {
            document.querySelector('.content').addEventListener('click', function handleClickOutsideBox(event) {
                const box = document.querySelector('.sidebar');
                if (!box.contains(event.target)) {
                    $('.sidebar').css('margin-left','-250px')
                    $('.navbar-btn').css('left', "0px")
                }
                setTimeout(() => {
                    $('.sidebar').addClass('active')
                }, 100);
            });
        }
    })
});
/* -------------------------------- */
/* sidebar filter */
let filterInput = document.querySelector('.filter input') 
filterInput.addEventListener('input',e=>{
    document.querySelectorAll('.list-group-item').forEach(element=>{
        if(element.innerText.toLowerCase().includes(e.target.value.toLowerCase())){
            element.style.display = 'block'
        }else{
            element.style.display = 'none'
        }
    })
})

/* perfect scrollbar */
$(".sidebar").mCustomScrollbar({
    theme:"minimal",
    scrollInertia:400
});
/* data-toggle scrollbar */
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});
/* --------------------------------------------------------- */

/* --------------------------------------------------------- */
class Weather {
    constructor(city , state){
        this.apiKey = '037cc32a3ebcd52c21405a886fb602cc'
        this.city = city,
        this.state = state
    }
  
    async getWeather(){
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state}&appid=${this.apiKey}`)
        
        if(response.ok){
            const responseData = await response.json();
            return responseData;
        }else{
            throw Error(response.status);
        }
        
    }
  
    changeLocation(city , state){
        this.city = city,
        this.state = state
    }
}

const weather = new Weather('london' , 'london'); 
  
document.getElementById('w-change-btn').addEventListener('click' , changeLocation);
  
function changeLocation(){
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;

    weather.changeLocation(city , state); 

    getWeather();
}
  
  function getWeather(){
    weather.getWeather()
        .then( result => {
            UI(result);
        } )
        .catch( err => console.log(err.message) );
}
  
document.addEventListener('DOMContentLoaded',getWeather);

function UI(weather){
    document.querySelector(".card .Icon").setAttribute('src' , `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    document.querySelector(".card .City").textContent = weather.name;
    document.querySelector(".card .Type").textContent = weather.weather[0].main;
    document.querySelector(".card .Weather_Severity").textContent = weather.clouds.all;
    document.querySelector(".card .Description").textContent = weather.weather[0].description;
    document.querySelector(".card .Condition").textContent = weather.weather[0].id
    document.querySelector(".card .Wind_Speed").textContent = weather.wind.speed
    document.querySelector(".card .Wind_Deg").textContent = weather.wind.deg
    document.querySelector(".card .Temperature").textContent = weather.main.temp
    document.querySelector(".card .Feels_Like").textContent = weather.main.feels_like
    document.querySelector(".card .Humidity").textContent = weather.main.humidity
    document.querySelector(".card .Pressure").textContent = weather.main.pressure
    document.querySelector(".card .Sunrise").textContent = weather.sys.sunset
    document.querySelector(".card .Sunset").textContent = weather.sys.sunrise
    document.querySelector(".card .Latitude").textContent = weather.coord.lat
    document.querySelector(".card .Longitude").textContent = weather.coord.lon
    document.querySelector(".card .Country").textContent = weather.sys.country
    document.querySelector(".card .Timezone").textContent = weather.timezone
    document.querySelector(".card .Visibility").textContent = weather.visibility
}
/* --------------------------------------------------------- */

/* --------------------------------------------------------- */
document.querySelectorAll('.list-group-item').forEach(navbarItem=>{
    navbarItem.addEventListener('click',(e)=>{
        e.preventDefault()
        e.currentTarget.querySelector('input').classList.forEach(classNameNavbarItem=>{
            if(classNameNavbarItem == 'checked') {
                e.currentTarget.querySelector('input').classList.remove('checked')
            }else {
                e.currentTarget.querySelector('input').classList.add('checked')
            }
        })
    })
})

document.querySelectorAll('.list-group-item').forEach(navbarItem=>{
    navbarItem.addEventListener('click',(e)=>{
        if(e.currentTarget.querySelector('input').classList.contains('checked')  ){
            e.currentTarget.querySelector('input').classList.forEach(classNameNavbarItem=>{
                document.querySelectorAll('.card p :nth-child(2)').forEach(cardItem=>{
                    cardItem.classList.forEach(classNameCardItem=>{
                        if(classNameNavbarItem == classNameCardItem) {
                            cardItem.closest('p').classList.add('d-flex')
                            cardItem.closest('p').style.display= 'block'
                        }
                    })
                })
            })
        } else{
            e.currentTarget.querySelector('input').classList.forEach(classNameNavbarItem=>{
                document.querySelectorAll('.card p :nth-child(2)').forEach(cardItem=>{
                    cardItem.classList.forEach(classNameCardItem=>{
                        if(classNameNavbarItem == classNameCardItem) {
                            cardItem.closest('p').classList.remove('d-flex')
                            cardItem.closest('p').style.display= 'none'
                        }
                    })
                })
            })
        }
    })
})

if(matchMedia('(width <= 600px)').matches) {
    document.querySelectorAll('.list-group a').forEach(navItem=>{
        navItem.attributes['data-placement'].value= 'top'
    })
}






