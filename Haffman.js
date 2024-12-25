let input = "pgsdfkjbslkjdgnlskdjgsnkblibalibara";
let alph = new Object();                        //будет использоваться для хранения информации о символах и их частоте в строке input
let tree = new Array();                         //будет представлять собой дерево Хаффмана, используемое для кодирования и декодирования символов

function Node(name, freq, used, link, code) {           //это параметры конструктора, 
    this.name = name;                                   //имя узла, частоту, флаг использования, ссылку на следующий узел, код Хаффмана
    this.freq = freq;
    this.used = used;
    this.link = link;
    this.code = code;
}

for (let i = 0; i < input.length; i++) {        //начинается цикл for, который проходит по всем символам строки input.
    if (alph[input.charAt(i)]) { 
        alph[input.charAt(i)]++;                //если символ уже есть в объекте alph, то его частота увеличивается на 1
    } else {
        alph[input.charAt(i)] = 1;              //если символа еще нет в объекте alph, то добавляем его, это первая встреча соответственно частота 1
    }
}

let alphPower = 0;                              //мощность алфавита, так как у объекта (alph) нет функции длины

for (let i in alph) {                       // в цикле for  происходит перебор всех символов (ключей) из объекта alph. 
    alphPower++;                            
    let n = new Node(i, alph[i], false, undefined, '');         //итоговое имя, частота, не использовался
    tree.push(n);                                               //для каждого символа создается узел Node, который добавляется в массив tree
} 

function MinElementsIndex(){                        //функция, которая находит индекс минимального неиспользованного вхождения
    let minRepit = input.length + 1;                     //минимальное повторение
    let minIndexRepit = -1;                              //индекс минимального повторения
    
    for (let i=0; i<tree.length; i++){
        if (!tree[i].used && tree[i].freq < minRepit){          //проверка на то, что элемент не использовался и частота меньше мин повторения
            minRepit = tree[i].freq;                            //мин повторение становится частотой i-тового
            minIndexRepit = i;                                  //а индекс мин повторения i-товый
        }
    }
    if (minIndexRepit!=-1){
        tree[minIndexRepit].used=true;          //использовался и больше смотреть его не будем
    }
    return minIndexRepit;                                       //самое правое вхождение минимального повторения. на каком индексе было последнее минимальное повторение    
}

for (let i=0; i<tree.length; i++){                      //берем два минимальных индекса вхождений
    let one=MinElementsIndex();                         //самый маленький из всех, где false на этом шаге
    let two=MinElementsIndex();                         //второй самый маленький на этом же шаге (one<=two)
    
    if (one!=-1 && two!=-1){
        tree[one].code='1';                             //смена мест 0 и 1 ничего не меняет, всё равно кодируется одинаковым числом бит
        tree[two].code='0'; 
        tree[one].link=tree.length;                     //ссылка на дочернюю подстроку
        tree[two].link=tree.length;

        let n = new Node(
            tree[one].name + tree[two].name,            //складываются строки имена
            tree[one].freq + tree[two].freq,            //складываются частоты
            false,                                  //так как новая ячейка родитлея ещё не использовалась флаг ложь
            undefined,                              
            ''
        );
        tree.push(n);                               //добавляем в дерево
    }
    else{
        break;
    }    
}

let codedAlph = new Object();                       //будет содержать закодированные символы.

//рекурсивная функция для формирования кодовой строки для символа
function recursion(ref){                //сейчас ref то что для одного ссылка для второго индекс
    if (tree[ref].link == undefined){
        return '';
    }

    return recursion(tree[ref].link) + tree[ref].code;
}
if (alphPower == 1){
    codedAlph[tree[0].name] = '0';
}
else{
for (let i=0; i<alphPower; i++){                    //Цикл, который применяет функцию recursion к каждому символу из алфавита и создает закодированные значения для каждого символа.
    codedAlph[tree[i].name]=recursion(i);
}
}
//создание строки с алфавитом в виде нулей и единиц, построенных в codedAlph
function encodeString(input, codedAlph) {
    let encodedString = "";
    for (let i = 0; i < input.length; i++) {
        let symbol = input.charAt(i);
        encodedString += codedAlph[symbol];
    }
    return encodedString;
}

console.log(codedAlph); //закодированные значения всех символов алфавита

let encodedString = encodeString(input, codedAlph);     //формирование и вывод строки с использованием закодированными символами
console.log("Encoded String:", encodedString);
//функция декодинга строки
function decodeString(encodedString, codedAlph) {
    let decodedString = "";     //строка в которую будем записывать декодированную версию строки
    let currentCode = "";       //строка для сравнения элемента в битовом представлении и 
    
    for (let i = 0; i < encodedString.length; i++) {
        currentCode += encodedString[i];
        
        for (let symbol in codedAlph) {
            if (codedAlph[symbol] === currentCode) {
                decodedString += symbol;    //добавление буквы соответствующему битовому представлению
                currentCode = "";       //сброс элемента при совпадении
                break;
            }
        }
    }
    return decodedString;   
}

let decodedStringWithAlphabet = decodeString(encodedString, codedAlph); //вызов функции декодинга
console.log(decodedStringWithAlphabet);


