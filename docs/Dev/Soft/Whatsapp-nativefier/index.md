# Whatsapp-nativefier

WhatsApp desktop built with nativefier (electron)

Installation: [AUR](https://aur.archlinux.org/packages/whatsapp-nativefier), [GitHub Releases](https://github.com/frealgagu/archlinux.whatsapp-nativefier/releases/)

**Solution to "What's App works with Google Chrome 60+":**

*Option 1:*

Pressing ctrl+shift+i (on Linux) and the Devtools window will open. Then click on **Application** -> **Service Workers** And check the option **Bypass for network**.

Now press ctrl+r to reload. And ctrl+shift+i to close the Devtools.

Whenever you open your whatsapp the problem will occur, but since the **Bypass for network** option has already been enabled, you only need to press ctrl+shift+i (open devtools), ctrl+r (reload), ctrl+shift+i (close devtools)

*Option 2:*

Pressing ctrl+shift+i (on Linux) and the Devtools window will open. Then pass this line: `document.querySelector("a[href='https://support.google.com/chrome/answer/95414']") && navigator.serviceWorker.getRegistration().then(r => r.unregister() && document.location.reload());` and hit Enter.
