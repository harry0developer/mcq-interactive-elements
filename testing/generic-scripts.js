window.onload = function() {
    var explanation = document.querySelectorAll('.explanation');
    explanation.forEach(exp => {
        exp.style.display = 'none';
    });

    //single questions
    groupCheckboxesQuestions();
    groupRadioQuestions();
    groupSelectQuestions();

    addCheckboxClickEventListener();
    addRadioClickEventListener();
    addSelectClickEventListener();

    //multi questions
    addEventListernerForMultiSetQuestion();
}


var groupedCheckboxes = [];
var checkedCheckboxes;

var groupedRadios = [];
var checkedRadio;

var groupedSelectOptions = [];
var checkedSelect;

var addCheckboxClickEventListener = function() {
    var primaryBtns = document.querySelectorAll('.primary-btn');
    var secondaryBtns = document.querySelectorAll('.secondary-btn');

    primaryBtns.forEach(pb => {
        groupedCheckboxes.forEach(gc => {
            var className = pb.getAttribute('class');
            if (className && className.split(' ')[1] && className.split(' ')[1] === gc[0].getAttribute('class')) {
                pb.addEventListener('click', function(e) {
                    e.preventDefault();
                    validateSingleCheckboxQuestionSet(e);
                })
            }
        });
    });

    secondaryBtns.forEach(sb => {
        groupedCheckboxes.forEach(gc => {
            var className = sb.getAttribute('class');
            if (className && className.split(' ')[1] && className.split(' ')[1] === gc[0].getAttribute('class')) {
                sb.addEventListener('click', function(e) {
                    e.preventDefault();
                    clearSingleQuestionSetCheckbox(e);
                })
            }
        });
    });
}



var addSelectClickEventListener = function() {
    var primaryBtns = document.querySelectorAll('.primary-btn');
    var secondaryBtns = document.querySelectorAll('.secondary-btn');

    primaryBtns.forEach(pb => {
        groupedSelectOptions.forEach(gc => {
            var className = pb.getAttribute('class');
            if (className && className.split(' ')[1] && className.split(' ')[1] === gc[0].getAttribute('class')) {
                pb.addEventListener('click', function(e) {
                    e.preventDefault();
                    validateSingleSelectQuestionSet(e);
                })
            }
        });
    });

    secondaryBtns.forEach(sb => {
        groupedSelectOptions.forEach(gc => {
            var className = sb.getAttribute('class');
            if (className && className.split(' ')[1] && className.split(' ')[1] === gc[0].getAttribute('class')) {
                sb.addEventListener('click', function(e) {
                    e.preventDefault();
                    clearSingleSelectQuestionSet(e);
                })
            }
        });
    });
}

var validateSingleSelectQuestionSet = function(e) {
    var clickedButton = e.target.className;;
    var btnPrimary = document.querySelector(`.${clickedButton.split(" ")[1]}.primary-btn`);

    var parentClass = e.target.className.split(" ")[1];
    var select = document.querySelector(`.${parentClass}`);
    select.setAttribute("disabled", true);
    var i = select.options.selectedIndex;
    var selectedOption = select.options[i];
    var att = selectedOption.getAttribute("data-checked");

    var img = document.createElement('img');
    var b = document.createElement('b');

    var explanation = document.querySelector(`.${clickedButton.split(" ")[1]}.explanation`);
    explanation.style.display = 'block';
    btnPrimary.disabled = true;
    btnPrimary.className += ' primary-btn-disabled';

    if (att == "checked") {
        b.innerHTML = 'Correct. ';
        img.src = "./imgs/correct.png";
        img.className = "status-icon";
        explanation.className += ' correct-explanation';

    } else {
        //incorrect
        b.innerHTML = 'Incorrect. ';
        img.src = "./imgs/incorrect.png";
        img.className = "status-icon";
        explanation.className += ' incorrect-explanation';
    }

    explanation.prepend(b)
    explanation.prepend(img);

}

