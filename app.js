const storage = document.querySelector('#storage');
const transfer = document.querySelector('#transfer');
const storageText = document.querySelector('#storageText');
const transferText = document.querySelector('#transferText');

const hdd = document.querySelector('#hdd');
const multi = document.querySelector('#multi');
const radioButtons = document.querySelectorAll('input[type=radio]');

const backblaze = document.querySelector('#backblaze');
const bunny = document.querySelector('#bunny');
const scaleway = document.querySelector('#scaleway');
const vultr = document.querySelector('#vultr');

const backblazeGraph = document.querySelector('.backblaze-graph')
const bunnyGraph = document.querySelector('.bunny-graph')
const scalewayGraph = document.querySelector('.scaleway-graph')
const vultrGraph = document.querySelector('.vultr-graph')

evalAll();

storage.oninput = (e) => {
    storageText.innerText = e.target.value;
    evalAll();

}
transfer.oninput = (e) => {
    transferText.innerText = e.target.value
    evalAll();
}

radioButtons.forEach(btn => {
    btn.onchange = () => evalAll()
});

function evalAll() {
    const backblazeVal = backblazePrice(storage, transfer)
    const bunnyVal = bunnyPrice(storage, transfer)
    const scalewayVal = scalewayPrice(storage, transfer)
    const vultrVal = vultrPrice(storage, transfer)

    const minVal = Math.min(backblazeVal, bunnyVal, scalewayVal, vultrVal)

    switch (minVal) {
        case backblazeVal:
            backblazeGraph.style.background = 'red'
            bunnyGraph.style.background = 'grey'
            scalewayGraph.style.background = 'grey'
            vultrGraph.style.background = 'grey'
            break;
        case bunnyVal:
            backblazeGraph.style.background = 'grey'
            bunnyGraph.style.background = 'orange'
            scalewayGraph.style.background = 'grey'
            vultrGraph.style.background = 'grey'
            break;
        case scalewayVal:
            backblazeGraph.style.background = 'grey'
            bunnyGraph.style.background = 'grey'
            scalewayGraph.style.background = 'violet'
            vultrGraph.style.background = 'grey'
            break;
        case vultrVal:
            backblazeGraph.style.background = 'grey'
            bunnyGraph.style.background = 'grey'
            scalewayGraph.style.background = 'grey'
            vultrGraph.style.background = 'blue'
            break;
        default: return null;
    }
}

function backblazePrice(storage, transfer) {
    let price = (storage.value * 0.005 + transfer.value * 0.01).toFixed(2);

    backblaze.innerText = (price < 7 ? 7 : price) + '$';
    backblazeGraph.style.width = 200 / 74 * (price < 7 ? 7 : price) + 'px';

    return price < 7 ? 7 : price;
}

function bunnyPrice(storage = storage.value, transfer = transfer.value) {
    let price = +(storage.value * (hdd.checked ? 0.01 : 0.02) + transfer.value * 0.01).toFixed(2);

    bunny.innerText = (price > 10 ? 10 : price) + '$';
    bunnyGraph.style.width = 200 / 74 * (price > 10 ? 10 : price) + 'px';

    return price > 10 ? 10 : price;
}

function scalewayPrice(storage = storage.value, transfer = transfer.value) {

    let price = +((storage.value - 75) * (multi.checked ? 0.06 : 0.03)
        + (transfer.value - 75) * 0.02).toFixed(2);
    scaleway.innerText = (price < 0 ? 0 : price) + '$';
    scalewayGraph.style.width = 200 / 74 * (price < 0 ? 0 : price) + 'px';

    return (price < 0) ? 0 : price;
}

function vultrPrice(storage, transfer) {
    let price = +(storage.value * 0.01 + transfer.value * 0.01).toFixed(2);

    vultr.innerText = (price < 5 ? 5 : price) + '$';
    vultrGraph.style.width = 200 / 74 * (price < 5 ? 5 : price) + 'px';

    return (price < 5) ? 5 : price;
}

