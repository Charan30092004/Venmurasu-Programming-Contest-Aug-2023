function back() {
  document.getElementById("viewspecific").innerHTML = "";
  document.getElementById("Output").style.display = "flex";
  document.getElementById("viewspecific").style.display = "none";
}
async function view(book) {
  const coverImageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
  const title = book.title;
  const authors = book.author_name
    ? book.author_name.join(", ")
    : "Unknown Author";
  const publishYear = book.first_publish_year || "N/A";
  document.getElementById("Output").style.display = "none";
  document.getElementById("viewspecific").style.display = "flex";
  const content = document.createElement("div");
  content.setAttribute("id", "details");
  document.getElementById("viewspecific").appendChild(content);

  const ImageH = document.createElement("img");
  ImageH.setAttribute("src", `${coverImageUrl}`);
  document.getElementById("details").appendChild(ImageH);

  const TitleH = document.createElement("h1");
  TitleH.innerText = `Title: ${title}`;
  document.getElementById("details").appendChild(TitleH);

  const AuthorH = document.createElement("h3");
  AuthorH.innerHTML = `   Authors: ${authors}`;
  document.getElementById("details").appendChild(AuthorH);

  const PublishYearH = document.createElement("h5");
  PublishYearH.innerHTML = `   Publish Year: ${publishYear}`;
  document.getElementById("details").appendChild(PublishYearH);

  const backH = document.createElement("Button");
  backH.innerHTML = "Back";
  backH.setAttribute("type", "button");
  backH.addEventListener("click", "back()");
  doucument.getElementById("details").appendChild(backH);
}

async function searchBooks(query) {
  const apiUrl = `https://openlibrary.org/search.json?q=${query}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.numFound === 0) {
      console.log("No books found for the given query.");
      return;
    }

    console.log(`Found ${data.numFound} books:`);
    document.getElementById("Output").innerHTML = "";
    data.docs.forEach((book, index) => {
      const coverImageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
      const title = book.title;
      const authors = book.author_name
        ? book.author_name.join(", ")
        : "Unknown Author";
      const publishYear = book.first_publish_year || "N/A";

      const idName = `${index}`;
      const content = document.createElement("div");
      content.setAttribute("id", `${idName}`);
      document.getElementById("Output").appendChild(content);

      const ImageH = document.createElement("img");
      ImageH.setAttribute("src", `${coverImageUrl}`);
      document.getElementById(`${idName}`).appendChild(ImageH);

      const TitleH = document.createElement("h2");
      TitleH.innerText = `${index + 1}. Title: ${title}`;
      document.getElementById(`${idName}`).appendChild(TitleH);

      const AuthorH = document.createElement("h4");
      AuthorH.innerHTML = `   Authors: ${authors}`;
      document.getElementById(`${idName}`).appendChild(AuthorH);

      const PublishYearH = document.createElement("h7");
      PublishYearH.innerHTML = `   Publish Year: ${publishYear}`;
      document.getElementById(`${idName}`).appendChild(PublishYearH);

      const viewbutton = document.createElement("Button");
      viewbutton.innerHTML = "View";
      viewbutton.addEventListener("click", function () {
        view(book);
      });

      document.getElementById(`${idName}`).appendChild(viewbutton);

      // console.log(`${index + 1}. Title: ${title}`);
      // console.log(`   Authors: ${authors}`);
      // console.log(`   Publish Year: ${publishYear}`);
      // console.log(`   Cover Image: ${coverImageUrl}`);
      // console.log();
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

function getdetails() {
  const searchQuery = document.getElementById("input").value;
  searchBooks(searchQuery);
}
var input = document.getElementById("input");
input.addEventListener("keypress", function (t) {
  if (t.key == "Enter") {
    getdetails();
  }
});
