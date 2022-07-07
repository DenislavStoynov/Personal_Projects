const calculatorForm = document.getElementById('calculatorForm');
const calculatorBtn = document.getElementById('calculatorBtn');
let fastLoseWeight = document.getElementById('fastLoseWeight');
let graduallyLoseWeight = document.getElementById('graduallyLoseWeight');
let maintainWeight = document.getElementById('maintainWeight');
let graduallyGainWeight = document.getElementById('graduallyGainWeight');
let fastGainWeight = document.getElementById('fastGainWeight');
let BMR = 0;
const maleNum = 66;
const femaleNum = 655;
const maleNums = {
    USUnits: {
        weightLbs: 6.2,
        heightInches: 12.7
    },
    EURUnits: {
        weightKg: 13.7,
        heightCm: 5.0
    },
    Age: 6.8
};

const femaleNums = {
    USUnits: {
        weightLbs: 4.35,
        heightInches: 4.7
    },
    EURUnits: {
        weightKg: 9.6,
        heightCm: 1.8
    },
    Age: 4.7
};

function handleForm(event) {
    event.preventDefault();
}

calculatorForm.addEventListener('submit', handleForm);

function calculateBMR(num, weightUnits, weight, heightUnits, height, ageUnits, age) {
    BMR = num + (weightUnits * weight) + (heightUnits * height) - (ageUnits * age);
    return BMR;
}

function calculateCalories(activity, cal, bMRate) {
    if (activity == "sedentary") {
        cal = bMRate * 1.2;
    } else if (activity == "light") {
        cal = bMRate * 1.375;
    } else if (activity == "moderate") {
        cal = bMRate * 1.55;
    } else if (activity == "very-active") {
        cal = bMRate * 1.725;
    } else if (activity = "extra-active") {
        cal = bMRate * 1.9;
    }
}

function changeResults(cal) {
    fastLoseWeight.innerHTML = (cal - 600).toFixed(2);
    graduallyLoseWeight.innerHTML = (cal - 300).toFixed(2);
    maintainWeight.innerHTML = cal.toFixed(2);
    graduallyGainWeight.innerHTML = (cal + 300).toFixed(2);
    fastGainWeight.innerHTML = (cal + 600).toFixed(2);
}

calculatorBtn.addEventListener('click', () => {
    let gender = document.querySelector('input[name="gender_type"]:checked').value;
    let units = document.querySelector('input[name="unit_type"]:checked').value;
    let userHeight = document.getElementById('height').value;
    let userWeight = document.getElementById('weight').value;
    let userAge = document.getElementById('age').value;
    let userActivity = document.getElementById('activity').value;
    let calories = 0;

    if (gender == "Male" && units == "US") {
        calculateBMR(maleNum, maleNums.USUnits.weightLbs, userWeight, maleNums.USUnits.heightInches, userHeight, maleNums.Age, userAge);
        if (userActivity == "sedentary") {
            calories = BMR * 1.2;
        } else if (userActivity == "light") {
            calories = BMR * 1.375;
        } else if (userActivity == "moderate") {
            calories = BMR * 1.55;
        } else if (userActivity == "very-active") {
            calories = BMR * 1.725;
        } else if (userActivity = "extra-active") {
            calories = BMR * 1.9;
        }
        changeResults(calories);
    }
    else if(gender == "Male" && units == "EUR") {
        calculateBMR(maleNum, maleNums.EURUnits.weightKg, userWeight, maleNums.EURUnits.heightCm, userHeight, maleNums.Age, userAge);
        if (userActivity == "sedentary") {
            calories = BMR * 1.2;
        } else if (userActivity == "light") {
            calories = BMR * 1.375;
        } else if (userActivity == "moderate") {
            calories = BMR * 1.55;
        } else if (userActivity == "very-active") {
            calories = BMR * 1.725;
        } else if (userActivity = "extra-active") {
            calories = BMR * 1.9;
        }
        changeResults(calories);
    } else if(gender == "Female" && units == "US") {
        calculateBMR(femaleNum, femaleNums.USUnits.weightLbs, userWeight, femaleNums.USUnits.heightInches, userHeight, femaleNums.Age, userAge);
        if (userActivity == "sedentary") {
            calories = BMR * 1.2;
        } else if (userActivity == "light") {
            calories = BMR * 1.375;
        } else if (userActivity == "moderate") {
            calories = BMR * 1.55;
        } else if (userActivity == "very-active") {
            calories = BMR * 1.725;
        } else if (userActivity = "extra-active") {
            calories = BMR * 1.9;
        }
        changeResults(calories);
    } else if(gender == "Female" && units == "EUR") {
        calculateBMR(femaleNum, femaleNums.EURUnits.weightKg, userWeight, femaleNums.EURUnits.heightCm, userHeight, femaleNums.Age, userAge);
        if (userActivity == "sedentary") {
            calories = BMR * 1.2;
        } else if (userActivity == "light") {
            calories = BMR * 1.375;
        } else if (userActivity == "moderate") {
            calories = BMR * 1.55;
        } else if (userActivity == "very-active") {
            calories = BMR * 1.725;
        } else if (userActivity = "extra-active") {
            calories = BMR * 1.9;
        }
        changeResults(calories);
    }
})