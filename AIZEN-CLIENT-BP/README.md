# AIZEN CLIENT Tools (Behavior Pack)

Optional script add-on for Minecraft Bedrock worlds that support the listed Script API modules.

## Features
- In-game calculator for profit/loss and profit percentage.
- Unit-price calculator.
- Saved command template menu: `/pay`, `/sell`, `/home`, `/sethome`, `/spawn`, `/rtp`, `/ah`, `/shop`, `/bal`, `/msg`, and `/tpa`.
- Open the menu by typing `!aizen` in chat in a world where the Behavior Pack is enabled.

## Important limitations
- The menu displays command templates; it does **not** send server/plugin commands automatically.
- It cannot add a button to Bedrock's built-in chat UI.
- It does not run inside DonutSMP unless the server itself enables and runs this Behavior Pack and its Script API dependencies.
- Automated chest transfer (STEAL/STORE) and automatic repeat-last-chat are not implemented; a local resource pack cannot do these actions.
- Server commands vary. Edit the saved templates if your server uses different commands.

## Enable
Import the generated `.mcaddon`, then enable both AIZEN resource and behavior packs in a world you control. If the game reports an unsupported dependency or Script API version, the manifest's API dependency versions may need to be adjusted to the exact installed Bedrock build.
