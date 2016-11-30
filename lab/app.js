'use strict';
/***********************
 ***UNIVERSAL VARIABLES*
************************/
/*attempting to solve the problem of duplicate images by splitting
 the list of 21 images into 3 arrays with 7 images each in them.
 So in essence, a multi-dimensional array.
 I cheated by creating an extra image of myself.
*/

//first the 3 arrays of 7 images.
// var path = ['sweep.png', 'dog-duck.jpg', 'breakfast.jpg', 'bag.jpg', 'tauntaun.jpg', 'banana.jpg', 'john-grillo.jpg'];
// var path2 = ['usb.gif', 'sweep.png', 'dragon.jpg', 'pen.jpg', 'scissors.jpg', 'shark.jpg', 'cthulu.jpg'];
// var path3 = ['wine-glass.jpg', 'bathroom.jpg', 'water-can.jpg', 'chair.jpg', 'bubblegum.jpg', 'unicorn.jpg', 'pet-sweep.jpg'];

//Now setting up the 3 arrays, a container to put the new array into
// And a default display index.

var path = ['wine-glass.jpg', 'bathroom.jpg', 'water-can.jpg', 'chair.jpg', 'bubblegum.jpg',
 'unicorn.jpg', 'pet-sweep.jpg', 'usb.gif', 'sweep.png', 'dragon.jpg',
  'pen.jpg', 'scissors.jpg', 'shark.jpg', 'cthulhu.jpg', 'sweep.png',
  'dog-duck.jpg', 'breakfast.jpg', 'bag.jpg', 'tauntaun.jpg', 'banana.jpg',
  'john-grillo.jpg'];
var items = [];
var displayIndex = 0;
var displayIndices = [0, 0, 0]
var totalClicks = 0;
// var randomIndex = generateRandomNumber();

//Meat of program here:
//Grab two lines
var displayArea = document.getElementById('image_display_field');
displayArea.addEventListener('click', clickHandler);

//for loop to construct new images
for(var i = 0; i < path.length; i++) {
  var newItem = new ItemImage(path[i]);
  items.push(newItem);
}

/*************************************
****FUNCTION DECLARATION SECTION HERE*
**************************************/
//constructor function ItemImage here.
//makes a
function ItemImage(path) {
  this.path = 'assets/imgs/' + path;
  this.clicked = 0;
  this.name = this.path.split('assets/imgs/')[1];
  this.shown = 0;
};

//random number generator here.
//returns a rounded-down number between 0 and the length of items in the paths array [21 items in all]
function generateRandomNumber() {
  return Math.floor(Math.random() * path.length);
};

//this function is to make a smaller, non duplicate numbers to choose for our
//3 market image research
function generateRandomIndices(){
  //make an array of 3 numbers, generate random ones based on our list of photos
  var arrayOfRandomIndices = [];
  arrayOfRandomIndices[0] = generateRandomNumber();
  arrayOfRandomIndices[1] = generateRandomNumber();

  //check first index against the next one
  while (arrayOfRandomIndices[0] === arrayOfRandomIndices[1]){
    arrayOfRandomIndices[1] = generateRandomNumber();
  }

  // generate 3rd item and then check against the 3rd item and first and second.
  // make sure they are different.
  arrayOfRandomIndices[2] = generateRandomNumber();
  while (arrayOfRandomIndices[2] === arrayOfRandomIndices[1]
         || arrayOfRandomIndices[2] === arrayOfRandomIndices[0])
  {
    arrayOfRandomIndices[2] = generateRandomNumber();
  }

  return arrayOfRandomIndices;

//end of function generateRandomIndices
};

//implementing the fisher-yates method since I know the number of array items
//lovingly liberated from: https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = path.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};


//changePicture function will replace old image with new one for all 3 images
function changePicture() {
  //grab the appropriate field; replace the image in image_[one, two, three].
  var imageOne = document.getElementById('image_one');
  var imageTwo = document.getElementById('image_two');
  var imageThree = document.getElementById('image_three');
  //var collissionCheck = 0;

  //create random index to get new image
  var randomIndex = generateRandomNumber();
  var arrayOfRandomIndices = generateRandomIndices();

  //as long as the previous image is displayed,
  //a new one will be generated.
  imageOne.src = items[arrayOfRandomIndices[0]].path;
  imageTwo.src = items[arrayOfRandomIndices[1]].path;
  imageThree.src = items[arrayOfRandomIndices[2]].path;
  displayIndices = arrayOfRandomIndices;

//close of changePicture function.
}

//function clickHandler will generate new change in the images
// and then update number of times image was clicked
function clickHandler(event) {
  //disables event listener when globalvariable totalClicks reaches 25.
  if (totalClicks > 25) {
    var msg = 'The market selection test is over. Take your hands off the keyboard and get out of the chair and inform the researcher.';
    var endTest = document.getElementById('image_display_field');
    endTest.innerHTML = '<h1> THIS IS THE END OF TEST. HERE ARE THE CHART RESULTS. </h1>';
    alert(msg);
    console.log(msg);
  }

  var targetString = event.target.src;
  var targetPath = targetString.split('assets/imgs/')[1];
  var itemPath;
  totalClicks += 1;
  // console.log('go clickhandler');
  // console.log(targetString.split('assets/imgs/')[1]);

  //and this part updates the click counter for the object image
  for (var i = 0; i < items.length; i++) {
    itemPath = items[i].path.split('assets/imgs/')[1];
    //  console.log(itemPath);
    //  console.log(targetPath);
    if (itemPath === targetPath) {
      items[i].clicked += 1;
      console.log('User selected ' + items[i].name);
      console.log(items[i].clicked);
    }
  }

  changePicture();

//end of the clickHandler function
}

//the addClicks function adds one to both the times shown and number of times
//that the object is selected by the user.
function addClicks(path) {
  var targetPath = path.split('assets/imgs/')[1];
  var itemPath;
  var displayIndex;

  //this should update the object shown property;
  for (var k = 0; displayIndices.length; k++) {
    displayIndex = displayIndices[k];
    items[displayIndex].shown++;
  }

  //and this part updates the click counter for the object image
  for (var i = 0; i < items.length; i++) {
    itemPath = items[i].path.split('assets/imgs/')[1];
    //  console.log(itemPath);
    //  console.log(targetPath);
    if (itemPath === targetPath) {
      items[i].clicked += 1;
      console.log('User selected ' + items[i].name);
      console.log(items[i].clicked);
    }
  }

//end of addClicks function.
}



/*************************************
****CHART FUNCTION STUFF SECTION HERE*
**************************************/

//this should create the new chart in canvas
var ctx = document.getElementById('my_chart');
var chartConfig = {

};
var myChart = new Chart(ctx, {});
