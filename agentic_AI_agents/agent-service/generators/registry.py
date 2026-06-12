# generators/registry.py

# =========================================================
# GRADE 10 GENERATORS
# =========================================================

from generators.grade10.perimeter import generate as perimeter
from generators.grade10.square_root import generate as square_root
from generators.grade10.fractions import generate as fractions
from generators.grade10.binomial_expressions import generate as binomial
from generators.grade10.congruence_of_triangles import generate as congruence
from generators.grade10.area import generate as area
from generators.grade10.factors_of_quadratic_expressions import generate as factors_quadratic
from generators.grade10.triangles import generate as triangles
from generators.grade10.inverse_proportions import generate as inverse_prop
from generators.grade10.data_representation import generate as data_rep
from generators.grade10.lcm_algebraic_expressions import generate as lcm_alg
from generators.grade10.algebraic_fractions import generate as alg_fractions
from generators.grade10.percentages import generate as percentages
from generators.grade10.equations import generate as equations
from generators.grade10.parallelograms import generate as parallelograms
from generators.grade10.sets import generate as sets_gen
from generators.grade10.logarithms import generate as logarithms
from generators.grade10.graphs import generate as graphs
from generators.grade10.rate import generate as rate
from generators.grade10.formula import generate as formula
from generators.grade10.arithmetic_progressions import generate as ap
from generators.grade10.algebraic_inequalities import generate as inequalities
from generators.grade10.frequency_distributions import generate as freq_dist
from generators.grade10.chords_of_circle import generate as chords
from generators.grade10.constructions import generate as constructions
from generators.grade10.surface_area_and_volume import generate as sav
from generators.grade10.probability import generate as probability
from generators.grade10.angles_in_a_circle import generate as angles_circle
from generators.grade10.scale_diagrams import generate as scale_diagrams


# =========================================================
# GRADE 11 GENERATORS
# =========================================================

from generators.grade11.real_numbers import generate as real_numbers
from generators.grade11.indices_logarithms import generate as indices_logs
from generators.grade11.surface_area_solids import generate as surface_area_solids
from generators.grade11.volume_solids import generate as volume_solids
from generators.grade11.binomial_expressions import generate as binomial_11
from generators.grade11.algebraic_fractions import generate as algebraic_fractions_11
from generators.grade11.areas_between_parallel_lines import generate as areas_parallel
from generators.grade11.percentages import generate as percentages_11
from generators.grade11.share_market import generate as share_market
from generators.grade11.midpoint_theorem import generate as midpoint_theorem
from generators.grade11.graphs import generate as graphs_11
from generators.grade11.equations import generate as equations_11
from generators.grade11.equiangular_triangles import generate as equiangular_triangles
from generators.grade11.data_representation import generate as data_rep_11
from generators.grade11.geometric_progressions import generate as gp
from generators.grade11.pythagoras import generate as pythagoras
from generators.grade11.trigonometry import generate as trigonometry
from generators.grade11.matrices import generate as matrices
from generators.grade11.inequalities import generate as inequalities_11
from generators.grade11.cyclic_quadrilaterals import generate as cyclic_quadrilaterals
from generators.grade11.tangent import generate as tangent
from generators.grade11.constructions import generate as constructions_11
from generators.grade11.sets import generate as sets_11
from generators.grade11.probability import generate as probability_11


# =========================================================
# REGISTRY MAP
# =========================================================

GENERATOR_MAP = {

    # -----------------
    # Grade 10
    # -----------------
    (10, "Perimeter"): perimeter,
    (10, "Square Root"): square_root,
    (10, "Fractions"): fractions,
    (10, "Binomial Expressions"): binomial,
    (10, "Congruence Of Triangles"): congruence,
    (10, "Area"): area,
    (10, "Factors Of Quadratic Expressions"): factors_quadratic,
    (10, "Triangles"): triangles,
    (10, "Inverse Proportions"): inverse_prop,
    (10, "Data Representation"): data_rep,
    (10, "Least Common Multiple Of Algebraic Expressions"): lcm_alg,
    (10, "Algebraic Fractions"): alg_fractions,
    (10, "Percentages"): percentages,
    (10, "Equations"): equations,
    (10, "Parallelograms"): parallelograms,
    (10, "Sets"): sets_gen,
    (10, "Logarithms"): logarithms,
    (10, "Graphs"): graphs,
    (10, "Rate"): rate,
    (10, "Formula"): formula,
    (10, "Arithmetic Progressions"): ap,
    (10, "Algebraic Inequalities"): inequalities,
    (10, "Frequency Distributions"): freq_dist,
    (10, "Chords Of Circle"): chords,
    (10, "Constructions"): constructions,
    (10, "Surface Area And Volume"): sav,
    (10, "Probability"): probability,
    (10, "Angles In A Circle"): angles_circle,
    (10, "Scale Diagrams"): scale_diagrams,

    # -----------------
    # Grade 11
    # -----------------
    (11, "Real Numbers"): real_numbers,
    (11, "Indices And Logarithms"): indices_logs,
    (11, "Surface Area Of Solids"): surface_area_solids,
    (11, "Volume Of Solids"): volume_solids,
    (11, "Binomial Expressions"): binomial_11,
    (11, "Algebraic Fractions"): algebraic_fractions_11,
    (11, "Areas Of Plane Figures Between Parallel Lines"): areas_parallel,
    (11, "Percentages"): percentages_11,
    (11, "Share Market"): share_market,
    (11, "Mid Point Theorem"): midpoint_theorem,
    (11, "Graphs"): graphs_11,
    (11, "Equations"): equations_11,
    (11, "Equiangular Triangles"): equiangular_triangles,
    (11, "Data Representation And Interpretation"): data_rep_11,
    (11, "Geometric Progressions"): gp,
    (11, "Pythagoras'S Theorem"): pythagoras,
    (11, "Trigonometry"): trigonometry,
    (11, "Matrices"): matrices,
    (11, "Inequalities"): inequalities_11,
    (11, "Cyclic Quadrilaterals"): cyclic_quadrilaterals,
    (11, "Tangent"): tangent,
    (11, "Constructions"): constructions_11,
    (11, "Sets"): sets_11,
    (11, "Probability"): probability_11,
}


# =========================================================
# HELPERS
# =========================================================

def normalize_topic(topic: str) -> str:
    """
    Converts flexible topic inputs into registry-safe keys.
    Examples:
    - square_root -> Square Root
    - SQUARE ROOT -> Square Root
    - pythagoras_theorem -> Pythagoras Theorem
    """
    return topic.replace("_", " ").strip().title()


# =========================================================
# ACCESS FUNCTION
# =========================================================

def get_generator(grade: int, topic: str):
    normalized_topic = normalize_topic(topic)
    key = (grade, normalized_topic)

    if key not in GENERATOR_MAP:
        raise ValueError(
            f"No generator found for Grade {grade} - {normalized_topic}"
        )

    return GENERATOR_MAP[key]
