import { useEffect, useRef, useState } from "react";


enum Operator {
    add='+',
    subtract='-',
    multiply='x',
    divide='÷'
}

export const useCalculator = () => {

    const [formula, setFormula] = useState('');

    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');

    const lastOperation = useRef<Operator>();

    useEffect(() => {
        if(lastOperation.current){
            const firstFormulaPart = formula.split(' ').at(0);
            setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);

        } else {
            setFormula(number);
        }

    }, [number]);
    
    useEffect(() => {
        const subRes = calculateSubRes();
        setPrevNumber(`${subRes}`);
    }, [formula]);
    

    const clean = () => {
        setNumber('0');
        setPrevNumber('0');
        lastOperation.current = undefined;
        setFormula('0');
    }

    const deleteOperation = () => {
        const newNumber = number.slice(0, -1); // Elimina el último carácter
    
        // Verifica si la cadena resultante está vacía
        if (newNumber === '' || newNumber==='-') {
            return setNumber('0'); // Si está vacía, establece la cadena en "0"
        } else {
            return setNumber(newNumber); // Si no está vacía, establece la cadena resultante
        }
    }

    const toggleSign = () => {
        if(number.includes('-')) {
            return setNumber(number.replace('-',''));
        }
        setNumber('-'+number);
    }
  
    const buildNumber = (numberString: string) => {

        if(number.includes('.') && numberString==='.') return;
        if(number.startsWith('0') || number.startsWith('-0')) {
            //decimal dot
            if(numberString==='.') {
                return setNumber(number+numberString);
            }
            //evaluate if another 0 and there is not dot
            if(numberString==='0' && number.includes('.')) {
                return setNumber(number+numberString);
            }
            //evaluate if a number is not a 0, there is not a dot, and is the first number
            if(numberString!=='0' && !number.includes('.')) {
                return setNumber(numberString);
            }
            //prevent touch multiples 0 before a dot
            if(numberString==='0' && !number.includes('.')) {
                return;
            }

            return setNumber(number+numberString);
        }

        setNumber(number+numberString);
    }

    const setLastNumber = () => {
        calculateResult();
        if(number.endsWith('.')) {
            setPrevNumber(number.slice(0, -1));
        } else {
            setPrevNumber(number);
        }
        setNumber('0');
    }

    const divideOp = () => {
        setLastNumber();
        lastOperation.current = Operator.divide;
    }
    const multiplyOp = () => {
        setLastNumber();
        lastOperation.current = Operator.multiply;
    }
    const subtractOp = () => {
        setLastNumber();
        lastOperation.current = Operator.subtract;
    }
    const addOp = () => {
        setLastNumber();
        lastOperation.current = Operator.add;
    }

    const calculateResult = () => {
        
        const result = calculateSubRes();
        setFormula(`${result}`);

        lastOperation.current = undefined;
        setPrevNumber('0');
    }

    const calculateSubRes = ():number=> {

        const [firstValue, operation, secondValue] = formula.split(' ');

        const num1 = Number(firstValue);
        const num2 = Number(secondValue);

        if(isNaN(num2)) return num1;

        switch (lastOperation.current) {
            case Operator.add:
                return num1+num2;

            case Operator.subtract:
                return num1-num2;

            case Operator.multiply:
                return num1*num2;

            case Operator.add:
                return num1/num2;
        
            default:
            throw new Error('Operation not implemented'); 
        }
    }



    return {
        //Props
        number,
        prevNumber,
        formula,

        //Methods
        buildNumber,
        toggleSign,
        clean,
        deleteOperation,
        divideOp,
        multiplyOp,
        subtractOp,
        addOp,
        calculateResult
    }

}
