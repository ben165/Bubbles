class Bubble {
	constructor(id, name, r) {
        this.id = id;
        this.r = r;
		this.name = name;
	}
    // Dont have to be set in the beginning
    x = 0; // x pos
    y = 0; // y pos
}

function randomMinusPlus() {
    if ( Math.random() < 0.5 ) {
        return -1;
    } else {
        return 1;
    }
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function clearCanvas(c, ctx) {
    ctx.clearRect(0, 0, c.width, c.height);
}

// Make random size bubbles
function makeBubbles(list1, c, ctx) {
    names = ["C++", "Python", "Java", "Presi", "Teamarbeit", "Unix", "OOP", "Office", "Ansible", "Pipeline", "SQL", "REST", "SCRUM", "Caching", "JS", "Rust", "Vim", "Go", "Git", "Recursive", "Haskell"];
    
    for (i=0; i<names.length; i++) {
        temp = new Bubble(i, names[i], random(20, 50));
        temp.x = c.width/2;
        temp.y = c.height/2;
        list1.push(temp);
    }
}


// works with globals bubbleList, c, ctx
function printLinks(list1) {
    list2 = []
    for(i=0; i<list1.length; i++) {
        str1 = '<button class="btn btn-primary mb-2" onclick="increaseBubble('+ list1[i].id.toString() +',bubbleList,c,ctx)">'+ list1[i].name +'</button>';
        list2.push(str1);
    }
    list2 = list2.join("\n");
    document.getElementById("skillLinks").innerHTML = list2;
  }


function drawBubbles(list1, c, ctx) {
    ctx.font = "12px Arial";

    clearCanvas(c, ctx);

    for (i=0; i<list1.length; i++) {
        ctx.beginPath();
        ctx.fillText(list1[i].name, list1[i].x-list1[i].r/2, list1[i].y);
        ctx.arc(list1[i].x, list1[i].y, list1[i].r, 0, 2*Math.PI);
        ctx.stroke();
    }
}



// Compare all circles with each other and change position if needed
// One loop each call
// Gets called till no movement anymore
function changePosCircles(list1, c, ctx) {
    movement = 0;
    // Compare everyone with everyone
    for (i=0; i<list1.length; i++) {
        for (j=0; j<list1.length; j++) {
            //same circle?
            if ( i == j ) {
                continue;
            }

            xtrend = list1[i].x - list1[j].x
            ytrend = list1[i].y - list1[j].y
            
            // If both circles are overlapping choose direction by random
            if (xtrend == 0) {
                xtrend = randomMinusPlus()*5;
            }

            if (ytrend == 0) {
                ytrend = randomMinusPlus()*5;
            }

            // distance
            d = (( xtrend )**2 + ( ytrend )**2)**0.5;
            
            // d < r1 + r2  -->  overlapping circles
            rg = list1[i].r + list1[j].r
            
            // Move bubble away from i bubble if overlap
            if ( d < rg ) {
                list1[j].x -= xtrend * 0.1;
                list1[j].y -= ytrend * 0.1;

                // There was a movement
                movement = 1;
            }
        }
    }
    
    if (movement == 1) {
        drawBubbles(list1, c, ctx);
    }
    else {
        // global variable...
        clearInterval(moveBubbles);
    }
}


function animatePos(list1, c, ctx) {
    // Call function every 100ms till no movement anymore
    moveBubbles = setInterval(changePosCircles, 100, list1, c, ctx)
}

// Works a lot with global vars
function increaseBubble(nr, list1, c, ctx) {
    list1[nr].r += 10;
    animatePos(list1, c, ctx)
}


