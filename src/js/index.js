import css from '../css/main.scss';
import antigen from './Antigen';
import ImunSystem from './ImunSystem';

let system = new ImunSystem(antigen);
system.start();
showResults();


function showResults() {
    let antigenDiv = document.getElementById("antigen");
    let antibodyDiv = document.getElementById("antibody");

   // antigenDiv.innerHTML += 'Antigen : f(x1,x2) = x1*x2*sin(x1^2 + x2^2)';
    antibodyDiv.innerHTML += '<h2>Antibody:</h2>';

    for(let i = 0; i < system.antibodies.length; i++) {
        antibodyDiv.innerHTML +=`<div class="number"> Antibody number: ${i +1}</div>`;
        antibodyDiv.innerHTML += `<p>x1 = ${system.antibodies[i].a}</p>`;
        antibodyDiv.innerHTML += `<p>x2 = ${system.antibodies[i].b}</p>`;
        antibodyDiv.innerHTML += `<p class="result">f(x1,x2) = ${system.antibodies[i].affinity}</p><br>`;
        antibodyDiv.innerHTML +=`<div class="line"></div>`;
        
    }
}

