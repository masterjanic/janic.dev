const blockcodes = document.querySelectorAll(".chroma code[data-lang]");

for (const bc of blockcodes) {
  const parent = bc.parentElement;
  // textContent keeps blank lines; innerText doubles them inside Chroma's flex lines.
  const content = bc.textContent.trimEnd();

  // Code title
  const title = document.createElement("div");
  title.classList.add("code-title");
  title.innerText = bc.dataset.lang;

  // Copy to clipboard
  if (navigator.clipboard !== undefined) {
    const cpbutton = document.createElement("button");
    cpbutton.type = "button";
    cpbutton.classList.add("copy-button");
    cpbutton.innerText = "Copy";

    cpbutton.addEventListener("click", () => {
      cpbutton.innerText = "Copied";
      setTimeout(() => {
        cpbutton.innerText = "Copy";
      }, 1000);

      navigator.clipboard.writeText(content);
    });

    title.append(cpbutton);
  }

  parent.closest(".highlight").prepend(title);
}
