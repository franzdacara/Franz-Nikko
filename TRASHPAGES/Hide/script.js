
var typingEffect = new Typed(".multiText",{
    strings : ["Nikko","student","coder"],
    loop : true,
    typeSpeed : 100,
    backSpeed : 80,
    backDelay : 1500
})

let letters = ['A', 'B', 'C']; // generate random array of letters
let background = document.querySelector('.background');

for (let i = 0; i < letters.length; i++) {
  let letter = document.createElement('span');
  letter.className = 'letter';
  letter.textContent = letters[i];

  // set random position for each letter
  letter.style.left = Math.random() * 100 + '%';
  letter.style.top = Math.random() * 100 + '%';

  background.appendChild(letter);
}



