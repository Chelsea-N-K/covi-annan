//Creates constants for making the canvas and defining ehat type of drawing will be on the canvas
//as in python the constants cannot be changed over the program
const cvs = document.getElementById("mycanvas");
const ctx = cvs.getContext("2d");


//GAME VARS AND CONSTANTS
const DEGREE = Math.PI / 180

//creates a local variable called frames that can be created a copy for in other functions that use it
let frames = 0;

//LOAD SPRITE IMAGE
//to load an image..create a constant called sprite and create an image object using the image constructor
const bg = new Image();
const sprite = new Image();
const fg = new Image();
const bg2 = new Image();
const start = new Image();
const over = new Image();
const virus = new Image();

//set the source property of your Image
bg.src = ("img/blue.png");
bg2.src = ("img/aaw.gif");
sprite.src = ("img/wbc2.png");
fg.src = ("img/hospital.jpg");
start.src = ("img/getready.png");
over.src = ("img/gameover.png")
virus.src = ("img/bacteria.png")
//
//
//LOAD SOUNDS
 const SCORE_S=new Audio();
 SCORE_S.src="audio/sfx_point.wav";

 const DIE_S=new Audio();
 DIE_S.src="audio/sfx_die.wav";

 const FLAP_S=new Audio();
 FLAP_S.src="audio/sfx_flap.wav";

 const HIT_S=new Audio();
 HIT_S.src="audio/sfx_hit.wav";

 const SWOOSHING_S=new Audio();
 SWOOSHING_S.src="audio/sfx_swooshing.wav";

//
// //each time we want to create an image on canvas, we need to create an object with what we want
// //then inside the object we have the properties eg the source x and y and the image width and height, then
// //the x and y postion on destination canvas, then a draw method
// //the image in the sprite has a source x and y position and a source sixe for width and height
// //when you draw it to the canvas, It gets a destination x and y position and a destination width and height
// //the destination properties may be different from the source properties and you may need to make
// //your image smaller or larger
//
// //BACKGROUND object
//
const background = {

  source_x: 0,
  source_y: 0,
  image_width: 1920,
  image_height: 1323,
  destination_x: 0,
  destination_y: 0,

  draw: function() {

    ctx.drawImage(bg, this.source_x, this.source_y, this.image_width, this.image_height, this.destination_x, this.destination_y, cvs.width, 330);
    //After this go inside draw function and write background.draw()

  }


}

// // SECOND BACKGROUND object
// const background2 ={
//
//   source_x:0,
//   source_y:0,
//   image_width:1519,
//   image_height:2400,
//   destination_x:100,
//   destination_y:180,
//
//   draw: function() {
//     if (state.current == state.game) {
//
//
//       ctx.drawImage(obstacle, this.source_x, this.source_y, this.image_width, this.image_height, this.destination_x, this.destination_y, 100, 150);
//       ctx.drawImage(obstacle, this.source_x, 300, this.image_width, this.image_height, this.destination_x, 0, 100, 150);
//
//     };
//
//
//
//
//     //After this go inside draw function and write background.draw()
//
//   }
//
//
// }

//FOREGROUND object

const foreground = {
  source_x: 30,
  source_y: 0,
  image_width: 999,
  image_height: 999,
  destination_x: 0,
  destination_y: cvs.height-150,
  dw: 350,
  dh: 150,
  dx: 2,
  draw: function() {

    ctx.drawImage(fg, this.source_x, this.source_y, this.image_width, this.image_height, this.destination_x, this.destination_y, this.dw, this.dh);
    ctx.drawImage(fg, this.source_x, this.source_y, this.image_width, this.image_height, this.destination_x + 300, this.destination_y, this.dw, this.dh);

    //After this go inside draw function and write background.draw()

  },
  //make foregroundmove
  update: function() {
    if (state.current == state.game) {
      this.destination_x = (this.destination_x - this.dx) % (this.dw / 2)
    }
  }


}

//BIRD OBJECT

