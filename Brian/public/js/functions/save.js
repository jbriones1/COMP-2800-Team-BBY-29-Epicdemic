export function saveGame(playerData, callback) {
    
    console.log(playerData);

    $.ajax({
        url:"/Epicdemic",
        type: "POST",
        data: playerData,
        dataType: 'json',
        success: function(result) {
            console.log("Post Success");
        }
    });
}

export function loadGame() {
    
        $.getJSON('/loadgame', function(data) {
            return data;
        });
    
}

