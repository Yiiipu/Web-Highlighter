chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      "id": "highlight",
      "title": "Highlight",
      "contexts": ["selection"]
    });
    chrome.contextMenus.create({
        "id": "unhighlight",
        "title": "Remove highlight",
        "contexts": ["selection"]
      });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "highlight") {
    chrome.tabs.sendMessage(tab.id, {action: "highlight"});
  }
  if (info.menuItemId === "unhighlight") {
    chrome.tabs.sendMessage(tab.id, {action: "unhighlight"});
  }
});