var clearSingleSelectQuestionSet = function(e) {
    var clickedButton = e.target.className;
    var btnPrimary = document.querySelector(`.${clickedButton.split(" ")[1]}.primary-btn`);
    var explanation = document.querySelector(`.${clickedButton.split(" ")[1]}.explanation`);
    var img = document.querySelector(`.${clickedButton.split(" ")[1]}.explanation img`);
    var b = document.querySelector(`.${clickedButton.split(" ")[1]}.explanation b`);

    var select = document.querySelector(`.${clickedButton.split(" ")[1]}`);
    select.removeAttribute("disabled")

    console.log(select);


    if (explanation) {
        explanation.classList.remove('incorrect-explanation');
        explanation.classList.remove('correct-explanation');
    }
    if (img) {
        img.remove();
    }
    if (b) {
        b.remove();
    }
    explanation.style.display = 'none';
    btnPrimary.classList.remove('primary-btn-disabled');
    btnPrimary.disabled = false;
}


var addRadioClickEventListener = function() {
    var primaryBtns = document.querySelectorAll('.primary-btn');
    var secondaryBtns = document.querySelectorAll('.secondary-btn');


    primaryBtns.forEach(pb => {
        groupedRadios.forEach(gr => {
            var className = pb.getAttribute('class');
            if (className && className.split(' ')[1] && className.split(' ')[1] === gr[0].getAttribute('class')) {
                pb.addEventListener('click', function(e) {
                    e.preventDefault();
                    validateSingleRadioQuestionSet(e);
                })
            }
        });
    });

    secondaryBtns.forEach(sb => {
        groupedRadios.forEach(gr => {
            var className = sb.getAttribute('class');
            if (className && className.split(' ')[1] && className.split(' ')[1] === gr[0].getAttribute('class')) {
                sb.addEventListener('click', function(e) {
                    e.preventDefault();
                    clearSingleQuestionSetRadio(e);
                })
            }
        });
    });
}


var addEventListernerForMultiSetQuestion = function() {
    var primaryBtn = document.querySelector('.multi-primary-btn');
    var secondaryBtns = document.querySelector('.multi-secondary-btn');

    if (primaryBtn) {
        primaryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            validateMultipleQuestionSet();
        });
    }

    if (secondaryBtns) {
        secondaryBtns.addEventListener('click', function(e) {
            e.preventDefault();
            var allInputs = document.querySelectorAll('input');
            primaryBtn.disabled = false;
            primaryBtn.classList.remove('primary-btn-disabled');
            allInputs.forEach(input => {
                input.disabled = false;
                input.checked = false;
                input.parentNode.classList.remove('incorrect-ans');
                input.parentNode.classList.remove('correct-ans');
            })
        })
    }
}


var isCurrentlyChecked = function(checkedNodes, node) {
    var status = false;
    checkedNodes.forEach(c => {
        if (c.isSameNode(node)) {
            status = true;
        }
    });
    return status;
}

var clearSingleQuestionSetRadio = function(e) {
    var clickedButton = e.target.className;;
    var options = document.querySelectorAll(`input.${clickedButton.split(" ")[1]}`);
    var btnPrimary = document.querySelector(`.${clickedButton.split(" ")[1]}.primary-btn`);
    var explanation = document.querySelector(`.${clickedButton.split(" ")[1]}.explanation`);

    explanation.classList.remove('incorrect-explanation');
    explanation.classList.remove('correct-explanation');
    if (document.querySelector(`.explanation img`)) {
        document.querySelector(`.explanation img`).remove();
    }
    if (document.querySelector(`.explanation b`)) {
        document.querySelector(`.explanation b`).remove();
    }

    explanation.style.display = 'none';

    btnPrimary.classList.remove('primary-btn-disabled');
    btnPrimary.disabled = false;

    options.forEach(opt => {
        opt.checked = false;
        opt.disabled = false;
        opt.parentNode.classList.remove('incorrect-ans');
        opt.parentNode.classList.remove('correct-ans');
    });
}


