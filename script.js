const calculateBtn = document.querySelector('.js-get-price');

const dowryFactors = {
    educationLevel: {
        undergraduate: { factor: 1.5 },
        collegeGraduate: { factor: 1.2 },
        highSchoolGraduate: { factor: 1.05 },
        middleSchoolGraduate: { factor: 0.9 }
    },
    financialStatus: {
        wealthy: { factor: 2 },
        middleIncome: { factor: 1.5 },
        lowerIncome: { factor: 1.2 }
    },
    socialClass: {
        brahmin: { increment: 100 },
        kshatriya: { increment: 50 },
        vaishya: { increment: 20 },
        shudra: { increment: 10 },
        varna: { decrement: -50 }
    },
    personalSkills: {
        musician: { increment: 10 },
        chef: { increment: 20 },
        friendly: { increment: 15 },
        vocalist: { increment: 10 }
    },
    ageGroup: {
        youth: { factor: 1.5 },
        adult: { factor: 1.2 },
        senior: { factor: 0.95 }
    },
    socialReputation: {
        parentalGossip: { factor: 0.85 },
        personalCharacterGossip: { factor: 0.9 },
        generalRumor: { decrement: -20 }
    }
};

calculateBtn.addEventListener('click', () => {
    let basePrice = 100; 
    
    const selectedEducation = document.querySelector('#educationLevel');
    const selectedWealth = document.querySelector('#financialStatus');
    const selectedClass = document.querySelector('#socialClass');
    const selectedSkills = document.querySelectorAll('input[name="personalSkills"]:checked');
    const selectedAge = document.querySelector('input[name="ageGroup"]:checked');
    const selectedReputation = document.querySelectorAll('input[name="socialReputation"]:checked');

    if (!selectedEducation || !selectedWealth || !selectedClass || !selectedAge) {
        console.error("Please fill in all required fields.");
        return;
    }

    computeDowry(selectedEducation, selectedWealth, selectedClass, selectedSkills, selectedAge, selectedReputation, basePrice); 
});

function computeDowry(education, wealth, caste, skills, age, reputation, basePrice) {
    const finalPriceElement = document.querySelector('.finalPrice');
    const chosenEducation = education.value;
    if (dowryFactors.educationLevel[chosenEducation]) {
        basePrice *= dowryFactors.educationLevel[chosenEducation].factor; 
    }

    const chosenWealth = wealth.value; 
    if (dowryFactors.financialStatus[chosenWealth]) {
        basePrice *= dowryFactors.financialStatus[chosenWealth].factor; 
    }

    const chosenClass = caste.value; 
    if (dowryFactors.socialClass[chosenClass]) {
        basePrice += dowryFactors.socialClass[chosenClass].increment; 
    }

    skills.forEach(skill => {
        if (dowryFactors.personalSkills[skill.value]) {
            basePrice += dowryFactors.personalSkills[skill.value].increment; 
        }
    });

    const chosenAge = age.value; 
    if (chosenAge && dowryFactors.ageGroup[chosenAge]) {
        basePrice *= dowryFactors.ageGroup[chosenAge].factor;
    }

    reputation.forEach(rep => {
        if (rep.value === 'generalRumor') {
            basePrice += dowryFactors.socialReputation.generalRumor.decrement; 
        } else if (dowryFactors.socialReputation[rep.value]) {
            basePrice *= dowryFactors.socialReputation[rep.value].factor; 
        }
    });

    console.log("Final Dowry Price:", basePrice);

    finalPriceElement.innerHTML = `Final Price: $${basePrice}`;
}
