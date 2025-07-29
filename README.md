# Voice AI Workshop Template

A modern, responsive Next.js application template for building voice AI assistants using Vapi AI.


## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Vapi AI Account** with API key
- **Assistant ID** from your Vapi dashboard

## 🛠️ Setup Instructions

### 1. Clone/Download the Template

```bash
git clone <your-repo-url>
cd vapi-template
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Add your Vapi configuration:

```env
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_api_key_here
```

### 4. Configure Your Assistant

Edit `config/assistantOptions.js`:

1. **Replace the ASSISTANT_ID** with your own assistant ID from Vapi dashboard

### 5. Customize the Application (Optional)

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration Guide

### Assistant Configuration

The main configuration is in `config/assistantOptions.js`:

```javascript
export const ASSISTANT_ID = "your-assistant-id-here";

export const assistantOverrides = {
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en-US",
  },
  voice: {
    provider: "playht",
    voiceId: "jennifer", // Change to your preferred voice
  },
  recordingEnabled: true,
  model: {
    provider: "openai",
    model: "gpt-4",
  },
  variableValues: {
    assistantName: "Your Assistant Name"
  },
};
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_VAPI_API_KEY` | Your Vapi AI API key | Yes |

## 🎨 Customization

### Changing the Assistant Name & Branding

1. **Update the page title** in `app/page.jsx` (line 47)
2. **Modify the subtitle** and description (lines 57-58)
3. **Change the call button text** (line 147)
4. **Update footer text** as needed (line 161)

### Styling & Colors

The template uses Tailwind CSS. Key areas to customize:

- **Background gradient**: Lines 23-28 in `app/page.jsx`
- **Button colors**: Lines 122-127 in `app/page.jsx`
- **Animated blobs**: Lines 25-28 in `app/page.jsx`

### Voice Settings

Modify voice options in `config/assistantOptions.js`:

```javascript
voice: {
  provider: "playht", // or "11labs", "azure", etc.
  voiceId: "jennifer", // Check Vapi docs for available voices
}
```

## 📱 Usage

1. **Start a call**: Click the "Call [Assistant Name]" button
2. **Talk naturally**: The assistant will respond with voice
3. **Visual feedback**: Watch the waveform animation during conversation
4. **End call**: Click "End Call" or let the assistant complete naturally

## 🔍 Troubleshooting

### Common Issues

**"API key is missing" error:**
- Ensure `.env.local` file exists with correct `NEXT_PUBLIC_VAPI_API_KEY`
- Restart the development server after adding environment variables

**"Payment required" error:**
- Add payment method in your Vapi dashboard
- Check your Vapi account balance and billing

**Assistant not responding:**
- Verify your `ASSISTANT_ID` is correct
- Check assistant configuration in Vapi dashboard
- Ensure assistant is published and active

**Microphone permission issues:**
- Allow microphone access in your browser
- Check browser permissions settings
- Ensure HTTPS in production (required for microphone access)

## 🔗 Helpful Links

- [Vapi AI Documentation](https://docs.vapi.ai/)
- [Vapi Dashboard](https://dashboard.vapi.ai/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🆘 Support

If you encounter issues during the workshop:

1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Ask your workshop instructor for assistance
4. Check the Vapi documentation for API-specific issues

## 📄 License

This template is provided for educational purposes. Feel free to modify and use for your projects.

---

Built with ❤️ for the Voice AI Workshop at Monshaat 29 July 2025