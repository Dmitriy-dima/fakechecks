const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const screenshotConfigs = require('./screenshotConfigs');
const config = require('./config.json');
const token = config.token;

const { createCanvas, loadImage, registerFont } = require('canvas');
registerFont('./fonts/Nicolo-Regular/NicoloBold.otf', { family: 'Nicolo' });
registerFont('./fonts/Nicolo-Regular/Nicolo-Regular.otf', { family: 'Nicolo-Regular' });

// Инициализация бота
const bot = new TelegramBot(token, {polling: true});

// Чтение пользователей из файла users.json
let users = require('./users.json');

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    // Инициализация пользователя, если он не существует
    bot.sendMessage(chatId, 'Добро пожаловать!');
    if (!users[chatId]) {
        users[chatId] = {
            id: uuidv4(), // Генерируем уникальный идентификатор для пользователя
            registrationDate: new Date().toISOString(),
            step: 0,
        };
        fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
    }

    // Параметры меню отправки
    sendMainMenu(chatId);
});

bot.onText(/Профиль/, (msg) => {
    const chatId = msg.chat.id;
    const user = users[chatId];
    if(user) {
        const profileInfo = `ID в боте: ${user.id}\nID в Telegram: ${chatId}\nДата регистрации: ${user.registrationDate}`;
        bot.sendMessage(chatId, profileInfo);
    }
});

bot.onText(/Генерировать скриншот/, (msg) => {
    const chatId = msg.chat.id;
    // Проверка наличия пользовательских данных
    if (users[chatId]) {
        cleanUserData(chatId);
    }
    sendWalletMenu(msg.chat.id);
});

bot.onText(/Информация/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Это информационная страница. Обновите ее, добавив свою информацию.');
});

bot.onText(/Trust Wallet/, (msg) => {
    sendScreenshotMenu(msg.chat.id);
});

bot.onText(/Баланс/, (msg) => {
    const chatId = msg.chat.id;
    if (users[chatId]) {
        cleanUserData(chatId);
    }
    bot.sendMessage(
        chatId, 
        'Пожалуйста, введите следующие данные, каждый с новой строки:\n' +
        '1. Время в формате ЧЧ:ММ (24-часовой формат)\n' +
        '2. Ваш общий баланс в долларовом формате со знаком "$". Например: 700,00 $\n' +
        '3. Ваш баланс USDT валюты. Например: 7,7182\n' +
        '4. Ваш сокращённый баланс USDT валюты со знаком "$". Например: 7,71 $\n' +
        'Вот полный пример:\n19:34\n700,00 $\n7,7182\n7,71 $'
    );
    users[chatId].step = 1;
    users[chatId].screenshotType = 'balance';
    // Сохранение обновленных пользовательских данных
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
});


bot.onText(/Перевод средств/, (msg) => {
    const chatId = msg.chat.id;
    if (users[chatId]) {
        cleanUserData(chatId);
    }
    bot.sendMessage(
        chatId, 
        'Пожалуйста, введите следующие данные, каждый с новой строки:\n' +
        '1. Время в формате ЧЧ:ММ (24-часовой формат)\n' +
        '2. Сумма перевода, в USDT. Например: 2345 USDT\n' +
        '3. Приблизительная сумма денег в формате "≈ xxx,xx $". Например: ≈ 2345,00 $\n' +
        '4. Денежная сумма со знаком "-", за которым следует " USDT". Например: +2345,00 USDT\n' +
        '5. Адрес кошелька отправителя в формате "TDdL9PP...rFsErND"\n' +
        'Вот полный пример:\n19:34\n2345 USDT\n≈ 2345,00 $\n+7,7182 USDT\nTDdL9PP...rFsErND'
    );
    users[chatId].step = 1;
    users[chatId].screenshotType = 'transfer-of-funds';
    // Сохранение обновленных пользовательских данных
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
});


