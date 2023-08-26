
async function searchBooks(query) {
    const apiUrl = `https://openlibrary.org/search.json?q=${query}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await  response.json();
  
      if (data.numFound === 0) {
        console.log('No books found for the given query.');
        return;
      }
  
      console.log(`Found ${data.numFound} books:`);
      document.getElementById("Output").innerHTML="";
      data.docs.forEach((book, index) => {
        const coverImageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
        const title = book.title;
        const authors = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
        const publishYear = book.first_publish_year || 'N/A';

        


        const idName=`${index}`;
        const content=document.createElement("div");
        content.setAttribute('id',`${idName}`);
        document.getElementById("Output").appendChild(content);
        
        const ImageH=document.createElement("img");
        ImageH.setAttribute("src",`${coverImageUrl}`);
        document.getElementById(`${idName}`).appendChild(ImageH);

        const TitleH=document.createElement("h2");
        TitleH.innerText=`${index + 1}. Title: ${title}`;
        document.getElementById(`${idName}`).appendChild(TitleH);

        const AuthorH=document.createElement("h4");
        AuthorH.innerHTML=`   Authors: ${authors}`;
        document.getElementById(`${idName}`).appendChild(AuthorH);

        const PublishYearH=document.createElement("h7");
        PublishYearH.innerHTML=`   Publish Year: ${publishYear}`;
        document.getElementById(`${idName}`).appendChild(PublishYearH);
        
        
  
        // console.log(`${index + 1}. Title: ${title}`);
        // console.log(`   Authors: ${authors}`);
        // console.log(`   Publish Year: ${publishYear}`);
        // console.log(`   Cover Image: ${coverImageUrl}`);
        // console.log();
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  
  
  function getdetails()
  {
    const searchQuery =document.getElementById("input").value;
    searchBooks(searchQuery);
    
  }
 
  