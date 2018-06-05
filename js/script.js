//intervalId, the return value from setInterval function, it is numeric non-zero value
let intervalId = 0;
let showAnotherQuoteButtonClicked = false;
let lastRandomIndex = -1;
//Though the body background color is "known", it is better to not hard code it, to separate program entities.
const bodyElem = document.body;
let lastBackgroundColor = window.getComputedStyle(bodyElem, null).getPropertyValue("background-color");

function getRandomQuote() {
    let newRandomIndex;
    //the indexes range is always between 0 to (quotes.length-1), with the help: Math.floor
    do {
        newRandomIndex = Math.floor(Math.random() * (quotes.length));
    } while(lastRandomIndex === newRandomIndex);
    lastRandomIndex = newRandomIndex;
    return quotes[newRandomIndex];
}

function getRandomColor() {
    //generating color number range except white and black(the lowest & highest rgb)
    return Math.floor(Math.random() * 254) + 1;
}

function generateBackgroundColor() {
    let newBackgroundColor;
    do {
        newBackgroundColor = `rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()})`;
    } while(newBackgroundColor === lastBackgroundColor);
    lastBackgroundColor = newBackgroundColor;
    document.body.style.backgroundColor = newBackgroundColor;
}

function printQuote() {
    let html = '';
    let randomQuote = getRandomQuote();

    //if the user clicked the button then the interval is cleared and the counter is set again
    if(showAnotherQuoteButtonClicked === true) {
        clearInterval(intervalId);
        intervalId = setInterval(printQuote, 8000);
        showAnotherQuoteButtonClicked = false;
    }


    //**** for the html quote construction section there is another way too, in alternativeCodeSnippet.js file ****
    //html quote construction
    html += `<p class="quote"> ${randomQuote.quote} </p>\n`;
    if(randomQuote.wikiLink) {
        html += `<p class="source"><a class="wikiLink" href="${randomQuote.wikiLink}" target="_blank"`;
        html += ` alt="${randomQuote.source} Wikipedia link" title ="Wikipedia link"> ${randomQuote.source} </a>\n`;
    } else {
        html += `<p class="source"> ${randomQuote.source}\n`;
    }

    //in case of not defined properties the condition evaluate to false
    if(randomQuote.citation) {
        html += `<span class="citation"> ${randomQuote.citation} </span>\n`;
    }
    if(randomQuote.year) {
        html += `<span class="year"> ${randomQuote.year} </span>\n`;
    }
    if(randomQuote.profession) {
        html += `<span class="profession"> ${randomQuote.profession} </span>\n`;
    }
    html += `</p>`;

    document.getElementById('quote-box').innerHTML = html;
    generateBackgroundColor();
}

function showAnotherQuoteClicked() {
    showAnotherQuoteButtonClicked = true;
    printQuote();
}

//  ***** main function that run the application *****
function main() {

    /* I call printQuote function for the case when opening the page for the first time:
       - Quote will be random
       - Page background color will be random */
    printQuote();

    //for the first time when the program loads the interval is set.
    //after clicking the button the interval is cleared and set again
    intervalId = setInterval(printQuote, 8000);

    // event listener to respond to "Show another quote" button clicks.
    // when user clicks anywhere on the button, the "showAnotherQuoteClicked" is called and
    // "printQuote" function inside the function above is called
    document.getElementById('loadQuote').addEventListener("click", showAnotherQuoteClicked, false);
}


main();