class Stack { 

    constructor() 
    { 
        this.items = []; 
    } 
    push(element) 
    { 
        this.items.push(element); 
    } 
    pop() 
    { 
        if (this.items.length == 0) 
            return "Underflow"; 
        return this.items.pop(); 
    } 
    get()
    {
        return this.items[this.items.length - 1]; 
    }
    isEmpty() 
    { 
        return this.items.length == 0; 
    } 
} 

function reverseString(str) {
    return str.split("").reverse().join("");
}

function calculate(exp){
    return calculatePostfix(infixToPostfix(exp));
}

function isOperator(ch){
    return (ch == '+' || ch == '-' || ch == '*' || ch == '/');
}

function operation(a, b, op){
    return (op == '+' ? a + b : (op == '-') ? a - b : (op == '/') ? a / b : a * b);
}

function charToNum(ch){
    return (ch - '0');
}

function calculatePostfix(exp) {
    let a, b;
    let stack = new Stack();
    let arr = [];
    while(!exp.isEmpty()){
        arr.push(exp.pop());
    }
    console.log(arr);
    for (let i = arr.length - 1; i >= 0; i--) {
        if (isOperator(arr[i])){
            a = stack.pop();
            b = stack.pop();
            stack.push(operation(b, a, arr[i]));
        }else{
            stack.push(charToNum(arr[i]));
        }
    }
    return stack.pop();
}

let infixToPostfix = function(exp){
    let expressionString = new Stack();
    let operatorStack = new Stack();
    let flag = false;
    for (let i = 0; i < exp.length; i++){
        if (exp[i] == '(' || exp[i] == '+' || exp[i] == '-' || exp[i] == '*' || exp[i] == '/'){
            operatorStack.push(exp[i]);
            if (exp[i] == '*' || exp[i] == '/'){
                flag = true;
            }
        }else if (exp[i] == ')'){
            while (!operatorStack.isEmpty()){
                let s = operatorStack.get();
                operatorStack.pop();
                if (s != '(')
                    expressionString.push(s);
                else break;
            }
        }else{
            let Num = 0;
            let ok = false;
            while (i < exp.length && !isOperator(exp[i]) && exp[i] != '(' && exp[i] != ')'){
                ok = true;
                Num = Num * 10 + charToNum(exp[i]);
                i++;
            }
            console.log(Num);
            if (ok)
                expressionString.push(Num);
            if (flag == true){
                if (operatorStack.get() != '('){
                    expressionString.push(operatorStack.get());
                    operatorStack.pop();
                }
                flag = false;
            }
            if (ok) i--;
        }
    }
    while (!operatorStack.isEmpty()){
        let s = operatorStack.get();
        operatorStack.pop();
        if (s != '(')
            expressionString.push(s);
        else break;
    }
    return expressionString;
}


function calc() {
    let expression = document.getElementById('expression').value;
    let res = calculate(expression);
    let html = 'The result is <b>' + res + '</b> ';
 
    document.getElementById('result').innerHTML = html;
}





