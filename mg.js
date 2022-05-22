document.querySelector(".control-button span").onclick = function(){
    let yourName = prompt('whats your name');

    if (yourName == ""|| yourName == null){
        document.querySelector('.name span').innerHTML= "unknown";

    }else{
        document.querySelector('.name span').innerHTML = yourName;
    }
    document.querySelector('.control-button').remove();
    // // document.getElementById('fail').play(); 
    // setTimeout(()=>{
    //     document.querySelector('.control-button').

    // },60)
}

let duration = 1000;
let blockContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blockContainer.children);
// console.log(blocks)
// let orderRange = [...blocks.keys()];
let orderRange =[...Array(blocks.length).keys()];
shuffel(orderRange);
blocks.forEach((block,index) =>{
    // console.log(index);
    block.style.order = orderRange[index];
    block.addEventListener('click',function(){
        flipBlock(block);
    })

});
function flipBlock(selectedBlock){
    selectedBlock.classList.add("is-flipped");
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    // console.log(typeof(allFlippedBlocks))
    if (allFlippedBlocks.length == 2){
        //stop clicking function
        stopClicking() 
        //check matched block function
        checkMatchedBLocks(allFlippedBlocks[0],allFlippedBlocks[1])
    }

}

function stopClicking() {
    //add class no clicking on main containerr
     blockContainer.classList.add('no-clicking');
     setTimeout(() => {
         blockContainer.classList.remove('no-clicking')
     }, duration)
}
function checkMatchedBLocks(firstBlock,secondBlock){
    let triesElement = document.querySelector('.tries span');
    if (firstBlock.dataset.technology == secondBlock.dataset.technology){
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlock.classList.add('matched');
        secondBlock.classList.add('matched');
        document.getElementById('success').play();

    }else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML)+1;
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        },duration);
        document.getElementById('fail').play();



    }
}

function shuffel (array){
    let current = array.length;
    while(current>0){
        random = Math.floor(Math.random()*current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }

    return array;
}

