var GoFish={};
GoFish["createCard"] = function( num ){ 
    return "<div class='cards'>\
                <div class='card-inner'>\
                    <div class='card-front'>\
                    </div>\
                    <div class='card-back'>\
                        <span class='nums'>"+num+"</span>\
                    </div>\
                </div>\
            </div>" ;
}

GoFish["makeTime"] = function (second) {
    return Math.floor( second/60) + " Min " + second % 60 + " Sec.";
}

GoFish["shuffleCard"] = function () {
    var nums = [];
    for (var i = 1; i <= 12; i++) {
        nums.push(i);
        nums.push(i);
    }
    var index ;
    while(nums.length!=0){
        index = Math.floor(Math.random()*nums.length);
        $("#playground").append(GoFish.createCard(nums[index]));
        nums.splice(index,1);
    }
}

GoFish["win"]=function(){
    $("#playground").text("");
    $("#playground").append("<div class='win'>\
                CONGRATULATION! You Made It!\
            </div >");
}


GoFish["fadeOut"] = function (pick1, pick2){
    setTimeout(function () {
        pick1.children().css("opacity", "0");
        pick1.children().css("visibility", "hidden");
        pick2.children().css("opacity", "0");
        pick2.children().css("visibility", "hidden");
    }, 800);
    setTimeout(function () {
        pick1.children().css("display", "none");
        pick2.children().css("display", "none");
    }, 1800);
    if (delPair === 0) {
        // celebration text
        GoFish.win();
    }
}

GoFish["check"] = function(){
    if (numFlip == 2) {
        var pick1 = picked.pop();
        var pick2 = picked.pop();
        numFlip = 0;
        if (pick1.find("span").text() === pick2.find("span").text()) {
            delPair--;
            GoFish.changeCl(delPair);
            GoFish.fadeOut(pick1, pick2);
        }

        setTimeout(function () {
            pick1.children().css("transform", "rotateY(0deg)");
            pick2.children().css("transform", "rotateY(0deg)");
        }, 800);
    }
}
GoFish["playgroundEvent"] = function(){
    $("#playground").on("click", ".cards", function () {
        if (($(this).children().css("transform") === "matrix(1, 0, 0, 1, 0, 0)") && numFlip < 2) {
            numFlip++;
            $(this).children().css("transform", "rotateY(180deg)");
            picked.push($(this));
            // check status of fliped cards
            GoFish.check();
        }
    });
}

GoFish["playEvent"] = function () {
    $("#play").on("click", function () {
        sec=0;
        $("#startScreen").removeClass("d-flex").addClass("d-none");
    });
}
GoFish["startTimer"] = ()=>{
    setInterval(function () {
        sec++;
        GoFish.changeTime();
    }, 1000);
}
GoFish["changeTime"] = function(){
    $("#timer").text(GoFish.makeTime(sec));
}

GoFish["changeCl"] = function(num){
    $("#cl").text("" + num);
}

GoFish["newGame"]=function(){
    $("#newGame").on("click", function(){
        $("#playground").text("");
        GoFish.shuffleCard();
        numFlip = 0;
        picked = [];
        delPair = 12;
        sec = 0;
        GoFish.changeCl(12);
        GoFish.changeTime();
    });
}

GoFish["initial"] = function(){
    // create cards
    numFlip = 0;
    picked = [];
    delPair = 12;
    sec = 0;
    
    GoFish.shuffleCard();
    GoFish.playgroundEvent();
    GoFish.playEvent();
    GoFish.startTimer();
    GoFish.newGame();
};


GoFish.initial();
var numFlip = 0;
var picked = [];
var delPair = 12;
var sec = 0;




