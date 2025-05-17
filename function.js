function getQuotes() {
    return fetch("https://zenquotes.io/api/random/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
  
  async function loadQuote() {
    let data = await getQuotes();
    document.getElementById("quote").innerHTML = '"' + data.q + '"-';
    document.getElementById("author").innerHTML = "" + data.a;
  }
  
  function loadDogs() {
    window.location.href = "dogs.html";
  }
  
  function loadStocks() {
    window.location.href = "stocks.html";
  }
  
  function getReddit() {
    return fetch("https://tradestie.com/api/v1/apps/reddit?date=2022-04-03")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        return data.slice(0, 5);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
  
  async function reddit() {
    let data = await getReddit();
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";
  
    const table = document.createElement("table");
    table.id = "dynamicTable";
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
  
    const tickerHeader = document.createElement("th");
    tickerHeader.innerText = "Ticker";
  
    const commentHeader = document.createElement("th");
    commentHeader.innerText = "Comment";
  
    const imgHeader = document.createElement("th");
    imgHeader.innerText = "Sentiment";
  
    headerRow.appendChild(tickerHeader);
    headerRow.appendChild(commentHeader);
    headerRow.appendChild(imgHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    data.forEach((element) => {
      const tableRow = document.createElement("tr");
      const tickerNameInTable = document.createElement("td");
      const anchor = document.createElement("a");
      const commentInTable = document.createElement("td");
      const imgDisplay = document.createElement("img");
  
      imgDisplay.src = element.sentiment_score > 0 ? "bull.jpg" : "bear.jpg";
      imgDisplay.style.width = "150px";
      imgDisplay.style.height = "150px";
  
      anchor.href = "https://finance.yahoo.com/quote/" + element.ticker;
      anchor.textContent = element.ticker;
  
      commentInTable.innerHTML = element.no_of_comments;
  
      tickerNameInTable.appendChild(anchor);
      tableRow.appendChild(tickerNameInTable);
      tableRow.appendChild(commentInTable);
      tableRow.appendChild(imgDisplay);
  
      table.appendChild(tableRow);
    });
  
    outputDiv.appendChild(table);
  }
  
  function voiceHome() {
    if (annyang) {
      const commands = {
        hello: () => alert("Hello world!"),
        "navigate to the stocks page": () => (window.location.href = "stocks.html"),
        "navigate to the dogs page": () => (window.location.href = "dogs.html"),
        "navigate to the home page": () => (window.location.href = "home.html"),
        "change the color to *tag": changeColor,
      };
      annyang.addCommands(commands);
      annyang.start({ autoRestart: false });
    }
  }
  
  function voiceStocks() {
    if (annyang) {
      const commands = {
        hello: () => alert("Hello world!"),
        "navigate to the stocks page": () => (window.location.href = "stocks.html"),
        "navigate to the dogs page": () => (window.location.href = "dogs.html"),
        "navigate to the home page": () => (window.location.href = "home.html"),
        "look up *tag": look,
        "change the color to *tag": changeColor,
      };
      annyang.addCommands(commands);
      annyang.start({ autoRestart: false });
    }
  }
  
  function voiceDogs() {
    if (annyang) {
      const commands = {
        hello: () => alert("Hello world!"),
        "navigate to the stocks page": () => (window.location.href = "stocks.html"),
        "navigate to the dogs page": () => (window.location.href = "dogs.html"),
        "navigate to the home page": () => (window.location.href = "home.html"),
        "change the color to *tag": changeColor,
        "look up dog breed *tag": voice,
      };
      annyang.addCommands(commands);
      annyang.start({ autoRestart: false });
    }
  }
  
  function voiceOff() {
    annyang.abort();
  }
  
  function changeColor(color) {
    document.body.style.backgroundColor = color;
  }
  
  function stockData(ticker, from, today) {
    return fetch(
      `https://api.polygon.io/v2/aggs/ticker/${ticker.toUpperCase()}/range/1/day/${from}/${today}?apiKey=gx36C3AMQeNOi5hwZ8lja8E1aziXKDbu`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => data.results)
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
  
  let myChart;
  
  async function stocks() {
    let val = document.getElementById("selector").value;
    let ticker = document.getElementById("ticker").value;
    const today = new Date();
    const daysAgo = today.getTime() - val * 24 * 60 * 60 * 1000;
    let data = await stockData(ticker, daysAgo, today.getTime());
  
    const time = [];
    const values = [];
    data.forEach((item) => {
      time.push(new Date(item.t).toLocaleDateString());
      values.push(item.c);
    });
  
    const ctx = document.getElementById("myChart");
    if (myChart) {
      myChart.destroy();
    }
  
    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: time,
        datasets: [
          {
            label: "Price of stock",
            data: values,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  
  function dogAPI() {
    return fetch("https://dog.ceo/api/breeds/image/random/10")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => data.message)
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
  
  async function dogPics() {
    let data = await dogAPI();
    let container = document.getElementById("dogSlider");
    data.forEach((item) => {
      let img = document.createElement("img");
      img.width = 200;
      img.height = 200;
      img.src = item;
      container.appendChild(img);
    });
    simpleslider.getSlider();
    dogLookUP();
  }
  
  function lookUP() {
    return fetch("https://dogapi.dog/api/v2/breeds")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => data)
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
  
  function voice(val) {
    look(val);
  }
  
  async function look(val) {
    let data = await lookUP();
    let container = document.getElementById("info");
    container.innerHTML = "";
    container.style.backgroundColor = "white";
    data.data.forEach((items) => {
      if (items.attributes.name == val) {
        let header = document.createElement("h1");
        header.textContent = items.attributes.name;
        let description = document.createElement("h3");
        description.textContent = "Description: " + items.attributes.description;
        let minLife = document.createElement("h3");
        minLife.textContent = "Min Life: " + items.attributes.life.min;
        let maxLife = document.createElement("h3");
        maxLife.textContent = "Max Life: " + items.attributes.life.max;
        container.appendChild(header);
        container.appendChild(description);
        container.appendChild(minLife);
        container.appendChild(maxLife);
      }
    });
  }
  
  async function dogLookUP() {
    let container1 = document.getElementById("buttons");
    let data = await lookUP();
    data.data.forEach((items) => {
      let button = document.createElement("button");
      button.textContent = items.attributes.name;
      button.value = items.attributes.name;
      button.addEventListener("click", function () {
        look(button.value);
      });
      container1.appendChild(button);
    });
  }
  