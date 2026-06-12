import random
from generators.utils.shuffle import shuffle_options
from generators.utils.steps_fallback import default_steps


def generate(difficulty: int = 3):
    qtype = random.choice(["set_notation", "cardinality", "union_intersection", "complement", "venn_application"])

    if qtype == "set_notation":
        question = "Which notation represents the set of natural numbers?"
        correct = "ℕ"
        wrongs = ["ℤ", "ℚ", "ℝ"]
        steps = ["ℕ = Natural numbers {1, 2, 3, ...}", "ℤ = Integers, ℚ = Rationals, ℝ = Reals", "Answer: ℕ"]

    elif qtype == "cardinality":
        A = {1, 2, 3, 4, 5}
        question = f"If A = {sorted(A)}, find n(A)."
        correct = str(len(A))
        wrongs = [str(sum(A)), str(max(A)), str(min(A))]
        steps = [f"n(A) = number of elements in A", f"A has {len(A)} elements", f"Answer: {len(A)}"]

    elif qtype == "union_intersection":
        question = "If A = {1, 2, 3} and B = {3, 4, 5}, find A ∩ B."
        correct = "{3}"
        wrongs = ["{1, 2, 3, 4, 5}", "{1, 2}", "{4, 5}"]
        steps = ["A ∩ B = elements common to BOTH sets.", "Common element: 3", "Answer: {3}"]

    elif qtype == "complement":
        question = "If U = {1, 2, 3, 4, 5, 6} and A = {2, 4, 6}, find A′."
        correct = "{1, 3, 5}"
        wrongs = ["{2, 4, 6}", "{1, 2, 3}", "{4, 5, 6}"]
        steps = ["A′ = elements in U that are NOT in A.", "U = {1,2,3,4,5,6}, A = {2,4,6}", "A′ = {1, 3, 5}", "Answer: {1, 3, 5}"]

    else:
        nM, nS, nBoth, total = 25, 18, 10, 40
        neither = total - (nM + nS - nBoth)
        question = f"In a class of {total}, {nM} study Maths, {nS} study Science, {nBoth} study both. How many study neither?"
        correct = str(neither)
        wrongs = [str(nM + nS), str(nBoth), str(total - nM)]
        steps = [
            f"n(M ∪ S) = n(M) + n(S) − n(M ∩ S) = {nM} + {nS} − {nBoth} = {nM+nS-nBoth}",
            f"Neither = Total − n(M ∪ S) = {total} − {nM+nS-nBoth} = {neither}",
            f"Answer: {neither}",
        ]

    options, answer = shuffle_options(correct, wrongs)
    return {
        "question": question, "options": options, "correct_answer": answer,
        "difficulty": difficulty, "concept": "Sets",
        "needs_image": False, "svg_diagram": None, "steps": steps,
    }
