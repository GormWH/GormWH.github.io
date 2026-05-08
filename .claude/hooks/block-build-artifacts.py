#!/usr/bin/env python3
"""Refuse Edit/Write/MultiEdit when target path has 'dist' or '.astro' as a path segment.

Prevents agents from accidentally writing into build artifacts. Anchored on path
segments (not substring) so distillery/ and mydir/.astro-config/ are not blocked.
"""
import json
import sys


def main() -> int:
    try:
        data = json.load(sys.stdin)
    except json.JSONDecodeError:
        return 0

    tool_input = data.get("tool_input", {}) or {}
    file_path = tool_input.get("file_path") or tool_input.get("path") or ""

    if not file_path:
        return 0

    parts = file_path.split("/")
    blocked_segment = next((p for p in ("dist", ".astro") if p in parts), None)

    if blocked_segment:
        print(
            f"Refusing edit to build artifact: {file_path} "
            f"(path segment '{blocked_segment}' is generated, not source).",
            file=sys.stderr,
        )
        return 2

    return 0


if __name__ == "__main__":
    sys.exit(main())
