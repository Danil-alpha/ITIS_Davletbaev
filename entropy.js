let input = 'abrakadabra';      //исходная строка

let alph = new Object();        //объект алфавит, в котором будет хранится символ и количество его повторений

let inLength = input.length;    //длинна исходной строки

for (let i = 0; i < inLength; i++) {    //цикл для подсчета повторений каждого символа и внесение данных в объект алфавита
  if (alph[input.charAt(i)]) {
    alph[input.charAt(i)]++;
  } else {
    alph[input.charAt(i)] = 1;
  }
}


let alphPower = 0;        //мощность алфавита(количество уникальных символов)

for (let i in alph) {
  alphPower++;
  alph[i] /= inLength;    //подсчёт вероятности появления символа
}

let entropy = 0;  //переменная энтропия

if (alphPower > 1) {    //подсчет энтропии, отталкиваясь от формулы Шенона
  for (let i in alph) {
    entropy -= alph[i] * Math.log(alph[i]);           //вычисляем частичную энтропию для каждого символа и вычитаем ее из общей энтропии.
  }
  entropy /= Math.log(alphPower);                 //делим получившуюся энтропию на логарифм от числа уникальных символов, дабы получить финальное значение энтропии
}

console.log("The entropy is equal:", entropy);     //выводим значение энтропии