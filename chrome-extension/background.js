let isInitialLoad = true;

chrome.tabs.onActivated.addListener((activeInfo) => {
    if (isInitialLoad) {
        console.log('Ignoring initial load.');
        isInitialLoad = false;
        return;
    }

    chrome.tabs.get(activeInfo.tabId, (tab) => {
        console.log(`Switched to tab: ${tab.title}`);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        console.log(`Tab updated: ${tab.title}`);
    }
});