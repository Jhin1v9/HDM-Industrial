import { Archivo, IBM_Plex_Mono } from "next/font/google";

/** Brand fonts (ADR 001 — Doc 08 absent): Archivo + IBM Plex Mono. */
export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const fontVariables = `${archivo.variable} ${ibmPlexMono.variable}`;
