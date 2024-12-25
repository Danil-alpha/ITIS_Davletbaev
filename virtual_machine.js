const fs = require('fs');		//синтаксис регулярных выржаений
const readlineSync = require('readline-sync');		//переменная с помощью, которой мы сможем взаимодействовать с библиотеко


let mem = new Array();		//массив, в которую будем вносить данные из файла first.jpp(memory)

const prog = fs.readFileSync('./first.jpp',
	{encoding: 'utf8', flag: 'r'});	//чтение файла first.jpp с указанными опциями (как текст с кодировкой UTF-8 и в режиме чтения) и сохраняем это содержимое в переменной prog
	
mem = prog.split(/ |\r\n/); //разделяем строку prog по пробелам или переводам строки
ip = 0;	//счетчик отвечающий за индекс использования элементов из mem

 while (mem[ip] != 'exit'){		//если mem[ip] != 'exit', то код завершен(то есть выполнение прекращается)
	//console.log(mem)
	switch (mem[ip]){
		case 'jin': // jin arg1 - аналог cin или input
			in_num = readlineSync.question("input a number: ");
			mem[mem[ip + 1]] = parseInt(in_num);
			ip += 2
			break;
		case 'jout': // jout arg1 - аналог cout или console.log
			console.log('answer:\f',mem[mem[ip+1]]);
			ip += 2;
			break;
		case 'set': //set arg1 arg2 - по адресу arg1 сохраняем целочисленное значение arg2
			mem[mem[ip+1]] = parseInt(mem[ip+2]);
			ip += 3;
			break;
		case 'mov':	// mov arg1 arg2 - значение arg2 скопировать в arg1
			mem[mem[ip+1]] = mem[mem[ip+2]];
			ip += 3;
			break;
		case 'add':	//add arg1 arg2 arg3 - mem[arg3] = mem[arg1]+mem[arg2] (сложение)
			mem[mem[ip+3]]=mem[mem[ip+1]]+mem[mem[ip+2]]; 
			ip += 4;
			break; 
		case 'subik':	//subik arg1 arg2 arg3 - mem[arg3] = mem[arg1]*mem[arg2] (умножение)
			mem[mem[ip+3]] = mem[mem[ip+1]] * mem[mem[ip+2]];
			ip += 4;
			break;
		case 'mod':		//mod arg1 arg2 arg3 - mem[arg3] = mem[arg1] % mem[arg2] (остаток от деления)
			mem[mem[ip+3]] = mem[mem[ip+1]] % mem[mem[ip+2]];
			ip += 3;
			break;
		case 'cmpjmp': // cmpj arg1 arg2 arg3 arg4 - if(mem[arg1] < mem[arg2]){ip = parseInt(mem[ip+3])}; else{ip = parseInt(mem[ip+4])}
			if (mem[mem[ip + 1]] < mem[mem[ip + 2]]) {
				// Если значение в arg1 меньше значения в arg2, сместиться на адрес arg3
				ip = parseInt(mem[ip + 3]);
			} 
			else {
				// Иначе прыгнуть на адрес arg4
				ip = parseInt(mem[ip + 4]);
			}
			break;
	}
 }
 //ВЫЗЫВЕМ ТОЛЬКО ФУНКЦИИ!!!!
 

