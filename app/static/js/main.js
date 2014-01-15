var refreshEHandlers = function() {
	$('#templates .template-button').unbind();
	$('#templates .template-button').hover(
		function() { $(this).find('.icon').addClass('hover'); },
		function() { $(this).find('.icon').removeClass('hover'); }
	);

	$('#templates .icon.delete').unbind();
	$('#templates .icon.delete').click(function() {
		if ($('#templates > div').length <= 2) {
			alert("You need at least one page!");
			return;
		}
		var pageID = $(this).parent().attr('data-page');
		$('#' + pageID)
			.attr('class', 'template-button red')
			.css('opacity', 0)
			.animate({
				height: 0
			}, 600, function() {
				$(this).remove();
			});
		$('#pages .' + pageID).animate({
			opacity: 0
		}, function() {
			$(this).remove();
		});
	});

	// for initiating editing
	$('#templates .icon.edit').unbind();
	$('#templates .icon.edit').click(function() {
		$(this).parent().find('input')
			.attr('disabled', false)
			.focus();
	});

	// doing the editing
	$('.template-button > input.edit').unbind();
	$('.template-button > input.edit').bind('keyup', function(e) {
		if (e.keyCode === 13) {
			$(this).attr('disabled', true);
		}
		$('#pages .' + $(this).parent().attr('id') + ' span').text($(this).val());
	}).focusout(function() {
		$(this).attr('disabled', true);
	});

	// select active page
	$('#pages > div.page-button').unbind();
	$('#pages > div.page-button').click(function() {
		var currClass = $(this).attr('class');
		var pageID = currClass.slice(currClass.indexOf('pageID'));
		console.log(pageID)
		$('#templates .template-button.blue').removeClass('blue');
		$('#' + pageID).addClass('blue')

		$('#pages > div').removeClass('active');
		$(this).addClass('active');
	});

	// for editing content
	$('.content > div').unbind();
	$('.content > div').focusin(function() { $(this).children('.del-icon').show(); });
	$('.content > div').focusout(function() { $(this).children('.del-icon').hide(); });

	// for deleting content
	$('#content-cont .del-icon').unbind();
	$('#content-cont .del-icon').click(function() {
		$(this).parent().remove();
	});
}
refreshEHandlers();

// for making new pages
var	currPageID = 1,
	newPageInput = $("#templates .template-button.new input");

newPageInput.bind('keyup', function(e) {
	// if enter key
	if (e.keyCode === 13) {
		createNewPage();
	}

	// empty empty text if there is text in input box
	if ($(this).val())
		$('.template-button.new span').text("");
	else
		$('.template-button.new span').text("Add a new page");
});

$('#grid-toggle.icon').click(function() { $(this).toggleClass('active'); });
$('#templates .icon.add').click(function() { createNewPage(); });

var createNewPage = function() {
	if (newPageInput.val().replace(/\s/g,"")) {
		if ($('#pages > div').length >= 6) {
			alert("Too many pages harm the user experience!");
			newPageInput.val('');
			return;
		}

		var newTemplateButton = $('#templates .template-button').first().clone();
		newTemplateButton
			.attr('style', "")
			.attr('class', 'template-button')
			.attr('id', 'pageID' + currPageID)
			.children('input').val(newPageInput.val());
		$(".template-button.new").before(newTemplateButton);

		$("#pages").append($('<div class="page-button pageID' + (currPageID++) + '"><span>' + newPageInput.val() + '</span></div>'))
		
		newPageInput.val('');

		refreshEHandlers();
	}
};

// for draggable icons
$('#content-cont').droppable();
$('#elements .icon').draggable({
	zIndex: 100,
	distance: 20,
	containment: 'document',
	revert: function(event) {
		$(this).data("ui-draggable").originalPosition = { top: 0, left: 0 };
		return !event;
	},
	revertDuration: 100,
	drag: function(event, ui) {
		var contentCont = $('#content-cont'),
			content = $('.content'),
			uiLeft = ui.offset.left,
			uiTop = ui.offset.top,
			contLeft = contentCont.offset().left,
			contTop = contentCont.offset().top,
			contWidth = contentCont.width(),
			contHeight = contentCont.height();

		if (content.length > 1) return;
		if ($(this).attr('id') !== 'text') return;

		// if in #content-cont
		if (uiLeft > contLeft && uiTop > contTop) {
			content.css({width: '50%'});
			if (uiLeft < contLeft + contWidth/2) // on left
				content.css({float: 'right'});
			else if (uiLeft > contLeft + contWidth/2) // on right
				content.css({float: 'left'});
		} else {
			content.css({width: '100%', float: 'left'});
		}
	},
	stop: function(event, ui) {
		var contentCont = $('#content-cont'),
			content = $('.content'),
			uiLeft = ui.offset.left,
			uiTop = ui.offset.top,
			contLeft = contentCont.offset().left,
			contTop = contentCont.offset().top,
			contWidth = contentCont.width(),
			contHeight = contentCont.height();

		// if in #content-cont
		if (uiLeft > contLeft && uiTop > contTop) {
			$(this).css({top:0,left:0});
			if (content.length > 1) return;
			if (uiLeft < contLeft + contWidth/2) // on left
				content.before($(content).clone());
			else if (uiLeft > contLeft + contWidth/2) // on right
				content.after($(content).clone());
		}

		refreshEHandlers();
	}
});