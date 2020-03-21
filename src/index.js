function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/(\d+)/g, '$1 '); //add space after number
    expr = expr.replace(/(\D+?)/g, '$& '); //add space after NaN
    expr = expr.replace(/\s+/g, " "); //remove extra spaces
    expr = expr.trim();
    let arr = expr.split(' ');
    let openBracketsCounter = 0;
    let closingBracketsCounter = 0;
    let stack = [];
    let operations = [];
    let lowPriority = ['-', '+'];
    let highPriority = ['/', '*'];

    arr.forEach(item => {
        if(isNaN(item)== false){
            stack.push(parseInt(item));
        } 
        if(item=="(" ){
            openBracketsCounter++;
            operations.push(item);
        }
        if(item==")" ){
            closingBracketsCounter++;
            operations.push(item);

        }
        if(operations.includes('(') && operations.includes(')')){
            let insideBrackets = operations.slice(operations.lastIndexOf('(')+1, operations.lastIndexOf(')')).reverse();
            stack = stack.concat(insideBrackets);
            operations.splice(operations.lastIndexOf('('), operations.lastIndexOf(')')+1);
        }

        if(lowPriority.includes(item)){
            while(lowPriority.includes(operations[operations.length-1]) || highPriority.includes(operations[operations.length-1])) {
                stack.push(operations[operations.length-1]);
                operations.pop();

            }
        }

        if(highPriority.includes(item)){
            while(highPriority.includes(operations[operations.length-1])) {
                stack.push(operations[operations.length-1]);
                operations.pop();
            }
        }

        if(lowPriority.includes(item) || highPriority.includes(item)){
            operations.push(item);
        }
        

    });
    let polishNotation = stack.concat(operations.reverse());
    if(openBracketsCounter !== closingBracketsCounter){
        throw new Error ('ExpressionError: Brackets must be paired')
    }
    if(polishNotation.includes(0) && polishNotation[polishNotation.indexOf(0)+1] =='/'){
        throw new Error ('TypeError: Division by zero.')
    }
    let result = [];
    polishNotation.forEach(element=>{
        if(isNaN(element)===false){
            result.push(element);
        }
        if(element=='*'){
            result.push(result[result.length-2] * result[result.length-1]);
            result.splice(-3, 2); 
        }
        if(element=='/'){
            result.push(result[result.length-2] / result[result.length-1]);
            result.splice(-3, 2); 
        }
        if(element=='+'){
            result.push(result[result.length-2] + result[result.length-1]);
            result.splice(-3, 2); 
        }
        if(element=='-'){
            result.push(result[result.length-2] - result[result.length-1]);
            result.splice(-3, 2); 
        }

    })
        return result[0];
    }


module.exports = {
    expressionCalculator
}