var clearSingleQuestionSetCheckbox = function(e) {
    var clickedButton = e.target.className;;
    var options = document.querySelectorAll(`input.${clickedButton.split(" ")[1]}`);
    var btnPrimary = document.querySelector(`.${clickedButton.split(" ")[1]}.primary-btn`);
    var explanation = document.querySelector(`.${clickedButton.split(" ")[1]}.explanation`);

    explanation.classList.remove('incorrect-explanation');
    explanation.classList.remove('correct-explanation');
    var img = document.querySelectorAll(`.${clickedButton.split(" ")[1]}.explanation img`);
    var b = document.querySelectorAll(`.${clickedButton.split(" ")[1]}.explanation b`);

    img.forEach(i => {
        i.remove();
    });
    b.forEach(bb => {
        bb.remove();
    })

    explanation.style.display = 'none';

    btnPrimary.classList.remove('primary-btn-disabled');
    btnPrimary.disabled = false;

    options.forEach(opt => {
        opt.checked = false;
        opt.disabled = false;
        opt.parentNode.classList.remove('incorrect-ans');
        opt.parentNode.classList.remove('correct-ans');
    });
}


var validateSingleCheckboxQuestionSet = function(e) {
    checkedCheckboxes = document.querySelectorAll('input[type=checkbox]:checked');
    allCheckboxes = document.querySelectorAll('input[type=checkbox]');


    if (checkedCheckboxes.length > 0) {

        var btnClasses = e.target.className;
        var explanation;
        checkboxToValidate = [];
        status = 'correct';
        checkedCheckboxes.forEach(cc => {
            cc.disabled = true;
            if (cc.getAttribute('class') === btnClasses.split(" ")[1].trim()) {
                checkboxToValidate.push(cc);
            }
        });

        checkboxToValidate.forEach(c => {
            var btn = document.querySelector(`button.${c.getAttribute('class')}`);
            btn.disabled = true;
            c.disabled = true;
            btn.className += ' primary-btn-disabled';

            var count = 0;

            explanation = document.querySelector(`.explanation.${c.getAttribute('class')}`);
            explanation.style.display = 'block';

            var allCheckboxIThisGroup = document.querySelectorAll(`input.${c.getAttribute('class')}`);
            allCheckboxIThisGroup.forEach(ac => {
                ac.disabled = true;
                if (ac.getAttribute('data-checked') === "checked") {
                    ac.parentNode.className += ' correct-ans';
                    count++;
                }
            });


            if (checkboxToValidate.length !== count) {
                status = 'incorrect';
            }
            if (c.getAttribute('data-checked') === "checked") {
                c.parentNode.className += ' correct-ans';
            } else {
                c.parentNode.className += ' incorrect-ans';
                status = 'incorrect';
            }
        });

        var img = document.createElement('img');
        var b = document.createElement('b');
        if (status === 'correct') {
            b.innerHTML = 'Correct. ';
            img.src = "./imgs/correct.png";
            img.className = "status-icon";

            explanation.className += ' correct-explanation';

        } else {
            b.innerHTML = 'Incorrect. ';
            img.src = "./imgs/incorrect.png";
            img.className = "status-icon";
            explanation.className += ' incorrect-explanation';
        }
        explanation.prepend(b)
        explanation.prepend(img);
    }
}


var validateSingleRadioQuestionSet = function(e) {
    checkedRadio = document.querySelector(`input[type=radio]:checked.${e.target.className.split(" ")[1]}`);
    var allRadio = document.querySelectorAll(`input[type=radio].${e.target.className.split(" ")[1]}`);


    console.log(checkedRadio, checkedRadio.getAttribute("data-checked"))
    if (checkedRadio != null) {
        var correctRadio;
        allRadio.forEach(ar => {
            if (ar) {
                ar.disabled = true;
                if (ar.getAttribute('data-checked')) {
                    correctRadio = ar;
                }
            }
        });

        e.target.disabled = true;
        e.target.className += ' primary-btn-disabled';
        var status = 'incorrect'

        if (checkedRadio && checkedRadio.getAttribute("data-checked")) {
            correctRadio.parentNode.className += " correct-ans";
            status = 'correct';
        } else {
            checkedRadio.parentNode.className += " incorrect-ans";
            correctRadio.parentNode.className += " correct-ans";
        }

        explanation = document.querySelector(`.explanation.${checkedRadio.getAttribute('class')}`);
        explanation.style.display = 'block';

        var img = document.createElement('img');
        var b = document.createElement('b');
        if (status === 'correct') {
            b.innerHTML = 'Correct. ';
            img.src = "./imgs/correct.png";
            img.className = "status-icon";
            explanation.className += ' correct-explanation';

        } else {
            b.innerHTML = 'Incorrect. ';
            img.src = "./imgs/incorrect.png";
            img.className = "status-icon";
            explanation.className += ' incorrect-explanation';
        }
        explanation.prepend(b)
        explanation.prepend(img);
    }
}



