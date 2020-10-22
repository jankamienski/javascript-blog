

'use strict';

const titleClickHandler = function(event){
  event.preventDefault();   
  const clickedElement = this;  
    
  console.log('Link was clicked!');
  console.log(event);
    
  
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');   

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
  const articleSelector = clickedElement.getAttribute('href');  
  console.log(articleSelector);
    

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);  

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');  
  console.log('added to: ', targetArticle);
};  //powinien byc srednik?

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log (titleList);
  

  /* [DONE] for each article */
  let html = '';

  const articles = document.querySelectorAll(optArticleSelector  + customSelector);
  for ( let article of articles) {

    console.log(customSelector);
    console.log(html);
    console.log(articles);

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

  const links = document.querySelectorAll('.titles a');  
  console.log(links);

  for(let link of links){  
    link.addEventListener('click', titleClickHandler);  
  }
}

generateTitleLinks();


function generateTags(){
/* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles){
    console.log(article);

    /* [DONE] find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);
    console.log(tagList);
    tagList.innerHTML = '';


    /* [DONE] make html variable with empty string */

    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');  
    console.log(articleTags);

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* [DONE] START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log(tag);

      /* [DONE] generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(tagHTML);
    
      /* [DONE] add generated code to html variable */
      html = html + tagHTML;
      console.log(html);
    
      /* [DONE] END LOOP: for each tag */
    }
    console.log(tagList.innerHTML);
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;
    console.log(tagList.innerHTML);

  /* [DONE] END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();
  console.log('event' + event);

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Clicked tag: ' + clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = this.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('.post-tags .list a.active');
  console.log(activeLinks);

  /* START LOOP: for each active tag link */
  for(let activeLink of activeLinks){
    console.log(activeLink);

    /* remove class active */
    activeLink.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  let equalLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for(let equalLink of equalLinks){
    console.log(equalLink);

    /* add class active */
    equalLink.classList.add('active');
    console.log(equalLink);

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');   //szuka tego co ma miedzy innym ite wartosc. query selector  general siblings combinator

}

function addClickListenersToTags(){

  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let linkToTag of allLinksToTags){

    /* add tagClickHandler as event listener for that link */
    linkToTag.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
    
  /* START LOOP: for every article: */
  for (let article of articles){
    console.log(article);

    /* [DONE] find authors wrapper */
    const authorList = article.querySelector(optArticleAuthorSelector);
    console.log(authorList);
    authorList.innerHTML = '';


    /* [DONE] make html variable with empty string */
    //let html = '';

    /* [DONE] get authors from data-author attribute */
    const articleAuthors = article.getAttribute('data-author');  
    console.log(articleAuthors);

    /* [DONE] generate HTML of the link */

    const authorHTML ='<a href="#author-' + articleAuthors + '">' + articleAuthors + '</a>';
    console.log(authorHTML);
        
    /* [DONE] add generated code to html variable */
    //html = html + authorHTML;
    //console.log(html);
         
    /* [DONE] insert HTML of all the links into the tags wrapper */
    //authorList.innerHTML = html;
    authorList.innerHTML = authorHTML;
    /* [DONE] END LOOP: for every article: */
  }
}
    
generateAuthors();
    
function authorClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();
  console.log('event' + event);

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Clicked author: ' + clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = this.getAttribute('href');
  console.log(href);

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);

  /* find all author links with class active */
  const activeLinks = document.querySelectorAll('.post-author href.active');
  console.log(activeLinks);

  /* START LOOP: for each active author link */
  for(let activeLink of activeLinks){
    console.log(activeLink);

    /* remove class active */
    activeLink.classList.remove('active');

    /* END LOOP: for each active author link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  let equalLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author link */

  for(let equalLink of equalLinks){
    console.log(equalLink);

    /* add class active */
    equalLink.classList.add('active');
    console.log(equalLink);

    /* END LOOP: for each found author link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors(){

  /* find all links to author */
  const allLinksToAuthor = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */
  for (let linkToAuthor of allLinksToAuthor){

    /* add authorClickHandler as event listener for that link */
    linkToAuthor.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();