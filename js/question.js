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
	var iii = 0;
	var attrOutput = "";
	var attrOutputTemp = "";
	var questionType = data.employee.question.questionList[questionNumber].Type;
	var numberOfTables = null;
	//console.log(questionNumber);
	$(document).ready(function() {
		$('#question_area').html('<h2>' + data.employee.question.questionList[questionNumber].Title + '</h2>');
		
		$('#validation_1NF_1').html('<p>' + data.employee.answer.OneNF.tableValidation[0].val1 + '</p>');
		$('#validation_1NF_2').html('<p>' + data.employee.answer.OneNF.tableValidation[1].val1 + '</p>');
		$('#validation_1NF_3').html('<p>' + data.employee.answer.OneNF.tableValidation[2].val1 + '</p>');
		$('#validation_1NF_4').html('<p>' + data.employee.answer.OneNF.attributeValidation[0].val1 + '</p>');
		$('#validation_1NF_5').html('<p>' + data.employee.answer.OneNF.extraHint[0].val1 + '</p>');
		
		$('#validation_2NF_1').html('<p>' + data.employee.answer.TwoNF.tableValidation[0].val2 + '</p>');
		$('#validation_2NF_2').html('<p>' + data.employee.answer.TwoNF.tableValidation[1].val2 + '</p>');
		$('#validation_2NF_3').html('<p>' + data.employee.answer.TwoNF.tableValidation[2].val2 + '</p>');
		$('#validation_2NF_4').html('<p>' + data.employee.answer.TwoNF.attributeValidation[0].val2 + '</p>');
		$('#validation_2NF_5').html('<p>' + data.employee.answer.TwoNF.extraHint[0].val2 + '</p>');
		
		$('#validation_3NF_1').html('<p>' + data.employee.answer.ThreeNF.tableValidation[0].val3 + '</p>');
		$('#validation_3NF_2').html('<p>' + data.employee.answer.ThreeNF.tableValidation[1].val3 + '</p>');
		$('#validation_3NF_3').html('<p>' + data.employee.answer.ThreeNF.tableValidation[2].val3 + '</p>');
		$('#validation_3NF_4').html('<p>' + data.employee.answer.ThreeNF.attributeValidation[0].val3 + '</p>');
		$('#validation_3NF_5').html('<p>' + data.employee.answer.ThreeNF.extraHint[0].val3 + '</p>');
		
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
			if (questionNumber == 2) {
				$('#encapsulate-2NF').show();
			} else if (questionNumber == 4) {
				$('#encapsulate-3NF').show();	
			}
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
				$('#encapsulate-1NF-2NF').show();
				$('#encapsulate-2NF-3NF').hide();
			} else if (questionNumber == 4) {
				$('#encapsulate-UNF-1NF').hide();
				$('#encapsulate-1NF-2NF').hide();
				$('#encapsulate-2NF-3NF').show();
			} else if (questionNumber == 5) {
				$('#encapsulate-UNF-1NF').hide();
				$('#encapsulate-1NF-2NF').hide();
				$('#encapsulate-2NF-3NF').show();
			}
		}
		
		//QUESTION 1NF = TABLES
		
		if (questionNumber == 0 && questionType == "table") {
			$("#addtable").click(function() {
					existing = $('#encapsulate-1NF').html();
					var table = '<div id="1NF-' + numberOfTables + '" class="1NF" style="position: relative; float: left; width: 95%; height: 300px; margin-left: 1%; margin-top: 1%; border:2px solid; border-radius:10px; padding: 3px; -moz-border-radius:10px; "></div>';
					$('#encapsulate-1NF').html(existing + table);
					numberOfTables++;
			});
			$("#deltable").click(function() {
				if (numberOfTables == 0) {
					console.log("No Tables Exist");
				}
				else if (numberOfTables > 0) {
					numberOfTables = numberOfTables - 1;
					existing = $('#encapsulate-1NF').html();
					$('#1NF-' + numberOfTables).remove();
				}
			});
			$("#checkanswer").click(function() {
				if (numberOfTables == (data.employee.answer.OneNF.Tables.length)){
					console.log("Correct");
					questionsAnswered[questionNumber] = true;
					console.log(questionsAnswered);
					question(questionsAnswered.length, data);
				} else if (numberOfTables == 0) {
				//	alert ("1NF requires tables"); //change with css 
				$( "#validation_1NF_1" ).dialog({
					width: 500,	
					modal: true,
					buttons: {
						'Try Again': function() {
							$(this).dialog('close');
						},
						'Answer': function() {
							$("#Answer_Table_1NF").dialog({
								width: 500,	
								modal: true								
							});	
						}
					}
				});
				
				} else if (numberOfTables == 1) {
				//	alert("1NF requires more tables"); // change with css
				$( "#validation_1NF_2" ).dialog({
					width: 500,	
					modal: true,
						 buttons: {
							'Try Again': function() {
								$(this).dialog('close');
							},
							'Answer': function() {
								$("#Answer_Table_1NF").dialog({
									width: 500,	
									modal: true								
								});	
							}
						}
				});
				
				} else if (numberOfTables > 2) {
				//	alert("1NF requires less tables"); // change with css
				$( "#validation_1NF_3" ).dialog({
					width: 500,	
					modal: true,
					buttons: {
						'Try Again': function() {
							$(this).dialog('close');
						},
						'Answer': function() {
							$("#Answer_Table_1NF").dialog({
								width: 500,	
								modal: true								
							});	
						}
					}
				});
				}
			});
		}
		
		//QUESTION 1NF = ATTRIBUTE
		
		else if (questionNumber == 1 && questionType == "attribute") {
			var del_clicked = false;
			
			$("#addtable").unbind().click(function() {
			
			});
			
			$("#checkanswer").unbind().click(function() {
							 
			});
			
			console.log(data.employee.answer.OneNF.Tables[0]);
			var OneNF = data.employee.answer.OneNF.Tables;
			console.log(OneNF[0]);
			var id_count = 0;
			var attr_id = null;
			$('#UNF').children(".attributes").on("click", function(){
			 //$(this).unbind('click');
				del_clicked = false;
				$("#delattribute").css('background-color', 'green');
				if ($(this).attr('id') == null) {
					$(this).attr('id', id_count);
				} else {
					attr_id = $(this).attr('id');
				}
				attribute = $(this)[0].outerHTML;
				 //$(this).bind('click');
				$('#addattribute').one("click", function(){
					var existing = $('#Drop-UNF-1NF').html();
					$('#Drop-UNF-1NF').html(existing + attribute);
					attribute = "";
					id_count++;
					attr_id = null;
					$('#UNF').children('div').each(function () {
						$(this).removeAttr('id');
					});
					
					$('#Drop-UNF-1NF').children(".attributes").on("click", function(){
					//	console.log("attributes-clicked");
						attribute_choice="";
						attribute_choice = $(this)[0].outerHTML;
						console.log($(this)[0].outerHTML);
						attr_id = $(this).attr('id');
						check_id = $(this).parent().attr('id');
						var choice_data = $(this).data("attr");
						console.log(choice_data);
						if (check_id == "Drop-UNF-1NF") {
							$('#delattribute').show();
						}
										
						$('.1NF').on("click", function(){
							iii++;
							console.log(iii);
							//console.log(e);
							//$('#delattribute').show();							
							var choice_id = $(this).attr('id');
							var attexists = false;
							$('#' + choice_id).children(".attributes").each(function() {
								existing_data = $(this).data("attr");
								console.log(existing_data + " " + choice_data);
								if (existing_data == choice_data) {
									attexists = true;
								}
							});
							
							if (attexists == true || del_clicked == true) {
								console.log("Cannot add the same attribute again");
							} else { //add attribute 
								var existing_1NF = $('#' + choice_id).html();
								if (del_clicked != true) {
									$('#' + choice_id).html(existing_1NF + attribute_choice); 
								} 
								console.log("existing - " + existing_1NF + "attchoice - " +attribute_choice);
								//alert("This is attr_id" + attr_id);
								$('#' + attr_id).attr('name', '1NF' + attr_id);
								$('#' + attr_id).attr('id', Math.floor(Math.random()*1000000));
								choice_id = "";
							}
							$(".1NF").unbind().click(function() {
							
							});
							
							$(".1NF").bind().click(function() {
									//alert('bind');
							});
							
							/*$("#delattribute").unbind().click(function() {
							
							});
							$("#delattribute").bind().click(function() {
							
							});*/
						});
						
																								
						$("#checkanswer").click(function() {
							var answerOneNF1 = OneNF[0].length;
							var answerOneNF2 = OneNF[1].length;
							var correct1 = 0;
							var correct2 = 0;
							$('#encapsulate-1NF').children('div').each(function (index) {
								var table_id = index;
								$('#1NF-' + index).children('div').each(function (index) {	
									if (table_id == 0) {
										//alert("table 0");
										for (var i = 0; i < answerOneNF1; i++) {
											if (OneNF[table_id][i] == $(this).html()) {
												correct1++;
											}
										}
									}								
									else if (table_id == 1){
										//alert("table 1");
										for (var j = 0; j < answerOneNF1; j++) {
											if (OneNF[table_id][j] == $(this).html()) {
												correct2++;
											}
										}
									}
									//Do some checks in here
									//console.log($(this).html());
									//console.log($(this).html());
								});
							});
							if (correct1 == answerOneNF1 && correct2 == answerOneNF2) {
								console.log("Correct");
								questionsAnswered[questionNumber] = true;
								console.log(questionsAnswered);
								question(questionsAnswered.length, data);
							} 
							else {
								$( "#validation_1NF_4" ).dialog({
								  width: 500,	
								  modal: true,
								  buttons: {
									'Try Again': function() {
									$(this).dialog('close');
									},
									'Hint': function() {
									$("#validation_1NF_5").dialog({
									width: 500,	
									modal: true								
									});	
									},
									'Answer': function() {
									$("#Answer_Attribute_1NF").dialog({
									width: 500,	
									modal: true								
									});	
									}
								}
								});
							}
						});
						
						function alertEvent() {
						//	alert('flag');
							var idrem = null;
							if (del_clicked == true) {
								del_clicked = false;
								$("#delattribute").css('background-color', 'green');
							} else {
								$("#delattribute").css('background-color', 'red');
								del_clicked = true;
							}
							
							$("#1NF-0").children('.attributes').one('click', function() {
								if ($(this).attr("name") == null) {
								} else {
								}
								idrem = $(this).attr('id');
								if (idrem != null && del_clicked == true) {
									$('#' + idrem).remove();
								}
							});
							
							$("#1NF-1").children('.attributes').one('click',function() {
								if ($(this).attr("name") == null) {
								} else {
								}
								idrem = $(this).attr('id');
								if (idrem != null && del_clicked == true) {
									$('#' + idrem).remove();
								}
							});
							
							$("#Drop-UNF-1NF").children('.attributes').one('click', function() {
							//	alert("flag2");
								if ($(this).attr("name") == null) {
								} else {
								}
								idrem = $(this).attr('id');
								if (idrem != null && del_clicked == true) {
									$('#' + idrem).remove();
								}
							});
							/*$("#1NF-0").children('.attributes').unbind().click(function() {
							
							});
							$("#1NF-0").children('.attributes').bind().click(function() {
							
							});
							$("#1NF-1").children('.attributes').unbind().click(function() {
							
							});
							$("#1NF-1").children('.attributes').bind().click(function() {
							
							});
							$("#Drop-UNF-1NF").children('.attributes').unbind().click(function() {
							
							});*/
							/*$("#Drop-UNF-1NF").children('.attributes').bind().click(function() {
							
							});*/
						}
						$("#delattribute").bind().click(alertEvent);
						//When you want to ensure it won't happen twice...
						$("#delattribute").unbind().click(alertEvent);
						//$("#delattribute").bind().click(alertEvent);
						
						
					});
				});
			});
		} 
		
		//QUESTION 2NF = TABLE
		
		else if (questionNumber == 2 && questionType == "table") {
			$("div").unbind().click(function() {
							 
			});
			
			$("#addtable").click(function() {
				//if (add_table == false) {
				//	add_table = true;
				//	alert('flag');
					existing = $('#encapsulate-2NF').html();
					var table = '<div id="2NF-' + numberOfTables + '" class="2NF" style="position: relative; float: left; width: 95%; height: 300px; margin-left: 1%; margin-top: 1%; border:2px solid; border-radius:10px; padding: 3px; -moz-border-radius:10px; "></div>';
					$('#encapsulate-2NF').html(existing + table);
					numberOfTables++;
				//}
			});
			
			$("#deltable").click(function() {
				if (numberOfTables == 0) {
					console.log("No Tables Exist");
				}
				else if (numberOfTables > 0) {
					numberOfTables = numberOfTables - 1;
					existing = $('#encapsulate-2NF').html();
					$('#2NF-' + numberOfTables).remove();
				}
			});
			
			$("#checkanswer").click(function() {
				if (numberOfTables == (data.employee.answer.TwoNF.Tables.length)){
					console.log("Correct");
					questionsAnswered[questionNumber] = true;
					console.log(questionsAnswered);
					question(questionsAnswered.length, data);
				} else if (numberOfTables == 0) {
				//	alert ("2NF requires tables"); //change with css
				$( "#validation_2NF_1" ).dialog({
					width: 500,	
					modal: true,
					buttons: {
						'Try Again': function() {
							$(this).dialog('close');
						},
						'Answer': function() {
							$('#Answer_Table_2NF').show();
							$("#Answer_Table_2NF").dialog({
								width: 500,	
								modal: true								
							});	
						}
					}
				});
				} else if (numberOfTables <= 2) {
				//	alert("2NF requires more tables"); // change with css
				$( "#validation_2NF_2" ).dialog({
					width: 500,	
					modal: true,
					buttons: {
						'Try Again': function() {
							$(this).dialog('close');
						},
						'Answer': function() {
							$('#Answer_Table_2NF').show();
							$("#Answer_Table_2NF").dialog({
								width: 500,	
								modal: true								
							});				
						}		
					}
				});
				} else if (numberOfTables > 3) {
				//	alert("2NF requires less tables"); // change with css
					$( "#validation_2NF_3" ).dialog({
						width: 500,	
						modal: true,
						buttons: {
							'Try Again': function() {
								$(this).dialog('close');
							},
							'Answer': function() {
								$('#Answer_Table_2NF').show();
								$("#Answer_Table_2NF").dialog({
									width: 500,	
									modal: true								
								});			
							}
						}
					});
				}
			});	
		} 
		
		//QUESTION 2NF = ATTRIBUTE
		
		else if (questionNumber == 3 && questionType == "attribute") {
			var del_clicked = false;
		
			$("#addtable").unbind().click(function() {	//unbind add table from 2nf tables		
			
			});
				
			$("#checkanswer").unbind().click(function() { //unbind check answer from 2nf tables	
			
			});
			
			console.log(data.employee.answer.TwoNF.Tables[0]);
			var TwoNF = data.employee.answer.TwoNF.Tables;
			console.log(TwoNF[0]);
			var id_count = 0;
			var attr_id = null;
			
			$('#UNF').children(".attributes").on("click", function(){
			//$(this).unbind('click');
				del_clicked = false;
				$("#delattribute").css('background-color', 'green');
				if ($(this).attr('id') == null) {
					$(this).attr('id', id_count);
				} else {
					attr_id = $(this).attr('id');
				}
				attribute = $(this)[0].outerHTML;
				 //$(this).bind('click');
				 
				 $('#addattribute').on("click", function(){
					var existing = $('#Drop-1NF-2NF').html();
					$('#Drop-1NF-2NF').html(existing + attribute);
					attribute = "";
					id_count++;
					attr_id = null;
					$('#UNF').children('div').each(function () {
						$(this).removeAttr('id');
					});
					
					$('#Drop-1NF-2NF').children(".attributes").on("click", function(){
						console.log("attributes-clicked");
						attribute_choice="";
						attribute_choice = $(this)[0].outerHTML;
						console.log($(this)[0].outerHTML);
						attr_id = $(this).attr('id');
						check_id = $(this).parent().attr('id');
						var choice_data = $(this).data("attr");
						console.log(choice_data);
						if (check_id == "Drop-1NF-2NF") {
							$('#delattribute').show();
						}
											
						$('.2NF').on("click", function(){
							iii++;
							console.log(iii);
							//console.log(e);
							//$('#delattribute').show();
							var choice_id = $(this).attr('id');
							var attexists = false;
							$('#' + choice_id).children(".attributes").each(function() {
								existing_data = $(this).data("attr");
								console.log(existing_data + " " + choice_data);
								if (existing_data == choice_data) {
									attexists = true;
								}
							});
							
							if (attexists == true || del_clicked == true) {
								console.log("Cannot add the same attribute again");
							} else { //add attribute 
								var existing_2NF = $('#' + choice_id).html();
								if (del_clicked != true) {
									$('#' + choice_id).html(existing_2NF + attribute_choice); 
								} 
								console.log("existing - " + existing_2NF + "attchoice - " + attribute_choice);
								//alert("This is attr_id" + attr_id);
								$('#' + attr_id).attr('name', '2NF' + attr_id);
								$('#' + attr_id).attr('id', Math.floor(Math.random()*1000000));
								choice_id = "";
							}
							
							$(".2NF").unbind().click(function() {
							 
							});
							
							$(".2NF").bind().click(function() {
									//alert('bind');
							});
							
							/*$("#delattribute").unbind().click(function() {
							
							});
							$("#delattribute").bind().click(function() {
							
							});*/
						});
						
							
							$("#checkanswer").click(function() {
								var answerTwoNF1 = TwoNF[0].length;
								var answerTwoNF2 = TwoNF[1].length;
								var answerTwoNF3 = TwoNF[2].length;
								var correct1 = 0;
								var correct2 = 0;
								var correct3 = 0;
								$('#encapsulate-2NF').children('div').each(function (index) {
									var table_id = index;
									$('#2NF-' + index).children('div').each(function (index) {
										if (table_id == 0) {
											//alert("table 0");
											for (var i = 0; i < answerTwoNF1; i++) {
												if (TwoNF[table_id][i] == $(this).html()) {
													correct1++;
												}
											}
										} 
										else if (table_id == 1){
											//alert("table 1");
											for (var j = 0; j < answerTwoNF2; j++) {
												if (TwoNF[table_id][j] == $(this).html()) {
													correct2++;
												}
											}
										}
										else if (table_id == 2){
											//alert("table 2");
											for (var j = 0; j < answerTwoNF3; j++) {
												if (TwoNF[table_id][j] == $(this).html()) {
													correct3++;
												}
											}
										}	
										//Do some checks in here
										//console.log($(this).html());
										//console.log($(this).html());
									});
								});
								if (correct1 == answerTwoNF1 && correct2 == answerTwoNF2 && correct3 == answerTwoNF3) {
									console.log("Correct");
									questionsAnswered[questionNumber] = true;
									console.log(questionsAnswered);
									question(questionsAnswered.length, data);
								} 
								else {
								//alert(correct1 + " - " + correct2);
								$( "#validation_2NF_4" ).dialog({
								  width: 500,	
								  modal: true,
								  buttons: {
									'Try Again': function() {
									$(this).dialog('close');
									},
									'Hint': function() {
									$("#validation_2NF_5").dialog({
									width: 500,	
									modal: true								
									});	
									},
									'Answer': function() {
									$('#Answer_Attribute_2NF').show();
									$("#Answer_Attribute_2NF").dialog({
									width: 500,	
									modal: true								
									});	
									}
								}
								});
								}
							});
							
							function alertEvent2() {
							//alert('flag');
							var twonfattr = null;
							if (del_clicked == true) {
								del_clicked = false;
								$("#delattribute").css('background-color', 'green');
							} else {
								$("#delattribute").css('background-color', 'red');
								del_clicked = true;
							}
							
							$("#2NF-0").children('.attributes').one('click', function() {
								if ($(this).attr("name") == null) {
								} else {
								}
								twonfattr = $(this).attr('id');
								if (twonfattr != null && del_clicked == true) {
									$('#' + twonfattr).remove();
								}
							});
							
							$("#2NF-1").children('.attributes').one('click',function() {
								if ($(this).attr("name") == null) {
								} else {
								}
								twonfattr = $(this).attr('id');
								if (twonfattr != null && del_clicked == true) {
									$('#' + twonfattr).remove();
								}
							});
							
							$("#2NF-2").children('.attributes').one('click',function() {
								if ($(this).attr("name") == null) {
								} else {
								}
								twonfattr = $(this).attr('id');
								if (twonfattr != null && del_clicked == true) {
									$('#' + twonfattr).remove();
								}
							});
							
							$("#Drop-1NF-2NF").children('.attributes').one('click', function() {
								//alert("flag2");
								if ($(this).attr("name") == null) {
								} else {
								}
								twonfattr = $(this).attr('id');
								if (twonfattr != null && del_clicked == true) {
									$('#' + twonfattr).remove();
								}
							});
							/*$("#1NF-0").children('.attributes').unbind().click(function() {
							
							});
							$("#1NF-0").children('.attributes').bind().click(function() {
							
							});
							$("#1NF-1").children('.attributes').unbind().click(function() {
							
							});
							$("#1NF-1").children('.attributes').bind().click(function() {
							
							});
							$("#Drop-UNF-1NF").children('.attributes').unbind().click(function() {
							
							});*/
							/*$("#Drop-UNF-1NF").children('.attributes').bind().click(function() {
							
							});*/
						}
						$("#delattribute").bind().click(alertEvent2);
						//When you want to ensure it won't happen twice...
						$("#delattribute").unbind().click(alertEvent2);
						//$("#delattribute").bind().click(alertEvent2);	
							
					});
				});	
			});	 
		}	
		
		//QUESTION 3NF = TABLE
			
		else if (questionNumber == 4 && questionType == "table") {
		
		$("div").unbind().click(function() {
							 
			});
						
			$("#addtable").click(function() {
				//if (add_table == false) {
				//	add_table = true;
				//	alert('flag');
					existing = $('#encapsulate-3NF').html();
					var table = '<div id="3NF-' + numberOfTables + '" class="3NF" style="position: relative; float: left; width: 95%; height: 300px; margin-left: 1%; margin-top: 1%; border:2px solid; border-radius:10px; padding: 3px; -moz-border-radius:10px; "></div>';
					$('#encapsulate-3NF').html(existing + table);
					numberOfTables++;
				//}
			});
			
			$("#deltable").click(function() {
				if (numberOfTables == 0) {
					console.log("No Tables Exist");
				}
				else if (numberOfTables > 0) {
					numberOfTables = numberOfTables - 1;
					existing = $('#encapsulate-3NF').html();
					$('#3NF-' + numberOfTables).remove();
				}
			});
			
			$("#checkanswer").click(function() {
				if (numberOfTables == (data.employee.answer.ThreeNF.Tables.length)){
					console.log("Correct");
					questionsAnswered[questionNumber] = true;
					console.log(questionsAnswered);
					question(questionsAnswered.length, data);
				} else if (numberOfTables == 0) {
				//	alert ("3NF requires tables"); //change with css
				$("#validation_3NF_1").dialog({
					width: 500,	
					modal: true,
					buttons: {
						'Answer': function() {
							$('#Answer_Table_3NF').show();
							$("#Answer_Table_3NF").dialog({
							width: 500,	
							modal: true								
							});	
							},
						'Try Again': function() {
							$(this).dialog('close');
							}
						}
					});	//dialog end			
				} else if (numberOfTables <= 3) {
				//	alert ("3NF requires more tables"); //change with css
				$("#validation_3NF_2").dialog({
					width: 500,	
					modal: true,
					buttons: {
						'Try Again': function() {
							$(this).dialog('close');
							},
						'Answer': function() {
							$('#Answer_Table_3NF').show();
							$("#Answer_Table_3NF").dialog({
							width: 500,	
							modal: true								
							});	
							}
						}
					});	//dialog end			
				} else if (numberOfTables > 4) {
				//	alert("3NF requires less tables"); // change with css
				$("#validation_3NF_3").dialog({
					width: 500,	
					modal: true,
					buttons: {
						'Try Again': function() {
							$(this).dialog('close');
							},
						'Answer': function() {
							$('#Answer_Table_3NF').show();
							$("#Answer_Table_3NF").dialog({
							width: 500,	
							modal: true								
							});	
							}
						}
					});	//dialog end
				} 
			});	
		}

		//QUESTION 3NF = ATTRIBUTE
		
		else if (questionNumber == 5 && questionType == "attribute") {
		var del_clicked = false;
		
			$("#addtable").unbind().click(function() {	//unbind add table from 3nf tables	
			
			});
					
			$("#checkanswer").unbind().click(function() { //unbind check answer from 3nf tables	
			
			});
			
			console.log(data.employee.answer.ThreeNF.Tables[0]);
			var ThreeNF = data.employee.answer.ThreeNF.Tables;
			console.log(ThreeNF[0]);
			var id_count = 0;
			var attr_id = null;
			
			$('#UNF').children(".attributes").on("click", function(){
			//$(this).unbind('click');
				del_clicked = false;
				$("#delattribute").css('background-color', 'green');
				if ($(this).attr('id') == null) {
					$(this).attr('id', id_count);
				} else {
					attr_id = $(this).attr('id');
				}
				attribute = $(this)[0].outerHTML;
				 //$(this).bind('click');
				 
				 $('#addattribute').on("click", function(){
					var existing = $('#Drop-2NF-3NF').html();
					$('#Drop-2NF-3NF').html(existing + attribute);
					attribute = "";
					id_count++;
					attr_id = null;
					$('#UNF').children('div').each(function () {
						$(this).removeAttr('id');
					});
					
					$('#Drop-2NF-3NF').children(".attributes").on("click", function(){
						console.log("attributes-clicked");
						attribute_choice="";
						attribute_choice = $(this)[0].outerHTML;
						console.log($(this)[0].outerHTML);
						attr_id = $(this).attr('id');
						check_id = $(this).parent().attr('id');
						var choice_data = $(this).data("attr");
						console.log(choice_data);
						if (check_id == "Drop-2NF-3NF") {
							$('#delattribute').show();
						}
												
						$('.3NF').on("click", function(){
							iii++;
							console.log(iii);
							//console.log(e);
							//$('#delattribute').show();
							var choice_id = $(this).attr('id');
							var attexists = false;
							$('#' + choice_id).children(".attributes").each(function() {
								existing_data = $(this).data("attr");
								console.log(existing_data + " " + choice_data);
								if (existing_data == choice_data) {
									attexists = true;
								}
							});
							
							if (attexists == true || del_clicked == true) {
								console.log("Cannot add the same attribute again");
							} else {  //add attribute 
								var existing_3NF = $('#' + choice_id).html();
								if (del_clicked != true) {
									$('#' + choice_id).html(existing_3NF + attribute_choice); 
								} 
								console.log("existing - " + existing_3NF + "attchoice - " + attribute_choice);
								//alert("This is attr_id" + attr_id);
								$('#' + attr_id).attr('name', '1NF' + attr_id);
								$('#' + attr_id).attr('id', Math.floor(Math.random()*1000000));
								choice_id = "";
							}
							
							$(".3NF").unbind().click(function() {
					
							});
							
							$(".3NF").bind().click(function() {
									//alert('bind');
							});
							
							/*$("#delattribute").unbind().click(function() {
							
							});
							$("#delattribute").bind().click(function() {
							
							});*/
						});
						
							$("#checkanswer").click(function() {
								var answerThreeNF1 = ThreeNF[0].length;
								var answerThreeNF2 = ThreeNF[1].length;
								var answerThreeNF3 = ThreeNF[2].length;
								var answerThreeNF4 = ThreeNF[3].length;
								var correct1 = 0;
								var correct2 = 0;
								var correct3 = 0;
								var correct4 = 0;
								$('#encapsulate-3NF').children('div').each(function (index) {
									var table_id = index;
									$('#3NF-' + index).children('div').each(function (index) {
										if (table_id == 0) {
											//alert("table 0");
											for (var i = 0; i < answerThreeNF1; i++) {
												if (ThreeNF[table_id][i] == $(this).html()) {
													correct1++;
												}
											}
										} 
										else if (table_id == 1){
											//alert("table 1");
											for (var j = 0; j < answerThreeNF2; j++) {
												if (ThreeNF[table_id][j] == $(this).html()) {
													correct2++;
												}
											}
										}
										else if (table_id == 2){
											//alert("table 2");
											for (var j = 0; j < answerThreeNF3; j++) {
												if (ThreeNF[table_id][j] == $(this).html()) {
													correct3++;
												}
											}
										}
										else if (table_id == 3){
											//alert("table 2");
											for (var j = 0; j < answerThreeNF4; j++) {
												if (ThreeNF[table_id][j] == $(this).html()) {
													correct4++;
												}
											}
										}										
										//Do some checks in here
										//console.log($(this).html());
									});
								});
								if (correct1 == answerThreeNF1 && correct2 == answerThreeNF2 && correct3 == answerThreeNF3 && correct4 == answerThreeNF4) {
									console.log("Correct");
									questionsAnswered[questionNumber] = true;
									console.log(questionsAnswered);
									question(questionsAnswered.length, data);
								} 
								else {
								//alert(correct1 + " - " + correct2);
								$( "#validation_3NF_4" ).dialog({
								  width: 500,	
								  modal: true,
								  buttons: {
									'Try Again': function() {
									$(this).dialog('close');
									},
									'Hint': function() {
									$("#validation_3NF_5").dialog({
									width: 500,	
									modal: true								
									});	
									},
									'Answer': function() {
									$('#Answer_Attribute_3NF').show();
									$("#Answer_Attribute_3NF").dialog({
									width: 500,	
									modal: true								
									});	
									}
								}
								});
								}
							});
							
							function alertEvent3() {
						//	alert('flag');
							var threenfattr = null;
							if (del_clicked == true) {
								del_clicked = false;
								$("#delattribute").css('background-color', 'green');
							} else {
								$("#delattribute").css('background-color', 'red');
								del_clicked = true;
							}
							$("#3NF-0").children('.attributes').one('click', function() {
								if ($(this).attr("name") == null) {
								} else {
								}
								threenfattr = $(this).attr('id');
								if (threenfattr != null && del_clicked == true) {
									$('#' + threenfattr).remove();
								}
							});
							$("#3NF-1").children('.attributes').one('click',function() {
								if ($(this).attr("name") == null) {
								} else {
								}
								threenfattr = $(this).attr('id');
								if (threenfattr != null && del_clicked == true) {
									$('#' + threenfattr).remove();
								}
							});
							$("#3NF-2").children('.attributes').one('click',function() {
								if ($(this).attr("name") == null) {
								} else {
								}
								threenfattr = $(this).attr('id');
								if (threenfattr != null && del_clicked == true) {
									$('#' + threenfattr).remove();
								}
							});
							$("#3NF-3").children('.attributes').one('click',function() {
								if ($(this).attr("name") == null) {
								} else {
								}
								threenfattr = $(this).attr('id');
								if (threenfattr != null && del_clicked == true) {
									$('#' + threenfattr).remove();
								}
							});
							$("#Drop-2NF-3NF").children('.attributes').one('click', function() {
							//	alert("flag2");
								if ($(this).attr("name") == null) {
								} else {
								}
								threenfattr = $(this).attr('id');
								if (threenfattr != null && del_clicked == true) {
									$('#' + threenfattr).remove();
								}
							});
							/*$("#1NF-0").children('.attributes').unbind().click(function() {
							
							});
							$("#1NF-0").children('.attributes').bind().click(function() {
							
							});
							$("#1NF-1").children('.attributes').unbind().click(function() {
							
							});
							$("#1NF-1").children('.attributes').bind().click(function() {
							
							});
							$("#Drop-UNF-1NF").children('.attributes').unbind().click(function() {
							
							});*/
							/*$("#Drop-UNF-1NF").children('.attributes').bind().click(function() {
							
							});*/
						}
						$("#delattribute").bind().click(alertEvent3);
						//When you want to ensure it won't happen twice...
						$("#delattribute").unbind().click(alertEvent3);
						//$("#delattribute").bind().click(alertEvent3);	
						});
					});	
				});	 
			}	
		});
	};