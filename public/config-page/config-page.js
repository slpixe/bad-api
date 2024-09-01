// public/config-page/config-page.js

// Debounce function
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

function formatMillisecondsToSeconds(ms) {
    return (ms / 1000).toFixed(2)
}

function formatToPercentage(value) {
    return (value * 100).toFixed(0) + '%';
}

// // Example of updating the status indicator
// function updateStatusIndicator(id, isSuccess) {
//     const statusEl = document.getElementById(`${id}Status`);
//     if (statusEl) {
//         console.log('=aaa', id, isSuccess);
//         statusEl.textContent = isSuccess ? '✔️' : '❌';
//     }
// }

// Check client and server values and update status indicators
function checkAndDisplayStatus() {
    for (const element of elements) {
        const clientValue = state[`${element.id}Client`];
        const serverValue = state[`${element.id}Server`];
        const statusEl = document.getElementById(`${element.id}Status`);

        if (statusEl) {
            if (clientValue !== null && clientValue === serverValue) {
                statusEl.textContent = '✔️️'; // Values match
            } else {
                statusEl.textContent = '❌'; // Values do not match
            }
        }

        if (element.id === 'networkDelay') {
            document.getElementById('networkDelayValue').textContent = formatMillisecondsToSeconds(state[`${element.id}Client`]);
        }

        if (element.id === 'networkDelayChance') {
            document.getElementById('networkDelayChanceValue').textContent = formatToPercentage(state[`${element.id}Client`]);
        }
    }
}

const socket = io();

/*
Will be like the following during update:
// const state = {
//     networkDelayClient: 1200,
//     networkDelayServer: 500,
 */
const state = {};

// Elements to sync
const elements = [
    {id: 'networkDelay', event: 'input', type: 'range'},
    {id: 'networkDelayChance', event: 'input', type: 'range'},
    {id: 'checkbox1', event: 'change', type: 'checkbox'},
    {id: 'textInput1', event: 'input', type: 'text'}
];

// // Function to sync element value with server
// function syncElement(element) {
//     const el = document.getElementById(element.id);
//
//     const emitChange = debounce(() => {
//         const value = element.type === 'checkbox' ? el.checked : el.value;
//         state[`${element.id}Client`] = value; // Save the client-side value
//         // socket.emit('elementChanged', { id: element.id, value });
//         socket.emit('configChanged', { id: element.id, value });
//     }, 300); // Adjust the delay as necessary
//
//     el.addEventListener(element.event, emitChange);
// }

// // Initialize all elements to sync
// elements.forEach(element => {
//     syncElement(element);
// });

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

socket.on('message', (data) => {
    console.log('Message from server:', data);
});

// Send a message to the server
socket.emit('message', 'Hello from client');

// Listen for updates from server
socket.on('configSync', (updatedConfig) => {
    // Update the state with server values
    console.log('=configSync', updatedConfig);

    for (const [id, value] of Object.entries(updatedConfig)) {
        state[`${id}Client`] = value;
        state[`${id}Server`] = value;

        // Update the UI elements with server values
        const el = document.getElementById(id);
        if (el) {
            if (el.type === 'checkbox') {
                el.checked = value;
            } else {
                el.value = value;
                // if (id === 'networkDelay') {
                //     document.getElementById('networkDelayValue').textContent = value;
                // }
            }
        }
    }

    // Check if client and server values match, and update status indicators
    checkAndDisplayStatus();
});

// Function to sync element value with server
function initElements(element) {
    console.log('=initElements', element);
    const el = document.getElementById(element.id);

    const emitChange = debounce(() => {
        console.log('=emitChange');
        console.log('=old client state', state);
        const value = element.type === 'checkbox' ? el.checked : el.value;
        state[`${element.id}Client`] = value; // Update client-side value in state
        console.log('=new client state', state);
        checkAndDisplayStatus();

        // Emit all the updated client-side config to the server
        const clientConfig = {};
        for (const key in state) {
            if (key.endsWith('Client')) {
                const id = key.replace('Client', '');
                clientConfig[id] = state[key];
            }
        }
        socket.emit('configSync', clientConfig);
    }, 300); // Adjust the delay as necessary

    el.addEventListener(element.event, emitChange);
}

// Initialize all elements to sync
elements.forEach(element => {
    initElements(element);
});