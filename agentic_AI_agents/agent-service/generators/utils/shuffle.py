import random

def shuffle_options(correct, wrongs):
    values = wrongs + [correct]
    random.shuffle(values)

    letters = ["A", "B", "C", "D"]
    options = dict(zip(letters, values))
    answer = next(k for k, v in options.items() if v == correct)

    return options, answer
