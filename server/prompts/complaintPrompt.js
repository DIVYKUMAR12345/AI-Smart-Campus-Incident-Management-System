const complaintPrompt = (complaintText) => {
    return `
You are an AI assistant for a Smart Campus Incident Management System.

Analyze the student's complaint.

Complaint:
"${complaintText}"

Return ONLY valid JSON.

Example:

{
  "category": "Maintenance",
  "priority": "High",
  "emergency": false,
  "confidence": 98,
  "summary": "Water leakage in Block B",
  "reason": "Water leakage affects infrastructure and should be handled quickly."
}

Categories:
- Electricity
- Water
- Network
- Security
- Cleanliness
- Furniture
- Maintenance
- Other

Priority:
- Low
- Medium
- High
- Emergency
`;
};

module.exports = complaintPrompt;