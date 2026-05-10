export type Channel = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

export const channels: Channel[] = [
  { label: "GitHub",   value: "github.com/GormWH",        href: "https://github.com/GormWH",           external: true },
  { label: "LinkedIn", value: "linkedin.com/in/su-hong-park-1aa107216", href: "https://www.linkedin.com/in/su-hong-park-1aa107216/", external: true },
  { label: "Resume",   value: "view CV",                  href: "/CV.pdf" },
];
