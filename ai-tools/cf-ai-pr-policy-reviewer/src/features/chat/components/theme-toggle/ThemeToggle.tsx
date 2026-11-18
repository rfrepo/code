import { useState } from "react";
import { Button } from "@cloudflare/kumo";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";

type Mode = "light" | "dark";

const ICON_SIZE = 16;
const NEXT_MODE: Record<Mode, Mode> = { light: "dark", dark: "light" };
const ICON: Record<Mode, React.ReactNode> = {
  light: <MoonIcon size={ICON_SIZE} />,
  dark: <SunIcon size={ICON_SIZE} />
};

const readMode = (): Mode =>
  document.documentElement.getAttribute("data-mode") === "dark"
    ? "dark"
    : "light";

function applyMode(mode: Mode) {
  document.documentElement.setAttribute("data-mode", mode);
  document.documentElement.style.colorScheme = mode;
  localStorage.setItem("theme", mode);
}

export function ThemeToggle() {
  const [mode, setMode] = useState(readMode);

  const toggle = () => {
    const next = NEXT_MODE[mode];
    applyMode(next);
    setMode(next);
  };

  return (
    <Button
      variant="secondary"
      shape="square"
      icon={ICON[mode]}
      onClick={toggle}
      aria-label="Toggle theme"
    />
  );
}
