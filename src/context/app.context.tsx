"use client";

import React, {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type SizeProps = {
  screen: "md" | "lg" | "xl";
  font: "sm" | "normal" | "lg";
};

type AppContextProps = {
  sizes: SizeProps;
  screenWidth: string;
  changeFont: (value: SizeProps["font"]) => void;
  changeScreen: (value: SizeProps["screen"]) => void;
};

type AppProviderProps = {
  children: React.ReactNode;
};

const LOCAL_STORAGE_SIZES = "app@sizes";

const AppContext = createContext<AppContextProps | null>(null);

const AppProvider = ({ children }: Readonly<AppProviderProps>) => {
  const [sizes, setSizes] = useState<SizeProps>(() => {
    const sizeValue = window.localStorage.getItem(LOCAL_STORAGE_SIZES);

    return sizeValue !== null
      ? JSON.parse(sizeValue)
      : {
          screen: "md",
          font: "normal",
        };
  });

  const changeFont = useCallback(
    (value: SizeProps["font"]) => {
      setSizes((oldValue) => ({ ...oldValue, font: value }));

      window.localStorage.setItem(
        LOCAL_STORAGE_SIZES,
        JSON.stringify({ ...sizes, font: value })
      );
    },
    [sizes]
  );

  const changeScreen = useCallback(
    (value: SizeProps["screen"]) => {
      setSizes((oldValue) => ({ ...oldValue, screen: value }));
      window.localStorage.setItem(
        LOCAL_STORAGE_SIZES,
        JSON.stringify({ ...sizes, screen: value })
      );
    },
    [sizes]
  );

  const screenWidth =
    sizes.screen === "md"
      ? "max-w-screen-md"
      : sizes.screen === "lg"
      ? "max-w-screen-lg"
      : "max-w-screen-xl";

  const data = useMemo(
    () => ({ sizes, changeFont, changeScreen, screenWidth }),
    [sizes, changeFont, changeScreen, screenWidth]
  );

  useEffect(() => {
    const fontSize =
      sizes.font === "sm" ? "14px" : sizes.font === "lg" ? "18px" : "16px";

    document.documentElement.style.fontSize = fontSize;
  }, [sizes]);

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export default AppProvider;

export function useApp() {
  const context = use(AppContext);

  if (!context) {
    throw new Error("use AppContext must be used within a AppProvider");
  }

  return context;
}
