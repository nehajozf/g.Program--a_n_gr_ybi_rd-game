////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
    var options = {isStatic:true, angle:angle};
    propeller = Bodies.rectangle(150,480,200,15,options);
     World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  // your code here
    Body.setAngle(propeller,angle);
    Body.setAngularVelocity(propeller,angleSpeed);
    angle+=angleSpeed;
    drawVertices(propeller.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
    push();
  //your code here
    for(var i = birds.length-1; i>=0;i--){
        var bird = birds[i];
        fill(255,0,0);
        drawVertices(bird.vertices);
        
        if(isOffScreen(bird)){
            removeFromWorld(bird);
            birds.splice(i,1);
        }
    }
  pop();
  print(birds.length)
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here
    var numOfRows = 6;
    var numOfCols = 3;
    var size = 80;
    var startX = width-size;
    var startY = height-size;
    
    for(var row=0;row<numOfRows;row++)
{
    for(var col=0;col<numOfCols;col++){
        var x = startX - (col*size);
        var y = startY - (row*size);
        var box = Bodies.rectangle(x,y,size,size);
        World.add(engine.world,[box]);
        boxes.push(box);
        var c = color(random(50,200),random(50,200),random(50,200));
        colors.push(c);
    }
}
    print(boxes.length);
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here
  for(var i=0;i<boxes.length;i++){
      var box = boxes[i];
      var c = colors[i];
      fill(c);
      drawVertices(box.vertices);
  }
    
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
    var options = {restitution:0.05, mass:10};
    slingshotBird = Bodies.circle(180,180,20,options);
    var pointA = {x:200,y:200};
    var bodyB = slingshotBird;
    var stiffness = 0.01;
    var damping = 0.0001;
    var slingshotConstraintSetting = {pointA:pointA,
                                     bodyB:bodyB,
                                     stiffness:stiffness,
                                     damping:damping};
    slingshotConstraint = Constraint.create(slingshotConstraintSetting);
    
World.add(engine.world,[slingshotBird,slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
  fill("orange");
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}




