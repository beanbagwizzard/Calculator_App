//Dependencies: This script requires the library: 'mathjs.' in order to function correctly.  

// GLOBAL VARIABLES
// mostly for checking if input matches one of these if necessary
const operatorsArray = ['+', `-`, `*`, `/`];
const decimal = '.';
const percent = '%';



//  ---------------------------   DISPLAY  --------------------------- 
let topDisplay = document.getElementById("displayTopBox");
let bottomDisplay = document.getElementById("displayBottomBox");

topDisplay.value = ' ';
bottomDisplay.value = '';

let lastWasOperator = false;
let workingMath = '';
let lastEntryBottom = bottomDisplay.value[bottomDisplay.value.length - 1];
let lastEntryTop = topDisplay.value[topDisplay.value.length - 1];

/* 
The 'bottomDisplay' stores the  bottom display of the calculator. The 'value' of this will be constantly updated based on user input and appropriately displayed. 
The  'topDisplay' stores the top display of the calculator.  It is designed to show the entire calcualtion the user has been enetering. 
The 'value' of topDisplay only updates upon the user pressing a math operator button or other relevant symbol button. 
Upon the equals button being pressed the last of the bottomDisplay values will be concatonated onto the topDisplay value. 
Then the entire topDisplay value (string) will be evaluated with 'math.evaluate()' and the returned result assigned appropriately  to the 'bottomDisplay'.value. topDisplay.value will also be cleared at this time.  
*/


// ---------------------------   APPENDING FUNCTIONS ---------------------------- 

// 1. Appends NUMBERS
function appendNumToDisplay(inputStr) {
    let lastEntryTop = topDisplay.value[topDisplay.value.length - 1];

    if (operatorsArray.includes(lastEntryTop) && lastWasOperator === true) {
        clearBottom();
        bottomDisplay.value += inputStr;
        lastWasOperator = false;
        workingMath += inputStr;
        console.log(workingMath);
    } else {
        bottomDisplay.value += inputStr;  //appends number pressed to bottomDisplay
        workingMath += inputStr;
        console.log(workingMath);

    }
/* 
This just appends the value of the button pushed to the 'bottomDisplay'.
Note: we have seperate function to use for button presses of operators, symbols etc. (Please see urther down in script).  
*/
}


// 2. Condtionally adds operators or a decimal to the bottomDisplay (if appropriate). If inputing a valid standard operator rather than a decimal will also call function 'addToTopDisplay'. 
// APPENDS OPERATORS
function appendOperator(inputStr) {


    if (operatorsArray.includes(lastEntryTop)) {
        topDisplay.value[topDisplay.value.length - 1] = inputStr; 
        console.log('error is here')
        // if user repeats operator. just changes to most recent input operator
    } else {
        
        topDisplay.value = bottomDisplay.value; //top equals bottom
        topDisplay.value = math.evaluate(workingMath);
        bottomDisplay.value = topDisplay.value;
        topDisplay.value += inputStr;  //adds operator to end
        lastWasOperator = true; //this is for keeping track. ignore
        workingMath += inputStr; // adds to the math staging ground
        console.log(workingMath); // so i can see it

        //appends topDisplay to include new value and operator
    }


}


// 3. Decimals - APPENDS DECIMALS

function appendDecimal(inputStr) {
    if (bottomDisplay.value.includes(decimal)) {
        bottomDisplay.value += ''; //does nothing. no adding multiple decimals.
    } else {
        bottomDisplay.value += inputStr;
        workingMath += inputStr;
        //appends decimal to bottom display and workingMath variable.
    }
}

// -------------------------- CLEARING FUNCTIONS --------------



// 4. Clears the strings held within the values of both displays. - FOR THE CE BUTTON - assigns both strings present within 'bottomDisplay' and 'topDisplay' back to empty. */
function clearDisplays() {
    bottomDisplay.value = "";
    topDisplay.value = "";
    workingMath = '';

};


// 5. Clears bottomDisplay.value only (not affecting topDisplay). - USed within 'addOperator()' function.  */ 
function clearBottom() {
    bottomDisplay.value = "";

};

// 6. Clears the top
function clearTop(){
    topDisplay.value = "";
}


// 7. Clears the Prior Entry
function clearPriorEntry() {
    let displayString = bottomDisplay.value.split('');
    displayString.pop();
    bottomDisplay.value = displayString.join('');

    let workingMathString = workingMath.split('');
    workingMathString.pop();
    workingMath = workingMathString.join('');
}

// -------------------------- DOES MATHS --------------


// 8. EqualsResult  -  This function does all the heavy lifting. Anything that is placed into mathjs's  'math.evaluate()' is calculated - PEMDAS rules applied. */
function equalsResult() {
    topDisplay.value += bottomDisplay.value;
    try {
        bottomDisplay.value = math.evaluate(topDisplay.value); 
        workingMath = '';// does the MATH!
    } catch(error){
        bottomDisplay.value = "Error";
    }
    
}
