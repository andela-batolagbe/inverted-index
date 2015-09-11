/* This file require running it on HTTP Server
for the JQuery AJAX file reading functionality to 
work */

//declaration of some variables
var index = [],
  result = {},
  holder = [],
  len, i, temp = [],
  indexArray = [];

// uncomment the variable and equate it to the file path to load file contents
//var fileRef = 'books.json';


//main get index function
var getIndex = function(file, stringKeys) {

//function to read file contents
this.readTexts = function(obj) {

  //iterate trough JSON properties and push sentences to holding array
  var k = 0;
  do {
    var grab = [];
    for (var j in obj[k]) {

      var collector = obj[k];
      grab.push(collector[j].toLowerCase());
    }
    holder.push(grab.join(' '));
    k += 1;
  }
  while (k < obj.length);

  return holder;
};

//function for creating index
this.createIndex = function(file) {

  //call the readTexts function to read contents
  var holder = this.readTexts(file);

  //iterate through holder, split by all punctuations and push words to result
  for (i = 0; i < holder.length; i++) {
    var temp = [];
    var words = holder[i].split(/[\s,.:;]/g);

    // push words to index array
    for (var j = 0; j < words.length; j++) {
      temp.push(words[j]);
    }
    index.push(temp);
  }

  //assign the array of words in each document to a variable
  for (var k = 0; k < index.length; k++) {

    var pass = index[k];

    //take each word and locate them in the entire document 
    for (var a = 0; a < pass.length; a++) {

      var holdArr = [];
      for (var b = 0; b < index.length; b++) {
        if (index[b].indexOf(pass[a]) >= 0) {

          //push the index of the documents they belong the holding array
          holdArr.push(index.indexOf(index[b]));
        }

        //assign words to their index in the result object
        result[pass[a]] = holdArr;
      }
    }
  }
  //stringify all result and return
  var toJSON = JSON.stringify(result);
  return toJSON;
};

// index search function
this.searchIndex = function(files, stringKeys) {

  //check file type if its an array, variable or file path
  var file;
  if (typeof files === typeof '') {

    //syncronous ajax request to read file if it is a file path
    $.ajax({
      url: files,
      async: false,
      dataType: 'json',
      success: function(json) {
        file = json;
      }
    });

  } else {
    file = files;
  }

  var converter;
  //check if keys is an array of strings or a string
  if (typeof stringKeys === typeof []) {
    //join if its an array
    converter = stringKeys.join();
  } else {
    converter = stringKeys;
  }
  //convert string to lowercase and split
  var lower = converter.toLowerCase();
  var keys = lower.split(/[\s\,\.\:]/);

  //call the getIndex function 
  var index = this.createIndex(file);

  //parse the returned index file;

  var parser = JSON.parse(index);
  
  var indexes = {};

  //check if the keys are in the index list;
  for (var i = 0; i<keys.length; i++)
    if (parser.hasOwnProperty(keys[i]) === true){

      indexes[keys[i]] = parser[keys[i]];
    }

    //return results
  return JSON.stringify(indexes);
};

};
//uncomment this function to run loaded files using the fileRef variable
// search keys can take a single word, sentences and an array of words 

//getIndex.searchIndex(fileRef, "your search key");
