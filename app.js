$(function() {
    console.log('Hello desde js');
    console.log('jQuery is working');

    $('#taskResult').hide();

    $('#searchtask').keyup(function () {
        if ($('#searchtask').val()) {
            
            let search = $('#searchtask').val();
            /*         console.log(search); */
            
            $.ajax({
                url: 'task-search.php',
                type: 'POST',
                data: {search: search}, // aqui enviamos | o simplmente {search} por lo que se repite
                success: function (response) {
                    let tasks = JSON.parse(response);   
                    let template = ``;                 
                    tasks.forEach(task => {
                        template += 
                        `<li>
                            ${task.name}
                        </li>`
                        /* console.log(task); */
                        $('#container').html(template);
                        $('#taskResult').show();

                    });
                }
            })
        }
    });

});