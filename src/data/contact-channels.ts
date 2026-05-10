export type Channel = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

export const channels: Channel[] = [
  { label: "GitHub",   value: "github.com/GormWH",        href: "https://github.com/GormWH",           external: true },
  { label: "LinkedIn", value: "linkedin.com/in/gormwh",   href: "https://www.linkedin.com/in/gormwh/", external: true },
  { label: "Resume",   value: "view CV",                  href: "/CV.pdf" },
];
