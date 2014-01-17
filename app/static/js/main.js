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
        var contentCont = $('#board'),
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
        var contentCont = $('#board'),
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
    }
});