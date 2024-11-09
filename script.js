// Получаем нужные элементы из DOM
const gameContainer = document.querySelector('.container'),
    userResult = document.querySelector('.user_result img'),
    cpuResult = document.querySelector('.cpu_result img'),
    result = document.querySelector('.result'),
    optionImages = document.querySelectorAll('.option_image');


const cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png", 'images/lizard.png', "images/spoke.png"];
const outcomes = {
    RR: "Draw", RP: "Cpu", RS: "User", RSp: "Cpu", RL: "User",
    PP: "Draw", PR: "User", PS: "Cpu", PSp: "User", PL: "Cpu",
    SS: "Draw", SP: "User", SR: "Cpu", SSp: "Cpu", SL: "User",
    SpSp: "Draw", SpR: "User", SpP: "Cpu", SpL: "Cpu", SpS: "User",
    LL: "Draw", LP: "User", LR: "Cpu", LS: "Cpu", LSp: "User"
};


optionImages.forEach((image, index) => {
    image.addEventListener('click', (e) => {
        console.log("User clicked an option, starting game...");


        image.classList.add('active');
        optionImages.forEach((img, idx) => {
            if (index !== idx) {
                img.classList.remove('active');
                console.log(`Deactivated image index ${idx}`);
            }
        });


        userResult.src = cpuResult.src = 'images/rock.png';
        result.textContent = 'Wait...';
        console.log("Images reset to default, waiting for result...");
        gameContainer.classList.add('start');


        setTimeout(() => {
            gameContainer.classList.remove('start');
            console.log("Game animation stopped.");


            const userImage = e.target.querySelector('img');
            userResult.src = userImage.src;
            console.log("User selected:", userImage.src);



            const randomIndex = Math.floor(Math.random() * 5);
            const cpuImageSrc = cpuImages[randomIndex];
            cpuResult.src = cpuImageSrc;
            console.log("CPU selected:", cpuImageSrc);

            // Добавляем или убираем класс .no-rotate для CPU
            if (cpuImageSrc.includes('lizard')) {
                cpuResult.classList.add('no-rotate');
            } else {
                cpuResult.classList.remove('no-rotate');
            }


            const userValue = ["R", "P", "S", "L", 'Sp'][index];
            const cpuValue = ["R", "P", "S", 'L', 'Sp'][randomIndex];
            console.log(`User choice: ${userValue}, CPU choice: ${cpuValue}`);


            const outcome = outcomes[userValue + cpuValue];
            console.log(`Outcome calculated: ${userValue} vs ${cpuValue} -> ${outcome}`);


            result.textContent = outcome === "Draw" ? "Match Draw" : `${outcome} Won!`;
            console.log("Final result displayed:", result.textContent);

        }, 2500);
    });
})