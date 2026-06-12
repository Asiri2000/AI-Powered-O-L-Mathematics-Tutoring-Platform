"""
Diagram Factory — generates inline SVG diagrams for geometry questions.

Supported types:
  - right_triangle   : right-angled triangle with labelled legs
  - rectangle        : rectangle with labelled length × width
  - square           : square with labelled side
  - triangle         : general triangle with labelled sides
  - circle           : circle with labelled radius
  - parallelogram    : parallelogram with labelled sides
  - trapezium        : trapezium with labelled parallel sides and height
"""


def get_diagram(diagram_type: str, data: dict) -> dict | None:
    """
    Returns { "type": "svg", "content": "<svg>...</svg>" }
    or None if the diagram_type is not recognised.
    """

    if diagram_type == "right_triangle":
        a = data.get("a", "a")
        b = data.get("b", "b")
        c = data.get("c", "")
        c_label = f'<text x="105" y="65" font-size="13" fill="#1b7a39" text-anchor="middle">{c}cm</text>' if c else ""
        svg = f"""<svg width="200" height="160" xmlns="http://www.w3.org/2000/svg">
  <polygon points="20,130 180,130 20,20"
           style="fill:#e8f9ef;stroke:#1b7a39;stroke-width:2"/>
  <rect x="20" y="110" width="14" height="14"
        style="fill:none;stroke:#1b7a39;stroke-width:1.5"/>
  <text x="100" y="148" font-size="13" fill="#333" text-anchor="middle">{a} cm</text>
  <text x="8" y="80" font-size="13" fill="#333" text-anchor="middle">{b} cm</text>
  {c_label}
</svg>"""

    elif diagram_type == "rectangle":
        l = data.get("l", "l")
        w = data.get("w", "w")
        svg = f"""<svg width="220" height="140" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="20" width="180" height="100"
        style="fill:#e8f9ef;stroke:#1b7a39;stroke-width:2"/>
  <text x="110" y="135" font-size="13" fill="#333" text-anchor="middle">{l} cm</text>
  <text x="8" y="75" font-size="13" fill="#333" text-anchor="middle">{w} cm</text>
</svg>"""

    elif diagram_type == "square":
        a = data.get("a", "a")
        svg = f"""<svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="20" width="120" height="120"
        style="fill:#e8f9ef;stroke:#1b7a39;stroke-width:2"/>
  <text x="80" y="152" font-size="13" fill="#333" text-anchor="middle">{a} cm</text>
</svg>"""

    elif diagram_type == "triangle":
        a = data.get("a", "a")
        b = data.get("b", "b")
        c = data.get("c", "c")
        svg = f"""<svg width="220" height="160" xmlns="http://www.w3.org/2000/svg">
  <polygon points="110,15 20,140 200,140"
           style="fill:#e8f9ef;stroke:#1b7a39;stroke-width:2"/>
  <text x="110" y="158" font-size="13" fill="#333" text-anchor="middle">{a} cm</text>
  <text x="50" y="90" font-size="13" fill="#333" text-anchor="middle">{b} cm</text>
  <text x="170" y="90" font-size="13" fill="#333" text-anchor="middle">{c} cm</text>
</svg>"""

    elif diagram_type == "circle":
        r = data.get("r", "r")
        svg = f"""<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="80"
          style="fill:#e8f9ef;stroke:#1b7a39;stroke-width:2"/>
  <line x1="100" y1="100" x2="180" y2="100"
        style="stroke:#1b7a39;stroke-width:1.5;stroke-dasharray:4"/>
  <text x="140" y="95" font-size="13" fill="#333" text-anchor="middle">r = {r} cm</text>
  <circle cx="100" cy="100" r="3" fill="#1b7a39"/>
</svg>"""

    elif diagram_type == "parallelogram":
        a = data.get("a", "a")
        b = data.get("b", "b")
        svg = f"""<svg width="240" height="140" xmlns="http://www.w3.org/2000/svg">
  <polygon points="40,20 220,20 200,120 20,120"
           style="fill:#e8f9ef;stroke:#1b7a39;stroke-width:2"/>
  <text x="130" y="135" font-size="13" fill="#333" text-anchor="middle">{a} cm</text>
  <text x="18" y="75" font-size="13" fill="#333" text-anchor="middle">{b} cm</text>
</svg>"""

    elif diagram_type == "trapezium":
        a = data.get("a", "a")   # top parallel side
        b = data.get("b", "b")   # bottom parallel side
        h = data.get("h", "h")   # height
        svg = f"""<svg width="240" height="160" xmlns="http://www.w3.org/2000/svg">
  <polygon points="60,20 180,20 220,130 20,130"
           style="fill:#e8f9ef;stroke:#1b7a39;stroke-width:2"/>
  <text x="120" y="15" font-size="13" fill="#333" text-anchor="middle">{a} cm</text>
  <text x="120" y="148" font-size="13" fill="#333" text-anchor="middle">{b} cm</text>
  <line x1="60" y1="20" x2="60" y2="130"
        style="stroke:#888;stroke-width:1;stroke-dasharray:4"/>
  <text x="45" y="80" font-size="12" fill="#555" text-anchor="middle">{h} cm</text>
</svg>"""

    else:
        return None

    return {"type": "svg", "content": svg}
