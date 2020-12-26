$(document).ready(function () {
    console.log('Hello desde js');
    console.log('jQuery is working');
    fetchTask();
    let edit = false;

    /*     Elementos donde se muestra los resultados de la busqueda */
    $('#taskResult').hide();

    /*     Busqueda de tareas */
    $('#searchtask').keyup(function () {
        if ($('#searchtask').val()) {

            let search = $('#searchtask').val();
            /*         console.log(search); */

            $.ajax({
                url: 'task-search.php',
                type: 'POST',
                data: { search: search }, // aqui enviamos | o simplmente {search} por lo que se repite
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

    /*     Agregar tareas */
    $('#taskForm').submit(function (e) {

        const postData = {
            name: $('#name').val(),
            description: $('#description').val(),
            id:$('#taskId').val()
        };

        let url = edit===false ? 'task-add.php' : 'task-edit.php';
        console.log(url);

        e.preventDefault();

        $.post(url, postData, function (response) {
            console.log(response);   
            fetchTask();
            $('#taskForm').trigger('reset');
        })

    });


    /* obtener la lista de tareas  */
    function fetchTask() {
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function (response) {
                const tasks = JSON.parse(response);
                let template = '';
                tasks.forEach(task => {
                    template +=
                        `<tr taskId="${task.id}">
                        <td > ${task.id} </td>
                        <td> 
                            <a href="#" class="task-item">${task.name}</a> 
                        </td>
                        <td> ${task.description} </td>
                        <td> 
                            <button class="task-delete | btn btn-outline-danger m-auto">
                                Delete
                            </button>
                        </td>
                        
                    </tr>`
                });

                $('#tasks').html(template);
            }
        })
    }

    $(document).on('click', '.task-delete', function () {
        if (confirm('Are you sure you want to delete it?')) {
            //obtener el id|  btn     padre:col      padre: row    asi tenemos acceso al id
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('taskId');
            $.post('task-delete.php', { id }, function (response) {
                fetchTask();
                console.log(response);
            })
        }
    })

    $(document).on('click','.task-item',function () {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');
        console.log(id);

        $.post('task-single.php',{id}, function (response) {
            const task = JSON.parse(response);
            $('#name').val(task.name);
            $('#description').val(task.description);
            $('#taskId').val(task.id);
            edit = true;
            console.log(task);
        })
    })

});