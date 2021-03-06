var typeOfMessage = 1;

$(document).ready(function() {
    var SmsModule = (function () {
        initializeDatabase();
        initializeVariables();
        return {
            init: function () {
                $("#editNumberButton").click(function(){
                    var value = document.getElementById("telephoneNumber").value;
                    if( value.length != 11 ){
                        alert("Zły numer");
                    }
                    else {
                        updateNumber();
                        telephoneNumber = value;
                    }
                });

                $("#lookUpButton").click(function(){
                    alert(document.getElementById('message').value);
                });

                $("#typeOfMessageSelect").change(function () {
                    $( "#typeOfMessageSelect option:selected").each(function() {
                        switch($(this).text()) {
                            case "Wejściówka":
                                getEntryText();
                                document.getElementById('message').value = entryMessage;
                                typeOfMessage = 1;
                                break;
                            case "Wyjściówka":
                                getExitText();
                                document.getElementById('message').value = exitMessage;
                                typeOfMessage = 2;
                                break;
                            case "Alarm":
                                getAlarmText();
                                document.getElementById('message').value = alarmMessage;
                                typeOfMessage = 3;
                                break;
                        }
                    });
                });

                $("#typeOfTemplateSelect").change(function () {
                    var options = document.getElementById('message');
                    $( "#typeOfTemplateSelect option:selected").each(function() {
                        switch($(this).text()) {
                            case 'Numer stacji':
                                options.value =
                                    options.value.concat(' ', tableOfMapping[0]);
                                break;
                            case 'Numer NetWorks':
                                options.value =
                                    options.value.concat(' ', tableOfMapping[1]);
                                break;
                            case 'Numer PTC':
                                options.value =
                                    options.value.concat(' ', tableOfMapping[2]);
                                break;
                            case 'Numer PTK':
                                options.value =
                                    options.value.concat(' ', tableOfMapping[3]);
                                break;
                        }
                        document.getElementById('changingText').text = $(this).text();
                    });
                });
                $('#saveSmsButton').click(function(){
                    updateMessage();
                });
            }
        };

    })();
    SmsModule.init();
});

function updateMessage(){
    db = window.openDatabase(nameOfDatabaseFileForSmses, "1.0", "Smses", 200000);
    db.transaction(function (tx) {
        var messageText = document.getElementById('message').value;
        var sentence = "UPDATE ".concat(nameOfDatabaseForSmses, " SET sentence = '", messageText, "' WHERE id = ", typeOfMessage);
        tx.executeSql(sentence, [], function (tx) {
            console.log("Udało się zmienic wiadomość");
        }, null);
    });
}

function updateNumber(){
    db = window.openDatabase(nameOfDatabaseFileForSmses, "1.0", "Smses", 200000);
    db.transaction(function (tx) {
        var number = document.getElementById("telephoneNumber").value;
        var sentence = "UPDATE ".concat(nameOfDatabaseForSmses, " SET sentence = '", number, "' WHERE id = 4");
        tx.executeSql(sentence, [], function (tx) {
            console.log("Udało się zmienic numer");
        }, null);
    });
}