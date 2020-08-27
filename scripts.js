window.onload = function() {

    filename = 'test.html';
    questionType = 'single';
    var input = document.getElementById('file');


    // $(".questions").appendChild($(`<input type="checkbox" name="check" id="check" />`));



    if (input) {
        input.addEventListener('change', function(a) {
            filename = a.target.value.split("\\")[2].split('.')[0] + '.html';
            document.querySelector('.file-id').innerText = filename;
            var fr = new FileReader();
            fr.onload = function() {
                convertToHTML(fr.result);
            }
            fr.readAsText(this.files[0]);
        });
    }

    var convertToHTML = function(content) {
        var questions = content.split("\n\n");
        var questionSegment = [];

        var htmlQuizCollection = [];
        questions.forEach(q => {
            if (!!q) {
                questionSegment.push(q.split("\n"));
            }
        });

        var questionObj = {
            question: "",
            options: "",
            answer: "",
            explanation: "",
            type: ""
        };

        questionSegment.forEach((ques, i) => {

            ques.forEach(q => {
                qa = q.split(":");
                if (qa[0] === 'Q') {
                    questionObj.question = qa[1].trim();
                } else if (qa[0] === 'O') {
                    questionObj.options = qa[1].trim();
                } else if (qa[0] === 'A') {
                    questionObj.answer = qa[1].trim();
                } else if (qa[0] === 'T') {
                    questionObj.type = qa[1].trim();
                } else if (qa[0] === 'R') {
                    questionObj.explanation = qa[1].trim();
                }
            });


            if (questionObj.type.toLowerCase() === "single") {
                var res = generateInputTypeQuestion('radio', i, questionObj);
                htmlQuizCollection.push(res);
            } else if (questionObj.type.toLowerCase() === "multi") {
                var res = generateInputTypeQuestion('checkbox', i, questionObj);
                htmlQuizCollection.push(res);
            } else if (questionObj.type.toLowerCase() === "short") {
                // this.generateShortQuestion();
            } else if (questionObj.type.toLowerCase() === "select") {
                var res = generateInputTypeQuestion('select', i, questionObj);
                htmlQuizCollection.push(res);
            }

        });



        if (questionType.toLowerCase() === 'multi') {
            var q = document.querySelector('.questions');
            var primaryBtn = addButton('Check answer', 'multi-primary-btn');
            var secBtn = addButton('Clear answer', 'multi-secondary-btn');
            // qdiv.appendChild(primaryBtn);
            // qdiv.appendChild(secBtn);
            q.appendChild(primaryBtn);
            q.appendChild(secBtn);

            htmlQuizCollection.push(primaryBtn);
            htmlQuizCollection.push(secBtn);
        }

        writeToFile(htmlQuizCollection);

        // createHTMLOutput(htmlQuizCollection);

    }

    createInputTag = function(type, name, id, value, className) {
        var domparser = new DOMParser();
        return domparser.parseFromString(`<input type="${type}" name="${name}" id="${id}" value="${value}" class="${className}" />`, 'text/xml').firstChild;
    }

    var generateInputTypeQuestion = function(type, index, obj) {
        var questions = document.querySelector(".questions");
        if (type.toLowerCase() == "radio") {
            var qdiv = document.createElement("div");
            if (questionType.toLowerCase() === 'single') {
                qdiv.className = "question single question-" + index;
            } else {
                qdiv.className = "question multi question-" + index;
            }

            var questionPara = document.createElement('p');
            var questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionPara.innerHTML = `<b>Question ${index+1}: </b> ${obj.question}`;

            qdiv.appendChild(questionPara);

            var options = obj.options.trim().split("|");
            var correctAnswer = getAnswerNumber(obj);

            console.log(correctAnswer);
            options.forEach((opt, i) => {
                var name = `question-option-${index}`;
                var id = `question-${index}-${i}`;
                var value = opt.trim();
                var inputTag = createInputTag(type, name, id, value, "");

                var inputItem = inputTag;

                if (correctAnswer === i) {
                    inputItem.checked = 'checked';
                    inputItem.setAttribute('data-checked', 'checked');
                } else {
                    inputItem.checked = false;
                }
                inputItem.className = `radio-${index}`;


                var label = document.createElement('label');
                label.setAttribute("for", `question-${index}-${i}`);
                label.innerText = opt.trim();


                var optionDiv = document.createElement('div');
                optionDiv.className = `question-container-${index}-${i}`;
                optionDiv.appendChild(inputItem);
                optionDiv.appendChild(label);
                qdiv.appendChild(optionDiv);

            });


            var explanation = document.createElement("p");
            explanation.className = `explanation radio-${index}`;
            explanation.innerText = obj.explanation;
            qdiv.appendChild(explanation);

            if (questionType.toLowerCase() === 'single') {
                var primaryBtnClasses = 'primary-btn ' + `radio-${index}`;
                var secBtnClasses = 'secondary-btn ' + `radio-${index}`;
                var primaryBtn = addButton('Check answer', primaryBtnClasses);
                var secBtn = addButton('Clear answer', secBtnClasses);
                qdiv.appendChild(primaryBtn);
                qdiv.appendChild(secBtn);
            }

            questions.appendChild(qdiv);

        } else if (type.toLowerCase() == "checkbox") {

            var qdiv = document.createElement("div");
            if (questionType.toLowerCase() === 'single') {
                qdiv.className = "question single question-" + index;
            } else {
                qdiv.className = "question multi question-" + index;
            }


            var questionPara = document.createElement('p');
            questionPara.innerHTML = `<b>Question ${index+1}: </b> ${obj.question}`;

            qdiv.appendChild(questionPara);

            var options = obj.options.split("|");
            var answers = obj.answer.split(",");

            options.forEach((opt, i) => {
                // var inputItem = document.createElement('input');
                // inputItem.type = type;
                // inputItem.name = `question-option-${index}`;
                // inputItem.id = `question-${index}-${i}`;
                // inputItem.value = opt.trim();
                // inputItem.checked = false;
                // inputItem.className = `checkbox-${index}`;


                var name = `question-option-${index}`;
                var id = `question-${index}-${i}`;
                var value = opt.trim();
                var checked = false;
                var className = `checkbox-${index}`;

                var inputItem = createInputTag(type, name, id, value, className);

                answers.forEach(a => {
                    if (a.toLowerCase() === 'a' && i === 0) {
                        // inputItem.checked = 'checked';
                        inputItem.setAttribute('data-checked', 'checked');
                    }
                    if (a.toLowerCase() === 'b' && i === 1) {
                        // inputItem.checked = 'checked';
                        inputItem.setAttribute('data-checked', 'checked');
                    }
                    if (a.toLowerCase() === 'c' && i === 2) {
                        // inputItem.checked = 'checked';
                        inputItem.setAttribute('data-checked', 'checked');
                    }
                    if (a.toLowerCase() === 'd' && i === 3) {
                        // inputItem.checked = 'checked';
                        inputItem.setAttribute('data-checked', 'checked');
                    }
                    if (a.toLowerCase() === 'e' && i === 4) {
                        // inputItem.checked = 'checked';
                        inputItem.setAttribute('data-checked', 'checked');
                    }
                    if (a.toLowerCase() === 'f' && i === 5) {
                        // inputItem.checked = 'checked';
                        inputItem.setAttribute('data-checked', 'checked');
                    }
                    if (a.toLowerCase() === 'g' && i === 6) {
                        // inputItem.checked = 'checked';
                        inputItem.setAttribute('data-checked', 'checked');
                    }
                });
                var label = document.createElement('label');
                label.setAttribute("for", `question-${index}-${i}`);
                label.innerText = opt.trim();

                var optionDiv = document.createElement('div');
                optionDiv.className = `question-container-${index}-${i}`;
                optionDiv.appendChild(inputItem);
                optionDiv.appendChild(label);
                qdiv.appendChild(optionDiv);
            });

            var explanation = document.createElement("p");
            explanation.className = `explanation checkbox-${index}`;
            explanation.innerText = obj.explanation;
            qdiv.appendChild(explanation);

            if (questionType.toLowerCase() === 'single') {
                var primaryBtnClasses = 'primary-btn ' + `checkbox-${index}`;
                var secBtnClasses = 'secondary-btn ' + `checkbox-${index}`;
                var primaryBtn = addButton('Check answer', primaryBtnClasses);
                var secBtn = addButton('Clear answer', secBtnClasses);
                qdiv.appendChild(primaryBtn);
                qdiv.appendChild(secBtn);
            }
            questions.appendChild(qdiv);
        } else if (type.toLowerCase() == "select") {
            var qdiv = document.createElement("div");
            if (questionType.toLowerCase() === 'single') {
                qdiv.className = "question single question-" + index;
            } else {
                qdiv.className = "question multi question-" + index;
            }


            var outerParagraph = document.createElement('p');
            // Create a nested paragraph containing select input
            var innerParagraph = document.createElement('p');

            var question = obj.question.split("[]");

            var options = obj.options.split("|");
            var answers = obj.answer.split(",");
            console.log(answers);
            // inputItem.setAttribute('data-checked', 'checked');
            var selectInput = document.createElement('select');
            selectInput.className = `select-${index}`;


            var blankOption = document.createElement('option');
            blankOption.setAttribute("value", "");
            var optionText = document.createTextNode("");
            blankOption.appendChild(optionText);
            selectInput.appendChild(blankOption);

            options.forEach((opt, i) => {
                var selectInputOptions = document.createElement('option');
                selectInputOptions.setAttribute("value", opt.trim());
                var optionText = document.createTextNode(opt.trim());
                selectInputOptions.appendChild(optionText);

                answers.forEach(a => {
                    if (a.toLowerCase() === 'a' && i === 0) {
                        selectInputOptions.setAttribute('data-checked', 'checked');
                    }
                    if (a.toLowerCase() === 'b' && i === 1) {
                        selectInputOptions.setAttribute('data-checked', 'checked');
                    }
                    if (a.toLowerCase() === 'c' && i === 2) {
                        selectInputOptions.setAttribute('data-checked', 'checked');
                    }
                    if (a.toLowerCase() === 'd' && i === 3) {
                        selectInputOptions.setAttribute('data-checked', 'checked');
                    }
                    if (a.toLowerCase() === 'e' && i === 4) {
                        selectInputOptions.setAttribute('data-checked', 'checked');
                    }
                    if (a.toLowerCase() === 'f' && i === 5) {
                        selectInputOptions.setAttribute('data-checked', 'checked');
                    }
                    if (a.toLowerCase() === 'g' && i === 6) {
                        selectInputOptions.setAttribute('data-checked', 'checked');
                    }
                });

                selectInput.appendChild(selectInputOptions);
            });


            var createQuestionNumber = document.createElement("b");
            createQuestionNumber.innerText = `Question ${index+1}: Select the correct answer`;
            var text1 = document.createTextNode(`${question[0]}`);
            var text2 = document.createTextNode(`${question[1]}`);
            outerParagraph.appendChild(createQuestionNumber);
            innerParagraph.appendChild(text1);
            innerParagraph.appendChild(selectInput);
            innerParagraph.appendChild(text2);
            outerParagraph.appendChild(innerParagraph);
            qdiv.appendChild(outerParagraph);


            var explanation = document.createElement("p");
            explanation.className = `explanation select-${index}`;
            explanation.innerText = obj.explanation;
            qdiv.appendChild(explanation);

            if (questionType.toLowerCase() === 'single') {
                var primaryBtnClasses = 'primary-btn ' + `select-${index}`;
                var secBtnClasses = 'secondary-btn ' + `select-${index}`;
                var primaryBtn = addButton('Check answer', primaryBtnClasses);
                var secBtn = addButton('Clear answer', secBtnClasses);
                qdiv.appendChild(primaryBtn);
                qdiv.appendChild(secBtn);
            }
            questions.appendChild(qdiv);

        }
        return questions;
    }


    addButton = function(text, className) {
        var btn = document.createElement("button");
        btn.innerHTML = text;
        btn.className = className;
        return btn;
    }

    getAnswerNumber = function(obj) {
        if (obj.answer.trim().toLowerCase() == 'a') {
            return 0;
        } else if (obj.answer.trim().toLowerCase() == 'b') {
            return 1;
        } else if (obj.answer.trim().toLowerCase() == 'c') {
            return 2;
        } else if (obj.answer.trim().toLowerCase() == 'd') {
            return 3;
        } else if (obj.answer.trim().toLowerCase() == 'e') {
            return 4;
        } else if (obj.answer.trim().toLowerCase() == 'f') {
            return 5;
        } else {
            return -999;
        }
    }

    createHTMLOutput = function(text) {
        var html = document.querySelector('.html-output');
        const el = document.createElement('textarea');
        el.value = text[0].outerHTML;
        el.setAttribute('readonly', '');
        html.appendChild(el);
    }

    copyTextToClipboard = function() {
        var copyText = document.querySelector('textarea');
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
    }


    writeToFile = function(text) {
        var link = document.querySelector('#link');
        link.setAttribute('download', filename);
        let blob = new Blob([text[0].outerHTML], { type: 'plain/text' });
        link.href = URL.createObjectURL(blob);
    }

    getChecked = function() {
        questionType = document.querySelector('input[name="question-type"]:checked').value;
        if (questionType.toLowerCase() == 'single' || questionType.toLowerCase() == 'multi') {
            var t = document.querySelector('.toggle');
            t.className = 'card-body toggle';
        }
    }
}