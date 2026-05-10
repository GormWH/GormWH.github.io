type ChipEl = HTMLButtonElement;

function norm(t: string): string {
  return t.trim().toLowerCase().replace(/\s+/g, "-");
}

function readURL(): string[] {
  const raw = new URLSearchParams(window.location.search).get("tags");
  if (!raw) return [];
  return raw.split(",").map(norm).filter(Boolean);
}

function writeURL(tags: string[]): void {
  const url = new URL(window.location.href);
  if (tags.length === 0) url.searchParams.delete("tags");
  else url.searchParams.set("tags", tags.join(","));
  history.replaceState(null, "", url.toString());
}

function rootInitialTags(root: HTMLElement): string[] {
  const raw = root.dataset.initialTags;
  if (!raw) return [];
  return raw.split(",").map(norm).filter(Boolean);
}

function applyFilter(active: string[]): void {
  const set = new Set(active.map(norm));

  document
    .querySelectorAll<ChipEl>("[data-tag-filter-chips] [data-tag]")
    .forEach((chip) => {
      const t = norm(chip.dataset.tag ?? "");
      chip.setAttribute("aria-pressed", set.has(t) ? "true" : "false");
    });

  document
    .querySelectorAll<HTMLElement>("[data-tag-filter-root]")
    .forEach((root) => {
      const items = root.querySelectorAll<HTMLElement>("[data-entry-tags]");
      let shown = 0;
      items.forEach((item) => {
        const tags = (item.dataset.entryTags ?? "")
          .split(/\s+/)
          .map(norm)
          .filter(Boolean);
        const visible = set.size === 0 || tags.some((t) => set.has(t));
        item.toggleAttribute("hidden", !visible);
        if (visible) shown++;
      });
      const counter = root.querySelector<HTMLElement>("[data-tag-filter-count]");
      if (counter) counter.textContent = String(shown);
      const empty = root.querySelector<HTMLElement>("[data-tag-filter-empty]");
      if (empty) empty.toggleAttribute("hidden", shown !== 0);
    });
}

function resolveInitial(): string[] {
  const fromURL = readURL();
  if (fromURL.length > 0) return fromURL;
  const root = document.querySelector<HTMLElement>(
    "[data-tag-filter-root][data-initial-tags]",
  );
  return root ? rootInitialTags(root) : [];
}

function setupChipClicks(): void {
  document
    .querySelectorAll<ChipEl>("[data-tag-filter-chips] [data-tag]")
    .forEach((chip) => {
      chip.addEventListener("click", () => {
        const t = norm(chip.dataset.tag ?? "");
        const current = readURL();
        const idx = current.indexOf(t);
        const next =
          idx === -1 ? [...current, t] : current.filter((x) => x !== t);
        writeURL(next);
        applyFilter(next);
      });
    });
}

function setupClearButtons(): void {
  document
    .querySelectorAll<HTMLButtonElement>("[data-tag-filter-clear]")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        writeURL([]);
        applyFilter([]);
      });
    });
}

function setupLinkPreservation(): void {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const link = target.closest<HTMLAnchorElement>("a[data-keep-filter]");
    if (!link) return;
    const params = new URLSearchParams(window.location.search);
    const tags = params.get("tags");
    if (!tags) return;
    const url = new URL(link.href, window.location.origin);
    if (url.searchParams.has("tags")) return;
    url.searchParams.set("tags", tags);
    e.preventDefault();
    window.location.href = url.toString();
  });
}

function init(): void {
  const initial = resolveInitial();
  applyFilter(initial);
  setupChipClicks();
  setupClearButtons();
  setupLinkPreservation();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
