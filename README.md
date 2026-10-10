# AIZEN CLIENT — Minecraft Bedrock

Project target: Minecraft Bedrock Android **1.26.30.27**. Compatibility must be tested in the exact game build.

## Download
Open **Actions** → latest successful **Build AIZEN CLIENT** run → download artifact `AIZEN-CLIENT-downloads`. It contains:
- `AIZEN-CLIENT.mcpack`: resource pack shell and branded icon.
- `AIZEN-CLIENT-TOOLS.mcpack`: optional behavior pack with script tools.
- `AIZEN-CLIENT.mcaddon`: combined resource + behavior pack.

Open a downloaded file on Android and import it into Minecraft. To use script tools, enable the behavior pack in a world you control.

## Implemented in the optional behavior pack
- In-game profit/loss calculator and profit percentage.
- Unit-price calculator.
- Saved command template menu for `/pay`, `/sell`, `/home`, `/sethome`, `/spawn`, `/rtp`, `/ah`, `/shop`, `/bal`, `/msg`, and `/tpa`.
- Open the menu by typing `!aizen` in chat in a world running the behavior pack.

## Important limits
This is an initial implementation, not a fully tested PvP client. A resource pack cannot run arbitrary code, add a button to the built-in chat UI, automatically send server/plugin commands, automate chest transfers, or repeat the last chat message. The command menu shows templates for manual use; it does not send them automatically.

The behavior pack only runs in worlds/servers that enable it and support the required Script API. Installing it locally does **not** inject it into DonutSMP. Automated STEAL/STORE and automatic REPEAT are not implemented. FPS gains are not guaranteed. Server commands vary by server.

If GitHub Actions fails, open its run page and inspect the first failed step. Compatibility with Bedrock 1.26.30.27 still needs an in-game test.
