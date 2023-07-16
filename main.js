//catch the selectors
let startGameButton = document.querySelector(".control-buttons span");
let playerName = document.querySelector(".name span");
let blockContainer = document.querySelector(".memory-game-blocks");

//start Game Page
//Register Name Function
startGameButton.onclick = function(){
    let yourName = prompt("Enter Your Name");
    //if Name Is Empty
    if(yourName == null || yourName == ""){
        playerName.innerHTML = "UnKnown"
    }
    else{
        playerName.innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
};

//Main Variables

let duration = 1000;
let blocks = Array.from(blockContainer.children);

// 20 Empty Element contain The Keys Wich will make order to the image by them 
let orderRange = [...Array(blocks.length).keys()];

// Another Way to make order

// let orderRange = Array.from(Array(blocks.length).keys());
// Add The Order Css Property To Game Blocks 
// After Shuffle The order Range Array

shuffle(orderRange);

blocks.forEach((block,index)=>{

    block.style.order = orderRange[index];
    block.addEventListener("click",function(){
        //Trigger the Flip Block Function
        flipBlock(block);
    })
});

//Add Click Event 

// Flip Block functio 

function flipBlock(selectBlock){
    
    selectBlock.classList.add("is-flipped");
    //colect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));
    //if theres Two Selected Blocks
    if(allFlippedBlocks.length === 2){

    //stop Clicking Function
    stopClicking();

    // Check Matched  Block function
    checkMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);
    
    }
}

    //stop Clicking Function
function stopClicking(){

    //Add Class "no Clicking" on container blocks
    blockContainer.classList.add("no-clicking");
    //Wait one seconde for the next click

    setTimeout(()=>{
    //Remove Class "no Clicking" After Clicking
    blockContainer.classList.remove("no-clicking");
    },duration);
}

//check Matched Block
function checkMatchedBlocks(firstBlock,secondBlock){

    let triesElement = document.querySelector(".tries span");

    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
    }
    else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(()=>{
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        },duration)
    }
};

//Shuffle Function

function shuffle(array){
    let current = array.length;
    let random , temp;
    
    while(current > 0){
        random = Math.floor(Math.random()* current);
        current--;
        //Swaping betwwen the current Element and random Element
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
        /*
            [1] Save Current Element in Stash
            [2] Current Element = Random Element
            [3] Random Element = Get Element From Stash
        */
    }
    return array;
}













