type ReadWebpageResult = {
  url: string;
  title: string | null;
  text: string;
};

const REQUEST_TIMEOUT_MS = 10_000;
const MAX_RESPONSE_BYTES = 1_000_000;
const MAX_TEXT_LENGTH = 30_000;

function isPrivateIPv4(hostname: string) {
  const parts = hostname.split(".").map(Number);

  if (
    parts.length !== 4 ||
    parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)
  ) {
    return false;
  }

  const [a, b] = parts;

  if (a === 10) {
    return true;
  }

  if (a === 127) {
    return true;
  }

  if (a === 169 && b === 254) {
    return true;
  }

  if (a === 172 && b >= 16 && b <= 31) {
    return true;
  }

  if (a === 192 && b === 168) {
    return true;
  }

  return false;
}

function isBlockedHostname(hostname: string) {
  const normalizedHostname = hostname.toLowerCase().replace(/\.$/, "");

  if (
    normalizedHostname === "localhost" ||
    normalizedHostname === "localhost.localdomain"
  ) {
    return true;
  }

  if (normalizedHostname.endsWith(".localhost")) {
    return true;
  }

  if (normalizedHostname.endsWith(".local")) {
    return true;
  }

  if (isPrivateIPv4(normalizedHostname)) {
    return true;
  }

  return false;
}

function validateUrl(rawUrl: string) {
  let url: URL;

  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error("The webpage URL is invalid.");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Only HTTP and HTTPS webpages can be accessed.");
  }

  if (url.username || url.password) {
    throw new Error("URLs containing embedded credentials are not allowed.");
  }

  if (isBlockedHostname(url.hostname)) {
    throw new Error("Access to private or local network addresses is blocked.");
  }

  return url;
}

function stripHtml(html: string) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTitle(html: string) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);

  if (!titleMatch) {
    return null;
  }

  const title = stripHtml(titleMatch[1]);

  return title || null;
}

export async function readWebpage(
  rawUrl: string
): Promise<ReadWebpageResult> {
  const url = validateUrl(rawUrl);

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      redirect: "error",
      signal: controller.signal,
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": "AgentOperationsLab/0.1",
      },
    });

    if (!response.ok) {
      throw new Error(
        `The webpage returned HTTP status ${response.status}.`
      );
    }

    const contentType = response.headers.get("content-type") ?? "";

    if (
      !contentType.includes("text/html") &&
      !contentType.includes("application/xhtml+xml")
    ) {
      throw new Error("The URL did not return an HTML webpage.");
    }

    const contentLength = response.headers.get("content-length");

    if (contentLength) {
      const parsedLength = Number(contentLength);

      if (
        Number.isFinite(parsedLength) &&
        parsedLength > MAX_RESPONSE_BYTES
      ) {
        throw new Error("The webpage is too large to process.");
      }
    }

    const reader = response.body?.getReader();

    if (!reader) {
      throw new Error("The webpage response could not be read.");
    }

    const decoder = new TextDecoder();

    let html = "";
    let totalBytes = 0;

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      totalBytes += value.byteLength;

      if (totalBytes > MAX_RESPONSE_BYTES) {
        await reader.cancel();
        throw new Error("The webpage is too large to process.");
      }

      html += decoder.decode(value, {
        stream: true,
      });
    }

    html += decoder.decode();

    const title = extractTitle(html);
    const text = stripHtml(html).slice(0, MAX_TEXT_LENGTH);

    return {
      url: url.toString(),
      title,
      text,
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("The webpage request timed out.");
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}