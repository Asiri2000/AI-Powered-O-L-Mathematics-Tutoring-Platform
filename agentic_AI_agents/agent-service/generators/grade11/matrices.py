import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["identify_order", "matrix_addition", "scalar_multiplication", "determinant_concept", "concept"])

    if qtype == "identify_order":
        rows = random.randint(2, 3)
        cols = random.randint(2, 4)
        question = f"What is the order of a matrix with {rows} rows and {cols} columns?"
        correct = f"{rows} × {cols}"
        wrongs = [f"{cols} × {rows}", f"{rows + cols}", f"{rows} + {cols}"]
        steps = [
            "Order of a matrix = rows × columns",
            f"Here: {rows} rows and {cols} columns",
            f"Answer: {rows} × {cols}",
        ]

    elif qtype == "matrix_addition":
        question = "Which condition must be satisfied to add two matrices?"
        correct = "They must have the same order"
        wrongs = ["They must be square matrices", "They must have equal determinants", "They must have equal entries"]
        steps = [
            "Matrix addition is done element by element.",
            "This is only possible when both matrices have exactly the same number of rows and columns.",
            "Answer: They must have the same order",
        ]

    elif qtype == "scalar_multiplication":
        scalar = random.randint(2, 5)
        question = f"What happens when a matrix is multiplied by a scalar {scalar}?"
        correct = "Each element is multiplied by the scalar"
        wrongs = ["Only diagonal elements change", "Only rows change", "Only columns change"]
        steps = [
            f"Scalar multiplication: multiply EVERY element of the matrix by {scalar}.",
            "No elements are left unchanged.",
            "Answer: Each element is multiplied by the scalar",
        ]

    elif qtype == "determinant_concept":
        question = "For which type of matrix is the determinant defined?"
        correct = "Square matrix"
        wrongs = ["Rectangular matrix", "Row matrix", "Column matrix"]
        steps = [
            "The determinant is a special value calculated from a matrix.",
            "It can only be calculated for SQUARE matrices (n × n).",
            "Answer: Square matrix",
        ]

    else:
        question = "Which of the following is a zero matrix?"
        correct = "A matrix with all elements equal to zero"
        wrongs = ["A matrix with determinant zero", "A matrix with one zero row", "A matrix with no rows"]
        steps = [
            "A zero matrix (null matrix) has every element equal to zero.",
            "It is different from a matrix whose determinant is zero.",
            "Answer: A matrix with all elements equal to zero",
        ]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Matrices",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
