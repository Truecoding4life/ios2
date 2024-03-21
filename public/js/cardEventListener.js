$(document).ready(function () {
    $(".card-to-listen").each(function () {
      $(this).on("click", function (event) {
        let id = $(this).find(".post-id").text();
        let target = event.target;
        let clicked = target.id;
  
        switch (clicked) {
          case "bookmark-button":
            console.log("Card listener JS");
            alert("This feature is still under development. Please check back later.");
            break;
          case "like-button":
            // handleAddLike(event, id); // Pass event object and resource ID
            handleAddLike(id);
            break;
          case "comment-button":
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
        headers: { // Corrected typo
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        window.location.reload();
    } else {
        // Handle non-OK response status
        console.log("Error:", response.statusText);
        alert("Failed to like resource. Please try again later.");
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred. Please try again later.");
    }
  };