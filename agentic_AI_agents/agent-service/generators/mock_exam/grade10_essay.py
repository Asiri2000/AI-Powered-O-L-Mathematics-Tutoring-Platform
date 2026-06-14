"""
Grade 10 — Essay Question Generators
Each function returns a structured essay question with:
  - topic
  - question_number
  - parts: [ { part, marks, question, answer, working } ]
  - total_marks
  - svg_diagram (optional)
"""
import random
from services.diagram_factory import get_diagram


# ────────────────────────────────────────────────────────────────
#  REGISTRY
# ────────────────────────────────────────────────────────────────

def _perimeter():
    l = random.randint(8, 15)
    w = random.randint(5, 10)
    P = 2 * (l + w)
    x = random.randint(3, 7)
    side = random.randint(6, 12)
    tri_perim = side * 3
    diagram = get_diagram("rectangle", {"a": l, "b": w})
    return {
        "topic": "Perimeter",
        "parts": [
            {
                "part": "(a)",
                "marks": 3,
                "question": f"A rectangle has length {l} cm and width {w} cm. Find its perimeter.",
                "answer": f"{P} cm",
                "working": [
                    "Formula: Perimeter = 2(length + width)",
                    f"= 2({l} + {w}) = 2 × {l+w} = {P} cm",
                ],
            },
            {
                "part": "(b)",
                "marks": 4,
                "question": f"The perimeter of an equilateral triangle is {tri_perim} cm. Find the length of one side and calculate the area of the triangle using Heron's formula.",
                "answer": f"Side = {side} cm; Area = {round((3**0.5/4)*side**2, 2)} cm²",
                "working": [
                    f"Side = {tri_perim} ÷ 3 = {side} cm",
                    "Heron's s = (3×side)/2 = " + str(3*side/2),
                    f"Area = (√3/4) × {side}² = {round((3**0.5/4)*side**2, 2)} cm²",
                ],
            },
            {
                "part": "(c)",
                "marks": 3,
                "question": f"A square field has a perimeter of {4*(x+2)} m. Find the side length and calculate the cost of fencing at Rs. 150 per metre.",
                "answer": f"Side = {x+2} m; Cost = Rs. {150*4*(x+2)}",
                "working": [
                    f"Side = {4*(x+2)} ÷ 4 = {x+2} m",
                    f"Cost = {4*(x+2)} × 150 = Rs. {150*4*(x+2)}",
                ],
            },
        ],
        "total_marks": 10,
        "svg_diagram": diagram["content"] if diagram else None,
    }


def _area():
    l, w = random.randint(8, 14), random.randint(5, 9)
    r = random.randint(4, 7)
    b, h = random.randint(8, 14), random.randint(5, 9)
    diagram = get_diagram("rectangle", {"a": l, "b": w})
    return {
        "topic": "Area",
        "parts": [
            {
                "part": "(a)",
                "marks": 3,
                "question": f"Find the area of a rectangle with length {l} cm and width {w} cm.",
                "answer": f"{l*w} cm²",
                "working": ["Area = l × w", f"= {l} × {w} = {l*w} cm²"],
            },
            {
                "part": "(b)",
                "marks": 4,
                "question": f"A circle has radius {r} cm. Calculate its area. (Use π = 3.14)",
                "answer": f"{round(3.14*r*r, 2)} cm²",
                "working": ["Area = πr²", f"= 3.14 × {r}² = 3.14 × {r*r} = {round(3.14*r*r,2)} cm²"],
            },
            {
                "part": "(c)",
                "marks": 3,
                "question": f"A triangle has base {b} cm and height {h} cm. Find its area and compare it to a rectangle with the same base and height.",
                "answer": f"Triangle = {0.5*b*h} cm²; Rectangle = {b*h} cm² (triangle is half the rectangle)",
                "working": [
                    f"Triangle = ½ × {b} × {h} = {0.5*b*h} cm²",
                    f"Rectangle = {b} × {h} = {b*h} cm²",
                    "Triangle area = ½ × Rectangle area ✓",
                ],
            },
        ],
        "total_marks": 10,
        "svg_diagram": diagram["content"] if diagram else None,
    }


