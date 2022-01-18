var userFormEl = document.querySelector("#user-form");
var wordInputEl = document.querySelector("#word");
var searchResultEl = document.querySelector("#search-result");
var wordDefinitionEl = document.querySelector("#definition");
var wordSynonymEl = document.querySelector("#synonyms");
var wordPronunciationEl = document.querySelector("#pronunciation");

//function to handle button click
var formSubmitHandler = function(event){
    event.preventDefault();
    
    var word = wordInputEl.value.trim();

    console.log(word)
    getWordFacts(word);
}


//function to fetch the free dictionary api and get the info needed
var getWordFacts = function(input)
{
    //fetch the free dictionary api
    var apiUrl= "https://api.dictionaryapi.dev/api/v2/entries/en/" + input;

    //display the searched word in the h2
    searchResultEl.textContent = "Word Searched: " + input;
    
 
    fetch(apiUrl).then(function(response)
    {
        if (response.ok)
        {
            response.json().then(function(data)
            {
                //console.log(data);
                    
                    
                //print 1st definition to screen
                wordDefinitionEl.textContent = "Definition: "+ data[0].meanings[0].definitions[0].definition;
                    
                //console.log("Definition: "+ data[0].meanings[0].definitions[0].definition);

                //print 1st synonym to screen if synonyms are available
                if (data[0].meanings[0].definitions[0].synonyms[0] !== undefined)
                {
                    wordSynonymEl.textContent = "Synonym: " + data[0].meanings[0].definitions[0].synonyms[0];
                }
                    
                else
                {
                    wordSynonymEl.textContent = "There are no synonyms available.";
                }
                    
                //console.log("Synonym: " + data[0].meanings[0].definitions[0].synonyms[0]);

                //print pronunciation to screen
                wordPronunciationEl.textContent = "Pronunciation: "+ data[0].phonetic;
                    
                //console.log("Pronunciation: "+ data[0].phonetic);
                    

                /*
                //failed attempt to loop through api to get all definitions
                for (var i = 0; i < data.length; i++)
                {
                    for (var j = 0; j < data.meanings.length; j++)
                    {
                        for (var k = 0; k < data.meanings.definitions.length; k++)
                        {
                            console.log(data[i].meanings[j].definitions[k].definition);
                        }
                    }
                }
                */

            });
        }
        
        else
        {
            console.log("error");
        }
    
    });
        
};

userFormEl.addEventListener("submit", formSubmitHandler);