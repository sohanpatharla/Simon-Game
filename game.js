var buttonColours=["red","blue","green","yellow"]; 
var gamePattern=[];
var userClickedPattern=[];
var started=0;
var level=0;
$(document).on("keypress",(function(){
    started=!started;
    if(started==1){
    $("#level-title").html("Level "+level);
    nextSequence();
    started=1;
    }
}));

$(".btn").on("click",function(){
    var UserChosenColour=this.id;
    userClickedPattern.push(UserChosenColour);
    playSound(UserChosenColour);
    animatePress(UserChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("#level-title").html("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
    },200);
       startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level=level+1;
    $("#level-title").html("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
    $("#"+currentColor).removeClass("pressed");
    },100)
}
function playSound(name) {
    var audio =new Audio("sounds/"+name+".mp3");
    audio.play();
}
function startOver(){
    level=0;
    gamePattern=[];
    started=0;
}

 