def _equations():
    a = random.randint(2, 5)
    x = random.randint(2, 8)
    b = random.randint(1, 6)
    c = a * x + b
    p = random.randint(2, 5)
    q = random.randint(1, 4)
    # system: px + qy = r; (p+1)x + (q+1)y = s
    y = random.randint(1, 5)
    r1 = p*x + q*y
    r2 = (p+1)*x + (q+1)*y
    return {
        "topic": "Equations",
        "parts": [
            {
                "part": "(a)",
                "marks": 3,
                "question": f"Solve the equation: {a}x + {b} = {c}",
                "answer": f"x = {x}",
                "working": [
                    f"{a}x = {c} - {b} = {c-b}",
                    f"x = {c-b} ÷ {a} = {x}",
                ],
            },
            {
                "part": "(b)",
                "marks": 4,
                "question": f"Solve the simultaneous equations:\n    {p}x + {q}y = {r1}\n    {p+1}x + {q+1}y = {r2}",
                "answer": f"x = {x}, y = {y}",
                "working": [
                    f"Subtract Eq1 from Eq2: x + y = {r2-r1}",
                    f"From Eq1: {p}x + {q}y = {r1}",
                    f"Solving: x = {x}, y = {y}",
                ],
            },
            {
                "part": "(c)",
                "marks": 3,
                "question": f"A number is 3 more than twice another number. Their sum is {3*x + 3}. Find both numbers.",
                "answer": f"Numbers are {x} and {2*x+3}",
                "working": [
                    "Let smaller = n. Then larger = 2n + 3.",
                    f"n + (2n + 3) = {3*x+3}",
                    f"3n = {3*x}  →  n = {x}; larger = {2*x+3}",
                ],
            },
        ],
        "total_marks": 10,
        "svg_diagram": None,
    }


def _fractions():
    a, b = random.randint(2, 5), random.randint(3, 7)
    c, d = random.randint(1, 4), random.randint(5, 8)
    n1 = a*d + b*c
    return {
        "topic": "Fractions",
        "parts": [
            {
                "part": "(a)",
                "marks": 3,
                "question": f"Simplify: {a}/{b} + {c}/{d}",
                "answer": f"{n1}/{b*d}" + (f" = {n1//(b*d)}" if n1%(b*d)==0 else ""),
                "working": [
                    f"LCM of {b} and {d} = {b*d}",
                    f"= {a*d}/{b*d} + {b*c}/{b*d} = {n1}/{b*d}",
                ],
            },
            {
                "part": "(b)",
                "marks": 3,
                "question": f"Evaluate: {a}/{b} × {d}/{c} ÷ {a}/{c}",
                "answer": f"{d}/{b}",
                "working": [
                    f"= ({a}/{b} × {d}/{c}) × {c}/{a}",
                    f"= {a*d}/{b*c} × {c}/{a} = {d}/{b}",
                ],
            },
            {
                "part": "(c)",
                "marks": 4,
                "question": f"A student spends 1/3 of the day sleeping, 1/4 studying and 1/6 on sports. What fraction of the day is left? How many hours is that?",
                "answer": "1/4 of the day = 6 hours",
                "working": [
                    "Total spent = 1/3 + 1/4 + 1/6 = 4/12 + 3/12 + 2/12 = 9/12 = 3/4",
                    "Remaining = 1 - 3/4 = 1/4",
                    "Hours = 1/4 × 24 = 6 hours",
                ],
            },
        ],
        "total_marks": 10,
        "svg_diagram": None,
    }


