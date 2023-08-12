module.exports = {
    'balance': {
        image: 'balance.jpg',
        inputs: [            
            {
                name: 'time',
                x: 25,
                y: 44,
                fontSize: 24,
                fontColor: 'black',
                fontStyle: 'Nicolo',
                validation: /^\d{2}:\d{2}$/,
                errorMessage: 'Неверное время. Пожалуйста, введите время в формате ЧЧ:ММ (24-часовой формат).'
            },
            {
                name: 'moneyDollar',
                x: 225,
                y: 180,
                fontSize: 50,
                fontColor: 'black',
                fontStyle: 'Nicolo',
                validation: /^\d+([.,]\d{2})?\s\$$/,
                errorMessage: 'Неверная сумма. Пожалуйста, введите правильное число, заканчивающееся на "$", с пробелом.',
                decimalSeparator: ','
            },
            {
                name: 'moneyUSDT',
                x: 495,
                y: 530,
                fontSize: 23,
                fontColor: 'black',
                fontStyle: 'Nicolo-Regular',
                validation: /^\d+([.,]\d{1,4})?$/,
                errorMessage: 'Неверная сумма. Пожалуйста, введите правильное число.',
                decimalSeparator: ','
            },
            {
                name: 'moneyUSDTbelow',
                x: 515,
                y: 557,
                fontSize: 18,
                fontColor: '#959595',
                fontStyle: 'Nicolo-Regular',
                validation: /^\d+([.,]\d{2})?\s\$$/,
                errorMessage: 'Неверная сумма. Пожалуйста, введите правильное число, заканчивающееся на "$", с пробелом.',
                decimalSeparator: ','
            }  
        ]
    },    
    'transfer-of-funds': {
        image: 'transfer-of-funds.jpg',
        inputs: [
            {
                name: 'time',
                x: 25,
                y: 44,
                fontSize: 24,
                fontColor: 'black',
                fontStyle: 'Nicolo',
                validation: /^\d{2}:\d{2}$/,
                errorMessage: 'Неверное время. Пожалуйста, введите время в формате ЧЧ:ММ (24-часовой формат).'
            },
            {
                name: 'money',
                x: 220,
                y: 345,
                fontSize: 45,
                fontColor: 'black',
                fontStyle: 'Nicolo',
                validation: /^\d+([.,]\d{2})? USDT$/,
                errorMessage: 'Неверная сумма. Пожалуйста, введите действительное число, за которым следует " USDT".',
                decimalSeparator: ','
            },
            {
                name: 'approxMoney',
                x: 248,
                y: 383,
                fontSize: 24, 
                fontColor: 'grey', 
                fontStyle: 'Sans',
                validation: /^≈ \d+(,\d{2})? \$$/,
                errorMessage: 'Неверная сумма. Пожалуйста, введите действительное число в формате "≈ xxx,xx $".',
                decimalSeparator: ','
            },
            {
                name: 'additionalMoney',
                x: 417,
                y: 697,
                fontSize: 23,
                fontColor: '#60af76',
                fontStyle: 'Nicolo',
                validation: /^\+\s*\d+([.,]\d{1,4})?\s*USDT$/,
                eerrorMessage: 'Неверная сумма. Пожалуйста, введите действительное число со знаком "+" и последующим символом " USDT".',
                decimalSeparator: ','
            },
            {
                name: 'fromWallet',
                x: 140,
                y: 716,
                fontSize: 18, 
                fontColor: '#959595', 
                fontStyle: 'Nicolo',
                validation: /^[a-zA-Z0-9]{7}[.]{3}[a-zA-Z0-9]{7}$/,
                errorMessage: 'Неверный адрес кошелька. Пожалуйста, введите действительный адрес кошелька.',
            },           
        ]
    },
    'net-collection': {
        image: 'net-collection.jpg',
        inputs: [
            {
                name: 'collection',
                x: 157,
                y: 584,
                fontSize: 26,
                fontColor: '#959595',
                fontStyle: 'Nicolo-Regular',
                validation: /^\d+([.,]\d{2})?f$/,
                errorMessage: 'Неверная сумма. Пожалуйста, введите действительное число, за которым следует "f"',
                decimalSeparator: ','
            }
        ]
    },    
    'commission-request': {
        image: 'commission-request.jpg',
        inputs: [
            {
                name: 'time',
                x: 25,
                y: 44,
                fontSize: 24,
                fontColor: 'white',
                fontStyle: 'Nicolo',
                validation: /^\d{2}:\d{2}$/,
                errorMessage: 'Неверное время. Пожалуйста, введите время в формате ЧЧ:ММ (24-часовой формат).'
            },
            {
                name: 'money',
                x: 170,
                y: 228,
                fontSize: 60,
                fontColor: 'black',
                fontStyle: 'Nicolo',
                validation: /^\-\s*\d+([.,]\d{2})?\s*USDT$/,
                errorMessage: 'Неверная сумма. Пожалуйста, введите действительное число со знаком "-" и последующим символом " USDT".',
                decimalSeparator: ','
            },
            {
                name: 'approxMoney',
                x: 268, 
                y: 284, 
                fontSize: 30, 
                fontColor: 'grey', 
                fontStyle: 'Sans',
                validation: /^≈ \d+(,\d{2})? \$$/,
                errorMessage: 'Неверная сумма. Пожалуйста, введите действительное число в формате "≈ xxx,xx $".',
                decimalSeparator: ','
            },
            {
                name: 'fromWallet',
                x: 303,
                y: 404,
                fontSize: 23, 
                fontColor: '#959595', 
                fontStyle: 'Nicolo',
                validation: /^\([a-zA-Z0-9]{7}[.]{3}[a-zA-Z0-9]{7}\)$/,
                errorMessage: 'Неверный адрес кошелька. Пожалуйста, введите действительный адрес кошелька.',
            },
            {
                name: 'toWallet',
                x: 317,
                y: 466,
                fontSize: 23, 
                fontColor: '#959595', 
                fontStyle: 'Nicolo',
                validation: /^[a-zA-Z0-9]{7}[.]{3}[a-zA-Z0-9]{7}$/,
                errorMessage: 'Неверный адрес кошелька. Пожалуйста, введите действительный адрес кошелька.',
            },
            {
                name: 'networkFee',
                x: 320, 
                y: 580,
                fontSize: 23,
                fontColor: '#959595',
                fontStyle: 'Nicolo-Regular',
                validation: /^\d+([.,]\d{4})? TRX \(\d+([.,]\d{2})? \$\)$/,
                errorMessage: 'Неверная сумма. Пожалуйста, введите действительное число в формате "xxx,xxxx TRX (x,xx $)".',
                decimalSeparator: ','
            },
            {
                name: 'maxTotal',
                x: 470,
                y: 642,
                fontSize: 23,
                fontColor: 'black',
                fontStyle: 'Nicolo-Regular',
                validation: /^\d+([.,]\d{2})? \$$/,
                errorMessage: 'Неверная сумма. Пожалуйста, введите действительное число в формате "x,xx $".',
                decimalSeparator: ','
            }
        ]
    } 
       
};