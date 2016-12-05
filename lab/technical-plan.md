#Lab 11 Technical Plan
##John Grillo
###Nov. 28th, 2016

1. Build today will select three random photos from the image directory and display them side-by-side-by-side in the browser window.
  - 1.1 First select an image at random
  - 1.2 Then select 3 images at random
  - 1.3 Display the images in a row for easy user selection
2.  addition, you'll want to be able to receive clicks on those displayed images, and track those clicks for each image. You'll also want to track how many times each image is displayed, for statistical purposes.
- 2.1 Make a constructor function/object for each image that also tracks clicks
- 2.2 Tracks clicks. [var clickTracker]
- 2.3 Number of times it is displayed on screen [var timesShown]

3. Upon click event handler that will: Three new non-duplicating random images need to be automatically displayed.
 - 3.1 So no files that were played in the last set. Should be a brand new group of 3 each time.
 - 3.2 Not just a unique combination of 3, such as [1,2,3] => [1,2,2], but no duplicates in the current set of 3 images as well.

4.  Make a constructor function that creates an object associated with each image, and has (at a minimum) properties for the name of the image, its filepath, the number of times it has been shown, and the number of times it has been clicked.
- 4.1 Make a constructor function/object with the following minimum properties:
  * filename of image
  * filepath
  * timesShown
  * timesClicked [or ClickTracker]
- 4.2 Tracks clicks. [var clickTracker]
- 4.3 Number of times it is displayed on screen [var numberOfScreenAppearences]
