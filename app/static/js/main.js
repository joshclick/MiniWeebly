var refreshEHandlers = function() {
    $('#templates .template-button').unbind();
    $('#templates .template-button').hover(
        function() { $(this).find('.icon').addClass('hover'); },
        function() { $(this).find('.icon').removeClass('hover'); }
    );

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