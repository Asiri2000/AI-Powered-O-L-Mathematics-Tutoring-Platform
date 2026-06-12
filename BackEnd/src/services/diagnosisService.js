function diagnoseError({
  selected_answer,
  correct_answer,
  time_taken
}) {
  // Guessing (too fast)
  if (time_taken < 5) {
    return 'GUESSING';
  }

  // Sign error (e.g., x = 3 vs x = -3)
  if (
    selected_answer.replace(/-/g, '') ===
    correct_answer.replace(/-/g, '')
  ) {
    return 'SIGN_ERROR';
  }

  // Formula misuse (very basic heuristic)
  if (
    selected_answer.includes('x') &&
    !selected_answer.includes('=')
  ) {
    return 'FORMULA_ERROR';
  }

  // Default fallback
  return 'CONCEPT_MISUNDERSTANDING';
}

module.exports = {
  diagnoseError
};
