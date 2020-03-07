function removeTransition(e) {

    //the keydown event trigger a property 'transform'
    if(e.propertyName !== 'transform') return;

    //it removes the class 'playing' to the class of the div called by pressing the keyboard
    //'this' referes to <div data-key="65" class="key"> (or the others depending on which kbd key was pressed)
    this.classList.remove('playing');

}

function playSound(e) {

    //`audio[data-key="${e.keyCode}"]` this is a ES6 new syntax to select the audio tag
    //the function argument is "e" that is the audio tag in the html
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

    //we need to select the corresponding key to add the animation on the button
    //adding the ".key" means that we select a class not a tag element
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    //if there is no audio with the selected data-key stop the function from running all together
    if(!audio) return;

    //we are trying to add an animation using the 'transition' attribute of the class key
    //and invoking the class '.playing' to make the animation happen 
    key.classList.add('playing');

    //rewind to the start - it allows us to play multiple time the same key continuosly
    audio.currentTime = 0; 

    //if a the proper key is selected the audio is played
    audio.play();

}

//create an array of all elements with class 'key'
//Array.from() is a method that allows to create the array
const keys = Array.from(document.querySelectorAll('.key'));

//the forEach() method executes a provided callback function once for each array element ('key')
//The EventTarget method addEventListener() sets up a function that will be called whenever the specified event is delivered to the target
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

//keydown is an "event listener"
window.addEventListener('keydown', playSound);