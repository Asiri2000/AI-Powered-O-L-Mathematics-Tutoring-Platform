import random
from generators.utils.shuffle import shuffle_options

def generate(difficulty=3):
    qtype = random.choice([
        "single_coin",
        "two_coins",
        "dice",
        "cards",
        "bag",
        "complement",
        "sample_space"
    ])

    # ---------------- SINGLE COIN ----------------
    if qtype == "single_coin":
        correct = "1/2"
        options, ans = shuffle_options(
            correct,
            ["1/3", "1/4", "2/3"]
        )
        question = "A fair coin is tossed once. What is the probability of getting a head?"

    # ---------------- TWO COINS ----------------
    elif qtype == "two_coins":
        correct = "1/4"
        options, ans = shuffle_options(
            correct,
            ["1/2", "3/4", "1/3"]
        )
        question = "Two fair coins are tossed together. What is the probability of getting two heads?"

    # ---------------- DICE ----------------
    elif qtype == "dice":
        correct = "1/6"
        options, ans = shuffle_options(
            correct,
            ["1/3", "1/2", "2/3"]
        )
        question = "A fair dice is thrown once. What is the probability of getting a 6?"

    # ---------------- CARDS ----------------
    elif qtype == "cards":
        correct = "1/4"
        options, ans = shuffle_options(
            correct,
            ["1/13", "1/2", "3/4"]
        )
        question = "One card is drawn at random from a pack of 52 cards. What is the probability that the card is a heart?"

    # ---------------- BAG OF OBJECTS ----------------
    elif qtype == "bag":
        red = random.randint(2,5)
        blue = random.randint(2,5)
        total = red + blue

        correct = f"{red}/{total}"
        options, ans = shuffle_options(
            correct,
            [f"{blue}/{total}", f"{total}/{red}", f"{1}/{total}"]
        )
        question = f"A bag contains {red} red balls and {blue} blue balls. One ball is selected at random. What is the probability of selecting a red ball?"

    # ---------------- COMPLEMENT ----------------
    elif qtype == "complement":
        correct = "5/6"
        options, ans = shuffle_options(
            correct,
            ["1/6", "1/3", "2/3"]
        )
        question = "A fair dice is thrown once. What is the probability of NOT getting a 1?"

    # ---------------- SAMPLE SPACE ----------------
    else:
        correct = "3/8"
        options, ans = shuffle_options(
            correct,
            ["1/8", "5/8", "1/4"]
        )
        question = "A card is chosen at random from cards numbered 1 to 8. What is the probability that the number chosen is greater than 5?"

    return {
        "question": question,
        "options": options,
        "correct_answer": ans,
        "difficulty": difficulty,
        "concept": "Probability",
        "needs_image": False
    }
