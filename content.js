var highlighter

function highlightSelectedText() {
    // Highlight the current selection
    highlighter.highlightSelection("highlight");

    // Serialize all highlights (including the new one)
    var serializedHighlights = highlighter.serialize();
    console.log(serializedHighlights);

    // Save all highlights
    chrome.storage.sync.set({ [window.location.href]: serializedHighlights }, function () {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
        } else {
            console.log("Saved highlights.");
        }
    });
}

function unhighlightSelectedText() {
    // unHighlight the current selection
    highlighter.unhighlightSelection();

    // Serialize all highlights (including the new one)
    var serializedHighlights = highlighter.serialize();
    console.log(serializedHighlights);

    // Save all highlights
    chrome.storage.sync.set({ [window.location.href]: serializedHighlights }, function () {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
        } else {
            console.log("Saved highlights.");
        }
    });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'highlight') {
        highlightSelectedText();
    } else if (message.action === 'unhighlight') {
        unhighlightSelectedText();
    }
});

// On page load, re-apply any saved highlights
window.onload = function () {
    rangy.init()
    highlighter = rangy.createHighlighter();

    highlighter.addClassApplier(rangy.createClassApplier("highlight", {
        ignoreWhiteSpace: true,
        tagNames: ["span", "a"]
    }));

    chrome.storage.sync.get([window.location.href], function (result) {
        if (result[window.location.href]) {
            try {
                console.log("there is highlights")
                highlighter.deserialize(result[window.location.href]);
            } catch (error) {
                console.error("Failed to deserialize highlights:", error);
            }
            console.log("Restored highlights.");
            console.log(result[window.location.href]);
        }
    });
}
