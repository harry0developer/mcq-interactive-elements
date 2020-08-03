window.onload = function() {

    var explanation = document.querySelectorAll('.explanation');

    console.log(explanation);
    explanation.forEach(exp => {
        exp.style.display = 'none';
    });
    groupCheckboxesQuestions();
    addClickEventListener();
}


var groupedCheckboxes = [];
var checkedCheckboxes;

var addClickEventListener = function() {
    var primaryBtns = document.querySelectorAll('.primary-btn');
    var secondaryBtns = document.querySelectorAll('.secondary-btn');
    // console.log(primaryBtns);
    // console.log(secondaryBtns);

    // console.log('groupedCheckboxes: ', groupedCheckboxes);
    // console.log('checkedCheckboxes:', checkedCheckboxes);

    primaryBtns.forEach(pb => {
        groupedCheckboxes.forEach(gc => {
            // console.log(pb.getAttribute('class').split(' ')[1], gc[0].getAttribute('class'));
            var className = pb.getAttribute('class');
            if (className && className.split(' ')[1] && className.split(' ')[1] === gc[0].getAttribute('class')) {
                pb.addEventListener('click', function(e) {
                    e.preventDefault();
                    validateSingleQuestionSet(e);
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
                    clearSingleQuestionSet(e);
                })
            }
        });
    });


}

var isCurrentlyChecked = function(checkedNodes, node) {
    var status = false;
    console.log(checkedNodes);
    checkedNodes.forEach(c => {
        if (c.isSameNode(node)) {
            status = true;
        }
    });
    return status;
}

var clearSingleQuestionSet = function(e) {
    var clickedButton = e.target.className;;
    var options = document.querySelectorAll(`input.${clickedButton.split(" ")[1]}`);
    var btnPrimary = document.querySelector(`.${clickedButton.split(" ")[1]}.primary-btn`);
    var explanation = document.querySelector(`.${clickedButton.split(" ")[1]}.explanation`);


    explanation.classList.remove('incorrect-explanation');
    explanation.classList.remove('correct-explanation');
    document.querySelector(`.explanation img`).remove();
    document.querySelector(`.explanation b`).remove();

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


var validateSingleQuestionSet = function(e) {
    checkedCheckboxes = document.querySelectorAll('input[type=checkbox]:checked');
    var btnClasses = e.target.className;
    var explanation;
    checkboxToValidate = [];
    status = 'correct';
    checkedCheckboxes.forEach(cc => {
        if (cc.getAttribute('class') === btnClasses.split(" ")[1].trim()) {
            checkboxToValidate.push(cc);
        }
    });

    checkboxToValidate.forEach(c => {
        var btn = document.querySelector(`button.${c.getAttribute('class')}`);
        btn.disabled = true;
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
        b.innerHTML = 'Correct: ';
        img.src = "./imgs/correct.png";
        img.className = "status-icon";

        explanation.className += ' correct-explanation';

    } else {
        b.innerHTML = 'Incorrect: ';
        img.src = "./imgs/incorrect.png";
        img.className = "status-icon";
        explanation.className += ' incorrect-explanation';
    }
    explanation.prepend(b)
    explanation.prepend(img);
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

    // checkedCheckboxes.forEach(c => {
    //     if (c.getAttribute('data-checked') === "checked") {
    //         var label = document.querySelector(`label[for=${c.getAttribute('id')}]`);
    //         label.className += ' correct-ans';
    //     } else {
    //         var label = document.querySelector(`label[for=${c.getAttribute('id')}]`);
    //         label.className += ' incorrect-ans';
    //         status = 'incorrect'

    //     }
    // })
}


var validateMultipleQuestionSet = function() {

    // 1. select all checked options
    var checkedCheckboxes = document.querySelectorAll('input[type=checkbox]:checked');
    var groupedCheckboxes = [];

    console.log(checkedCheckboxes);


    // 2. group all options
    for (var i = 0; i < 100; i++) {
        if (document.querySelector(`.checkbox-${i}`)) {
            groupedCheckboxes.push(document.querySelectorAll(`.checkbox-${i}`));
        }
    }

    var checkedNodes = [];
    var status = 'correct';


    checkedCheckboxes.forEach(c => {
        if (c.getAttribute('data-checked') === "checked") {
            // console.log(c, 'correct');
            var label = document.querySelector(`label[for=${c.getAttribute('id')}]`);
            label.className += ' correct-ans';
        } else {
            // console.log(c, 'incorrect');
            var label = document.querySelector(`label[for=${c.getAttribute('id')}]`);
            label.className += ' incorrect-ans';
            status = 'incorrect'

        }
    })

    // 3. vaidate grouped options [ [op1,op2,op3,op4], [op1,op2,op3,op4], ...]
    groupedCheckboxes.forEach(groupChecked => {
        groupChecked.forEach(c => {
            if (c.getAttribute('data-checked') === "checked") {
                var isChecked = isCurrentlyChecked(checkedCheckboxes, c);
                console.log(isChecked);

                if (isChecked) {

                } else {
                    console.log(c);

                    status = 'incorrect';

                }
            }
        });
    });


    console.log("STATUS: ", status);

    // var statusDiv = document.querySelector('.status');
    // var p = document.createElement('p');
    // p.className = status === 'correct' ? 'correct' : 'incorrect';
    // p.innerText = status;
    // if (statusDiv && statusDiv.hasChildNodes()) {
    //     console.log(statusDiv.childNodes);
    //     statusDiv.removeChild(statusDiv.childNodes[0])
    // }
    // statusDiv.appendChild(p);
}