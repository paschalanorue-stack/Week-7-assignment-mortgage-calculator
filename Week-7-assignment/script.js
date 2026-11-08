const form = document.getElementById("mortgage-form");

const amountInput = document.getElementById("amount");
const termInput = document.getElementById("term");
const rateInput = document.getElementById("rate");

const clearBtn = document.getElementById("clear-all");

const emptyState = document.getElementById("empty-state");
const resultsState = document.getElementById("results-state");

const monthlyResult = document.getElementById("monthly-result");
const totalResult = document.getElementById("total-result");

// FORM SUBMIT

form.addEventListener("submit", function (e) {
    e.preventDefault();

    clearErrors();

    const amount = parseFloat(amountInput.value);
    const term = parseFloat(termInput.value);
    const rate = parseFloat(rateInput.value);

    const mortgageType = document.querySelector(
        'input[name="mortgage-type"]:checked'
    );

    let isValid = true;

    // VALIDATIONS

    if (!amountInput.value.trim()) {
        showError(amountInput, "This field is required");
        isValid = false;
    }

    if (!termInput.value.trim()) {
        showError(termInput, "This field is required");
        isValid = false;
    }

    if (!rateInput.value.trim()) {
        showError(rateInput, "This field is required");
        isValid = false;
    }

    if (!mortgageType) {
        const mortgageGroup = document.querySelector(
            'input[name="mortgage-type"]'
        );

        showError(
            mortgageGroup,
            "This field is required"
        );

        isValid = false;
    }

    if (!isValid) return;

    let monthlyPayment;
    let totalRepayment;

    // REPAYMENT MORTGAGE

    if (mortgageType.value === "repayment") {

        const monthlyRate = rate / 100 / 12;

        const numberOfPayments = term * 12;

        monthlyPayment =
            amount *
            (
                monthlyRate *
                Math.pow(1 + monthlyRate, numberOfPayments)
            ) /
            (
                Math.pow(1 + monthlyRate, numberOfPayments) - 1
            );

        totalRepayment =
            monthlyPayment * numberOfPayments;
    }

    // INTEREST ONLY MORTGAGE

    else {

        monthlyPayment =
            amount *
            (rate / 100 / 12);

        totalRepayment =
            monthlyPayment * term * 12;
    }

    monthlyResult.textContent =
        "£" +
        monthlyPayment.toLocaleString(
            undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    totalResult.textContent =
        "£" +
        totalRepayment.toLocaleString(
            undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    emptyState.style.display = "none";
    resultsState.style.display = "block";
});

// CLEAR ALL

clearBtn.addEventListener("click", function (e) {

    e.preventDefault();

    form.reset();

    clearErrors();

    resultsState.style.display = "none";
    emptyState.style.display = "block";
});

// SHOW ERROR

function showError(input, message) {

    const formGroup = input.closest(".form-group");

    if (!formGroup) return;

    const error =
        formGroup.querySelector(".error-message");

    if (error) {
        error.textContent = message;
    }

    const inputGroup =
        formGroup.querySelector(".input-group");

    if (inputGroup) {
        inputGroup.style.borderColor =
            "hsl(4, 69%, 50%)";
    }
}

// CLEAR ERRORS

function clearErrors() {

    const errors =
        document.querySelectorAll(".error-message");

    errors.forEach(error => {
        error.textContent = "";
    });

    const inputGroups =
        document.querySelectorAll(".input-group");

    inputGroups.forEach(group => {
        group.style.borderColor =
            "hsl(203, 41%, 72%)";
    });
}