bot.onText(/Запрос комиссии/, (msg) => {
    const chatId = msg.chat.id;
    if (users[chatId]) {
        cleanUserData(chatId);
    }
    bot.sendMessage(
        chatId, 
        'Пожалуйста, введите следующие данные, каждый с новой строки:\n' +
        '1. Время в формате ЧЧ:ММ (24-часовой формат)\n' +
        '2. Денежная сумма со знаком "-", за которым следует " USDT". Например: -2345,00 USDT\n' +
        '3. Приблизительная сумма денег в формате "≈ xxx,xx $". Например: ≈ 2345,00 $\n' +
        '4. Адрес кошелька отправителя в формате "(TDdL9PP...rFsErND)"\n' +
        '5. Адрес кошелька получателя в формате "TDdL9PP...rFsErND"\n' +
        '6. Сетевая комиссия в формате "xxx,xxxx TRX (x,xx $)". Например: 27,7416 TRX (2,26 $)\n' +
        '7. Максимальная общая сумма в формате "x,xx $". Например: 9,26 $\n' +
        'Вот полный пример:\n' +
        '19:34\n' +
        '-2345,00 USDT\n' +
        '≈ 2345,00 $\n' +
        '(TDdL9PP...rFsErND)\n' +
        'TDdL9PP...rFsErND\n' +
        '27,7416 TRX (2,26 $)\n' +
        '9,26 $'
    );
    users[chatId].step = 1;
    users[chatId].screenshotType = 'commission-request';
    // Сохранение обновленных пользовательских данных
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
});


bot.onText(/Сетевой сбор/, (msg) => {
    const chatId = msg.chat.id;
    if (users[chatId]) {
        cleanUserData(chatId);
    }
    bot.sendMessage(
        chatId, 
        'Введите сумму сетевого сбора в виде числа с окончанием на f. Например:\n225f'
    );
    users[chatId].step = 1;
    users[chatId].screenshotType = 'net-collection';
    // Сохранение обновленных пользовательских данных
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
});

bot.onText(/Назад/, (msg) => {
    const chatId = msg.chat.id;
    // Проверка наличия пользовательских данных
    if (users[chatId]) {
        cleanUserData(chatId);
    }
    sendMainMenu(chatId);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if (!users[chatId]) {
        // Данный пользователь не зарегистрирован, проигнорируйте сообщение
        return;
    }

    const user = users[chatId];
    
    if (msg.text.trim() === 'Назад') {
        return;
    }

    if (user.step === 1) {
        const inputs = msg.text.split('\n');
        const config = screenshotConfigs[user.screenshotType];
        if (inputs.length !== config.inputs.length) {
            bot.sendMessage(chatId, 'Неверный ввод. Пожалуйста, введите правильное количество строк.');
            return;
        }

        for (let i = 0; i < inputs.length; i++) {
            const inputConfig = config.inputs[i];
            const input = inputs[i].trim();
            if (!inputConfig.validation.test(input)) {
                bot.sendMessage(chatId, inputConfig.errorMessage);
                return;
            }

            const inputName = inputConfig.name;
            user[inputName] = input;
        }

        user.step++;
        const username = msg.from.username || 'user-' + chatId;
        generateImage(user, chatId, username);
        cleanUserData(chatId);
    }

    try {
        fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
    } catch (err) {
        console.error(err);
        bot.sendMessage(chatId, "При сохранении пользовательских данных произошла ошибка.");
    }
});

