

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
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.list.authors';

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

function calculateTagsParams(tags){
  const params = {
    max : 0,
    min : 999999,
  }; // czy powinien byc srednik???

  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }else if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}


function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

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




    
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
      /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* [DONE] END LOOP: for each tag */
    }
    console.log(tagList.innerHTML);

    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;
    console.log(tagList.innerHTML);

  /* [DONE] END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  console.log('taglist', tagList);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
  /* [NEW] generate code of a link and add it to allTagsHTML */
    //allTagsHTML += tag + ' (' + allTags[tag] + ') ';
  
    const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParams) + '</li>';
    console.log('tagLinkHTML:', tagLinkHTML);

    allTagsHTML += tagLinkHTML;

  /* [NEW] END LOOP: for each tag in allTags: */
  }

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

}

generateTags();

function tagClickHandler(event){

  /* [DONE] prevent default action for this event */
  event.preventDefault();
  console.log('event' + event);

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Clicked tag: ' + clickedElement);

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = this.getAttribute('href');
  console.log(href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* [DONE] find all tag links with class active */
  const activeLinks = document.querySelectorAll('.post-tags .list a.active');
  console.log(activeLinks);

  /* [DONE] START LOOP: for each active tag link */
  for(let activeLink of activeLinks){
    console.log(activeLink);

    /* [DONE] remove class active */
    activeLink.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  let equalLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */

  for(let equalLink of equalLinks){
    console.log(equalLink);

    /* [DONE] add class active */
    equalLink.classList.add('active');
    console.log(equalLink);

    /* [DONE] END LOOP: for each found tag link */
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');   //szuka tego co ma miedzy innym ite wartosc. query selector  general siblings combinator

}

function addClickListenersToTags(){

  /* [DONE] find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');

  /* [DONE] START LOOP: for each link */
  for (let linkToTag of allLinksToTags){

    /* [DONE] add tagClickHandler as event listener for that link */
    linkToTag.addEventListener('click', tagClickHandler);

  /* [DONE] END LOOP: for each link */
  }
}

addClickListenersToTags();

function calculateAuthorsParams(authors){
  const params = {
    max : 0,
    min : 999999,
  }; // czy powinien byc srednik???

  for(let author in authors){
    console.log(author + ' is used ' + authors[author] + ' times');
    if(authors[author] > params.max){
      params.max = authors[author];
    }else if(authors[author] < params.min){
      params.min = authors[author];
    }
  }
  return params;
}

function calculateAuthorClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optAuthorsListSelector + classNumber;
}


function generateAuthors() {

  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
    
  /* [DONE] START LOOP: for every article: */
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
        

    /* [NEW] check if this link is NOT already in allAuthors */
    //if(allAuthors.indexOf(authorHTML) == -1){
    /* [NEW] add generated code to allTags array */
    //  allAuthors.push(authorHTML);

 
    

    /* [DONE] add generated code to html variable */
    //html = html + authorHTML;
    //console.log(html);
         
    /* [DONE] insert HTML of all the links into the tags wrapper */
    //authorList.innerHTML = html;
    authorList.innerHTML = authorHTML;
    /* [DONE] END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const authorList = document.querySelector('.authors');

  /* [NEW] add html from allTags to tagList */
  //authorList.innerHTML = allAuthors.join(' ');

  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams:', authorsParams);


  /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let author in allAuthors){
  /* [NEW] generate code of a link and add it to allTagsHTML */
  // allAuthorsHTML += author + ' (' + allAuthors[author] + ') ';

    const authorLinkHTML = '<li>' + calculateAuthorClass(allAuthors[author], authorsParams) + '</li>';
    console.log('authorLinkHTML:', authorLinkHTML);
    allAuthorsHTML += authorLinkHTML;


  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  authorList.innerHTML = allAuthorsHTML;
}









    

generateAuthors();
    
function authorClickHandler(event){

  /* [DONE] prevent default action for this event */
  event.preventDefault();
  console.log('event' + event);

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Clicked author: ' + clickedElement);

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = this.getAttribute('href');
  console.log(href);

  /* [DONE] make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);

  /* [DONE] find all author links with class active */
  const activeLinks = document.querySelectorAll('.post-author href.active');
  console.log(activeLinks);

  /* [DONE] START LOOP: for each active author link */
  for(let activeLink of activeLinks){
    console.log(activeLink);

    /* [DONE] remove class active */
    activeLink.classList.remove('active');

    /* [DONE] END LOOP: for each active author link */
  }

  /* [DONE] find all author links with "href" attribute equal to the "href" constant */
  let equalLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found author link */

  for(let equalLink of equalLinks){
    console.log(equalLink);

    /* [DONE] add class active */
    equalLink.classList.add('active');
    console.log(equalLink);

    /* [DONE] END LOOP: for each found author link */
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors(){

  /* [DONE] find all links to author */
  const allLinksToAuthor = document.querySelectorAll('a[href^="#author-"]');

  /* [DONE] START LOOP: for each link */
  for (let linkToAuthor of allLinksToAuthor){

    /* [DONE] add authorClickHandler as event listener for that link */
    linkToAuthor.addEventListener('click', authorClickHandler);

  /* [DONE] END LOOP: for each link */
  }
}
addClickListenersToAuthors();