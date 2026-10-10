# AIZEN CLIENT — Bedrock

A lightweight Minecraft Bedrock resource-pack project targeting Bedrock **1.26.30.27**.

## Download and install

1. Open this repository's **Actions** tab.
2. Open the latest successful **Build AIZEN Resource Pack** run.
3. Download the `AIZEN-CLIENT-mcpack` artifact.
4. Open the downloaded `.mcpack` file on Android and choose Minecraft.
5. In Minecraft, go to **Settings → Global Resources → My Packs** and activate AIZEN CLIENT.

When a version tag such as `v0.1.0` is pushed, GitHub Actions also creates a downloadable Release.

## Important feature limits

A Bedrock **resource pack** provides assets and supported resource customizations. By itself, it cannot run arbitrary code, calculate values interactively, repeat chat messages, or automate chest transfers. In particular:

- **STEAL / STORE:** automated chest inventory transfer is not provided by a resource pack.
- **REPEAT:** resending chat messages requires additional code/tooling that a resource pack does not have.
- **Calculator:** a fully interactive calculator cannot be implemented by a resource pack alone.
- **FPS:** a pack can simplify some assets, but cannot guarantee higher FPS.

These features are not claimed as working in this initial resource-pack build. A local add-on's scripts also generally cannot be injected into a third-party multiplayer server such as DonutSMP simply by installing a local pack.

## Build

GitHub Actions validates the manifest, generates the pack icon, packages the folder as `.mcpack`, and uploads it as an artifact when code is pushed to `main` or the workflow is run manually.

## Target

- Minecraft Bedrock Android
- Intended target: 1.26.30.27
- Compatibility still needs an in-game test.
