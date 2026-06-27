# Privacy Policy for Web Clicker

Web Clicker does not collect, store, or transmit any personal data to any external server.

The extension makes no network requests of any kind. It does not store any user data, and it requests no `permissions` in its manifest. It runs entirely on your device.

Web Clicker does not use analytics, tracking, advertising, or remote code of any kind.

## Permissions

| Permission | Purpose |
| --- | --- |
| `content_scripts` matching `<all_urls>` | The hint overlay must be able to render on whatever page you are viewing, which can be any site. The extension reads no page content and sends no data anywhere; the host access is solely to display the in-page hint overlay and to activate the element you select with the keyboard. |

The extension declares no entries in the `permissions` array. The keyboard shortcut is delivered to the active tab via `chrome.tabs.sendMessage`, which requires no permission.

## Contact

For questions or concerns, open an issue at the project repository.
