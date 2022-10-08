let animeURL = 'https://animechan.vercel.app/api/available/anime'

let anime = []

const list_element = document.getElementById('anime');
const pagenumber_element = document.getElementById('pagination');

let current_page = 1;
let max_rows = 50;

fetch(animeURL)
      .then(
            response => {
                  if (response.ok) {
                        return response.json()
                  }
                  else{
                        throw new Error("Network Error")
                  }
            }
      )
      .then(
            data => {
                  anime = [...data]
                  ShowData(data,max_rows,current_page)
                  SetupPages(data,pagenumber_element,max_rows)
            }
      )
      .catch((error) => console.error("FETCH ERROR:", error));

function ShowData(anime,rows_per_page,page){
      list_element.innerHTML= ""
      page--

      start = rows_per_page * page
      end = start + rows_per_page

      let paginatedAnime = anime.slice(start,end)
      console.log(paginatedAnime);
      for (let index = 0; index < paginatedAnime.length; index++) {
            let element = paginatedAnime[index];
            let item_element = document.createElement('div')
            item_element.classList.add('anime-item')
            item_element.innerHTML = element
            list_element.appendChild(item_element)
      }
}

function SetupPages(items, wrapper, rows_per_page){
      wrapper.innerHTML = ""
  
      let page_count = Math.ceil(items.length / rows_per_page)
      for (let i = 1; i < page_count + 1; i++) {
          let btn = PaginationBtn(i)
          wrapper.appendChild(btn)
      }
}
  
function PaginationBtn(page) {
      let Button = document.createElement('button')
      Button.innerText = page
  
      if(current_page == page) Button.classList.add('active')
  
      Button.addEventListener('click', function(){
          current_page = page
          ShowData(anime, max_rows, current_page)
  
          let current_btn = document.querySelector('.pagenumbers button.active')
          current_btn.classList.remove('active')
  
          this.classList.add('active')
      })
  
      return Button
}
