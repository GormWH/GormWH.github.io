// Progressive enhancement for the Header language disclosure (<details
// class="gh-lang-menu">). The native element already handles toggle, keyboard
// activation, and expanded state with zero JS — this only adds Escape-to-close
// (with focus returned to the trigger) and click-outside-to-close.
// Document-level listeners, bound once per page load.

function openMenus(): HTMLDetailsElement[] {
  return Array.from(
    document.querySelectorAll<HTMLDetailsElement>("details.gh-lang-menu[open]"),
  );
}

document.addEventListener("click", (event) => {
  const target = event.target;
  for (const menu of openMenus()) {
    if (target instanceof Node && menu.contains(target)) continue;
    menu.removeAttribute("open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  for (const menu of openMenus()) {
    menu.removeAttribute("open");
    menu.querySelector<HTMLElement>("summary")?.focus();
  }
});
