/*collection page loadmore*/
$(document).on('click', '.js-load-more', function () {
    var $this = $(this),
        totalPages = parseInt($('[data-total-pages]').val()),
        currentPage = parseInt($('[data-current-page]').val()),
        nextPage = currentPage + 1;
    $this.attr('disabled', true);
    $this.find('[load-more-text]').text('Loading...');
    var nextUrl = $('[data-next-url]').val();
    $('[data-current-page]').val(nextPage);
    $.ajax({
        url: nextUrl,
        type: 'GET',
        dataType: 'html',
        success: function (responseHTML) {
            $('.grid--view-items').append($(responseHTML).find('.grid--view-items').html());
            $('.load-more_wrap').html($(responseHTML).find('.load-more_wrap').html());
        },
        complete: function () {
            if (nextPage == totalPages) {
                $('.js-load-more').remove();
            }
            if (currentPage <= totalPages) {
                $this.attr('disabled', false);
                $this.find('[load-more-text]').text('Load More +');
            }
        }
    })
});
