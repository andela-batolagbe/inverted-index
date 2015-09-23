/* This file require running it on HTTP Server
for the JQuery AJAX file reading functionality to 
work */

// uncomment the variable and equate it to the file path to load file contents
//var dataSource = 'books.json';


//main get index function
var Index = function(source, searchKeys) {};

//function to read file contents
Index.prototype.readTexts = function(files) {

  //check file type if its an array, variable or file path
  var bookData;
  if (typeof files === typeof '') {

    //syncronous ajax request to read file if it is a file path
    $.ajax({
      url: files,
      async: false,
      dataType: 'json',
      success: function(json) {
        bookData = json;
      }
    });

  } else {
    bookData = files;
  }

  //iterate trough JSON properties and push sentences to holding array
  var k = 0,
    holder = [];
  do {
    var grab = [];
    for (var j in bookData[k]) {

      var collector = bookData[k];
      grab.push(collector[j].toLowerCase());
    }
    holder.push(grab.join(' '));
    k += 1;
  }
  while (k < bookData.length);

  return holder;
};

//function for creating index
Index.prototype.createIndex = function(sourceFile) {

  //call the readTexts function to read contents
  var holder = Index.prototype.readTexts(sourceFile);

  var result = {},
    i, index = [];

  //iterate through holder, split by all punctuations and push words to result
  for (i = 0; i < holder.length; i++) {

    var words = holder[i].split(/[\s\W\d]+/g);
    var temp = [];
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

  //store the results
  this.index = result;
};

// this is the main search function it takes two arguement, data source
// and keywords to be searched, 
//returns two results, all indexes and indexes of search keys

Index.prototype.searchIndex = function(dataSource, searchKeys) {

  //check if keys is an array of strings or a string
  if (typeof searchKeys === typeof []) {
    //join if its an array
    searchKeys = searchKeys.join();
  }
  //convert string to lowercase and split
  searchKeys = searchKeys.toLowerCase();
  var keys = searchKeys.split(/[\s\W\d]+/g);

  //call the getIndex function 
  //var allIndex = new 
  Index.prototype.createIndex(dataSource);

  var index = this.index;

  var keyIndexes = {};

  //check if the keys are in the index list;
  for (var i = 0; i < keys.length; i++)
    if (index.hasOwnProperty(keys[i]) === true) {

      keyIndexes[keys[i]] = index[keys[i]];
    }

    //log all indexes to the console
  console.log(index);

  //log search keyresults to the console
  console.log(keyIndexes);

  //return for test purpose
  return keyIndexes;
};



//the function below should be called on to run the creation and search
// search keys can take a single word, sentences and an array of words 
//Index.prototype.searchIndex(dataSource, 'search keys');
