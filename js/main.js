const URL = "https://s3-ap-southeast-1.amazonaws.com/takehomeproject/feed.json";
const FETCH_OPTIONS = {
  method: "GET"
};
let reverse = false;
let remainingSpace = 0;
let loadIndex = 0;
let articles = [];

const drawContent = (data) => {
  if(data.data && data.data.rows) {
    var data = data.data.rows;
    if(remainingSpace > 0 && remainingSpace < MAX_ELEMENTS) {
      let rows = document.getElementsByClassName("row");
      let classList = reverse ? [...GRID_CLASSES].reverse() : [...GRID_CLASSES];
      drawRow(data.slice(0, remainingSpace), classList, rows[rows.length - 1]);
      data = data.slice(remainingSpace);
    }
    for(var i = 0; i < data.length; i = i + MAX_ELEMENTS, reverse = !reverse) {
      let classList = reverse ? [...GRID_CLASSES].reverse() : [...GRID_CLASSES];
      drawRow(data.slice(i, i + MAX_ELEMENTS), classList);
    }
    remainingSpace = MAX_ELEMENTS - data.length % MAX_ELEMENTS;
  }
}

const drawRow = (items, classList, rowEle = null) => {
  if(!rowEle) {
    var rowEle = createEle("div", ["row"]);
    document.getElementById(CONTAINER_ID).appendChild(rowEle);
  }
  items.forEach((item, index) => {
    var gridEle = createEle("div", [classList[index]]);
    gridEle.innerHTML = getCardEle(item.coverPic[0], item.title, item.detailURL)
    rowEle.appendChild(gridEle);
  });
}

const loadPartial = (data = {}) => {
  articles = data && data.data && data.data.rows || articles;
  drawContent({ data: { rows: articles.slice(loadIndex, loadIndex + (MAX_ELEMENTS * MAX_ROW)) } });
  loadIndex += MAX_ELEMENTS * MAX_ROW;
  if(loadIndex > articles.length) document.getElementById("load-more").textContent = "No more items";
}
