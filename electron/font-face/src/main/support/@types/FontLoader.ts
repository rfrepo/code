export type FontFamilyAndStyle = {
  fontStyle: string
  fontFamily: string
}

export type LoadFontResult = {
  error?: string
  url: boolean
  meta: FontFamilyAndStyle
}

export type LoadedFontsResult = {
  success: boolean
  error?: string
}
