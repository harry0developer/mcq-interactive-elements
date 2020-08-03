window.onload = function() {
    // var primaryButton = document.querySelector('.primary-btn');
    // var secondaryButton = document.querySelector('.secondary-btn');

    // primaryButton.addEventListener('click', function() {

    //     validateMultipleQuestionSet();
    //     console.log('primaryButton have been clicked');
    // });

    // secondaryButton.addEventListener('click', function() {
    //     console.log('secondaryButton have been clicked');
    // });


    var primaryBtns = document.querySelectorAll('.primary-btn');
    var secondaryBtns = document.querySelectorAll('.secondary-btn');

    // primaryBtns.forEach(pb => {
    //     console.log(pb.getAttribute('class'));
    //     pb.addEventListener('click', function() {
    //         validateSingleQuestionSet();
    //     })
    // })

    // secondaryBtns.forEach(pb => {
    //     pb.addEventListener('click', function() {
    //         clearSingleQuestionSet();
    //     })
    // });

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
                pb.addEventListener('click', function() {
                    validateSingleQuestionSet();
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

var clearSingleQuestionSet = function() {
    console.log('clearSingleQuestionSet');
}


var validateSingleQuestionSet = function() {
    checkedCheckboxes = document.querySelectorAll('input[type=checkbox]:checked');

    checkedCheckboxes.forEach(c => {
        var label = document.querySelector(`label[for=${c.getAttribute('id')}]`);
        label.className = '';
        if (c.getAttribute('data-checked') === "checked") {
            label.className = 'correct-ans';
        } else {
            var label = document.querySelector(`label[for=${c.getAttribute('id')}]`);
            label.className = 'incorrect-ans';
            status = 'incorrect'
        }
    })
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