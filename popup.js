// Send text when the user clicks the extension button.
document.getElementById("send").addEventListener("click", async () => {
    const text = document.getElementById("text").value;
    const delay = Number(document.getElementById("delay").value);
    const status = document.getElementById("status");

    if (!text) {
        status.textContent = "Enter some text first.";
        return;
    }

    // This version supports printable ASCII and line breaks.
    if (/[^\x20-\x7E\r\n]/.test(text)) {
        status.textContent = "Unsupported characters detected.";
        return;
    }

    if (!Number.isFinite(delay) || delay < 10 || delay > 500) {
        status.textContent = "Enter a delay between 10 and 500 ms.";
        return;
    }

    try {
        // Identify the currently active browser tab.
        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        // Only execute on the STEPfwd remote console.
        if (!tab?.url ||
            new URL(tab.url).origin !==
            "https://step-proxy.heinz.cmu.edu") {
            status.textContent = "Open your STEPfwd VM first.";
            return;
        }

        // Execute the transfer function on the STEPfwd page.
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: transferText,
            args: [text, delay]
        });

        window.close();

    } catch (error) {
        status.textContent = error.message;
    }
});

function transferText(text, delay) {
    const sleep = ms => new Promise(resolve =>
        setTimeout(resolve, ms)
    );

    // US keyboard punctuation mappings.
    const normal = "`1234567890-=[]\\;',./";
    const shifted = "~!@#$%^&*()_+{}|:\"<>?";

    const codes = [
        "Backquote",
        "Digit1", "Digit2", "Digit3",
        "Digit4", "Digit5", "Digit6",
        "Digit7", "Digit8", "Digit9", "Digit0",
        "Minus", "Equal",
        "BracketLeft", "BracketRight", "Backslash",
        "Semicolon", "Quote", "Comma", "Period", "Slash"
    ];

    const keyCodes = [
        192, 49, 50, 51, 52, 53, 54,
        55, 56, 57, 48, 189, 187,
        219, 221, 220, 186, 222, 188, 190, 191
    ];

    // Allow the extension popup to close before typing.
    setTimeout(async () => {
        const canvas = document.querySelector("canvas");

        if (!canvas) {
            console.error("STEPfwd canvas not found.");
            return;
        }

        function sendEvent(type, key, code, keyCode, shiftKey) {
            canvas.dispatchEvent(new KeyboardEvent(type, {
                key,
                code,
                keyCode,
                which: keyCode,
                shiftKey,
                bubbles: true,
                cancelable: true
            }));
        }

        text = text.replace(/\r\n?/g, "\n");

        for (const char of text) {
            let key = char;
            let code;
            let keyCode;
            let shift = false;

            // Handle line breaks.
            if (char === "\n") {
                key = "Enter";
                code = "Enter";
                keyCode = 13;

            // Handle spaces.
            } else if (char === " ") {
                code = "Space";
                keyCode = 32;

            // Handle uppercase and lowercase letters.
            } else if (/[a-zA-Z]/.test(char)) {
                code = "Key" + char.toUpperCase();
                keyCode = char.toUpperCase().charCodeAt(0);
                shift = /[A-Z]/.test(char);

            // Handle numbers and punctuation.
            } else {
                let index = normal.indexOf(char);

                if (index === -1) {
                    index = shifted.indexOf(char);
                    shift = true;
                }

                if (index === -1) continue;

                code = codes[index];
                keyCode = keyCodes[index];
            }

            if (shift) {
                sendEvent("keydown", "Shift",
                          "ShiftLeft", 16, true);
            }

            sendEvent("keydown", key, code, keyCode, shift);
            sendEvent("keyup", key, code, keyCode, shift);

            if (shift) {
                sendEvent("keyup", "Shift",
                          "ShiftLeft", 16, false);
            }

            await sleep(delay);
        }

        console.log("STEPfwd text transfer finished.");
    }, 1000);
}
