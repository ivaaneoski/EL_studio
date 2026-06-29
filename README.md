# EL Studio 🎙️

A minimal, high-end client-side interface for the ElevenLabs Text-to-Speech API. Built with React, Vite, and Tailwind CSS.

EL Studio provides a clean, stark, and distraction-free interface for generating, configuring, and downloading high-quality voice synthesis.


---

## Features

- **Direct API Calls**: All API requests are run directly from your browser. Your key is stored in memory (`useState`) and never saved to local storage or any backend server.
- **Dynamic Voice List**: Fetches your available voices directly from your ElevenLabs account and sorts them alphabetically.
- **Model Selector**: Easily select ElevenLabs models (e.g. Multilingual v2, Turbo v2.5, Monolingual v1).
- **Language Customization**: Explicit ISO 639-1 language code inputs (e.g., `en`, `fr`, `de`, `es`).
- **Granular Controls**: Stability, Similarity Boost, and Style Exaggeration sliders, along with a custom toggle switch for Speaker Boost.
- **Smart Format Mapping**: Links Codec groups (MP3, WAV, PCM, μ-law) to their correct sample rates and bitrates. 
  - *Includes 16,000 Hz WAV lossless audio (standard `.wav` file with playable audio headers).*
- **Error Boundaries**: Clear, bold black-bordered error dialogs translating API error codes (e.g. 401 Unauthorized or 429 Quota Exceeded) into human-readable guidelines.

---

##  API Key Permissions

To generate an API key on ElevenLabs for EL Studio, you only need to enable these specific permissions:

| Permission | Level | Purpose |
| --- | --- | --- |
| **Text to Speech** | `Access` | Required to actually generate the audio |
| **Voices** | `Read` | Required to fetch the voice list and populate the voice dropdown |
| **Models** | `Access` | Recommended (technically optional, but ensures best model compatibility) |

*Everything else can stay at **No Access**.*

---

## Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm (v10 or higher)

### Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/ivaaneoski/EL_studio.git
   cd EL_studio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

4. Build for production:
   ```bash
   npm run build
   ```
   The built static website assets will be compiled into the `dist/` directory.

---

## ☁️ Cloudflare Pages Deployment

Deploying EL Studio to **Cloudflare Pages** takes less than a minute:

### Method 1: Git Integration (Recommended)

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Pages**.
2. Click **Create a project** → **Connect to Git**.
3. Select your repository (`EL_studio`).
4. Set the following **Build Settings**:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**. Cloudflare will automatically build and publish your site on every push to your repository.

### Method 2: Manual CLI Deployment

If you prefer to deploy directly from your local terminal:
```bash
# 1. Build the production files
npm run build

# 2. Deploy using Wrangler CLI
npx wrangler pages deploy dist
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
