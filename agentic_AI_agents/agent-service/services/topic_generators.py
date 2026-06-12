import random

def perimeter():
    l, w = random.randint(5,15), random.randint(4,10)
    correct = 2*(l+w)
    return {
        "question": f"Find the perimeter of a rectangle of length {l} cm and width {w} cm.",
        "correct": f"{correct} cm",
        "wrongs": [
            f"{l+w} cm",
            f"{2*l+w} cm",
            f"{correct+4} cm"
        ],
        "diagram": None
    }

def pythagoras():
    a, b = random.randint(3,8), random.randint(4,9)
    c = (a*a + b*b) ** 0.5
    return {
        "question": f"Find the length of the hypotenuse of a right-angled triangle with sides {a} cm and {b} cm.",
        "correct": f"{round(c,1)} cm",
        "wrongs": [
            f"{a+b} cm",
            f"{a*b} cm",
            f"{a*a+b*b} cm"
        ],
        "diagram": "right_triangle"
    }

def algebraic_fractions():
    a,b,c,d = random.randint(1,5), random.randint(2,7), random.randint(1,5), random.randint(2,7)
    return {
        "question": f"Simplify: {a}/{b} + {c}/{d}",
        "correct": f"{a*d+b*c}/{b*d}",
        "wrongs": [
            f"{a+c}/{b+d}",
            f"{a*d}/{b*c}",
            f"{a+b}/{c+d}"
        ],
        "diagram": None
    }
