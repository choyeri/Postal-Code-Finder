// function searchinput() {
//     presskey = window.event.key;
//     if(presskey == 'Backspace') {
//         $("#search-list").empty();
//     }
//     else if(presskey == ' ') return;
//     else if(presskey == 'HangulMode') return;
//     else if(presskey == 'Alt') return;
//     else if(presskey == 'Control') return;
//     else if (presskey == 'Enter') {
//         pagereload();
//     }
//     dosearch();
// }
// function pagereload(){
//     window.location.reload();
// }

function delay(callback, ms) {
    let timer = 0;
    return function() {
        let context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            callback.apply(context, args);
        }, ms || 0);
    };
}

// function dosearch(){
$(function() {
    $(".search-txt").keyup(delay(function(){
        var form1 = $(".search-txt").serialize();
        $.ajax({
            url: "/search",
            data: form1,
            method: "GET",
            dataType: "json",
            success : function(data) {
                let searchlist = "";
                $.each(data,function(index,item){
                    $("#search-list").empty();
                    if(item.buildingNo2 == 0){
                        searchlist+='<li><p class="sc">('+item.zipCode+') '+item.SiDo+' '+item.SiGunGu+' '+item.Doro+' '+item.buildingNo1+' '+item.building+'</p></li>'
                    }
                    else{
                    searchlist+='<li><p class="sc">('+item.zipCode+') '+item.SiDo+' '+item.SiGunGu+' '+item.Doro+' '+item.buildingNo1+'-'+ item.buildingNo2+' '+item.building+'</p></li>'
                    }
                });
                console.log(searchlist);
                console.time('dklfjlk');
                $("#search-list").append(searchlist);
                console.timeEnd('dklfjlk');
            },
            error : function(request,error){
                alert('error');
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });
    },500));

    // $("#search-list").click(function(event){
    //     console.log(event.target);
    //     $(".search-txt").val(event.target.textContent);
    //     $("#search-list").hide();
    //     console.log(event.target.textContent);
    // })

    $(document).on('click','.sc',function(event){
        console.log(event.target);
        $(".search-txt").val(event.target.textContent);
        $("#search-list").hide();
        console.log(event.target.textContent);
    })

    searchlistdisplay();
});


function searchlistdisplay(){
    $("#search-list").hide();
    $(".search-txt").keyup(function(){
        if($(".search-txt").val()=='') {
            $("#search-list").hide();
        }
        else {
            $("#search-list").show();
        }
    })
}