function generateImage(user, chatId, username) {

    const config = screenshotConfigs[user.screenshotType];
    if (!config || !config.inputs) {
        console.log("Неверный тип снимка экрана или отсутствие входных данных: ", user.screenshotType);
        return;
    }

    loadImage(config.image)
        .then(image => {
            try {
                const canvas = createCanvas(image.width, image.height);
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0);

                for (const inputConfig of config.inputs) {
                    let userInput = user[inputConfig.name];
                    if (userInput === undefined) {
                        console.log(`Отсутствие пользовательского ввода для ${inputConfig.name}`);
                        return;
                    }

                    let adjustedX = inputConfig.x;

                    if (['money', 'additionalMoney', 'moneyUSDT', 'moneyUSDTbelow', 'moneyDollar', `approxMoney`, `collection`, 'maxTotal'].includes(inputConfig.name)) {
                        // Мы извлечем числовую часть, любой префикс перед ней и любой суффикс после нее.
                        const numericPart = userInput.replace(/[^0-9.,]/g, ''); 
                        const prefix = userInput.match(/^[^\d.,]*/)[0];
                        const suffix = userInput.match(/[^\d.,]*$/)[0];
                    
                        // Убрать запятые или точки для вычисления величины
                        const numericPartNoCommasDots = numericPart.replace(/[.,]/g, '.');
                    
                        let magnitude = 0;
                        if(parseFloat(numericPartNoCommasDots) != 0) {
                            magnitude = Math.floor(Math.log10(Math.abs(parseFloat(numericPartNoCommasDots))));
                        }
                        let shift = inputConfig.shift || 15;  // Изменение этого значения позволяет увеличить или уменьшить величину сдвига по умолчанию.
                        adjustedX -= magnitude * shift;
                    
                        // Теперь соберем строку с префиксом, числовой частью и суффиксом в таком порядке.
                        userInput = prefix + numericPart + suffix;
                    } else if (inputConfig.name === 'networkFee') {
                        // networkFee has two numbers and additional symbols, so we handle it separately
                        const matches = userInput.match(/(\d+([.,]\d+)?) TRX \((\d+([.,]\d+)?)/);
                        if (matches) {
                            const trx = matches[1];
                            const dollar = matches[3];
                    
                            // calculate the magnitude of TRX
                            const magnitudeTrx = Math.floor(Math.log10(Math.abs(parseFloat(trx.replace(/[.,]/g, '.')))));
                            const shiftTrx = 1;  // adjust this value as needed
                    
                            // calculate the magnitude of dollar
                            const magnitudeDollar = Math.floor(Math.log10(Math.abs(parseFloat(dollar.replace(/[.,]/g, '.')))));
                            const shiftDollar = 15;  // adjust this value as needed
                    
                            // adjust the x position for TRX and dollar separately
                            const adjustedXTrx = adjustedX - magnitudeTrx * shiftTrx;
                            const adjustedXDollar = adjustedX - magnitudeDollar * shiftDollar;
                    
                            // reconstruct the userInput with adjusted x positions
                            const parts = userInput.split(' ');
                            ctx.font = `${inputConfig.fontSize}px "${inputConfig.fontStyle}"`;
                            ctx.fillStyle = inputConfig.fontColor;
                            for (const part of parts) {
                                if (part === trx) {
                                    ctx.fillText(part, adjustedXTrx, inputConfig.y);
                                } else if (part === dollar) {
                                    ctx.fillText(part, adjustedXDollar, inputConfig.y);
                                } else {
                                    ctx.fillText(part, adjustedX, inputConfig.y);
                                }
                                adjustedX += ctx.measureText(part + ' ').width;
                            }
                            continue;
                        } 
                    }     
                    ctx.font = `${inputConfig.fontSize}px "${inputConfig.fontStyle}"`;
                    ctx.fillStyle = inputConfig.fontColor;
                    ctx.fillText(userInput, adjustedX, inputConfig.y);                                                        
                }
                const dirPath = path.join(__dirname, 'images', username);
                const filename = `new-${config.image}`;
                const filePath = path.join(dirPath, filename);

                fs.mkdirSync(dirPath, { recursive: true });

                const out = fs.createWriteStream(filePath);
                const stream = canvas.createPNGStream();
                stream.pipe(out);
                out.on('finish', () => {
                    bot.sendPhoto(chatId, filePath);
                    sendMainMenu(chatId);
                });
            } catch (error) {
                console.error(error);
                bot.sendMessage(chatId, 'Извините, что-то пошло не так при обработке вашего изображения.');
            }
        })
        .catch(err => {
            bot.sendMessage(chatId, 'Извините, что-то пошло не так.');
            console.error(err);
        });
}

function cleanUserData(chatId) {
    let user = users[chatId];
    users[chatId] = {
        'id': user.id,
        'registrationDate': user.registrationDate,
        'step': 0
    };
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
}


function sendMainMenu(chatId) {
    const options = {
        reply_markup: {
            keyboard: [
                ['Профиль'],
                ['Генерировать скриншот'],
                ['Информация'],
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    };
    bot.sendMessage(chatId, 'Пожалуйста, выберите опцию:', options);
}

function sendWalletMenu(chatId) {
    const options = {
        reply_markup: {
            keyboard: [
                ['Trust Wallet'],
                ['Назад'],
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    };
    bot.sendMessage(chatId, 'Выберите кошелек:', options);
}

function sendScreenshotMenu(chatId) {
    const options = {
        reply_markup: {
            keyboard: [
                ['Баланс', 'Перевод средств'],
                ['Сетевой сбор', 'Запрос комиссии'],
                ['Назад'],
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    };
    bot.sendMessage(chatId, 'Выберите тип скриншота:', options);
}


