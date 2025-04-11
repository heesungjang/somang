import { THEME_COOKIE_MAX_AGE } from "../utils/constants/cookies.const";
import { THEME_COOKIE_NAME } from "../utils/constants/cookies.const";
import { TTheme } from "./get";

export function setTheme(theme: TTheme) {
  document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=${THEME_COOKIE_MAX_AGE}`;
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
}