var groupCheckboxesQuestions = function() {
    // 1. select all checked options
    checkedCheckboxes = document.querySelectorAll('input[type=checkbox]:checked');
    // 2. group all options
    for (var i = 0; i < 100; i++) {
        if (document.querySelector(`.checkbox-${i}`)) {
            groupedCheckboxes.push(document.querySelectorAll(`.checkbox-${i}`));
        }
    }
}


var groupRadioQuestions = function() {
    // 2. group all options
    for (var i = 0; i < 100; i++) {
        if (document.querySelector(`input[type="radio"].radio-${i}`)) {
            groupedRadios.push(document.querySelectorAll(`input[type="radio"].radio-${i}`));
        }
    }
}

var groupSelectQuestions = function() {
    // 1. select all select options
    checkedSelect = document.querySelectorAll('select');
    // 2. group all options
    for (var i = 0; i < 100; i++) {
        if (document.querySelector(`.select-${i}`)) {
            groupedSelectOptions.push(document.querySelectorAll(`.select-${i}`));

        }
    }
}

var validateMultipleQuestionSet = function() {
    var countCorrect = 0;

    // 1. select all checked options
    var checkedCheckboxes = document.querySelectorAll('input[type=checkbox]:checked');
    var groupedCheckboxes = [];

    var allRadioButtons = document.querySelectorAll('input[type=radio]');
    var checkedRadioButtons = document.querySelectorAll('input[type=radio]:checked');
    var groupedRadioButtons = [];

    // 2. group all Checkbox options
    for (var i = 0; i < 100; i++) {
        if (document.querySelector(`.checkbox-${i}`)) {
            groupedCheckboxes.push(document.querySelectorAll(`.checkbox-${i}`));
        }
    }

    // 2. group all Radio options
    for (var i = 0; i < allRadioButtons.length; i++) {
        if (document.querySelector(`input.radio-${i}`)) {
            groupedRadioButtons.push(document.querySelectorAll(`input.radio-${i}`));
        }
    }

    var checkedNodes = [];
    var status = 'correct';

    checkedCheckboxes.forEach(c => {
        if (c.getAttribute('data-checked') === "checked") {
            var label = document.querySelector(`label[for=${c.getAttribute('id')}]`);
            label.parentNode.className += ' correct-ans';

        } else {
            var label = document.querySelector(`label[for=${c.getAttribute('id')}]`);
            label.parentNode.className += ' incorrect-ans';
            status = 'incorrect'
        }
    });



    checkedRadioButtons.forEach(cr => {
        if (cr.getAttribute('data-checked') === "checked") {
            cr.parentNode.className += " correct-ans";
            countCorrect++;
        } else {
            cr.parentNode.className += " incorrect-ans";
            var radioClass = cr.getAttribute('class');
            var corr = document.querySelector(`.${radioClass}`)
            corr.parentNode.className += " correct-ans";
        }
    });

    groupedRadioButtons.forEach(rg => {
        rg.forEach(r => {
            r.disabled = true;
        })
    })

    // 3. vaidate grouped options [ [op1,op2,op3,op4], [op1,op2,op3,op4], ...]
    groupedCheckboxes.forEach(groupChecked => {
        groupChecked.forEach(c => {
            if (c.getAttribute('data-checked') === "checked") {
                c.disabled = true;
                if (isCurrentlyChecked(checkedCheckboxes, c)) {

                } else {
                    c.parentNode.className += " incorrect-ans";
                    status = 'incorrect';
                }
            }
        });
    });


    groupedCheckboxes.forEach(gc => {
        gc.forEach(c => {
            // console.log(c.getAttribute('input'))
        });
    })

    var btn = document.querySelector('.multi-primary-btn');
    btn.disabled = true;
    btn.className += ' primary-btn-disabled';

    console.log("STATUS: ", status, " Correct. ", countCorrect);

}