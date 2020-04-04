console.log('[xkcd enhancer js loaded]');

// function definitions
// display the comic's hover text (title attribute) below the comic
function displayComicHoverText(){
    var comic = document.getElementById('comic');
    var comicHoverText = comic.querySelectorAll('[title]')[0].title;

    //check if hover text is empty
    if (comicHoverText === ''){
        comicHoverText = '[hover text not found]';
    }

    var hoverTextElement = document.createElement('p');
    hoverTextElement.setAttribute('id', 'hoverText');
    hoverTextElement.appendChild(document.createTextNode(comicHoverText));
    comic.parentNode.insertBefore(hoverTextElement, comic.nextSibling);    
}

// call functions
displayComicHoverText();