window.onload = function() {
    document.getElementById('inputfile').addEventListener('change', function() {

        var fr = new FileReader();
        fr.onload = function() {
            // document.getElementById('output').textContent = fr.result;
            // console.log(fr.result);
            convertToHTML(fr.result);

        }

        fr.readAsText(this.files[0]);
    });

    var convertToHTML = function(content) {
        var questions = content.split("\n\n");
        var questionSegment = [];
        questions.forEach(q => {
            if (!!q) {
                questionSegment.push(q.split("\n"));
            }
        });

        var questionObj = {
            question: "",
            options: "",
            answer: "",
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
                }
            });


            if (questionObj.type === "SINGLE") {
                generateInputTypeQuestion('radio', i, questionObj);
            } else if (questionObj.type === "MULTI") {
                generateInputTypeQuestion('checkbox', i, questionObj);
            } else if (questionObj.type === "SHORT") {
                // this.generateShortQuestion();
            }

        });

    }


    var generateInputTypeQuestion = function(type, index, obj) {
        var questions = document.querySelector(".questions");
        if (type == "radio") {
            var questionPara = document.createElement('p');
            questionPara.innerHTML = `<b>Question ${index+1}: </b> ${obj.question}`;

            questions.appendChild(questionPara);

            var options = obj.options.trim().split(",");
            options.forEach((opt, i) => {
                var inputItem = document.createElement('input');
                inputItem.type = type;
                inputItem.name = `question-option-${index}`;
                inputItem.id = `question-${index}-${i}`;
                inputItem.value = opt.trim();

                var label = document.createElement('label');
                label.setAttribute("for", `question-${index}-${i}`);
                label.innerText = opt.trim();

                var br = document.createElement("br");
                questions.appendChild(inputItem);
                questions.appendChild(label);
                questions.appendChild(br);
            });

            var answerDiv = document.createElement("div");
            answerDiv.className = "answer";
            questions.appendChild(answerDiv);

            console.log(questions);
            createFile(questions);


        } else {
            var questionPara = document.createElement('p');
            questionPara.innerHTML = `<b>Question ${index+1}: </b> ${obj.question}`;

            questions.appendChild(questionPara);

            var options = obj.options.split(",");

            options.forEach((opt, i) => {
                var inputItem = document.createElement('input');
                inputItem.type = type;
                inputItem.name = `question-option-${index}`;
                inputItem.id = `question-${index}-${i}`;
                inputItem.value = opt.trim();

                var label = document.createElement('label');
                label.setAttribute("for", `question-${index}-${i}`);
                label.innerText = opt.trim();
                var br = document.createElement("br");

                questions.appendChild(inputItem);
                questions.appendChild(label);
                questions.appendChild(br);
            });

            var answerDiv = document.createElement("div");
            answerDiv.className = "answer";
            questions.appendChild(answerDiv);
            console.log(questions);

            createFile(questions);
        }

    }


    function createFile(text) {
        var object = new ActiveXObject("Scripting.FileSystemObject");
        var file = object.CreateTextFile("text.txt", false);
        file.WriteLine(text);
        file.WriteLine('Hope is a thing with feathers, that perches on the soul.');
        file.Close();
    }

    writeToFile = function(text) {
        console.log(text);

        let blob = new Blob([text], { type: 'plain/text' });

        link.href = URL.createObjectURL(blob);
    }

}