chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "lookup-word",
      title: "Lookup '%s' in Dictionary",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "lookup-word") {
      let word = info.selectionText;
      chrome.tabs.create({ url: `https://www.dictionary.com/browse/${word}` });
    }
  });
  