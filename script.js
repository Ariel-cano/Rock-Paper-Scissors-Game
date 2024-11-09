// Получаем нужные элементы из DOM
const gameContainer = document.querySelector('.container'),
    userResult = document.querySelector('.user_result img'),
    cpuResult = document.querySelector('.cpu_result img'),
    result = document.querySelector('.result'),
    optionImages = document.querySelectorAll('.option_image');

// Массив изображений для вариантов
const cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
const outcomes = {
    RR: "Draw", RP: "Cpu", RS: "User",
    PP: "Draw", PR: "User", PS: "Cpu",
    SS: "Draw", SP: "User", SR: "Cpu"
};

// Добавляем обработчик событий для каждого изображения варианта
optionImages.forEach((image, index) => {
    image.addEventListener('click', (e) => {
        console.log("User clicked an option, starting game...");

        // Активируем выбранное изображение и деактивируем остальные
        image.classList.add('active');
        optionImages.forEach((img, idx) => {
            if (index !== idx) {
                img.classList.remove('active');
                console.log(`Deactivated image index ${idx}`);
            }
        });

        // Устанавливаем начальное изображение и текст ожидания
        userResult.src = cpuResult.src = 'images/rock.png';
        result.textContent = 'Wait...';
        console.log("Images reset to default, waiting for result...");
        gameContainer.classList.add('start');

        // Задержка для выбора компьютера
        setTimeout(() => {
            gameContainer.classList.remove('start');
            console.log("Game animation stopped.");

            // Выбор пользователя и логирование
            const userImageSrc = e.target.querySelector('img').src;
            userResult.src = userImageSrc;
            console.log("User selected:", userImageSrc);

            // Выбор компьютера и логирование
            const randomIndex = Math.floor(Math.random() * 3);
            const cpuImageSrc = cpuImages[randomIndex];
            cpuResult.src = cpuImageSrc;
            console.log("CPU selected:", cpuImageSrc);

            // Определяем значения для сравнения (R, P, S)
            const userValue = ["R", "P", "S"][index];
            const cpuValue = ["R", "P", "S"][randomIndex];
            console.log(`User choice: ${userValue}, CPU choice: ${cpuValue}`);

            // Вычисляем результат
            const outcome = outcomes[userValue + cpuValue];
            console.log(`Outcome calculated: ${userValue} vs ${cpuValue} -> ${outcome}`);

            // Выводим результат
            result.textContent = outcome === "Draw" ? "Match Draw" : `${outcome} Won!`;
            console.log("Final result displayed:", result.textContent);

        }, 2500); // Задержка для имитации "размышлений" компьютера
    });
});