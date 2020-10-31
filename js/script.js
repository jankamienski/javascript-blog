'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML)
};

const titleClickHandler = function(event){
  event.preventDefault();   
  const clickedElement = this;  
  console.log('Link was clicked!');
  console.log(event);
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  console.log('clickedElement:', clickedElement);
  this.classList.add('active');
  console.log('clicked: ', this);
  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');  
  console.log(articleSelector);
  const targetArticle = document.querySelector(articleSelector);  
  targetArticle.classList.add('active');  
  console.log('added to: ', targetArticle);
};

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

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log (titleList);
  let html = '';
  const articles = document.querySelectorAll(optArticleSelector  + customSelector);
  for ( let article of articles) {

    console.log(customSelector);
    console.log(html);
    console.log(articles);

    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log(linkHTML);
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

  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  for (let article of articles){
    console.log(article);

    const tagList = article.querySelector(optArticleTagsSelector);
    console.log(tagList);
    tagList.innerHTML = '';
    let html = '';
    const articleTags = article.getAttribute('data-tags');  
    console.log(articleTags);
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    for(let tag of articleTagsArray){
      console.log(tag);
      const linkHTMLData = {tag: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      html = html + linkHTML;
      console.log(html);

      if(!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    console.log(tagList.innerHTML);
    tagList.innerHTML = html;
    console.log(tagList.innerHTML);
  }

  const tagList = document.querySelector('.tags');
  console.log('taglist', tagList);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  const allTagsData = {tags: []};

  for(let tag in allTags){

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
}

generateTags();

function tagClickHandler(event){

  event.preventDefault();
  console.log('event' + event);
  const clickedElement = this;
  console.log('Clicked tag: ' + clickedElement);
  const href = this.getAttribute('href');
  console.log(href);
  const tag = href.replace('#tag-', '');
  console.log(tag);
  const activeLinks = document.querySelectorAll('.post-tags .list a.active');
  console.log(activeLinks);

  for(let activeLink of activeLinks){
    console.log(activeLink);
    activeLink.classList.remove('active');
  }

  let equalLinks = document.querySelectorAll('a[href="' + href + '"]');

  for(let equalLink of equalLinks){
    console.log(equalLink);
    equalLink.classList.add('active');
    console.log(equalLink);
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');

  for (let linkToTag of allLinksToTags){
    linkToTag.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

function calculateAuthorsParams(authors){
  const params = {
    max : 0,
    min : 999999,
  };

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

function generateAuthors() {

  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  for (let article of articles){
    console.log(article);
    const authorList = article.querySelector(optArticleAuthorSelector);
    console.log(authorList);
    authorList.innerHTML = '';
    const articleAuthors = article.getAttribute('data-author');  
    console.log(articleAuthors);
    const linkHTMLData = {author: articleAuthors};
    const linkHTML = templates.authorLink(linkHTMLData);

    if(!allAuthors[articleAuthors]) {
      /* [NEW] add tag to allTags object */
      allAuthors[articleAuthors] = 1;
    } else {
      allAuthors[articleAuthors]++;
    }
    authorList.innerHTML = linkHTML;
  }

  const authorList = document.querySelector(optAuthorsListSelector);
  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams:', authorsParams);
  let allAuthorsHTML = '';
  for(let author in allAuthors){
    allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + '(' + allAuthors[author] + ')' + '</a></li>';
    console.log('allAuthorsHTML:', allAuthorsHTML);
  }
  authorList.innerHTML = allAuthorsHTML;
}

generateAuthors();

function authorClickHandler(event){

  event.preventDefault();
  console.log('event' + event);
  const clickedElement = this;
  console.log('Clicked author: ' + clickedElement);
  const href = this.getAttribute('href');
  console.log(href);
  const author = href.replace('#author-', '');
  console.log(author);
  const activeLinks = document.querySelectorAll('.post-author href.active');
  console.log(activeLinks);

  for(let activeLink of activeLinks){
    console.log(activeLink);
    activeLink.classList.remove('active');
  }

  let equalLinks = document.querySelectorAll('a[href="' + href + '"]');

  for(let equalLink of equalLinks){
    console.log(equalLink);
    equalLink.classList.add('active');
    console.log(equalLink);
  }

  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors(){

  const allLinksToAuthor = document.querySelectorAll('a[href^="#author-"]');

  for (let linkToAuthor of allLinksToAuthor){
    linkToAuthor.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();

