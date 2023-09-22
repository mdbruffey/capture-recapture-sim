document.getElementById('single-button').addEventListener("click", showSingleSample);
document.getElementById('avg-button').addEventListener("click", showAveragedSamples);
document.getElementById('simulateSingleSample').addEventListener("click", simulateSingleSample);
document.getElementById('simulateAverageSamples').addEventListener("click", simulateAverageSamples);

sample(10,5,5);


function simulateSingleSample(){
    let num = parseInt(document.getElementById("numPop").value);
    let samples = parseInt(document.getElementById("numSamples").value);
    let recaptures = parseInt(document.getElementById("numRecapture").value);
    let output = document.getElementById("singleSampleOutput")
    output.innerHTML = "";
    let validInput = true;

    if (num < 1){
        let p = document.createElement('p');
        p.textContent = "Population Size cannot be less than 1!";
        output.appendChild(p);
        validInput = false;
    }
    if(samples < 1){
        let p = document.createElement('p');
        p.textContent = "Sample Size cannot be less than 1!";
        output.appendChild(p);
        validInput = false;
    }
    if(samples > num){
        let p = document.createElement('p');
        p.textContent = "Sample Size cannot be larger than the population!";
        output.appendChild(p);
        validInput = false;
    }
    if(recaptures < 1){
        let p = document.createElement('p');
        p.textContent = "Recapture Size cannot be less than 1!";
        output.appendChild(p);
        validInput = false;
    }
    if(recaptures > num){
        let p = document.createElement('p');
        p.textContent = "Recapture Size cannot be larger than the population!";
        output.appendChild(p);
        validInput = false;
    }
    if(validInput){
        let result = sample(num, samples, recaptures);
        for(let key in result){
            let p = document.createElement("p");
            p.textContent = `${key}: ${result[key]}`
            output.appendChild(p);
        }
    }
}

function simulateAverageSamples(){
    let num = parseInt(document.getElementById("numPopA").value);
    let samples = parseInt(document.getElementById("numSamplesA").value);
    let variance = parseInt(document.getElementById("variance").value);
    let trials = parseInt(document.getElementById("trials").value);
    let output = document.getElementById("averagedSamplesOutput");
    output.innerHTML = "";
    let validInput = true;

    
    if (trials > 100000){
        let p = document.createElement('p');
        p.textContent = "No";
        output.appendChild(p);
        return;
    }
    if (num < 1){
        let p = document.createElement('p');
        p.textContent = "Population Size cannot be less than 1!";
        output.appendChild(p);
        validInput = false;
    }
    if(samples < 1){
        let p = document.createElement('p');
        p.textContent = "Sample Size cannot be less than 1!";
        output.appendChild(p);
        validInput = false;
    }
    if(samples > num){
        let p = document.createElement('p');
        p.textContent = "Sample Size cannot be larger than the population!";
        output.appendChild(p);
        validInput = false;
    }
    if(variance < 0){
        let p = document.createElement('p');
        p.textContent = "Variance cannot be less than 0!";
        output.appendChild(p);
        validInput = false;
    }
    if(variance > samples){
        let p = document.createElement('p');
        p.textContent = "Variance cannot be larger than the sample size!";
        output.appendChild(p);
        validInput = false;
    }
    if(trials < 1){
        let p = document.createElement('p');
        p.textContent = "Must run at least 1 trial!";
        output.appendChild(p);
        validInput = false;
    }
    if(validInput){
        let count = 0;
        for(let i = 0; i < trials; i++){
            let recaptures = samples + (2*Math.floor(Math.random())*variance - variance);
            let result = sample(num, samples, recaptures);
            count += parseInt(result["n"]*result["K"]/result["k"]);
        }
        let p = document.createElement("p");
        p.textContent = `Population Estimate based on ${trials} sample sets: ${parseInt(count/trials)}`
        output.appendChild(p);
    }
}

function showSingleSample(){
    const tabs = document.getElementsByClassName('tab');
    for (let i=0; i< tabs.length; i++){
        tabs[i].classList.remove('active');
    }
    document.getElementById("singleSample").classList.add('active')
}

function showAveragedSamples(){
    const tabs = document.getElementsByClassName('tab');
    for (let i=0; i< tabs.length; i++){
        tabs[i].classList.remove('active');
    }
    document.getElementById("averagedSamples").classList.add('active')
}

function sample(num, samples, recaptures){
    const results = {};
    const pop = new Array(num).fill(0);
    for (let i=0; i < samples; i++){
        pop[i] = 1;
    }
    shuffleArray(pop);
    const selection = pop.slice(0,recaptures);
    results["k"] = selection.filter((item) => item===1).length;
    results["K"] = recaptures;
    results["n"] = samples;
    return results;
}

function shuffleArray(array){
    for(let i = array.length-1; i > 0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}