

async function getUsers() {
  let url = "http://46.219.14.252:3001/data";
  let response = await axios.get(url);
  let data = response.data;
  console.log(data, "data");
  return data;
}

function template(strings, ...keys) {
  return function (...values) {
    var dict = values[values.length - 1] || {};
    var result = [strings[0]];
    keys.forEach(function (key, i) {
      var value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join("");
  };
}

async function renderUsers() {
  let terminals = await getUsers();
  let html = "";

  terminals.forEach((terminal) => {
    this.terminal = terminal;

    let select = document.getElementById("autor");

    function add(select) {
      var value = selectEl
        ? selectEl.options[selectEl.selectedIndex].value
        : null;
      console.log(value);
    }
    let sendTerminal = terminal.terminal;
    console.log(sendTerminal, typeof sendTerminal);
    let terminalArg = {
      mail: terminal.mail,
      terminal: terminal.terminal,
      exel: terminal.exel,
    };
    let emails = '"' + terminal.mail + '"';
    let terminals = '"' + terminal.terminal + '"';

    let isExel = '"' + terminal.exel + '"';

    console.log(terminalArg, "arg");
    // let pathUn = emails + ', ' + terminals + ', ' + isExel
    let pathUn = emails + "|" + terminals + "|" + isExel;
    pathUn.replace(" ", "").trim();
    console.log(pathUn, "pathUn");

    // const unescapedPath = String.raw`${pathUn}`; // 'C:\web\index.html'
    let htmlSegment = `
        <div class="info-box" id="info-box">
        <ul class="info-box__list">
            <div class="merchant-box">
                <p>Торговец</p>
                <ul>
                    <li>${terminal.merchant}</li>
                </ul>
            </div>
            <div  class="terminal-box">
                <p>Терминалы</p>
                <ul>
                    <li>${terminal.terminal}</li>
                </ul>
            </div>
            <div  class="format-box">
                <p>Формат фалйа</p>
                <ul>
                    <li>${terminal.exel}</li>
                </ul>
            </div>
            <div  class="posht-box">
                <p>Почта</p>
                <ul>
                    <li>${terminal.mail}</li>
                </ul>
            </div>
            <div  class="editor-box">
                <p>Редактор</p>
                <ul>
                    <li>${terminal.editor}</li>
                </ul>
            </div>
            <div  class="coment-box">
                <p>Коментарий</p>
                <ul>
                    <li>${terminal.coment}</li>
                </ul>
            </div>
        </ul>
        <div class="info-box__sitings">
        <button class="info-box__adding" data-id="${
          terminal.id
        }" onclick="editUser(${
      terminal.id
    })"  id="adding">Редактировать</button>
        <button class="info-box__delete" onclick="deleteTerminal(${
          terminal.id
        });" data-id="${terminal.id}">Удалить</button>
        <button class="send info-box__send ${
          terminal.id + "send-button"
        }" onclick="getThisTerminal(${terminal.id})" data-id="${
      terminal.id
    }" id="send">отправить</button>
        </div>
    </div>
        `;
    // let sendButton = document.getElementsByClassName('info-box__send')
    // sendButton.addEventListener('click', function() {
    //     sendEmail(terminal.mail, terminal.terminal, exel.exel)
    // })

    // let sendButton =
    html += htmlSegment;
  });

  let company = terminals.map((terminal) => terminal.merchant);
  let container = document.querySelector(".container-terminals");
  container.innerHTML = html;
}

renderUsers();
async function saveUser(id) {
  let url = "http://46.219.14.252:3001/data/" + id;
  let merchant = document.getElementById("company-value").value;
  let terminal = document.getElementById("terminal-value").value;
  let mail = document.getElementById("mail-value").value;
  let exel = document.getElementById("exel");
  let autor = document.getElementById("autor-value");
  let coment = document.getElementById("coment-value").value;

  await axios.put(url, {
    merchant: merchant,
    terminal: terminal,
    mail: mail,
    exel: exel.options[exel.selectedIndex].text,
    editor: autor.options[autor.selectedIndex].text,
    coment: coment,
}).then(resp => {

    console.log(resp.data);
}).catch(error => {

    console.log(error);
});
  renderUsers();
}

async function editUser(id) {
  async function editData(id) {
    let url = "http://46.219.14.252:3001/data/" + id;
    try {
      let res = await axios.get(url);
      let data = res.data;

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  let userData = await editData(id);
  let html = "";
  let htmlEditPopup = `
<div class="adding-box">
    <form action="" id="create">
        <input required type="text" name="kompany" id="company-value" placeholder="Компания" value="${userData.merchant}">
        <input required type="text" name="terminal" id="terminal-value" placeholder="Терминалы" value="${userData.terminal}">
        <input required type="text" name="mail" id="mail-value" placeholder="Почты" value="${userData.mail}">

        <div class="check-excel">
            <div>Выбирите формат отправки файла</div>
            <select name="exel" id="exel" class="exel" title="">
                <option value="exel" selected>exel</option>
                <option value="txt">txt</option>
            </select>
        </div>
        <select name="autor" id="autor-value" class="autor">
            <option value="Не выбрано" selected>Выберите редактора</option>
            <option value="Чугунов">Чугунов</option>
            <option value="Шлапак">Шлапак</option>
            <option value="Гармаш">Гармаш</option>
        </select>
        <div class="coment">
            <textarea class="coment" name="" id="coment-value" cols="30" rows="4"></textarea>
        </div>
        <div class="create-buttom">
            <button type="submit" onclick="saveUser(${userData.id})" data-id="${userData.id}">
            Сохранить
            </button>
        </div>
    </form>
</div>     
`;
  html += htmlEditPopup;
  let container = document.querySelector(".AddingMerchant-box");
  container.style.display = "block";
  container.innerHTML = html;
}

async function getThisTerminal(id) {
  async function getTerminal(id) {
    let url = "http://46.219.14.252:3001/data/" + id;
    try {
      let res = await axios.get(url);
      let data = res.data;

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  let thisTerminal = await getTerminal(id);
  console.log(thisTerminal, "+++", thisTerminal.mail);
  await axios
    .get(
      `http://46.219.14.252:3000/email/${thisTerminal.mail}/terminal/${thisTerminal.terminal}/exel/${thisTerminal.exel}`
    )
    .then((response) => {
      console.log("success");
      alert("Отправлено");
    });
  return thisTerminal;
}
function deleteTerminal(id) {
  let url = "http://46.219.14.252:3001/data/" + id;
  axios
    .delete(url)
    .then((res) => res)
    .then(() => {
      renderUsers();

      Notification.requestPermission();
    });
}


document.getElementById("create").addEventListener("submit", function (e) {
  // что бы не отправилась форма.
  // e.preventDefault();
  document.getElementById("create-terminal").innerHTML = "Готово";
  let data = {
    merchant: document.querySelector('input[name="kompany"]').value,
    terminal: document.querySelector('input[name="terminal"]').value,
    mail: document.querySelector('input[name="mail"]').value,
    editor: document.querySelector("#autor").value,
    coment: document.querySelector("textarea").value,
    exel: document.querySelector(".exel").value,
  };
  console.log(data);

  async function postMerchant(data) {
    let url = "http://46.219.14.252:3001/data";
    await axios.post(url, data);
    await renderUsers();
  }

  postMerchant(data);
});
