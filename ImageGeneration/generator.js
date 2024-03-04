//check for bad words
try { 
    swearWords; // Block these
    innapropriateWords; // Block these
    sensitiveWords; // Block these on restricted mode only
    reallyBadWords; // Block these and ban
    allBadWords; // Don't use
} catch (e) {
    console.error("Could not load badwords.js content. Replacing with placeholders");
    var swearWords; // Block these
    var innapropriateWords; // Block these
    var sensitiveWords; // Block these on restricted mode only
    var reallyBadWords; // Block these and ban
    var allBadWords = reallyBadWords; // Don't use
}
// Function to generate the image based on the command
function generateImage() {
  // Get the command from the input field
  let command = document.getElementById('command').value;

  // Check for inappropriate words
  for (let word of swearWords) {
    if (command.includes(word)) {
      displayImage("https://breakout-x.github.io/character-ai-test/img/ELedlow-the-male-fox-blocked-content-screen.png");
        return;
    }
  }
  for (let word of innapropriateWords) {
    if (command.includes(word)) {
      displayImage("https://breakout-x.github.io/character-ai-test/img/ELedlow-the-male-fox-blocked-content-screen.png");
        return;
    }
  }
  for (let word of reallyBadWords) {
    if (command.includes(word)) {
      displayImage("https://breakout-x.github.io/character-ai-test/img/ELedlow-the-male-fox-blocked-content-screen.png");
        return;
    }
  }

  // Parse the command
  let parts = command.split(" ");
  let actionIndex = parts.indexOf("in") - 1;
  let action = parts.slice(actionIndex - 1, actionIndex + 1).join("-");
  let gender = parts[actionIndex - 2];
  let color = parts[actionIndex - 3];
  let animal = parts[actionIndex - 4];
  let setting = parts[actionIndex + 2];

  // Check if there is a second animal
  let andIndex = parts.indexOf("and");
  let secondAnimal = null;
  if (andIndex !== -1) {
    let secondGender = parts[andIndex + 1];
    let secondColor = parts[andIndex + 2];
    let secondAnimal = parts[andIndex + 3];
    let secondAction = parts[andIndex + 4] + "-" + parts[andIndex + 5];
    secondAnimal = "https://breakout-x.github.io/character-ai-test/img/" + secondGender + "-" + secondAnimal + "-" + secondAction + ".png";
  }

  // Create the image names
  let background = "https://breakout-x.github.io/character-ai-test/img/" + setting + ".png";
  let animalImage = "https://breakout-x.github.io/character-ai-test/img/" + gender + "-" + animal + "-" + action + ".png";

  // Load the images
  loadImage(background, function(bgImage) {
    loadImage(animalImage, function(animalImg) {
    // Create a canvas and get the context
    let canvas = document.createElement('canvas');
    canvas.width = 600;  // Set canvas width
    canvas.height = 300; // Set canvas height
    let ctx = canvas.getContext('2d');

    // Draw the background image
    ctx.drawImage(bgImage, 0, 0, img.width * 1.5, img.height * 1.5);

    // Create a second canvas for the animal image
    let animalCanvas = document.createElement('canvas');
    let animalCtx = animalCanvas.getContext('2d');

    // Draw the animal image
    animalCtx.drawImage(animalImg, 0, 0, animalCanvas.width, animalCanvas.height);

    // Tint the animal image
    animalCtx.fillStyle = color;
    animalCtx.globalCompositeOperation = "multiply";
    animalCtx.fillRect(0, 0, animalCanvas.width, animalCanvas.height);
    animalCtx.globalCompositeOperation = "source-over";

    // Draw the tinted animal image onto the main canvas
    ctx.drawImage(animalCanvas, 0, 0, img.width, img.height);

    // If there is a second animal, load its image
    if (secondAnimal) {
      loadImage(secondAnimal, function(secondAnimalImg) {
        // Create a third canvas for the second animal image
        let secondAnimalCanvas = document.createElement('canvas');
        let secondAnimalCtx = secondAnimalCanvas.getContext('2d');

        // Draw the second animal image
        secondAnimalCtx.drawImage(secondAnimalImg, 0, 0, secondAnimalCanvas.width, secondAnimalCanvas.height);

        // Tint the second animal image
        secondAnimalCtx.fillStyle = secondColor;
        secondAnimalCtx.globalCompositeOperation = "multiply";
        secondAnimalCtx.fillRect(0, 0, secondAnimalCanvas.width, secondAnimalCanvas.height);
        secondAnimalCtx.globalCompositeOperation = "source-over";

        // Draw the tinted second animal image onto the main canvas
        ctx.drawImage(secondAnimalCanvas, 0, 0, canvas.width, canvas.height);
      }, function() {
        displayImage("https://breakout-x.github.io/character-ai-test/img/ELedlow-the-male-fox-error-screen.png");
      });
    }

    // Append the canvas to the body
    document.body.appendChild(canvas);
    }, function() {
      displayImage("https://breakout-x.github.io/character-ai-test/img/ELedlow-the-male-fox-error-screen.png");
    });
  }, function() {
    displayImage("https://breakout-x.github.io/character-ai-test/img/ELedlow-the-male-fox-error-screen.png");
  });
}

// Function to load an image
function loadImage(src, onload, onerror) {
  let img = new Image();
  img.onload = function() {
    onload(img);
  };
  img.onerror = onerror;
  img.src = src;
}

// Function to display a single image
function displayImage(src) {
  let img = new Image();
  img.onload = function() {
  let canvas = document.createElement('canvas');
  canvas.width = img.width * 1.5;  // Set canvas width
  canvas.height = img.height * 1.5; // Set canvas height
  let ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    document.body.appendChild(canvas);
  };
  img.src = src;
}
