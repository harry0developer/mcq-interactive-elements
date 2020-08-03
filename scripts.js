window.onload = function() {

    filename = 'test.html';
    questionType = 'single';
    var input = document.getElementById('file');

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


            if (questionObj.type === "SINGLE") {
                var res = generateInputTypeQuestion('radio', i, questionObj);
                htmlQuizCollection.push(res);
            } else if (questionObj.type === "MULTI") {
                var res = generateInputTypeQuestion('checkbox', i, questionObj);
                htmlQuizCollection.push(res);
            } else if (questionObj.type === "SHORT") {
                // this.generateShortQuestion();
            }

        });



        if (questionType.toLowerCase() === 'multi') {
            var q = document.querySelector('.questions');
            var primaryBtn = addButton('Check answer', 'primary-btn');
            var secBtn = addButton('Clear answer', 'secondary-btn');
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


    var generateInputTypeQuestion = function(type, index, obj) {
        var questions = document.querySelector(".questions");
        console.log(obj);
        if (type == "radio") {
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

            // questions.appendChild(questionPara);
            qdiv.appendChild(questionPara);

            var options = obj.options.trim().split(",");
            var correctAnswer = getAnswerNumber(obj);

            options.forEach((opt, i) => {
                var inputItem = document.createElement('input');
                inputItem.type = type;
                inputItem.name = `question-option-${index}`;
                inputItem.id = `question-${index}-${i}`;
                inputItem.value = opt.trim();
                inputItem.checked = correctAnswer === i ? 'checked' : false;

                var label = document.createElement('label');
                label.setAttribute("for", `question-${index}-${i}`);
                label.innerText = opt.trim();

                var br = document.createElement("br");
                // questions.appendChild(inputItem);
                // questions.appendChild(label);
                // questions.appendChild(br);

                qdiv.appendChild(inputItem);
                qdiv.appendChild(label);
                qdiv.appendChild(br);

            });

            var explanation = document.createElement("p");
            explanation.className = "explanation";
            explanation.innerText = obj.explanation
            qdiv.appendChild(explanation);

            if (questionType.toLowerCase() === 'single') {
                var primaryBtn = addButton('Check answer', 'primary-btn');
                var secBtn = addButton('Clear answer', 'secondary-btn');

                qdiv.appendChild(primaryBtn);
                qdiv.appendChild(secBtn);
            }


            questions.appendChild(qdiv);

        } else {

            var qdiv = document.createElement("div");
            if (questionType.toLowerCase() === 'single') {
                qdiv.className = "question single question-" + index;
            } else {
                qdiv.className = "question multi question-" + index;
            }


            var questionPara = document.createElement('p');
            questionPara.innerHTML = `<b>Question ${index+1}: </b> ${obj.question}`;

            qdiv.appendChild(questionPara);
            // questions.appendChild(questionPara);

            var options = obj.options.split(",");
            var answers = obj.answer.split(",");

            options.forEach((opt, i) => {
                var inputItem = document.createElement('input');
                inputItem.type = type;
                inputItem.name = `question-option-${index}`;
                inputItem.id = `question-${index}-${i}`;
                inputItem.value = opt.trim();
                inputItem.checked = false;
                inputItem.className = `checkbox-${index}`;

                answers.forEach(a => {
                    if (a.toLowerCase() === 'a' && i === 0) {
                        inputItem.checked = 'checked';
                        inputItem.setAttribute('data-checked', 'checked');
                    }
                    if (a.toLowerCase() === 'b' && i === 1) {
                        inputItem.checked = 'checked';
                        inputItem.setAttribute('data-checked', 'checked');
                    }
                    if (a.toLowerCase() === 'c' && i === 2) {
                        inputItem.checked = 'checked';
                        inputItem.setAttribute('data-checked', 'checked');
                    }
                    if (a.toLowerCase() === 'd' && i === 3) {
                        inputItem.checked = 'checked';
                        inputItem.setAttribute('data-checked', 'checked');
                    }
                    if (a.toLowerCase() === 'e' && i === 4) {
                        inputItem.checked = 'checked';
                        inputItem.setAttribute('data-checked', 'checked');
                    }
                    if (a.toLowerCase() === 'f' && i === 5) {
                        inputItem.checked = 'checked';
                        inputItem.setAttribute('data-checked', 'checked');
                    }
                    if (a.toLowerCase() === 'g' && i === 6) {
                        inputItem.checked = 'checked';
                        inputItem.setAttribute('data-checked', 'checked');
                    }
                });
                var label = document.createElement('label');
                label.setAttribute("for", `question-${index}-${i}`);
                label.innerText = opt.trim();
                var br = document.createElement("br");

                // questions.appendChild(inputItem);
                // questions.appendChild(label);
                // questions.appendChild(br);

                qdiv.appendChild(inputItem);
                qdiv.appendChild(label);
                qdiv.appendChild(br);
            });

            var explanation = document.createElement("p");
            explanation.className = "explanation";
            explanation.innerText = obj.explanation
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

    writeToFile = function(text) {
        let blob = new Blob([text[0].outerHTML], { type: 'plain/text' });
        link.href = URL.createObjectURL(blob);
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