const MAX_ELEMENTS = 3;
const MAX_ROW = 2;
const GRID_CLASSES = ["col-1", "col-1", "col-2"];
const CONTAINER_ID = "main-container";

const fetchData = (url, options, callback) => {
  fetch(url, options)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    if(json.code && json.code === 200) {
      if(typeof callback === 'function') callback(json);
    }
  });
}

const getCardEle = (imgSrc, title, url) => {
  return `<div class="card">
    <div class="card-body">
      <img src="${imgSrc}" alt="${title}" />
    </div>
    <div class="card-footer">
      <p>${title}</p>
    </div>
  </div>`
}

const createEle = (tag, classList = []) => {
  let ele = document.createElement(tag);
  ele.classList.add(classList);
  return ele;
}