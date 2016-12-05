'use strict';
/***********************
 ***UNIVERSAL VARIABLES*
************************/
/*
The 3-img-array approach was abandoned because it involved way too much effort
and I had to work in real life to make money and pay bills.
*/

var path = ['wine-glass.jpg', 'bathroom.jpg', 'water-can.jpg', 'chair.jpg', 'bubblegum.jpg',
 'unicorn.jpg', 'pet-sweep.jpg', 'usb.gif', 'sweep.png', 'dragon.jpg',
  'pen.jpg', 'scissors.jpg', 'shark.jpg', 'cthulhu.jpg', 'sweep.png',
  'dog-duck.jpg', 'breakfast.jpg', 'bag.jpg', 'tauntaun.jpg', 'banana.jpg',
  'john-grillo.jpg'];
var items = [];
var displayIndex = 0;
var displayIndices = [0, 0, 0];
var totalClicks = 0;
var previousImgSet = [0, 0, 0];
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
  //A special thank-you for Aaron, for clarifying to myself and the class
  // what exactly the simpler solution was. Was banging my head around this one for 2 days.

  /* So how it works:
    I generate a new array, indices, to store the images I'll be returning.
    uniqueIndex is a variable that will store one unique image at a time.
    The for loop is a hard variable because I will only ever display 3 items.
    The do-while loop will always execute.
    The while condition will use the .indexOf to check if the number is already
    NOT in the array indices and then check against the previousImgSet. Again, is it not there?
    Finally, the last line of the for-loop will push it into the indices array.
    previousImgSet is a global variable to store the previous image array set.

    from MDN:
    The indexOf() method returns the first index at which a given element can
     be found in the array, or -1 if it is not present.
  */
  var indices = [];
  var uniqueIndex;
  for (var i = 0; i < 3; i++) {
    do {
      uniqueIndex = generateRandomNumber();
    } while (indices.indexOf(uniqueIndex) !== -1
            || previousImgSet.indexOf(uniqueIndex) !== -1);

    indices.push(uniqueIndex);
  }

  return indices;

//end of function generateRandomIndices
};

function checkPreviousPics(arrayOfRandomIndices, previousImgSet){
  var checkedArray = arrayOfRandomIndices.concat(previousImgSet);
  checkedArray.filter(function (el, i, arr) {
    return arr.indexOf(el) === i;
  });

  console.log('checkPreviousPics returns ' + checkedArray.slice(0, 3));
  return checkedArray.slice(0, 3);

//end of checkPrevPics function
}

//changePicture function will replace old image with new one for all 3 images
function changePicture() {
  //grab the appropriate field; replace the image in image_[one, two, three].
  var imageOne = document.getElementById('image_one');
  var imageTwo = document.getElementById('image_two');
  var imageThree = document.getElementById('image_three');

  // checkPreviousPics(previousImgSet);

  //create random index to get new image
  // var randomIndex = generateRandomNumber();
  var arrayOfRandomIndices = generateRandomIndices();
  arrayOfRandomIndices = checkPreviousPics(arrayOfRandomIndices, previousImgSet);

  //as long as the previous image is displayed,
  //a new one will be generated.
  imageOne.src = items[arrayOfRandomIndices[0]].path;
  imageTwo.src = items[arrayOfRandomIndices[1]].path;
  imageThree.src = items[arrayOfRandomIndices[2]].path;
  displayIndices = arrayOfRandomIndices;
  previousImgSet = arrayOfRandomIndices;

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

    //finally, chart is rendered for the marketers.
    renderChart();
  }
  //update global counter to quit test.
  totalClicks += 1;

  //add clicks to times shown and to times clicked.
  addClicks();

  //and then the new pictures are loaded.
  changePicture();

//end of the clickHandler function
}

//the addClicks function adds one to both the times shown and number of times
//that the object is selected by the user.
function addClicks() {
  var targetString = event.target.src;
  var targetPath = targetString.split('assets/imgs/')[1];
  var itemPath;
  var displayIndex;

  //this should update the object shown property;
  for (var k = 0; k < displayIndices.length; k++) {
    displayIndex = displayIndices[k];
    items[displayIndex].shown++;
    // console.log('Item ' + items[k].name + ' has been shown ' + items[k].shown);
    // console.log(items[k].shown);
  }

  //and this part updates the click counter for the object image
  for (var i = 0; i < items.length; i++) {
    itemPath = items[i].path.split('assets/imgs/')[1];
    //  console.log(itemPath);
    //  console.log(targetPath);
    if (itemPath === targetPath) {
      items[i].clicked += 1;
      // console.log('User selected ' + items[i].name);
      // console.log(items[i].clicked);
    }
  }

//end of addClicks function.
}



/*************************************
****CHART FUNCTION STUFF SECTION HERE*
**************************************/
function renderChart() {

   //dynamically build list of labels for products
  function chartLabelBuilder() {
    var returnLabelList = [];
    for (var i = 0; i < items.length; i++) {
      returnLabelList.push(items[i].name);
    }

    return returnLabelList;
  //end of function
  };

  function chartDataBuilder() {
    var returnDataList = [];
    for (var i = 0; i < items.length; i++) {
      returnDataList.push(items[i].clicked);
    }

    return returnDataList;
  //end of function
  };

  function chartColorBuilder() {
    var returnColorList = [];
    for (var i = 0; i < items.length; i++) {
      returnColorList.push(getRandomColor());
    }

    return returnColorList;
  //end of function
  };

//this function lovingly liberated from stack overflow; https://goo.gl/pe3UTN
  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color.slice(0, 7);
  };

  var canvas = document.getElementById('my_chart');
  var data = {
    // labels: ["January", "February", "March", "April", "May", "June", "July"],
    labels: chartLabelBuilder(),
    datasets: [
        {
          label: 'Market Test Results',
          backgroundColor: chartColorBuilder(),
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 2,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: chartDataBuilder(),
          scaleSteps: 1
        }
    ]
  };
  var option = {
    animation: {
      duration:5000
    },
    scales: {
        yAxes: [{
            display: true,
            ticks: {
                beginAtZero: true,   // minimum value will be 0.
                fixedStepSize: 1,
                min: 0,
                maxTicksLimit: 25,

            }
        }]
    }
  };

var myBarChart = Chart.Bar(canvas,{
	data:data,
  options:option
});

//end of function
};





//this should create the new chart in canvas
// code liberated from chart.js documentation default example
// function renderChart() {
// var ctx = document.getElementById('my_chart').getContext('2d');
// var chartConfig = new Chart (ctx, {
//       type: 'bar',
//       data: {
//           labels: 'Market Test Results',
//           datasets: [{
//               label: items.name,
//               data: items.clicked,
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.2)',
//                   'rgba(54, 162, 235, 0.2)',
//                   'rgba(255, 206, 86, 0.2)',
//                   'rgba(75, 192, 192, 0.2)',
//                   'rgba(153, 102, 255, 0.2)',
//                   'rgba(255, 159, 64, 0.2)'
//               ],
//               borderColor: [
//                   'rgba(255,99,132,1)',
//                   'rgba(54, 162, 235, 1)',
//                   'rgba(255, 206, 86, 1)',
//                   'rgba(75, 192, 192, 1)',
//                   'rgba(153, 102, 255, 1)',
//                   'rgba(255, 159, 64, 1)'
//               ],
//               borderWidth: 1
//           }]
//       },
//       options: {
//           scales: {
//               yAxes: [{
//                   ticks: {
//                       beginAtZero:true
//                   }
//               }]
//           }
//       }
//   });
// };
