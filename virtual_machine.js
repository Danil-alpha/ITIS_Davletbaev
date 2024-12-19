const fs = require('fs');		//синтаксис регулярных выржаений
const readlineSync = require('readline-sync');		//


let mem = new Array();

const prog = fs.readFileSync('./first.jpp',
	{encoding: 'utf8', flag: 'r'});
	
mem = prog.split(/ |\r\n/);
ip = 0;

 while (mem[ip]){
	//console.log(mem)
	switch (mem[ip]){
		case 'jin':
		//console.log("Введите значение");
		in_num = readlineSync.question("input a number: \f");
		mem[mem[ip+1]] = parseInt(in_num);
			ip += 2
			break;
		case 'jout':
			console.log('answer:\f',mem[mem[ip+1]]);
			ip += 2;
			break;
		case 'set':
			mem[mem[ip+1]] = parseInt(mem[ip+2]);
			ip += 3;
			break;
		case 'mov':
			mem[mem[ip+1]] = parseInt(mem[ip+2])
			ip+=3;
			break
		case 'add':
			mem[mem[ip+3]]=mem[mem[ip+1]]+mem[mem[ip+2]]; 
			ip += 4;
			break; 
		case 'subik':
			mem[mem[ip+3]] = mem[mem[ip+1]]*mem[mem[ip+2]];
			ip+=4;
			break;
		case 'mod':
			mem[mem[ip+3]] = mem[mem[ip+1]] % mem[mem[ip+2]];
			ip += 4;
			break;
		case ('cmpjmp'):
			jmp1 = parseInt(mem[mem[ip+1]]);
			jmp2 = parseInt(mem[mem[ip+2]]);
			if (jmp1 < jmp2){
				ip = parseInt(mem[ip+3]);
			}
			else{
				ip = parseInt(mem[ip+4]);
			}
			break;
	}
 }
 
 