def _percentages():
    val = random.choice([800, 1200, 2000, 2500])
    pct = random.choice([15, 20, 25])
    cost = random.choice([500, 750, 1000])
    profit_pct = random.choice([10, 20, 30])
    sp = int(cost * (1 + profit_pct/100))
    return {
        "topic": "Percentages",
        "parts": [
            {
                "part": "(a)",
                "marks": 3,
                "question": f"Find {pct}% of Rs. {val}.",
                "answer": f"Rs. {int(val*pct/100)}",
                "working": [f"= ({pct}/100) × {val} = Rs. {int(val*pct/100)}"],
            },
            {
                "part": "(b)",
                "marks": 4,
                "question": f"A shopkeeper bought goods for Rs. {cost} and sold them for Rs. {sp}. Calculate the profit percentage.",
                "answer": f"{profit_pct}%",
                "working": [
                    f"Profit = {sp} - {cost} = Rs. {sp-cost}",
                    f"Profit % = ({sp-cost}/{cost}) × 100 = {profit_pct}%",
                ],
            },
            {
                "part": "(c)",
                "marks": 3,
                "question": f"After a {pct}% discount, an item costs Rs. {int(val*(1-pct/100))}. What was the original price?",
                "answer": f"Rs. {val}",
                "working": [
                    f"Original × (1 - {pct}/100) = {int(val*(1-pct/100))}",
                    f"Original = {int(val*(1-pct/100))} ÷ {1-pct/100} = Rs. {val}",
                ],
            },
        ],
        "total_marks": 10,
        "svg_diagram": None,
    }


def _arithmetic_progressions():
    a = random.randint(3, 10)
    d = random.randint(2, 6)
    n = random.choice([10, 15, 20])
    nth = a + (n-1)*d
    sn = n*(2*a + (n-1)*d)//2
    return {
        "topic": "Arithmetic Progressions",
        "parts": [
            {
                "part": "(a)",
                "marks": 3,
                "question": f"For the AP: {a}, {a+d}, {a+2*d}, ...\n    Find the common difference and the 10th term.",
                "answer": f"d = {d}; T₁₀ = {a + 9*d}",
                "working": [
                    f"d = {a+d} - {a} = {d}",
                    f"T₁₀ = {a} + (10-1)×{d} = {a} + {9*d} = {a+9*d}",
                ],
            },
            {
                "part": "(b)",
                "marks": 4,
                "question": f"Find the sum of the first {n} terms of the AP with first term {a} and common difference {d}.",
                "answer": f"S{n} = {sn}",
                "working": [
                    f"S_n = n/2 × (2a + (n-1)d)",
                    f"= {n}/2 × (2×{a} + {n-1}×{d})",
                    f"= {n}/2 × ({2*a} + {(n-1)*d})",
                    f"= {n}/2 × {2*a + (n-1)*d} = {sn}",
                ],
            },
            {
                "part": "(c)",
                "marks": 3,
                "question": f"The {n}th term of an AP is {nth} and the first term is {a}. Find the number of terms needed to reach a sum of {sn}.",
                "answer": f"n = {n}",
                "working": [
                    f"d = ({nth} - {a}) / ({n}-1) = {d}",
                    f"Using Sn = n/2(2a+(n-1)d): {sn} = n/2(2×{a}+({n}-1)×{d})",
                    f"n = {n}",
                ],
            },
        ],
        "total_marks": 10,
        "svg_diagram": None,
    }


