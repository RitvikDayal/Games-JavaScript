console.log('Connected');

var restart = document.querySelector('button')
var squares = document.querySelectorAll('td')

function reset() {
    for (var i=0; i<squares.length; i++){
        squares[i].textContent = " ";
    }
}

function placerX(){
    if (this.textContent === ''){
        this.textContent = 'X'
    }
    else if (this.textContent === 'X'){
        this.textContent = 'O'
    }
    else {
        this.textContent = ''
    }
}

for (var i=0; i<squares.length; i++){
    squares[i].addEventListener('click', placerX)
}




restart.addEventListener('click', reset)
