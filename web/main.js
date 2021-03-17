const conn = new WebSocket("ws://localhost:8080");

const chat = document.querySelector("#chat-box");
const textBox = document.querySelector("#msg");

conn.onopen = () => {
  console.log("connected");
};

conn.onclose = () => {
  console.error("disconnected");
};

conn.onerror = (error) => {
  console.error("failed to connect", error);
};

conn.onmessage = ({ data }) => {
  const message = document.createElement("li");
  message.innerText = data;
  message.classList = "message-box";
  chat.appendChild(message);
};

const clearChat = () => {
  textBox.value = "";
  while (chat.firstElementChild) {
    chat.removeChild(chat.firstElementChild);
  }
};

const submit = () => {
  const message = textBox.value;

  if (message == "/clear") {
    clearChat();
  } else if (message === "/lorem") {
    conn.send(
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquam consectetur orci. Cras aliquam sapien orci, et blandit libero luctus sit amet. Praesent facilisis porta arcu a ullamcorper. Sed vel urna massa. Nulla iaculis sem urna. Curabitur congue sed justo eu condimentum. Praesent porttitor tortor at magna lobortis, sed posuere tellus dictum.`
    );
  } else {
    conn.send(message);
  }
  textBox.value = "";
};

textBox.addEventListener("keydown", (event) => {
  const keyCode = event.which || event.keyCode;

  // 13 == Enter

  if (keyCode === 13 && !event.shiftKey) {
    event.preventDefault();
    submit();
  }
});

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  submit();
});
