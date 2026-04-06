// Configuration loader for environment variables
// Loads .env file and makes variables available

let envConfig = {};

async function loadEnvConfig() {
  try {
    const response = await fetch('.env');
    if (response.ok) {
      const envText = await response.text();
      const lines = envText.split('\n');

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#')) {
          const [key, ...valueParts] = trimmedLine.split('=');
          if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim();
            envConfig[key.trim()] = value;
          }
        }
      }
    }
  } catch (error) {
    console.warn('Could not load .env file:', error);
  }
}

// Load config on module import
await loadEnvConfig();

export { envConfig };