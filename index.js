var toInp = document.getElementById("myTo"),
    msgInp = document.getElementById("myMessage"),
    fromInp = document.getElementById("myFrom"),
    bgInp = document.getElementById("bgImg"),
    addTo = document.getElementById("add"),
    prev = document.getElementById("preview"),
    save = document.getElementById("save"),
    load = document.getElementById("load");

var dTo = document.getElementById("to"),
    dFrom = document.getElementById("from"),
    dMsg = document.getElementById("message"),
    card = document.getElementById("postcard");

var allCards = [],
    num = 0;

toInp.addEventListener("keyup", function() {
   dTo.innerText = this.value; 
});

msgInp.addEventListener("keyup", function() {
   dMsg.innerText = this.value; 
});

fromInp.addEventListener("keyup", function() {
   dFrom.innerText = this.value; 
});

bgInp.addEventListener("keyup", function(ev) {
    if (ev.keyCode == 13) {
        console.log = "clicked";
        if(num > 2) {
            num = 0;
        }
        if(this.value == "auto") {
            num++;
            card.style.backgroundImage = "url('imgs/auto"+num+".jpg')";
            
        } else if (this.value == "") {
            card.style.backgroundImage = "url('imgs/default.png')";
                   
        } else {
           card.style.backgroundImage = "url("+this.value+")"; 
        }
    }
});

addTo.addEventListener("click", function() {
    var obj = {
        bgimg:card.style.backgroundImage,
        to:dTo.innerText,
        message:dMsg.innerText,
        from: dFrom.innerText
    }
    allCards.push(obj);
  // console.log(allCards);
    createPostcard(obj.to, obj.bgimg, obj.from, obj.message);
});

save.addEventListener("click", function() {
    localStorage.setItem("postcards", JSON.stringify(allCards)); 
});

load.addEventListener("click", function() {
    prev.innerHTML = "";
    var mySavedCards = JSON.parse(localStorage.getItem("postcards")); 
    
    for (var i=0; i< mySavedCards.length; i++) {
        createPostcard(mySavedCards[i].to, mySavedCards[i].bgimg, mySavedCards[i].from, mySavedCards[i].message);
    }
});

function createPostcard(to, bgImg, from, msg) {
    var nDiv = document.createElement("div");
    nDiv.className = "cards";
    nDiv.style.backgroundImage = bgImg;
    
    var nToDiv = document.createElement("div");
    nToDiv.innerText = to;
    nToDiv.className = "prevTo";
    nDiv.appendChild(nToDiv);
    
    var hiddenDiv1 = document.createElement("div");
    hiddenDiv1.innerText = from;
    hiddenDiv1.style.display = "none";
    nDiv.appendChild(hiddenDiv1);
    
    var hiddenDiv2 = document.createElement("div");
    hiddenDiv2.innerText = msg;
    hiddenDiv2.style.display = "none";
    nDiv.appendChild(hiddenDiv2);
    
    nDiv.addEventListener("click", function() {
        card.style.backgroundImage = this.style.backgroundImage;
        dTo.innerText = this.children[0].innerText;
        dFrom.innerText = this.children[1].innerText;
        dMsg.innerText = this.children[2].innerText;
    });
    
    prev.appendChild(nDiv);
}