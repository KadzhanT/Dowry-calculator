const btn = document.querySelector('.js-calculate-price');

const qalyn = {
    education: {
        undergraduate: { coeff: 1.5 },
        college: { coeff: 1.2 },
        highSchool: { coeff: 1.05 },
        middleSchool: { coeff: 0.9 }
    },
    netWorth: {
        upperClass: { coeff: 2 },
        middleClass: { coeff: 1.5 },
        lowerClass: { coeff: 1.2 } 
    },
    caste: {
        brahmin: { bonus: 100 },
        kshatriya: { bonus: 50 },
        vaishya: { bonus: 20 },
        shudra: { bonus: 10 },
        varna: { bonus: -50 }
    },
    skills: {
        musician: { bonus: 10 },
        cook: { bonus: 20 },
        easygoing: { bonus: 15 },
        singer: { bonus: 10 }
    },
    age: {
        youngAdult: { coeff: 1.5 },
        midAdult: { coeff: 1.2 },
        olderAdult: { coeff: 0.95 }
    },
    reputation: {
        gossipParents: { coeff: 0.85 },
        gossipCharacter: { coeff: 0.9 },
        generalGossip: { bonus: -20 }
    }
};




btn.addEventListener('click', () => {
    let startingPrice = 100; 
    
    const education = document.querySelector('#education');
    const networth = document.querySelector('#networth');
    const caste = document.querySelector('#caste');
    const skills = document.querySelectorAll('input[name="skills"]:checked'); 
    const age = document.querySelector('input[name="age"]:checked');
    const reputation = document.querySelectorAll('input[name="reputation"]:checked');

    
    if (!education || !networth || !caste || !age) {
        console.error("One or more necessary fields are not selected.");
        return;
    }

    calculatePrice(education, networth, caste, skills, age, reputation, startingPrice,); 
});

function calculatePrice(education, networth, caste, skills, age, reputation, startingPrice,) {
    const totalPrice = document.querySelector('.priceTotal');
    const selectedEducation = education.value;
    if (qalyn.education[selectedEducation]) {
        startingPrice *= qalyn.education[selectedEducation].coeff; 
    }

    const selectedNetWorth = networth.value; 
    if (qalyn.netWorth[selectedNetWorth]) {
        startingPrice *= qalyn.netWorth[selectedNetWorth].coeff; 
    }

    const selectedCaste = caste.value; 
    if (qalyn.caste[selectedCaste]) {
        startingPrice += qalyn.caste[selectedCaste].bonus; 
    }

    skills.forEach(skill => {
        if (qalyn.skills[skill.value]) {
            startingPrice += qalyn.skills[skill.value].bonus; 
        }
    });

   const selectedAge = age.value; 
   if (selectedAge && qalyn.age[selectedAge]) {
        startingPrice *= qalyn.age[selectedAge].coeff;
   }


    reputation.forEach(rep => {
        if (rep.value === 'generalGossip') {
            startingPrice += qalyn.reputation.generalGossip.bonus; 
        } else if (qalyn.reputation[rep.value]) {
            startingPrice *= qalyn.reputation[rep.value].coeff; 
        }
    });

    console.log("Calculated Price:", startingPrice);

    totalPrice.innerHTML = `total Price: $${startingPrice}`;
}
