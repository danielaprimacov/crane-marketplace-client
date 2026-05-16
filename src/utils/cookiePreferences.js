import {
  COOKIE_STORAGE_KEY,
  DEFAULT_COOKIE_OPTIONS,
} from "../constants/cookiePreferences";

export function loadCookiePreferences() {
  try {
    const stored = localStorage.getItem(COOKIE_STORAGE_KEY);

    if (!stored) {
      return DEFAULT_COOKIE_OPTIONS;
    }

    const parsed = JSON.parse(stored);

    return {
      ...DEFAULT_COOKIE_OPTIONS,
      statistics: Boolean(parsed.statistics),
      career: Boolean(parsed.career),
      googleMaps: Boolean(parsed.googleMaps),
      required: true,
    };
  } catch {
    return DEFAULT_COOKIE_OPTIONS;
  }
}

export function saveCookiePreferences(preferences) {
  const finalPreferences = {
    ...DEFAULT_COOKIE_OPTIONS,
    ...preferences,
    required: true,
  };

  localStorage.setItem(
    COOKIE_STORAGE_KEY,
    JSON.stringify({
      ...finalPreferences,
      savedAt: new Date().toISOString(),
    })
  );

  window.dispatchEvent(
    new CustomEvent("cookie-preferences-updated", {
      detail: finalPreferences,
    })
  );

  return finalPreferences;
}
