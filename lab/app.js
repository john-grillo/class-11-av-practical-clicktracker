'use strict'
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
 'unicorn.jpg', 'pet-sweep.jpg', 'usb.gif', 'sweep.png', 'dragon.jpg', 'pen.jpg', 'scissors.jpg', 'shark.jpg', 'cthulhu.jpg',
  'sweep.png', 'dog-duck.jpg', 'breakfast.jpg', 'bag.jpg', 'tauntaun.jpg', 'banana.jpg', 'john-grillo.jpg'];
var items = [];
var displayIndex = 0;
// var randomIndex = generateRandomNumber();

//Meat of program here:
//Grab two lines
var displayArea = document.getElementById('image_display_field');
displayArea.addEventListener('click', clickHandler);
//for loop to construct new images



/*************************************
****FUNCTION DECLARATION SECTION HERE*
**************************************/
//constructor function ItemImage here.
//makes a
function ItemImage(path) {
  this.path = '..lab/assets/imgs' + path;
  this.clicked = 0;
  console.log(clicked);
};

//random number generator here.
//returns a rounded-down number between 0 and the length of items in the paths array [21 items in all]
function generateRandomNumber() {
  return Math.floor(Math.random() * path.length);
};


//changePicture function will replace old image with new one for all 3 images
function changePicture() {
  //grab the appropriate field; replace the image in image_[one, two, three].
  var imageOne = document.getElementById('image_one');
  var imageTwo = document.getElementById('image_two');
  var imageThree = document.getElementById('image_three');

  //create random index to get new image
  var randomIndex = generateRandomNumber();


  //as long as the previous image is displayed,
  //a new one will be generated.
  while (displayIndex === randomIndex) {
    randomIndex = generateRandomNumber();
  }

  displayIndex = randomIndex;
  imageOne.src = 'assets/imgs/' + path[randomIndex];
  // var imgOneCollisionAvoider = imageOne.src;

//update imageTwo
  while (displayIndex === randomIndex) {
    randomIndex = generateRandomNumber();
  }
  displayIndex = randomIndex;
  imageTwo.src = 'assets/imgs/' + path[randomIndex];

  //update imageThree
  while (displayIndex === randomIndex) {
    randomIndex = generateRandomNumber();
  }
  displayIndex = randomIndex;
  imageThree.src = 'assets/imgs/' + path[randomIndex];

//close of changePicture function.
}

//function clickHandler will generate new change in the
function clickHandler(event) {
  var targetString = event.target.src;
  var targetPath = targetString.split('assets')[1];
  var itemPath;

  for (var i = 0; i < items.length; i++) {
    itemPath = items[i].path.split('assets')[1];
    if (itemPath === targetPath) {
      items[i].clicked += 1;
    }
  }

  changePicture();
}
