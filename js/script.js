{
  
  'use strict';
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/
const titleClickHandler = function(event){
  event.preventDefault();   //  event - w im zapisuej sie to klikniecie   . powstrzymuje wyswietlenie, akcji.
  const clickedElement = this;  // przypisuje sobie klikniecie. dla klikniecego, kontekst do niego
    
  console.log('Link was clicked!');
  console.log(event);
    
  
    /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');   // stala - metoda wyszukuje wszystkie selektory titles a z klasa active

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }

  /* [DONE]  add class 'active' to the clicked link */
  
  console.log('clickedElement:', clickedElement);
  this.classList.add('active');
  console.log('clicked: ', this);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');  //wyszukuje id artykulu
  console.log(articleSelector);
    

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);  //wyszukuje artykul po ID    . jak jest klasa # jak jest id a jak nie podaje nic to tag 

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');  //dodaje klase active do wybranego artykulu wybranego za pomoca querySelector i rpzypisanego do stalej TargetArticle
  console.log('added to: ', targetArticle);
}

  const links = document.querySelectorAll('.titles a');  //wyszukuje wszystkie a w sekcji list titles 
  console.log(links);

    for(let link of links){  //deklarujemy zmienna link w ktorej znajduje sie pojedynczy element stalej links
      link.addEventListener('click', titleClickHandler);  //w momencie klikniecia na ktorykolwiek link w sekcji "list titles" wywola sie funkcja tltleClickNandler
    }

 
  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
console.log (titleList);
  

  /* [DONE] for each article */

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector);
    for ( let article of articles) {

      console.log(html);

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');
  
    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

  
    /* [DONE] create HTML of the link */
   
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    
    /* [DONE] insert link into titleList */
    
    html = html + linkHTML;

  }

  titleList.innerHTML = html;
}

  generateTitleLinks();
  
}