/*-------Buoc 1: khai bao bien--------*/
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

/*------Buoc 2: Goi du lieu--------*/
getMoviesAPI(API_URL); //Thuc thi function getMoviesAPI

async function getMoviesAPI(API_URL) {

  const res = await axios.get(`${API_URL}`); //CHUNG
  const data = await res.data.results; //KHAC NHAU

  showMovie(data); //Loi goi ham. Thuc thi function showMovie

}

/*---Buoc 3:  Hien thi du lieu ra ben ngoai front-end---*/

function showMovie(data) {


  let htmlCode = ``;

  data.forEach(function (value, index) {

    htmlCode += `
      <div class="col-12 col-sm-6 col-md-3">
        <div class="item">
        <a href='../detail.html?id=${value.id}'>
          <div class="box-image">
            <img src="${IMG_PATH + value.poster_path}" />
          </div>
        </a>
          <div class="box-content">
            <h3 class="title-film">${value.title}</h3>
            <p class="rating ${colorRating(value.vote_average)}">
              ${value.vote_average}
            </p>
          </div>

          <div class="box-description">
            <h4>Overview</h4>
            <p>${value.overview}</p>
          </div>
        </div>
      </div>
        `;
    // truy cap phan tu
    const content = document.querySelector('.listing-product .row');
    content.innerHTML = htmlCode;
  });
}

/*----Buoc 4: Thay doi mau Rating-----*/
function colorRating (rate){
  if(rate > 7) {
    return 'good';
  } else if(rate > 5.5) {
    return 'normal';
  }else {
    return 'bad';
  }
}

/*---Buoc 5: Lam ve o tim kiem (Search)--*/ 
const elementForm = document.querySelector('.form');
const elementInput = document.querySelector('.input-form');

elementForm.addEventListener('submit', function(e){
  e.preventDefault();
  // gia tri nguoi nhap
  const valueInput = elementInput.value;

  if(valueInput && valueInput !== ''){

    getMoviesAPI(SEARCH_API + valueInput);
    elementInput.value = ''; //clear gia tri old

  }else {
    window.location.reload();
  }

});

/*----Buoc 6: Tao Load-more----*/

let currentPage = 1;
// Next Page
const nextMore = document.querySelector('.btn-next');
nextMore.addEventListener('click', function(){
  currentPage++;
  const api_nextMore = `${API_URL}&page=${currentPage}`;
  getMoviesAPI(api_nextMore);
  console.log(currentPage);
})

// Pre Page
const preMore = document.querySelector('.btn-pre');
preMore.addEventListener('click', function(){
  currentPage--;
  if(currentPage < 1) {
    currentPage++;
    return alert('No More Page!')
  }else {
    const api_preMore = `${API_URL}&page=${currentPage}`;
    getMoviesAPI(api_preMore);
    console.log(currentPage);
  }
})


// *******Menu Mobile********* //
/*--- b1: Truy cap phan tu --- */
const btnOpen = document.querySelector('.btn-mobile-open');
const ctnMobile = document.querySelector('#wrap-mobile');
const btnClose = document.querySelector('.btn-close');

/*-- B2: Them event ----*/ 
btnOpen.addEventListener('click', function(){
  ctnMobile.style.height = '100%';
})

btnClose.addEventListener('click', function(){
  ctnMobile.style.height = '0';
})