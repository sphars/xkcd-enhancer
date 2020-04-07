console.log('[xkcd enhancer js loaded]');

let comicJson = {};
let comicNumber = getComicNumber();

// get the comic number from current URL
function getComicNumber(){
    var regExp = /\d+/g;
    var comicURL = document.URL;
    return (comicURL.match(regExp) ? comicURL.match(regExp)[0] : '0');
}

// get json url
function getJsonUrl(comicNumber){
    if(comicNumber != '0'){
        return `https://xkcd.com/${comicNumber}/info.0.json`;
    } else {
        return `https://xkcd.com/info.0.json`;
    }
}

// fetch comic data
async function getComicJson(url){
    let response = await fetch(url);
    if(response.ok){
        comicJson = await response.json();
        processComicJson(comicJson);
    } else{
        console.error(`error fetching comic ${getComicNumber()} json: ${response.status}`);
    }
}

// process the comic data
function processComicJson(json){
    addComicDateAndNum(json.year, json.month, json.day, json.num);
    displayComicHoverText(json.alt);
    addComicActions(json);
}

// display the comic's hover text (title attribute) below the comic
function displayComicHoverText(hoverText){
    var comic = document.getElementById('comic');
    var hoverTextElement = document.createElement('p');
    
    hoverTextElement.setAttribute('id', 'hoverText');
    hoverTextElement.appendChild(document.createTextNode(hoverText));
    comic.parentNode.insertBefore(hoverTextElement, comic.nextSibling);    
}

// add date to comic title
function addComicDateAndNum(year, month, day, num){
    var ctitle = document.getElementById('ctitle');
    var comicDate = new Date(Number(year), Number(month) - 1, Number(day));
    
    var comicDateElement = document.createElement('div');
    comicDateElement.id = "cdate";

    var dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};

    comicDateElement.innerText = `#${num} | ${comicDate.toLocaleDateString("en-US", dateOptions)}`;

    ctitle.parentNode.insertBefore(comicDateElement, ctitle.nextSibling);
}

// add comic actions to page
function addComicActions(json){

    //create the space for the actions
    var actionsElement = document.createElement('ul');
    actionsElement.classList.add('comicActions');

    // add actions
    var explainLink = createExplainLink(json.num);
    var favButton = createFavoritesButton(json.num, json.title);

    actionsElement.append(explainLink, favButton);

    //add the actions to the page
    var lastComicNav = document.querySelectorAll('.comicNav')[1];
    lastComicNav.parentNode.insertBefore(actionsElement, lastComicNav);
}

// add an explain link to the comic navigation
function createExplainLink(comicNumber){
    var explainURL = `https://www.explainxkcd.com/${comicNumber}/`;

    var explainLink = document.createElement('a');
    explainLink.href = explainURL;
    explainLink.target = "_blank";
    explainLink.accessKey = 'e';
    explainLink.innerText = "Explain";
    
    var explainNav = document.createElement('li');
    explainNav.append(explainLink);

    return explainNav;
}

// add favorites button to page
function createFavoritesButton(num, title){
    let favoriteButton = document.createElement('span');
    favoriteButton.accessKey = 'f';
    favoriteButton.innerText = "Add to Favorites";

    favoriteButton.addEventListener('click', function(){
        addToFavorites(num, title);
    });

    var favoriteNav = document.createElement('li');
    favoriteNav.append(favoriteButton);
    
    return favoriteNav;
}

// add the comic to browser local storage
function addToFavorites(num, title){
    var favoriteComics = localStorage.getItem('favoriteComics') ? JSON.parse(localStorage.getItem('favoriteComics')) : [];

    var favorite = {
        num: num,
        title: title
    }

    favoriteComics.push(favorite);
    localStorage.setItem('favoriteComics', JSON.stringify(favoriteComics));
    console.log(favorite);
}

// call functions
getComicJson(getJsonUrl(comicNumber));
