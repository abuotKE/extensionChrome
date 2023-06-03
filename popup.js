document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const pointerButton = document.getElementById('pointerButton');
    startButton.addEventListener('click', startRecording);
    stopButton.addEventListener('click', stopRecording);
    pointerButton.addEventListener('click', pointElement);
});

function startRecording() {
    startButton.style.display = 'none';
    stopButton.style.display = 'block';
    pointerButton.style.display = 'block';
    chrome.runtime.sendMessage("startRecording");
}

function stopRecording() {
    stopButton.style.display = 'none';
    startButton.style.display = 'block';
    pointerButton.style.display = 'none';
    chrome.runtime.sendMessage("stopRecording");
}

function pointElement() {
    chrome.runtime.sendMessage("pointElement");
}