document.addEventListener("DOMContentLoaded", () => {
    const chatBtn = document.querySelector(".chat-btn");
    const chatBox = document.querySelector(".chat-box");
  
    chatBtn.addEventListener("click", () => {
    //   chatBox.style.display = chatBox.style.display === "none" ? "block" : "none";

        chatBox.classList.toggle("hide");
    });
  });