const cell = {

  //GRAVITY AND FLAP//
  //The bird should move up by tapping and down by GRAVITY
  speed: 0,
  gravity: 0.25,
  jump: 4.6, //the flap

  //we have an animation array in our bird object sice we have different image version so that we created
  //an Animation
  animation: [
    //current source image
    {
      sX: 333,
      sY: 216
    }, //this is index 0 in this array as in a list , so if we have this.animation[0],we are referring to this image
    //next image position on source as bird is flapping

    {
      sX: 333,
      sY: 288
    },
    //third image position on sourceon
    {
      sX: 333,
      sY: 352
    },
    //we go back to the second image as we alternate
    {
      sX: 333,
      sY: 288
    }
  ],
  //set the destination location for x and y coordinates
  //the d represents destination canvas
  dx: 50,
  dy: 150,
  image_width: 188,
  image_height: 68,
  dw: 65,
  dh: 40,
  frame: 0, //property called frames
  //then call the draw method and  create a variable called Bird
  rotation: 0,
  radius:30,//from the centre to the end..distance

  draw: function() {

    let bird = this.animation[this.frame];
    //to draw an image to the canvas, we use a  draw image method
    //saves the canvas
    ctx.save();
    //change the origin x and y of the canvas to be the middle of the bird
    ctx.translate(this.dx, this.dy);
    //rotate the mycanvas
    ctx.rotate(this.rotation);


    //drawImage(imageObject,sorce x,source y,swidth,sheight,destinationx,destinationy,dWidth,dheight)
    ctx.drawImage(sprite, bird.sX, bird.sY, this.image_width, this.image_height, -25, -20, this.dw, this.dh);
    //before drawing bird, you need to choose which of the four object postions you will draw
    //thus if the
    //restores canvas saved after store
    ctx.restore()

  },


  flap: function() {
    //called by an event listener in the switch statement
    //this will make the speed go to the top
    this.speed = -this.jump;
  },
  //when the bird hits the ground..its a gameover
  //when user clicks on the canvas we call the flap method
  //this method changes the speed by subtracting this.jump


  //change this.frame to make the cell flap
  //Check if Frame is divisible by 5..if divisible, we need to increment this.frame by 1
  //Increment until this.frame reaches 3..When here..check its reached 3 asit would have reached 15 requestAnimationFrame
  //then take this.frame back to 0
  //we are diving by 5 as the frame rate
  update: function() {
    //For get ready..trhe bird flaps slowly
    //if game state..the bird flaps faster
    //ternary operator
    //variableName=(condition)?"value if true":"value if false";
    this.period = state.current == state.getReady ? 10 : 5;


    ///THIS CONTROLS THE BIRD FLAPPING///
    //increasing the this.frame by one each period
    //the RHS will return either 1 or 0
    //and add to this.frame
    this.frame += frames % this.period == 0 ? 1 : 0;

    ///check if the frames in the loop() function is divisible by 5.. The loop function increases frames by 1 each time it is calles
    ///If frames in loop is divisible by 5, update this.frame and increase by 1.. If not increase this.frame by 0
    //This makes the bird wait for 5/60 of a second before it flaps its wings




    //when this.frame gets to a number greater than  as that is the animation array length is 4
    //this.frame should go back to index 0
    //so after increasing this.frame..check whether it is divisible to give a remainder of 0

    //takes the existing this.frame and divides by the animation.length then returns the remainder
    //dividing this.frame by animation length so that you can get the indexes of the objects in the animation array
    //this is because
    //0%4=0, 1%4=1, 2%4=2, 3%4=3,4%4=0..so even the multiples will have such a thing
    this.frame = this.frame % this.animation.length;

    //making bird move up and down.
    if (state.current == state.getReady) {
      this.dy = 150 //if the current state is the getready state..the bird stays at 150
      this.rotation = 0 * DEGREE
    } else {

      //change y position of bird by the speed
      //if positive.bird goes down if negative bird goes up
      //this.speed will be changed based on gravity thus go to the bottom or based on users click on canvas
      //
      //the speed is always incremented by gravity..each frame the speed will increment by 0.25
      this.speed += this.gravity;
      this.dy += this.speed;
      if (this.dy + this.dh >= cvs.height - foreground.dh) {
        //Keep bird down
        this.dy = cvs.height - foreground.dh;
        if (state.current == state.game) {
          state.current = state.over;
          DIE_S.play()
        }
      }
      ///IF THE SPEED IS GREATER THAN THE JUMP..THE BIRD IS FALLING down
      if (this.speed >= this.jump) {
        this.rotation = 90 * DEGREE;
        //if bird hits the ground..change frame to 1
        this.frame = 1
      } else {
        this.rotation = -35 * DEGREE;

      }
    }

  },
  speedReset:function(){

    this.speed=0;
  }

}


//CREATING THE obstacle//

