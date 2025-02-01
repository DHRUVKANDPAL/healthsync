const data = [
  {
    name: "Cardiology",
    hod: "Dr. A. Sharma",
  },
  {
    name: "Neurology",
    hod: "Dr. B. Verma",
  },

  {
    name: "Pediatrics",
    hod: "Dr. D. Gupta",
  },
  {
    name: "Dermatology",
    hod: "Dr. E. Sinha",
  },
  {
    name: "Gynecology",
    hod: "Dr. F. Kaur",
  },
  {
    name: "Oncology",
    hod: "Dr. G. Singh",
  },
  {
    name: "Radiology",
    hod: "Dr. H. Mehta",
  },
  {
    name: "Nephrology",
    hod: "Dr. I. Joshi",
  },
  {
    name: "Anesthesiology",
    hod: "Dr. J. Sharma",
  },
  {
    name: "General Surgery",
    hod: "Dr. K. Rao",
  },
  {
    name: "Emergency Medicine",
    hod: "Dr. L. Nair",
  },
  {
    name: "Psychiatry",
    hod: "Dr. M. Yadav",
  },
  {
    name: "Gastroenterology",
    hod: "Dr. N. Kumar",
  },
  {
    name: "Urology",
    hod: "Dr. O. Reddy",
  },
];
async function handleAddDepartment() {
  for (let i = 0; i < data.length; i++) {
    try {
      const res = await fetch("/api/dept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values: data[i] }),
      });
    } catch (error) {}
  }
}
handleAddDepartment();