const form = document.getElementById("uploadForm")
const statusEl = document.getElementById("status")
const commentEl = document.getElementById("comment")

const ENDPOINT = "https://uqauquuaoxcsjxaqqrnd.supabase.co/functions/v1/upload-file"

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  statusEl.textContent = "Uploading…"

  const formData = new FormData(form)

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      body: formData
    })

    const text = await res.text()
    if (!res.ok) throw new Error(text)

    const data = JSON.parse(text)
    commentEl.textContent = data.comment
    statusEl.textContent = "Upload successful ✔️"
    form.reset()
  } catch (err) {
    statusEl.textContent = err.message || "Upload failed"
  }
})
