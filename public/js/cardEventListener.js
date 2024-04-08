let userId = parseInt($("#user-id").text());


$(document).ready(function () {
  $(".card-to-listen").each(function () {
    let likeButton = $(this).find(".like-button");

    let id = $(this).find(".post-id").text();
    if (id) {
      fetchPost(id).then((data) => {
        if (data) {
          const like = data.likes.map((like) => like.user_id);
          const postLiked = like.includes(userId);
          if(postLiked){
            $(this).find("#like-button").addClass("liked");
           
          }
          
        }
      });
    }

    $(this).on("click", function (event) {
      let target = event.target;
      let clicked = target.id;

      switch (clicked) {
        case "bookmark-button":
          console.log("Card listener JS");
          alert(
            "This feature is still under development. Please check back later."
          );
          break;
        case "like-button":
          // handleAddLike(event, id); // Pass event object and resource ID

          if(verifyLike(clicked, userId) === false){

            handleAddLike(id);
          }
          break;
        case "comment-text-button":
          location.href = "/resource/" + id;
          break;
        default:
          // Handle other cases if needed
          break;
      }
    });
    

  });
});

const handleAddLike = async (resourceID) => {
  try {
    const response = await fetch("/api/", {
      method: "POST",
      body: JSON.stringify({
        id: resourceID,
      }),
      headers: {
        // Corrected typo
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.reload();
    } else {
      let errStatus = response.statusText;
      // Handle non-OK response status
      console.log("Error:", response.statusText);
      if (errStatus === "Conflict") {
        handleNoFound("You have already liked this post");
      } else {
        handleNoFound("Fail to like Post, Please try again later");
      }
    }
  } catch (err) {
    console.log("Error:", err);
  }
};

const verifyLike = function(array, id){
  return array.includes(id);
  }


const fetchPost = async (id) => {
  try {
    const response = await fetch(`/api/like/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();



      return data;
    } else {
      console.log("Error:", response.statusText);
    }
  } catch (err) {
    console.log("Error:", err);
  }
};
