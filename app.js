const emailForm = document.getElementById("emailForm")
const uploadForm = document.getElementById("uploadForm")
const instructions = document.getElementById("instructions")
const commentEl = document.getElementById("comment")
const statusEl = document.getElementById("status")

const SUPABASE_URL = "https://uqauquuaoxcsjxaqqrnd.supabase.co"
const SUPABASE_ANON_KEY = "your-anon-key-here" // Get from Supabase dashboard

const CHECK_EMAIL_URL = `${SUPABASE_URL}/functions/v1/check-email`
const UPLOAD_FILE_URL = `${SUPABASE_URL}/functions/v1/upload-file`

let currentEmail = null

// STEP 1: Check email and fetch instructions
emailForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  statusEl.textContent = "Checking email…"

  const email = document.getElementById("email").value

  try {
    const res = await fetch(CHECK_EMAIL_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ email })
    })

    if (!res.ok) {
      statusEl.textContent = "Email not found"
      return
    }

    const data = await res.json()
    currentEmail = email

    commentEl.textContent = data.comment
    instructions.hidden = false
    statusEl.textContent = ""

    document.getElementById("email").disabled = true
  } catch (err) {
    statusEl.textContent = "Something went wrong"
  }
})

// STEP 2: Upload file
uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  statusEl.textContent = "Uploading…"

  const formData = new FormData(uploadForm)
  formData.append("email", currentEmail)

  try {
    const res = await fetch(UPLOAD_FILE_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: formData
    })

    if (!res.ok) {
      statusEl.textContent = await res.text()
      return
    }

    statusEl.textContent = "Upload successful ✔️"
    uploadForm.reset()
  } catch (err) {
    statusEl.textContent = "Upload failed"
  }
})
