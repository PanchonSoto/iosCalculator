import { useRef, useState } from "react";


enum Operator {
    add,
    subtract,
    multiply,
    divide
}

export const useCalculator = () => {

    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');

    const lastOperation = useRef<Operator>();

    const clean = () => {
        setNumber('0');
        setPrevNumber('0');
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
        const num1 = Number(number);
        const num2 = Number(prevNumber);

        switch (lastOperation.current) {
            case Operator.add:
                setNumber(`${num1+num2}`);
            break;

            case Operator.subtract:
                setNumber(`${num2-num1}`);
            break;

            case Operator.multiply:
                setNumber(`${num1*num2}`);
            break;

            case Operator.add:
                setNumber(`${num2/num1}`);
            break;
        
            default:
            throw new Error('Operation not implemented'); 
        }

        setPrevNumber('0');
    }



    return {
        //Props
        number,
        prevNumber,

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
