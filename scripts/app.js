var breeds;

$(document).ready(function () {
  getAllBreeds();
  $("#btn-search").off("click").on("click", function () {
    findBreedImage($("#inp-search").val());
  });
});

function findBreedImage(breed) {
  loading();
  if (breed !== undefined && breed.length > 0) {
    let url = "https://dog.ceo/api/breed/" + breed + "/images/random";
    $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      success: function (response) {
        if (response === undefined || response.status !== "success") {
          dogNotFound();
          return;
        }
        $("#doggy").attr("src", response.message);
      },
      error: function (error) {
        dogNotFound();
      }
    });
  } else {
    dogNotFound();
  }
}

function loading() {
  $("#doggy").attr("src", "images/loading.gif");
}

function fillAutoComplete() {
  $.each(breeds, function (indexInArray, _) {
    $("#dogbreeds").append('<option value="' + indexInArray + '" />');
  });
}

function dogNotFound() {
  $("#doggy").attr("src", "images/dogNotFound.jpg");
}

function getAllBreeds() {
  $.ajax({
    type: "GET",
    url: "https://dog.ceo/api/breeds/list/all",
    dataType: "json",
    success: function (response) {
      if (response.status = "success") {
        breeds = response.message;
        fillAutoComplete();
      }
    }
  });
}