const obstacle = {
  //we have two obstacle..the bottom obstacle and top obstacle
  obstacle_top: {
    sX: 100,
    sY: 500,
  },
  obstacle_bottom: {
    sX: 100,
    sY: 0,
  },
  width: 1400,
  height: 2300,
  gap: 130, //this is the space between the top obstacle and bottom obstacle
  dx: 2, //move with the canvas..move to the left by 2px every time the canvas is moving
  dw: 125,
  dh: 200,
  position: [],
  //each time a new pair of obstacle is created, we push the new location to an array
  //not adding all obstacle positions at once to a position array
  //will only be added after every 100 frames we add a new position to our position array
  //no obstacle created if it is not the game state

  maxYPos: -60,
  //Since we have multiple x and y positions of our obstacle...we need to save these positions somewhere..The best place to saved
  //them is an array..stores the position of the top obstacle




  //newly generated position



  draw: function() {


    //Since the x and y position are in an array..we use a for loop to loop over the array and get x and y positions
    //set the positions to a variable called new Promise(function(resolve, reject) {
    for (let i = 0; i < this.position.length; i++) {
      //has two properties, the x and y position..to get them we use p.x and p.y..Always have the same x position given by p.x
      let p = this.position[i];

      let topYpos = p.y;
      let bottomYpos = p.y + this.dh + this.gap;
      ctx.drawImage(virus, this.obstacle_top.sX, this.obstacle_top.sY, this.width, this.height-500, p.x, topYpos, this.dw, this.dh);
      ctx.drawImage(virus, this.obstacle_bottom.sX, this.obstacle_bottom.sY, this.width, this.height,p.x, bottomYpos, this.dw, this.dh);


    }
  },
  update: function() {
    ///MOVING THE obstacle///
    //don't create any obstacle if state is not gaming
    if (state.current !== state.game) return;

    if (frames%100 == 0) {
      this.position.push({
        //whenever we create a pair of obstacle..they should always appear at the end of the mycanvas
        //so the destination x is the cvs.width for every new pair of obstacle
        x:cvs.width,
        //The math.random will return a number between 0 and 1..So when maxYPos is multiplied by 1
        //it will be at -150 thus have the lonngest obstacle..If multiplied by 2 it will be at -300 thus have the shortest obstacle

        y: this.maxYPos * (Math.random() + 1)
      });}
      //add a for loop to loop over our array positions
      for (let i = 0; i < this.position.length; i++) {
        let p = this.position[i];
        let bottomYpos=p.y+this.dh+this.gap;
        ;

        //COLLISION DETECTION
        /*checks if the cell right side is greater than the obstacle x location*/
        if((cell.dx+cell.radius)>p.x+15 &&cell.dx-cell.radius<p.x+this.dw && (cell.dy+cell.radius)>p.y &&cell.dy-cell.radius<p.y+this.dh-30){
          state.current=state.over;
          HIT_S.play();
        }
        //for the bottom obstacle
        if((cell.dx+cell.radius)>p.x+30 && cell.dx-cell.radius<p.x+this.dw-50 && (cell.dy+cell.radius)>bottomYpos+20 &&cell.dy-cell.radius<bottomYpos+this.dh){
          state.current=state.over;
          HIT_S.play();
        }

        //MOVE obstacle TO THE LEFT
        //decrement the x position of every obstacle by dx
        p.x-=this.dx;

      //  when the obstacle gets to the end position of our canvas..we need to remove them from our array
        if (p.x + this.dw <= 0) {
          //the shift element removes the first element of our array
          this.position.shift();

          //if the obstacle goes beyond our canvas..it means there was no collision..Thus increment the score by 1
}
      if(p.x+this.dw<=0){
          score.value += 1;
          SCORE_S.play();
          // This is to check which of the two scores is the best score
          //and set score.best to the best of the two
          score.best=Math.max(score.value,score.best);

          //store the best score in local localStorage
          //localStorage.setItem(key,value);
          //only stores strings
          localStorage.setItem("best",score.best);
          localStorage.getItem("best")

        }
      }

    },
    reset:function(){
      //empty position array
      this.position=[];
    }


}


//DRAW THE obstacle









//GET READY MESSAGE
const getReady = {
  sX: 24,
  sY: 0,
  w: 486,
  h: 455,
  dx: 130,
  dy: 120,
  draw: function() {
    if (state.current == state.getReady) {
      ctx.drawImage(start, this.sX, this.sY, this.w, this.h, this.dx, this.dy, 180, 152);

      //After this go inside draw function and write background.draw()

    }


  }

}


