var questionsAnswered = new Array();
var numberOfQuestions = null;
var numberOfAttributes = null;

function getdata() {
		$(function () 
		{
				$.ajax({                                      
					url: 'data/data.json',
					cache: false,          			
					data: {                          
                        //college_ID: college_ID, These parameters can be used to pass info to PHP eventually
						},        
					dataType: 'json',       
					success: function(data)    
					{
						//console.log(data);
						numberOfQuestions = data.employee.question.questionList.length;
						numberOfAttributes = data.employee.question.UNF.length;

						if (numberOfQuestions > 0 && numberOfQuestions != null) {
							for (var i = 0; i < numberOfQuestions; i++) {
								questionsAnswered[i] = false;
							}
							question(questionsAnswered.length, data)
						}
					}    
				});
		});
	}
	
function getvideo1() {

	var obj,
		source;

		obj = document.createElement('video');
		$(obj).attr('id', 'Answer_Table_1NF');
		$(obj).attr('class', 'video-js vjs-default-skin');
		$(obj).attr('width', '480');
		$(obj).attr('data-height', '480');
		$(obj).attr('controls', ' ');
		$(obj).attr('preload', 'auto');
		$(obj).attr('data-setup', '{}');

		source = document.createElement('source');
		$(source).attr('type', 'video/mp4');
		$(source).attr('src', 'videos/Answer_Table_1NF.mp4');

		$("#Answer_Table_1NF").append(obj);
		$(obj).append(source);
}	

function getvideo2() {

	var obj,
		source;

		obj = document.createElement('video');
		$(obj).attr('id', 'Answer_Attribute_1NF');
		$(obj).attr('class', 'video-js vjs-default-skin');
		$(obj).attr('width', '480');
		$(obj).attr('data-height', '480');
		$(obj).attr('controls', ' ');
		$(obj).attr('preload', 'auto');
		$(obj).attr('data-setup', '{}');

		source = document.createElement('source');
		$(source).attr('type', 'video/mp4');
		$(source).attr('src', 'videos/Answer_Attribute_1NF.mp4');

		$("#Answer_Attribute_1NF").append(obj);
		$(obj).append(source);
}	

function getvideo3() {

	var obj,
		source;

		obj = document.createElement('video');
		$(obj).attr('id', 'Answer_Table_2NF');
		$(obj).attr('class', 'video-js vjs-default-skin');
		$(obj).attr('width', '480');
		$(obj).attr('data-height', '480');
		$(obj).attr('controls', ' ');
		$(obj).attr('preload', 'auto');
		$(obj).attr('data-setup', '{}');

		source = document.createElement('source');
		$(source).attr('type', 'video/mp4');
		$(source).attr('src', 'videos/Answer_Table_2NF.mp4');

		$("#Answer_Table_2NF").append(obj);
		$(obj).append(source);
}	

function getvideo4() {

	var obj,
		source;

		obj = document.createElement('video');
		$(obj).attr('id', 'Answer_Attribute_2NF');
		$(obj).attr('class', 'video-js vjs-default-skin');
		$(obj).attr('width', '480');
		$(obj).attr('data-height', '480');
		$(obj).attr('controls', ' ');
		$(obj).attr('preload', 'auto');
		$(obj).attr('data-setup', '{}');

		source = document.createElement('source');
		$(source).attr('type', 'video/mp4');
		$(source).attr('src', 'videos/Answer_Attribute_2NF.mp4');

		$("#Answer_Attribute_2NF").append(obj);
		$(obj).append(source);
}	

function getvideo5() {

	var obj,
		source;

		obj = document.createElement('video');
		$(obj).attr('id', 'Answer_Table_3NF');
		$(obj).attr('class', 'video-js vjs-default-skin');
		$(obj).attr('width', '480');
		$(obj).attr('data-height', '480');
		$(obj).attr('controls', ' ');
		$(obj).attr('preload', 'auto');
		$(obj).attr('data-setup', '{}');

		source = document.createElement('source');
		$(source).attr('type', 'video/mp4');
		$(source).attr('src', 'videos/Answer_Table_3NF.mp4');

		$("#Answer_Table_3NF").append(obj);
		$(obj).append(source);
}	

function getvideo6() {

	var obj,
		source;

		obj = document.createElement('video');
		$(obj).attr('id', 'Answer_Attribute_3NF');
		$(obj).attr('class', 'video-js vjs-default-skin');
		$(obj).attr('width', '480');
		$(obj).attr('data-height', '480');
		$(obj).attr('controls', ' ');
		$(obj).attr('preload', 'auto');
		$(obj).attr('data-setup', '{}');

		source = document.createElement('source');
		$(source).attr('type', 'video/mp4');
		$(source).attr('src', 'videos/Answer_Attribute_3NF.mp4');

		$("#Answer_Attribute_3NF").append(obj);
		$(obj).append(source);
}	