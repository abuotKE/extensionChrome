document.addEventListener('DOMContentLoaded', function() {
    let startButton = document.getElementById('startButton');
    let stopButton = document.getElementById('stopButton');
    startButton.addEventListener('click', startRecording);
    stopButton.addEventListener('click', stopRecording);
});

function startRecording() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.runtime.sendMessage("startRecording");
    });
}

function stopRecording() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.runtime.sendMessage("stopRecording");
    });
}
