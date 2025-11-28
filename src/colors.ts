// ANSI 控制码常量
export const ANSI_RESET = "\x1b[0m";

// 文本样式
export const ANSI_BOLD = "\x1b[1m";
export const ANSI_DIM = "\x1b[2m";
export const ANSI_ITALIC = "\x1b[3m";
export const ANSI_UNDERLINE = "\x1b[4m";
export const ANSI_BLINK = "\x1b[5m";
export const ANSI_REVERSE = "\x1b[7m";
export const ANSI_HIDDEN = "\x1b[8m";
export const ANSI_STRIKETHROUGH = "\x1b[9m";
// 前景色 标准
export const ANSI_BLACK = "\x1b[30m";
export const ANSI_RED = "\x1b[31m";
export const ANSI_GREEN = "\x1b[32m";
export const ANSI_YELLOW = "\x1b[33m";
export const ANSI_BLUE = "\x1b[34m";
export const ANSI_MAGENTA = "\x1b[35m";
export const ANSI_CYAN = "\x1b[36m";
export const ANSI_WHITE = "\x1b[37m";
// 前景色 亮色
export const ANSI_BRIGHT_BLACK = "\x1b[90m";
export const ANSI_BRIGHT_RED = "\x1b[91m";
export const ANSI_BRIGHT_GREEN = "\x1b[92m";
export const ANSI_BRIGHT_YELLOW = "\x1b[93m";
export const ANSI_BRIGHT_BLUE = "\x1b[94m";
export const ANSI_BRIGHT_MAGENTA = "\x1b[95m";
export const ANSI_BRIGHT_CYAN = "\x1b[96m";
export const ANSI_BRIGHT_WHITE = "\x1b[97m";
// 背景色 标准
export const ANSI_BG_BLACK = "\x1b[40m";
export const ANSI_BG_RED = "\x1b[41m";
export const ANSI_BG_GREEN = "\x1b[42m";
export const ANSI_BG_YELLOW = "\x1b[43m";
export const ANSI_BG_BLUE = "\x1b[44m";
export const ANSI_BG_MAGENTA = "\x1b[45m";
export const ANSI_BG_CYAN = "\x1b[46m";
export const ANSI_BG_WHITE = "\x1b[47m";
// 背景色 亮色
export const ANSI_BG_BRIGHT_BLACK = "\x1b[100m";
export const ANSI_BG_BRIGHT_RED = "\x1b[101m";
export const ANSI_BG_BRIGHT_GREEN = "\x1b[102m";
export const ANSI_BG_BRIGHT_YELLOW = "\x1b[103m";
export const ANSI_BG_BRIGHT_BLUE = "\x1b[104m";
export const ANSI_BG_BRIGHT_MAGENTA = "\x1b[105m";
export const ANSI_BG_BRIGHT_CYAN = "\x1b[106m";
export const ANSI_BG_BRIGHT_WHITE = "\x1b[107m";

// 256色前景色
export function ANSI_256_FG(code: number): string {
  return `\x1b[38;5;${code}m`;
}

// 256色背景色
export function ANSI_256_BG(code: number): string {
  return `\x1b[48;5;${code}m`;
}

// RGB前景色
export function ANSI_RGB_FG(r: number, g: number, b: number): string {
  return `\x1b[38;2;${r};${g};${b}m`;
}

// RGB背景色
export function ANSI_RGB_BG(r: number, g: number, b: number): string {
  return `\x1b[48;2;${r};${g};${b}m`;
}
