function runOCR() {
  const image = document.getElementById("imageInput").files[0];
  const status = document.getElementById("status");
  const output = document.getElementById("output");

  if (!image) {
    alert("Please select an image");
    return;
  }

  status.innerText = "Reading text... please wait ⏳";
  output.value = "";

  Tesseract.recognize(
    image,
    "eng",
    {
      logger: m => {
        if (m.status === "recognizing text") {
          status.innerText = "Progress: " + Math.floor(m.progress * 100) + "%";
        }
      }
    }
  ).then(({ data: { text } }) => {
    output.value = text;
    status.innerText = "Text extracted successfully ✅";
  }).catch(err => {
    status.innerText = "OCR failed ❌";
    console.error(err);
  });
}
