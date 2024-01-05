

document.addEventListener('DOMContentLoaded', function() {
    // Your script code here

    function selectOption(optionId) {
        console.log("Hello im here")
        // Get the radio button element by optionId
        var radioButton = document.querySelector('input[type="radio"][value="' + optionId + '"]');
    
        // Check the radio button
        radioButton.checked = true;
    }
});
