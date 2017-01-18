$(function(){

	formSubmitted();

});

function formSubmitted() {
	$('.button').click(function(event) {

		event.preventDefault();
		
		var userText = $('textarea').val();
		
		//create the arrays of words or sentences
		var words = splitToWords(userText);
		var sentences = splitToSentences(userText);
		
		//functions that work with the array of words
		var wordCount = words.length;
		var uniqueWords = uniqueWordCount(words);
		var avgWordLength = findAvgWordLength(words);

		//functions that work with the array of sentences
		var avgSentenceLength = findAvgSentenceLength(sentences);

		//use jquery to apply changes to index
		$('.word-count').text(wordCount);
		$('.unique').text(uniqueWords);
		$('.sentence-length').text(avgSentenceLength + ' characters');
		$('.word-length').text(avgWordLength + ' characters');
        $('.text-report').removeClass('hidden');
	})
}

function splitToWords(text) {
	return text.toLowerCase().replace(/[\"?.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(" ");
}

//This second function is different from splitToWords only in that it keeps the periods and certain
//other characters in the text and splits by ./!/? rather than spaces

function splitToSentences(text) {
	var splitSentences = text.toLowerCase().replace(/[\"\s\/\^\*;:{}=\-_`~]/g,"").split(/[.!?]+/g);
	//The purpose of this IF conditional is to remove null elements that may occur at the end
	//of the array produced by this function
	if(splitSentences[splitSentences.length - 1] === '') {
		splitSentences.pop();
	} else{}
	return splitSentences;
}

function uniqueWordCount(array) {
  var wordCountArray = [];
  var currentWord = '';
  var isUnique = true;
  for (var i = 0; i < array.length; i++) {
  	
  	if(wordCountArray.length < 1) {
  		wordCountArray[0] = array[i];
  	}

  	inner_block: {
  		for (var j = 0; j < wordCountArray.length; j++) {
  			if(wordCountArray[j] === array[i]) {
  				isUnique = false;
  				break inner_block;
  			}
  			currentWord = array[i];
  		}
  	}

  	if(isUnique) {
  		wordCountArray.push(currentWord);
  	}
  	isUnique = true;
  }
  return wordCountArray.length;
}


//this function will compute the average sentence length in characters and not words.
//the objectives state that this is how the average should be computed, but the example
//images show the average computed in words. the program will also include blank spaces
//as characters
function findAvgSentenceLength(array) {
	
	var rawLength = 0;
	var numSentences = 0;

	for(var i = 0; i < array.length; i++) {
		rawLength += array[i].length;
		numSentences += 1;
	}
	return (rawLength/numSentences);
}

function findAvgWordLength(array) {
	
	var rawWordLength = 0;
	var numWords = 0;

	for(var i = 0; i < array.length; i++) {
		rawWordLength += array[i].length;
		numWords += 1;
	}
	return (rawWordLength/numWords);
}


