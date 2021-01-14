//load game

$(document).ready(function() {

    startScreen()


});

function startScreen() {
    $('.flexboard').hide()

    $('#newGameBtn').click(() => {
        $('.options').hide()
        $('.flexboard').show()

        playGame()
    })

    $('#rules').click(() => {
        $('#rulesModal').css('display', 'block')

    })


}

function reloadGame() {

    location.reload()

}
$(window).click((e) => {
    if ($(e.target).hasClass('modal')) {
        $('#rulesModal').remove()
    }
})