def _probability():
    total = random.choice([20, 25, 30])
    red = random.randint(6, total//2)
    blue = random.randint(4, total - red - 2)
    green = total - red - blue
    return {
        "topic": "Probability",
        "parts": [
            {
                "part": "(a)",
                "marks": 3,
                "question": f"A bag contains {red} red, {blue} blue and {green} green balls. One is drawn at random. Find P(red).",
                "answer": f"{red}/{total}",
                "working": [
                    f"Total = {red} + {blue} + {green} = {total}",
                    f"P(red) = {red}/{total}",
                ],
            },
            {
                "part": "(b)",
                "marks": 4,
                "question": f"Using the same bag, find the probability that the ball drawn is NOT green. If the ball is replaced and a second draw made, find P(both red).",
                "answer": f"P(not green) = {red+blue}/{total}; P(both red) = {red*red}/{total*total}",
                "working": [
                    f"P(not green) = 1 - {green}/{total} = {red+blue}/{total}",
                    f"P(both red) = P(red)×P(red) = ({red}/{total})² = {red*red}/{total*total}",
                ],
            },
            {
                "part": "(c)",
                "marks": 3,
                "question": f"A fair die is thrown once. What is the probability of getting a prime number or an even number?",
                "answer": "5/6",
                "working": [
                    "Primes on die: {2, 3, 5} → 3 outcomes",
                    "Evens on die: {2, 4, 6} → 3 outcomes",
                    "Union = {2,3,4,5,6} → 5 outcomes",
                    "P = 5/6",
                ],
            },
        ],
        "total_marks": 10,
        "svg_diagram": None,
    }


def _sets():
    n = random.randint(40, 60)
    a_only = random.randint(8, 15)
    both = random.randint(5, 12)
    b_only = random.randint(8, 14)
    neither = n - a_only - both - b_only
    return {
        "topic": "Sets",
        "parts": [
            {
                "part": "(a)",
                "marks": 3,
                "question": f"If A = {{1,2,3,4,5,6}} and B = {{2,4,6,8,10}}, write A∪B and A∩B.",
                "answer": "A∪B = {1,2,3,4,5,6,8,10}; A∩B = {2,4,6}",
                "working": [
                    "A∪B = all elements in A or B = {1,2,3,4,5,6,8,10}",
                    "A∩B = common elements = {2,4,6}",
                ],
            },
            {
                "part": "(b)",
                "marks": 4,
                "question": (
                    f"In a class of {n} students, {a_only+both} study Mathematics, "
                    f"{b_only+both} study Science, and {both} study both.\n"
                    f"    (i) Draw a Venn diagram.\n"
                    f"    (ii) Find how many study neither subject."
                ),
                "answer": f"Neither = {neither}",
                "working": [
                    f"n(M only) = {a_only+both} - {both} = {a_only}",
                    f"n(S only) = {b_only+both} - {both} = {b_only}",
                    f"n(M∪S) = {a_only} + {both} + {b_only} = {a_only+both+b_only}",
                    f"Neither = {n} - {a_only+both+b_only} = {neither}",
                ],
            },
            {
                "part": "(c)",
                "marks": 3,
                "question": "If n(A) = 25, n(B) = 18, n(A∩B) = 8 and n(ξ) = 40, find n(A∪B) and n(A'∩B').",
                "answer": "n(A∪B) = 35; n(A'∩B') = 5",
                "working": [
                    "n(A∪B) = n(A)+n(B)-n(A∩B) = 25+18-8 = 35",
                    "n(A'∩B') = n(ξ) - n(A∪B) = 40 - 35 = 5",
                ],
            },
        ],
        "total_marks": 10,
        "svg_diagram": None,
    }


def _logarithms():
    b = random.choice([2, 3, 5])
    n = random.choice([8, 9, 25, 32])
    log_val = round(__import__("math").log(n,b), 4) if __import__("math").log(n,b)==int(__import__("math").log(n,b)) else round(__import__("math").log(n,b),4)
    return {
        "topic": "Logarithms",
        "parts": [
            {
                "part": "(a)",
                "marks": 3,
                "question": f"Evaluate: log₂8 + log₃27 − log₅125",
                "answer": "3 + 3 − 3 = 3",
                "working": [
                    "log₂8 = log₂(2³) = 3",
                    "log₃27 = log₃(3³) = 3",
                    "log₅125 = log₅(5³) = 3",
                    "Total = 3 + 3 - 3 = 3",
                ],
            },
            {
                "part": "(b)",
                "marks": 4,
                "question": "Using laws of logarithms, simplify: log(ab²) − log(a²b) + log(a)",
                "answer": "log(b/a) + log(a) = log(b)",
                "working": [
                    "= log(ab²/a²b) + log(a)",
                    "= log(b/a) + log(a)",
                    "= log(b/a × a) = log(b)",
                ],
            },
            {
                "part": "(c)",
                "marks": 3,
                "question": "Solve for x: 2^(x+1) = 128",
                "answer": "x = 6",
                "working": [
                    "128 = 2⁷",
                    "2^(x+1) = 2⁷",
                    "x + 1 = 7  →  x = 6",
                ],
            },
        ],
        "total_marks": 10,
        "svg_diagram": None,
    }


def _trigonometry_basic():
    a, b = 3, 4
    c = 5
    return {
        "topic": "Triangles",
        "parts": [
            {
                "part": "(a)",
                "marks": 3,
                "question": f"In triangle ABC, angle B = 90°, AB = {a} cm, BC = {b} cm. Find the hypotenuse AC.",
                "answer": f"{c} cm",
                "working": ["AC² = AB² + BC²", f"= {a}² + {b}² = {a*a} + {b*b} = {c*c}", f"AC = √{c*c} = {c} cm"],
            },
            {
                "part": "(b)",
                "marks": 4,
                "question": "Prove that the sum of angles in a triangle is 180°. Hence find the missing angle in a triangle with angles 47° and 68°.",
                "answer": "65°",
                "working": [
                    "Sum of angles in triangle = 180° (angle sum property)",
                    "Missing = 180° - 47° - 68° = 65°",
                ],
            },
            {
                "part": "(c)",
                "marks": 3,
                "question": "Two triangles are similar with sides in ratio 3:5. If the smaller triangle has area 27 cm², find the area of the larger triangle.",
                "answer": "75 cm²",
                "working": [
                    "Ratio of areas = (ratio of sides)² = (3/5)² = 9/25",
                    "Larger area = 27 × (25/9) = 75 cm²",
                ],
            },
        ],
        "total_marks": 10,
        "svg_diagram": get_diagram("right_triangle", {"a": a, "b": b, "c": c})["content"],
    }


def _algebraic_fractions():
    return {
        "topic": "Algebraic Fractions",
        "parts": [
            {
                "part": "(a)",
                "marks": 3,
                "question": "Simplify: (x² - 4) / (x + 2)",
                "answer": "x - 2",
                "working": [
                    "x² - 4 = (x+2)(x-2)",
                    "(x+2)(x-2)/(x+2) = x - 2  (x ≠ -2)",
                ],
            },
            {
                "part": "(b)",
                "marks": 4,
                "question": "Simplify: 3/(x+1) + 2/(x-1)",
                "answer": "(5x - 1)/((x+1)(x-1))",
                "working": [
                    "LCM = (x+1)(x-1)",
                    "= [3(x-1) + 2(x+1)] / [(x+1)(x-1)]",
                    "= [3x-3 + 2x+2] / [(x+1)(x-1)]",
                    "= (5x-1) / (x²-1)",
                ],
            },
            {
                "part": "(c)",
                "marks": 3,
                "question": "Solve: 2/(x-3) = 5/(x+2)",
                "answer": "x = 19",
                "working": [
                    "Cross multiply: 2(x+2) = 5(x-3)",
                    "2x + 4 = 5x - 15",
                    "19 = 3x  →  x = 19/3",
                    "x = 19/3 ≈ 6.33",
                ],
            },
        ],
        "total_marks": 10,
        "svg_diagram": None,
    }


def _graphs():
    m = random.randint(2, 4)
    c = random.randint(1, 5)
    return {
        "topic": "Graphs",
        "parts": [
            {
                "part": "(a)",
                "marks": 3,
                "question": f"For the line y = {m}x + {c}:\n    (i) Find the y-intercept.\n    (ii) Find the x-intercept.\n    (iii) Sketch the graph.",
                "answer": f"y-intercept: (0, {c}); x-intercept: (-{c}/{m}, 0)",
                "working": [
                    f"y-intercept: set x=0 → y = {c}",
                    f"x-intercept: set y=0 → {m}x = -{c} → x = -{c}/{m}",
                ],
            },
            {
                "part": "(b)",
                "marks": 4,
                "question": f"Find the gradient and equation of the line passing through points (2, {2*m+c}) and (5, {5*m+c}).",
                "answer": f"gradient = {m}; equation: y = {m}x + {c}",
                "working": [
                    f"gradient = ({5*m+c} - {2*m+c}) / (5 - 2) = {3*m}/3 = {m}",
                    f"y - {2*m+c} = {m}(x - 2)",
                    f"y = {m}x + {c}",
                ],
            },
            {
                "part": "(c)",
                "marks": 3,
                "question": f"Lines y = {m}x + {c} and y = -{m}x + {2*m+c} intersect at a point. Find the coordinates.",
                "answer": f"({1}, {m+c})",
                "working": [
                    f"{m}x + {c} = -{m}x + {2*m+c}",
                    f"{2*m}x = {m}  →  x = 1",
                    f"y = {m}(1) + {c} = {m+c}",
                ],
            },
        ],
        "total_marks": 10,
        "svg_diagram": None,
    }


def _surface_area_volume():
    r = random.randint(4, 7)
    h = random.randint(6, 12)
    a = random.randint(4, 8)
    cyl_vol = round(3.14*r*r*h, 1)
    cube_sa = 6*a*a
    return {
        "topic": "Surface Area And Volume",
        "parts": [
            {
                "part": "(a)",
                "marks": 3,
                "question": f"Find the volume of a cylinder with radius {r} cm and height {h} cm. (π = 3.14)",
                "answer": f"{cyl_vol} cm³",
                "working": [
                    "V = πr²h",
                    f"= 3.14 × {r}² × {h} = 3.14 × {r*r} × {h} = {cyl_vol} cm³",
                ],
            },
            {
                "part": "(b)",
                "marks": 4,
                "question": f"A cube has side {a} cm. Find its:\n    (i) Total surface area\n    (ii) Volume\n    (iii) Length of the space diagonal",
                "answer": f"TSA = {cube_sa} cm²; V = {a**3} cm³; Diagonal = {round((3**0.5)*a,2)} cm",
                "working": [
                    f"TSA = 6a² = 6×{a}² = {cube_sa} cm²",
                    f"V = a³ = {a}³ = {a**3} cm³",
                    f"Diagonal = a√3 = {a}√3 = {round((3**0.5)*a,2)} cm",
                ],
            },
            {
                "part": "(c)",
                "marks": 3,
                "question": f"A sphere has radius {r} cm. If the radius doubles, by what factor does the volume increase? Justify.",
                "answer": "8 times",
                "working": [
                    "V = (4/3)πr³",
                    "New V = (4/3)π(2r)³ = 8×(4/3)πr³",
                    "Volume increases by factor of 8",
                ],
            },
        ],
        "total_marks": 10,
        "svg_diagram": None,
    }


def _binomial_expressions():
    b = random.randint(2, 5)
    return {
        "topic": "Binomial Expressions",
        "parts": [
            {
                "part": "(a)",
                "marks": 3,
                "question": f"Expand and simplify: (x + {b})² - (x - {b})²",
                "answer": f"{4*b}x",
                "working": [
                    f"(x+{b})² = x² + {2*b}x + {b*b}",
                    f"(x-{b})² = x² - {2*b}x + {b*b}",
                    f"Difference = {4*b}x",
                ],
            },
            {
                "part": "(b)",
                "marks": 4,
                "question": f"Factorise completely: x² - {b**2}",
                "answer": f"(x + {b})(x - {b})",
                "working": [
                    "Difference of two squares: a² - b² = (a+b)(a-b)",
                    f"x² - {b**2} = (x + {b})(x - {b})",
                ],
            },
            {
                "part": "(c)",
                "marks": 3,
                "question": f"If the sides of a rectangle are (x + {b}) cm and (x - {b}) cm, express the area as a difference of two squares and find the area when x = {b+3}.",
                "answer": f"Area = x² - {b**2}; when x={b+3}: Area = {(b+3)**2 - b**2} cm²",
                "working": [
                    f"Area = (x+{b})(x-{b}) = x² - {b**2}",
                    f"When x = {b+3}: ({b+3})² - {b**2} = {(b+3)**2} - {b**2} = {(b+3)**2 - b**2} cm²",
                ],
            },
        ],
        "total_marks": 10,
        "svg_diagram": None,
    }


def _quadratic_factors():
    p, q = random.randint(2,5), random.randint(1,4)
    return {
        "topic": "Factors Of Quadratic Expressions",
        "parts": [
            {
                "part": "(a)",
                "marks": 3,
                "question": f"Factorise: x² + {p+q}x + {p*q}",
                "answer": f"(x + {p})(x + {q})",
                "working": [
                    f"Find two numbers that multiply to {p*q} and add to {p+q}",
                    f"Numbers: {p} and {q}",
                    f"= (x + {p})(x + {q})",
                ],
            },
            {
                "part": "(b)",
                "marks": 4,
                "question": f"Solve the quadratic equation: x² + {p+q}x + {p*q} = 0",
                "answer": f"x = -{p} or x = -{q}",
                "working": [
                    f"Factorise: (x + {p})(x + {q}) = 0",
                    f"x + {p} = 0  →  x = -{p}",
                    f"x + {q} = 0  →  x = -{q}",
                ],
            },
            {
                "part": "(c)",
                "marks": 3,
                "question": f"The length of a field is {p+q} m more than its width. If the area is {p*q} m², find the dimensions.",
                "answer": f"Width = {q} m, Length = {p} m (or width={p}, length={q} depending on context)",
                "working": [
                    "Let width = w, length = w + " + str(p+q),
                    f"w(w + {p+q}) = {p*q}",
                    f"w² + {p+q}w - {p*q} = 0",
                    "Solve by factorisation",
                ],
            },
        ],
        "total_marks": 10,
        "svg_diagram": None,
    }


def _scale_diagrams():
    scale = random.choice([500, 1000, 2000])
    dist_map = random.randint(3, 8)
    actual = dist_map * scale
    return {
        "topic": "Scale Diagrams",
        "parts": [
            {
                "part": "(a)",
                "marks": 3,
                "question": f"On a map with scale 1:{scale}, a road measures {dist_map} cm. Find the actual length in km.",
                "answer": f"{actual/100000} km",
                "working": [
                    f"Actual = {dist_map} × {scale} = {actual} cm",
                    f"= {actual/100} m = {actual/100000} km",
                ],
            },
            {
                "part": "(b)",
                "marks": 4,
                "question": f"A garden is 60m × 40m. Draw it to a scale of 1:1000. Find the dimensions on the scaled drawing and the scaled area.",
                "answer": "6cm × 4cm; Area = 24 cm²",
                "working": [
                    "Scale 1:1000 means divide by 1000",
                    "Length = 60/1000 × 100 = 6 cm; Width = 4 cm",
                    "Scaled area = 6 × 4 = 24 cm²",
                    "Actual area = 60×40 = 2400 m² (ratio = 1:1000² = 1:1000000)",
                ],
            },
            {
                "part": "(c)",
                "marks": 3,
                "question": "Two maps use scales 1:5000 and 1:25000. A river is 12 cm on the first map. How long is it on the second map?",
                "answer": "2.4 cm",
                "working": [
                    "Actual = 12 × 5000 = 60000 cm",
                    "On 2nd map = 60000 / 25000 = 2.4 cm",
                ],
            },
        ],
        "total_marks": 10,
        "svg_diagram": None,
    }


# ────────────────────────────────────────────────────────────────
#  PUBLIC REGISTRY
# ────────────────────────────────────────────────────────────────

ESSAY_GENERATORS_10 = {
    "Perimeter": _perimeter,
    "Area": _area,
    "Equations": _equations,
    "Fractions": _fractions,
    "Percentages": _percentages,
    "Arithmetic Progressions": _arithmetic_progressions,
    "Probability": _probability,
    "Sets": _sets,
    "Logarithms": _logarithms,
    "Triangles": _trigonometry_basic,
    "Algebraic Fractions": _algebraic_fractions,
    "Graphs": _graphs,
    "Surface Area And Volume": _surface_area_volume,
    "Binomial Expressions": _binomial_expressions,
    "Factors Of Quadratic Expressions": _quadratic_factors,
    "Scale Diagrams": _scale_diagrams,
}
