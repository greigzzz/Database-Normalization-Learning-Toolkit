function question(numberOfQuestions, data) {
	var question = false;
	for (var i = 0; i < numberOfQuestions; i++) {
		if (questionsAnswered[i] == false && question == false) {
			question = true;
			quiz(i, data);
		}
	}
}

function quiz(questionNumber, data) {
	var attrOutput = "";
	var attrOutputTemp = "";
	var questionType = data.employee.question.questionList[questionNumber].Type;
	var numberOfTables = null;
	//console.log(questionNumber);
	$(document).ready(function() {
		$('#question_area').html('<h1>' + data.employee.question.questionList[questionNumber].Title + '</h1>');
		for (var j = 0; j < numberOfAttributes; j++) {
			attrOutputTemp = '<div class="attributes" data-attr="' + data.employee.question.UNF[j].title + '">' + data.employee.question.UNF[j].title + '</div>'
			attrOutput = attrOutput + attrOutputTemp;
		}
		
		$('#UNF').html(attrOutput);
		if (questionType == "table") {
			$('#addattribute').hide();
			$('#delattribute').hide();
			$('#addtable').show();
			$('#deltable').show();
			numberOfTables = 0;
		} 
		else if (questionType == "attribute") {
			$('#addattribute').show();
			$('#delattribute').hide();
			$('#addtable').hide();
			$('#deltable').hide();
			if (questionNumber == 0) {
				$('#encapsulate-UNF-1NF').hide();
				$('#encapsulate-1NF-2NF').hide();
				$('#encapsulate-2NF-3NF').hide();
			} else if (questionNumber == 1) {
				$('#encapsulate-UNF-1NF').show();
				$('#encapsulate-1NF-2NF').hide();
				$('#encapsulate-2NF-3NF').hide();
			} else if (questionNumber == 2) {
				$('#encapsulate-UNF-1NF').hide();
				$('#encapsulate-1NF-2NF').show();
				$('#encapsulate-2NF-3NF').hide();
			} else if (questionNumber == 3) {
				$('#encapsulate-UNF-1NF').hide();
				$('#encapsulate-1NF-2NF').hide();
				$('#encapsulate-2NF-3NF').show();
			}	
		}
		
		if (questionNumber == 0 && questionType == "table") {
		
			$("#addtable").click(function() {
					existing = $('#encapsulate-1NF').html();
					var table = '<div id="1NF-' + numberOfTables + '" class="1NF" style="position: relative; float: left; width: 95%; height: 300px; margin-left: 1%; margin-top: 1%;"></div>';
					$('#encapsulate-1NF').html(existing + table);
					numberOfTables++;
			}); //addtable end
			
			$("#deltable").click(function() {
				if (numberOfTables == 0) {
					alert("No Tables Exist");
				}
				else if (numberOfTables > 0) {
					numberOfTables = numberOfTables - 1;
					existing = $('#encapsulate-1NF').html();
					$('#1NF-' + numberOfTables).remove();
				}
			}); //deltable end
						
			$("#checkanswer").click(function() {
				if (numberOfTables == (data.employee.answer.OneNF.Tables.length)){
					console.log("Correct");
					questionsAnswered[questionNumber] = true;
					console.log(questionsAnswered);
					question(questionsAnswered.length, data);
				
				} else if (numberOfTables == 0) {
					alert ("1NF requires tables"); //change with css 
				} else if (numberOfTables == 1) {
					alert("1NF requires more tables"); // change with css
					//console.log("Tell them why it is wrong");
				} else if (numberOfTables > 2) {
					alert("1NF requires less tables"); // change with css
				}
			}); //checkanswer end
		}
		
		//start 1NF
		else if (questionNumber == 1 && questionType == "attribute") {
			var id_count = 0;
			var attr_id = null;
			
			$(".attributes").click(function() {
				if ($(this).attr('id') == null) {
					$(this).attr('id', id_count);
					console.log("check id");
				} else {
					attr_id = $(this).attr('id');
				}
				attribute = $(this)[0].outerHTML;

				$('#addattribute').click(function() {
					var existing = $('#Drop-UNF-1NF').html();
					$('#Drop-UNF-1NF').html(existing + attribute);
					attribute = "";
					id_count++;
					attr_id = null;
					$('#UNF').children('div').each(function () { //prevents attr in UNF to be deleted after being deleted in drop area
						$(this).removeAttr('id');
					});
					
					$(".attributes").click(function() {
						attribute_choice = $(this)[0].outerHTML;
						attr_id = $(this).attr('id');
						check_id = $(this).parent().attr('id');
						if (check_id == "Drop-UNF-1NF") {
							$('#delattribute').show();
						}
						
						$('#delattribute').click(function() {
							if (attr_id != null) {
								$('#' + attr_id).remove();
								$('#delattribute').hide();
							}
						});
					
						$('.1NF').click(function(e) {
							$('#delattribute').hide();
							//alert ($(this).attr('id'));
							var choice_id = $(this).attr('id');							
							var existing_1NF = $('#' + choice_id).html();
							$('#' + choice_id).html(attribute_choice);
							$('.1NF').html(existing_1NF + choice_id);
							choice_id = "";
						});					
					});
				});
			});

			$("#checkanswer").click(function() {
				$('#encapsulate-1NF').children('div').each(function (index) {
					$('#1NF-' + index).children('div').each(function (index) {
						//Do some checks in here
						//alert($(this).html());
					});
				});
			});
		}
	});
}