export function validateRelaysBaseUrls(): void {
    const relaysBaseUrls = process.env.NEXT_PUBLIC_RELAYS_BASE_URLS;

    // Check if the environment variable is not undefined or empty
    if (!relaysBaseUrls) {
        throw new Error("NEXT_PUBLIC_RELAYS_BASE_URLS environment variable is not set or is empty");
    }

    // Split the string by commas to get individual URLs
    const urls = relaysBaseUrls.split(',');

    // Regular expression to validate HTTPS URLs
    const httpsUrlRegex = /^https:\/\/[^\s$.?#].[^\s]*$/;

    for (const url of urls) {
        if (!httpsUrlRegex.test(url.trim())) {
            throw new Error(`Invalid URL in NEXT_PUBLIC_RELAYS_BASE_URLS: ${url}`);
        }
    }
}