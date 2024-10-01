document.addEventListener('DOMContentLoaded', function () {
    // State management
    let state = {
        isLoading: false,
        statusCode: null,
        resultStatus: 'not-executed', // Can be 'not-executed', 'ok', or 'not-ok'
        responseBody: null
    };

    const apiPathInput = document.getElementById('api-path');
    const sendButton = document.getElementById('send-btn');
    const statusCodeDisplay = document.getElementById('status-code');
    const responseTextDisplay = document.getElementById('response-text');
    const loadingRadio = document.getElementById('loading-radio');
    const loadedRadio = document.getElementById('loaded-radio');
    const notLoadingRadio = document.getElementById('not-loading-radio');
    const unknownOkRadio = document.getElementById('unknown-ok-radio');
    const notOkRadio = document.getElementById('not-ok-radio');
    const okRadio = document.getElementById('ok-radio');

    // Function to update the DOM based on the state
    function updateDOM() {
        // Update loading state
        if (state.isLoading) {
            loadingRadio.checked = true;
        } else {
            notLoadingRadio.checked = true;
        }

        // Update status code
        if (state.statusCode !== null) {
            statusCodeDisplay.textContent = `Status Code: ${state.statusCode}`;
            loadedRadio.checked = true;
            loadedRadio.labels[0].textContent = `Loaded (${state.statusCode} ms)`;
        }

        // Update request result status
        if (state.resultStatus === 'ok') {
            okRadio.checked = true;
        } else if (state.resultStatus === 'not-ok') {
            notOkRadio.checked = true;
        } else {
            unknownOkRadio.checked = true;
        }

        // Update response body
        if (state.responseBody !== null) {
            responseTextDisplay.textContent = JSON.stringify(state.responseBody, null, 2);
        }
    }

    // Function to handle the API call
    async function makeApiCall() {
        const apiUrl = apiPathInput.placeholder;

        // Set loading state
        state.isLoading = true;
        updateDOM();

        try {
            // Make the API request
            const response = await fetch(apiUrl);
            const responseBody = await response.json();

            // Update state based on the response
            state.isLoading = false;
            state.statusCode = response.status;
            state.responseBody = responseBody;
            state.resultStatus = response.ok ? 'ok' : 'not-ok';
        } catch (error) {
            // Handle errors (e.g., network issues)
            state.isLoading = false;
            state.statusCode = 500; // Set a generic status code for errors
            state.responseBody = { error: 'Network Error or Invalid API Path' };
            state.resultStatus = 'not-ok';
        }

        // Update the DOM with the final state
        updateDOM();
    }

    // Attach the API call to the button click event
    sendButton.addEventListener('click', makeApiCall);
});
