class Controller {
  constructor({ blockedUrls, dayFor }) {
    this.blockedUrls = blockedUrls;
    this.dayFor = dayFor;
    this.wordCount = wordCount;
  }

  closeTabIfBlockedUrl(url, tabId) {
    const blockedUrl = this.blockedUrls.find(blocked => url.indexOf(blocked) >= 0);
    if (!blockedUrl) return;
    else chrome.tabs.remove(tabId);
  }
}