//GAME OVER MESSAGE
const gameOver = {

  sX: 125,
  sY: 20,
  w: 560,
  h: 540,
  dx: cvs.width / 2 - 240 / 2,
  dy: 90,
  draw: function() {
    if (state.current == state.over) {
      ctx.drawImage(over, this.sX, this.sY, this.w, this.h, this.dx, this.dy, 240, 200);
      //After this go inside draw function and write background.draw()



    }



  }

}

//DISPLAYING SCORES!!

const score={
  best:parseInt(localStorage.getItem("best"))||0,
  value:0,
  draw:function(){

//colour to fill
    ctx.fillStyle="#000000";
    ctx.strokeStyle="#fff";

    //make sure its only done during the game and at the end
    if(state.current==state.game){

      ctx.lineWidth=2;//make text bold
        ctx.font="35px Teko";

        //draw the text itself
        //ctx.Text(value_of_score,x-position,y-posiyion)
        ctx.fillText(this.value,cvs.width/2,50);

        //draw stroke
      ctx.strokeText(this.value,cvs.width/2,50);
    }else if(state.current==state.over){

        ctx.font="25px Teko";
        ctx.fillText(this.value,230,214);
       ctx.strokeText(this.value,230,214);

       //BEST
        ctx.fillText(this.best,230,254);
        ctx.strokeText(this.best,230,254);

    }

  },
  reset:function(){

    this.value=0;
  }



}



////////GAME STATES/////
//our game has three STATES
//1.Ready,2.game,3.over
//not showing get ready/game over until its that state
//create an object called state and put in the 3 states of the game and a current states

const state = {
  //current property keeps track of the state we are in
  //the only property that changes is the current one, the game,ready and over remain the same
  //when the player is in the getready state and clicks on the canvas, he moves to the game state which means we take the current state from 0 to 1
  //
  current: 0,
  getReady: 0,
  game: 1,
  over: 2,
}
//START BUTTON
const startBtn={
  x:120,
  y:276,
  width:166,
  height:15


}


//////////CONTROL game/////////
//Add an event listener to listen to a click on your canvas
cvs.addEventListener("click", function(evt){
  switch (state.current) {
    case state.game:
      cell.flap();
      FLAP_S.play();
      break;
    case state.over:
    //make sure the user only clicks the start position to get started
    //incase the user scrolls..get the position of the canvas so that its exactly
    //where the user clicked..returns size of our canvas and also it's position
    //whenever you scroll down position of the canvas will change
    let rect=cvs.getBoundingClientRect();

    //this returns the x and y position where the mouse was clicked
    //subtracting whatever was added when the canvas was scrolled up or down
      let clickX=event.clientX -rect.left;
      let clickY=event.clientY-rect.top;
      //check if we've clicked start button
      if (clickX>=startBtn.x&&clickX<startBtn.x+startBtn.width &&clickY>=startBtn.y&&clickY<=startBtn.y+startBtn.height) {
        //reset bird speed and obstacle
        cell.speedReset();
        obstacle.reset();
        score.reset();

        state.current = state.getReady;
      }


      break;

    case state.getReady:

      state.current = state.game;
      SWOOSHING_S.play();
      break;

  }

});


//create a switch function to switch between states in your game
//the switch statement is like a function that takes an object to be compared multiple times
//as a parameter
//for example
// switch(x){
//  case value1:    //if(x=== 'value1'){do sth}
//    dosth
//    break;
//if the break statement is not added the switch will continue to other cases without checking the condition
//thus everything under the no break will be executed
//

function switchStatements(evt) {





}





function draw() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  //to simply draw an image on canvas,give the name of the object eg.sprite then the draw method eg sprite.draw
  background.draw();
  obstacle.draw();
  foreground.draw();
  //  background2.draw();
  cell.draw();
  getReady.draw();
  gameOver.draw();
  score.draw()


}

function update() {
  cell.update();
  foreground.update();
  obstacle.update();

}


//updates the  world and allows ypu to modify and edit the canvas
//The animation loop that updates,draws and pauses your world to create an animation
//The loop is placed inside a function
function loop() {
  update();
  draw();
  //keeps track of how many frames are drawn to the canvas
  //when loop is called frames is increased by 1, frames is declared at the very top
  frames++;
  //Requests for the animation frame of 1/50 to call the loop function 50 times
  //per second to cteate the loop
  //the requestAnimationFrametakes a function as a parameter(call back function)..This is the functions//
  //it will call as part of creating the loop
  requestAnimationFrame(loop);

}
loop();
