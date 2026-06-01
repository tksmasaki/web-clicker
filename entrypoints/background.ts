export default defineBackground(() => {
  chrome.commands.onCommand.addListener(async (command) => {
    if (command !== 'toggle-hints') return;
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id == null) return;
    chrome.tabs.sendMessage(tab.id, { type: 'toggle-hints' }).catch(() => {
      // Ignore pages where the content script does not run (e.g. chrome://).
    });
  });
});
