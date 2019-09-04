var input = document.querySelector(".search-txt");

function searchFunction() {
    var data = input.value;
    data = "function called\ninput data: " + data + "\nreturned: none";
    alert(data);
}

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.querySelector(".search-btn").click();
    }
    console.log(input.value);
  });