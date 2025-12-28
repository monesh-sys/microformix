async function createPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  const input = document.getElementById("imageInput");
  const status = document.getElementById("status");

  if (input.files.length === 0) {
    alert("Please select at least one image");
    return;
  }

  status.innerText = "Creating PDF...";

  for (let i = 0; i < input.files.length; i++) {
    const file = input.files[i];
    const imgData = await readImage(file);

    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, "JPEG", 10, 10, 190, 270);
  }

  pdf.save("microformix_scan.pdf");
  status.innerText = "PDF downloaded successfully ✅";
}

function readImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}
