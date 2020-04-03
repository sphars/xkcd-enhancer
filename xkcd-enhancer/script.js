console.log('[xkcd enhancer js loaded]');

// function definitions
// display the comic's hover text (title attribute) below the comic
function displayComicHoverText(){
    var comicDiv = document.getElementById('comic');
    var comicHoverText = document.querySelectorAll('#comic img')[0].title;
    var hoverTextElement = document.createElement('p');
    hoverTextElement.setAttribute('id', 'hoverText');
    hoverTextElement.innerHTML = comicHoverText;
    comicDiv.appendChild(hoverTextElement);    
}

// call functions
displayComicHoverText();