let currentTooltip = null;

// Add a double-click event listener to detect when the user clicks on a word
document.addEventListener('dblclick', function(event) {
    // Get the word clicked
    let selectedText = window.getSelection().toString().trim();
    
    if (selectedText) {
        // Remove any existing tooltip
        if (currentTooltip) {
            currentTooltip.remove();
            currentTooltip = null;
        }

        // Fetch the word's meaning from a dictionary API
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText}`)
        .then(response => response.json())
        .then(data => {
            if (data[0] && data[0].meanings) {
                let meaning = data[0].meanings[0].definitions[0].definition;
                showTooltip(event.pageX, event.pageY, meaning);
            } else {
                showTooltip(event.pageX, event.pageY, "No definition found");
            }
        })
        .catch(error => {
            showTooltip(event.pageX, event.pageY, "Error fetching definition");
            console.error('Error:', error);
        });
    }
});

// Function to show a tooltip with the definition
function showTooltip(x, y, text) {
    // Remove any existing tooltip
    if (currentTooltip) {
        currentTooltip.remove();
    }

    // Create the tooltip element
    let tooltip = document.createElement('div');
    tooltip.className = 'dictionary-tooltip';
    tooltip.innerText = text;
    document.body.appendChild(tooltip);

    // Style the tooltip
    tooltip.style.position = 'absolute';
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
    tooltip.style.backgroundColor = 'black';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.zIndex = '1000';
    tooltip.style.boxShadow = '0px 0px 5px rgba(0,0,0,0.3)';
    tooltip.style.maxWidth = '300px';

    // Set the current tooltip reference
    currentTooltip = tooltip;
}

// Add a click event listener to the document to detect outside clicks
document.addEventListener('click', function(event) {
    // If there is a tooltip and the click is outside of the tooltip, remove it
    if (currentTooltip && !currentTooltip.contains(event.target)) {
        currentTooltip.remove();
        currentTooltip = null;
    }
});
