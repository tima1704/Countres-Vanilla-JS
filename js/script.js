const itmes = document.querySelector('.itmes');
const info_items = document.querySelector('.info_items');
const content_main = document.querySelector('.content_main');
const input_header = document.querySelector('.input_header');
const input_headtwo = document.querySelector('.input_headtwo')
const all = document.querySelector('.all');
const asia = document.querySelector('.asia');
const americas = document.querySelector('.americas');
const europe = document.querySelector('.europe');
const oceania = document.querySelector('.oceania');
const africa = document.querySelector('.africa');

const routes = {
    all: 'all',
    capital: 'capital',
    name: 'name',
}
const region = {
    africa: 'africa',
    americas: 'americas',
    asia: 'asia',
    europe: 'europe',
    oceania: 'oceania',
}
const information = {
    alpha: 'alpha'
}
const getapi = (routes,cb) => {
    const xhr = new XMLHttpRequest();
    const baseURL = 'https://restcountries.eu/rest/v2'
    xhr.open('GET' , `${baseURL}/${routes}`);
    xhr.addEventListener('load' , () => {
        const response = JSON.parse(xhr.response)
        cb(response)
    })
    xhr.addEventListener('error' , error => {
        console.log(error);
    })
    xhr.send();
}
window.addEventListener('load' , () => {
    getapi(routes.all, res => {
        const temp = res.map(item => cardTemp(item)).join('');
        itmes.innerHTML = temp;
    });
});
function cardTemp(country){
    return `
    <div class="card">
        <div class="card_header">
            <img src="${country.flag}">
        </div>
        <div class="card_body">
            <h1>${country.name}</h1>
            <h5>${country.capital}</h5>
        </div>
        <div class="card_footer">
            <button class="btn_card" onclick="activeMore('${country.name}')">Lern More</button>   
        </div>
    </div>
    `
}
const getSix = (region,cb) => {
    const xhrsix = new XMLHttpRequest();
    const baseregion = 'https://restcountries.eu/rest/v2/';
    xhrsix.open('GET' , `${baseregion}region/${region}`)
    xhrsix.addEventListener('load' , () => {
        const responsesix = JSON.parse(xhrsix.response);
        cb(responsesix);
    });
    xhrsix.addEventListener('error' , (err) => {
        console.log(err);
        console.log('error');
    });
    xhrsix.send();
}

// reigon

asia.addEventListener('click' , e=> {
    e.preventDefault();
    getSix(region.asia, res => {
        itmes.innerHTML = res.map( itmes => cardTemp(itmes)).join('');
    });
});
europe.addEventListener('click' , e=> {
    e.preventDefault();
    getSix(region.europe, res => {
        itmes.innerHTML = res.map( itmes => cardTemp(itmes)).join('');
    });
});
americas.addEventListener('click' , e=> {
    e.preventDefault();
    getSix(region.americas, res => {
        itmes.innerHTML = res.map( itmes => cardTemp(itmes)).join('');
    });
});
oceania.addEventListener('click' , e=> {
    e.preventDefault();
    getSix(region.oceania, res => {
        itmes.innerHTML = res.map( itmes => cardTemp(itmes)).join('');
    });
});
africa.addEventListener('click' , e=> {
    e.preventDefault();
    getSix(region.africa, res => {
        itmes.innerHTML = res.map( itmes => cardTemp(itmes)).join('');
    });
});
all.addEventListener('click' , () => {
    window.location.reload();
})

// search

input_header.addEventListener('input' , e => {
    const value = e.target.value;
    if(!value){
        getapi(routes.all , res => {
            const temp = res.map(item => cardTemp(item)).join("")
            itmes.innerHTML = temp;
        });
    }else{
        getapi(`${routes.name}/${value}` , res => {
            const temp = res.map(item => cardTemp(item)).join("")
            itmes.innerHTML = temp;
        });
    };
})
input_headtwo.addEventListener('input' , e => {
    const value = e.target.value;
    if(!value){
        getapi(routes.all , res =>{
            const temp = res.map(itime => cardTemp(itime)).join("");
            itmes.innerHTML = temp
        });
    }else{
        getapi(`${routes.capital}/${value}` , res =>{
            const temp = res.map(itime => cardTemp(itime)).join("");
            itmes.innerHTML = temp
        });
    };
});

// information


function activeMore(url){
    const xhr = new XMLHttpRequest();
    baseInformation = `https://restcountries.eu/rest/v2/name/${url}`;
    xhr.open('GET' , `${baseInformation}`)
    xhr.addEventListener('load' , () => {
        const response = JSON.parse(xhr.response);
        console.log(response);
        const temp = response.map(({name,borders,capital,population,timezones,region,flag}) => {
            return `
            <div class="content_info">
                <div class="content_left">
                    <img src="${flag}">
                </div>
                <div class="content_right">
                    <h1>Country: <span>${name}</span></h1>
                    <h4>borders: <span>${borders}</span></h4>
                    <h4>capital: <span>${capital}</span></h4>
                    <h4>population: <span>${population}</span></h4>
                    <h4>timezones: <span>${timezones}</span></h4>
                    <h4>region: <span>${region}</span></h4>
                    <button class="btn_info" onclick="infofunc()">back</button>
                </div>
            </div>

            `
        })
        itmes.innerHTML = temp
    });
    xhr.send();
}
function infofunc(){
    window.location.reload()
}