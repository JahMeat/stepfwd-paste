# STEPfwd Paste

A lightweight browser extension that enables plain text transfer from a host computer into virtual machines running on Carnegie Mellon University's STEPfwd platform.

## Overview

STEPfwd Paste addresses the lack of conventional clipboard synchronization between a host computer and a STEPfwd virtual machine.

Instead of relying on native clipboard sharing, the extension converts user-provided text into simulated keyboard events that are forwarded to the virtual machine through the existing browser-based remote console.

No additional software or configuration is required inside the virtual machine.

## Features

- Transfer plain text into STEPfwd virtual machines.
- Support uppercase and lowercase letters, numbers, punctuation, spaces, and line breaks.
- Adjustable keystroke delay for reliable text transfer.
- Carnegie Mellon-inspired user interface.
- No Python, external libraries, or package managers required.
- No direct clipboard access permission required.
- Designed for Windows, Linux, and macOS host computers.
- Restricted by design to the STEPfwd remote console.
- Lightweight and fully inspectable source code.

## Installation

### Step 1: Download the repository

1. Navigate to this GitHub repository.
2. Click the green **Code** button near the top of the repository.
3. Select **Download ZIP**.
4. Extract the downloaded ZIP file to a location on your computer.

Make sure the extracted extension folder contains `manifest.json`, `popup.html`, `popup.js`, and the associated icon image.

### Step 2: Open the browser extensions page

The extension is designed for Chromium-based browsers, including Google Chrome and Microsoft Edge.

**Google Chrome:**

Enter `chrome://extensions` in the browser's address bar.

**Microsoft Edge:**

Enter `edge://extensions` in the browser's address bar.

### Step 3: Install the extension

1. Enable **Developer mode** on the extensions page.
2. Click **Load unpacked**.
3. Select the extracted extension folder containing `manifest.json`.
4. STEPfwd Paste should now appear in your installed extensions.

Note: Select the entire folder, not an individual file or the ZIP archive.

### Step 4: Pin the extension

1. Click the Extensions icon (puzzle piece) in your browser toolbar.
2. Locate **STEPfwd Paste**.
3. Pin the extension to your toolbar for convenient access.

## Usage

1. Launch a virtual machine through the STEPfwd platform.
2. Copy the desired text from your host computer using your normal copy shortcut.
3. Click the destination text editor or input field inside the virtual machine.
4. Open the STEPfwd Paste extension from your host browser's toolbar.
5. Paste the copied text into the extension's text box.
6. Adjust the keystroke delay if necessary.
7. Click **Send Text to VM**.
8. The extension will automatically close and begin typing the provided text into the virtual machine.

Do not change window focus during the transfer.

The extension must be installed and operated in the host browser, not a browser running inside the virtual machine.

## Keystroke Delay

The keystroke delay determines the interval between simulated keyboard inputs.

| Delay | Recommended usage |
|---|---|
| 10–20 ms | Faster transfers |
| 30 ms | Default, balanced performance |
| 50–100 ms | Slower or less responsive virtual machines |
| 100–500 ms | Troubleshooting input reliability |

If characters are missing or incorrectly registered, increase the keystroke delay and retry.

## How It Works

The extension utilizes JavaScript's KeyboardEvent interface to simulate keyboard input on the STEPfwd remote console's canvas element.

The transfer process consists of the following steps:

1. The user manually pastes plain text into the extension.
2. The extension verifies that the active browser tab belongs to the STEPfwd remote console.
3. Each supported character is mapped to its corresponding keyboard event.
4. Keydown and keyup events are dispatched to the remote console.
5. STEPfwd forwards the keyboard input to the virtual machine.
6. The text appears in the selected destination.

This approach eliminates the need for native clipboard synchronization or guest-side software.

## Project Structure

    stepfwd-paste/
    ├── manifest.json    # Extension configuration and permissions
    ├── popup.html       # User interface and styling
    ├── popup.js         # Text transfer and keyboard event logic
    ├── icon.png         # Extension icon
    └── README.md        # Project documentation

## Compatibility

### Host operating systems

- Windows
- Linux
- macOS

### Browsers

- Google Chrome
- Microsoft Edge
- Other compatible Chromium-based browsers

### Guest operating systems

- Windows
- Linux

The extension operates through the host browser rather than directly interacting with the guest operating system. Full compatibility across all operating systems, browsers, and keyboard layouts has not been independently verified.

## Privacy and Permissions

STEPfwd Paste uses two browser permissions:

- **activeTab:** Temporarily accesses the active browser tab when the user invokes the extension.
- **scripting:** Executes the keyboard simulation function within the STEPfwd remote console.

The extension does not automatically read the host clipboard, collect analytics, or store user-provided text.

Text is processed through the extension and forwarded using STEPfwd's existing remote keyboard input mechanism. The extension does not send text to additional third-party services.

## Limitations

- Currently supports printable ASCII characters and line breaks.
- Unicode characters, emojis, and tab characters are not supported.
- Character mappings are based on a standard US English keyboard layout.
- Large amounts of text may take time to transfer.
- Changes to the STEPfwd remote console may affect compatibility.
- Text transfer is one-directional, from the host computer to the virtual machine.
- Line breaks may execute commands when transferring text into a terminal. Review all text before sending.

## Troubleshooting

### The extension does not load

Ensure that the selected folder contains `manifest.json` and all required extension files. The ZIP archive must be extracted before installation.

### The extension asks me to open STEPfwd

Ensure that the active browser tab contains the running STEPfwd virtual machine rather than the STEPfwd dashboard.

### Text does not appear inside the virtual machine

Ensure that the intended text editor or input field inside the virtual machine is selected before opening the extension.

### Characters are missing or incorrect

Increase the keystroke delay and verify that the guest operating system uses a compatible keyboard layout.

### Unsupported characters detected

Remove Unicode characters, emojis, tabs, and other unsupported characters before attempting the transfer.

## Updating the Extension

1. Download the latest version of this repository.
2. Extract the updated files.
3. Replace the contents of your existing extension folder.
4. Open your browser's extensions page.
5. Locate STEPfwd Paste and click **Reload**.

## Contributing

Bug reports, feature suggestions, and contributions are welcome through GitHub Issues and Pull Requests.

## Disclaimer

STEPfwd Paste is an independent student-developed project created to improve usability within the STEPfwd learning environment.

It is not an official product of, endorsed by, or maintained by Carnegie Mellon University or the STEPfwd platform.

Use this extension only within authorized virtual machine environments and in accordance with applicable course and platform policies.
