
    $('#test').on('click', async function(){
        


        event.preventDefault();
        let id = $('#post-id').text();
        console.log($('#post-id').text());
        if($('#comment-textarea').val() === ''){
          alert('Please enter a comment');
          return;

        }
        const response = await fetch(`/api/resource/${id}`, {
          method: "POST",
          body: JSON.stringify({
            text: $('#comment-textarea').val(),
            resource_id: $('#post-id').text()
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      
        if (response.ok) {
          window.location.reload();
        } else {
          console.log(response);
        }




    })
