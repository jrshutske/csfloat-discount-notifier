# 🎮 CSFloat Discount Notifier

> Automatically track CSFloat items and get instant notifications when discounts appear!

![Toast Notification Demo](media/toast.gif)

## ✨ Features

- 🔔 **Cross-Platform Notifications** - Native alerts on Windows, macOS, and Linux
- 📊 **Smart Tracking** - Compares discounts to historical averages
- 🎯 **One-Click Access** - Click notifications to open items in browser
- 🎨 **Beautiful Console** - Color-coded terminal output
- ⚡ **Lightweight** - Minimal resources, runs in background

![Terminal Output](media/teminal.png)

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/installation) (install: `npm install -g pnpm`)
- [CSFloat API Key](https://csfloat.com/profile)

### Installation

```bash
# Clone and navigate
git clone https://github.com/yourusername/csfloat-discount-notifier.git
cd csfloat-discount-notifier

# Install dependencies
pnpm install

# Configure API key
cp .env.example .env
# Edit .env and add: CSFLOAT_API_KEY=your_key_here

# Run
pnpm start
```

## ⚙️ Configuration

### Tracking Items

Edit `wishlist.json` in the project root:

```json
[
  { "name": "Chroma 2 Case", "def_index": 4089 },
  { "name": "AK-47 Redline", "def_index": 7, "paint_index": 282 }
]
```

> 💡 **Tip:** Find `def_index` and `paint_index` values on [CSFloat](https://csfloat.com) item URLs

### Change Polling Interval

Default: 10 minutes. Edit in `src/search.ts`:

```typescript
setTimeout(() => search(), 600000); // milliseconds
```

## 📦 Commands

| Command                | Description                       |
| ---------------------- | --------------------------------- |
| `pnpm start`           | Run the notifier                  |
| `pnpm build:exe`       | Build Windows executable          |
| `pnpm build:exe:macos` | Build macOS executables (on Mac)  |
| `pnpm build:exe:linux` | Build Linux executable (on Linux) |
| `pnpm format`          | Format code with Prettier         |

## 🏗️ Building Executables

Create standalone executables that run without Node.js:

```bash
# Windows (on Windows)
pnpm build:exe

# macOS (on macOS)
pnpm build:exe:macos

# Linux (on Linux)
pnpm build:exe:linux
```

> **Note:** Due to `pkg` limitations, you must build on the target platform (e.g., build macOS executables on a Mac).

Executables appear in `build/` folder. To distribute:

1. Copy the executable
2. Copy `wishlist.json` (your tracked items)
3. Create `.env` file with your API key
4. Run it!

**Note:** The icon is bundled into the executable - no need to copy it separately!

> ⚠️ **Windows Defender Warning:** Executables created with `pkg` commonly trigger false positives (Trojan:Win32/Wacatac). This is a known issue with all pkg-based tools. Your options:
>
> - **Recommended:** Run with Node.js installed (use `pnpm start` - no false positives)
> - Add the executable to Windows Defender exclusions
> - Code sign the executable (requires purchasing a certificate)

<details>
<summary>📋 Advanced Build Options</summary>

### Custom Build Targets

Edit `package.json` to customize:

```json
"build:exe": "pnpm build && pkg dist/src/app.js --targets node18-win-x64 --output build/app.exe --compress GZip"
```

**Available targets:**

- `node18-win-x64` - Windows
- `node18-linux-x64` - Linux
- `node18-macos-x64` - macOS Intel
- `node18-macos-arm64` - macOS Apple Silicon

</details>

## 🐛 Troubleshooting

<details>
<summary>No notifications appearing</summary>

**Windows:**

- Enable notifications: Settings > System > Notifications

**macOS:**

- Check System Preferences > Notifications
- Disable "Do Not Disturb"

**Linux:**

- Install libnotify: `sudo apt-get install libnotify-bin`
- Test: `notify-send "Test" "Hello"`

</details>

<details>
<summary>API errors</summary>

- Verify `.env` file exists with valid API key
- Check you haven't exceeded rate limits
- Get a new key at [CSFloat API](https://csfloat.com/profile)

</details>

<details>
<summary>pnpm issues</summary>

**"pnpm: command not found"**

```bash
npm install -g pnpm
# or use corepack
corepack enable
```

**Dependency errors**

```bash
pnpm store prune
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

</details>

## 🛠️ Tech Stack

TypeScript • Node.js • Axios • node-notifier • Chalk • Ora • Figlet • pkg • Prettier

## 📄 License

ISC License

## ⚠️ Disclaimer

Not affiliated with CSFloat. Use responsibly and respect API rate limits.

---

**Happy deal hunting!** 🎯
