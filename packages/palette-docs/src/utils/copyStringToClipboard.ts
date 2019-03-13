export function copyStringToClipboard(str) {
  const el: any = document.createElement("textarea")
  el.value = str
  el.setAttribute("readonly", "")
  el.style = { display: "none" }
  document.body.appendChild(el)
  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)
}
