let fs = require('fs');									//Подключение модуля fs для работы с файлами

let inText = fs.readFileSync('input.txt', 'utf8');		//Записываем текст файла в переменную inText
inText = inText.toString(); 							//Конверитруем переменную в тип данных string, дабы работать со строкой

let len = inText.length;								//Вычисляем длинну строки с текстом из файла

fs.writeFileSync('code.txt', '');						//Чистка файла, в который мы будем записывать уже закодированный текст из файла input.txt
fs.writeFileSync('decode.txt', '');						//Чистка файла, который мы будем декодировать из текста файла code.txt 

//Кодирование input.txt

for(let i = 0; i < len; i++){							//Цикл, что пройтись по каждому символу строки файла input.txt
    let n = 0; 											//Переменная для подсчёта повторяющихся символов
    while(inText.charAt(i) == inText.charAt(i+n)){		//Цикл для подсчёта повторяющихся символов
        n++;
    }
    i += n-1;											//Элемент под индексом i равен элементу под индексом i+n-1, т. к. под этим индексом стоит последний элемент цепочки

    //сжатие строки файла
    if(n > 2){ 											//Осмысливаем сжатие (мы должны максимально выгодно сжать строку, то есть нет смысла меня 1 или 2 элемента на 3) 
        while(n >= 255){								//Проверка на сжатие не больше чем 255, так как на один чаровский символ приходится 8 байт
            fs.appendFileSync('code.txt', "#"+ String.fromCharCode(255) + inText.charAt(i));	//добавляем сжатые повторы в code.txt
            n = n - 255;								//если n повторов больше чем 255, то мы вычитаем 255 уже закодированных символов
        }
		
        fs.appendFileSync('code.txt', "#" + String.fromCharCode(n)); 	//добавляем в файл, оставшиеся символы в закодированном виде, то есть если 2<n<255
    }

    //случай, если два повтора
    if(n == 2){
        fs.appendFileSync('code.txt', inText.charAt(i));	//дублируем символ
    }
    fs.appendFileSync('code.txt', inText.charAt(i));		//добавляем символ, если он не повторяется
}

//Декдирование code.txt

let inCodeText = fs.readFileSync('code.txt', 'utf8');	//Записываем текст файла в переменную inCodeText
inCodeText = inCodeText.toString();						//Конверитруем переменную в тип данных string, дабы работать со строкой

len = inCodeText.length;								//Вычисляем длинну строки с текстом из файла

for(let i = 0; i < len; i++){							//Цикл, что пройтись по каждому символу строки файла code.txt
    if(inCodeText.charAt(i) == '#'){ 					//Условие, если мы находим #, то начинаем декодировку
        let repeat = inCodeText.charCodeAt(i + 1); 		//После # идёт число повторов в ASCII и в данную переменную мы записываем количество повторов символа
        for (let j = 0; j < repeat; j++){				//Цикл, чтобы добавить символ столько раз, сколько было указано в i + 1
            fs.appendFileSync('decode.txt', inCodeText.charAt(i + 2))	//добавляем символ i + 2, то есть тот, который должен повторятся
        }
        i += 2;											//К i добавляем 2, чтобы пойти дальше по строке 
    }
    else{														//В случае отсутствия случа декодировки просто записываем символ
        fs.appendFileSync('decode.txt', inCodeText.charAt(i))
	}
}

let inDecodeText = fs.readFileSync('decode.txt', 'utf8');
inDecodeText = inDecodeText.toString();

let CfSzh = fs.statSync('input.txt').size / fs.statSync('code.txt').size;				//Считаем коэффициент сжатия

if (inDecodeText === inText) {							//Проверка на работу RLE и вывод коэффициента сжатия
    console.log("RLE is working");
	console.log("Сompression ratio = ", CfSzh);
}
else {
    console.log("RLE is not working");
	
}