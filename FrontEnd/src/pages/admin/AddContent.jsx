import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddContent() {
  // 1. Config (Replace with your keys)
  const CLOUD_NAME = "dkbpbbb8k"; 
  const UPLOAD_PRESET = "research_unsigned"; 

  // 2. Form State
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState("");
  const [theoryText, setTheoryText] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  // Options State (Default 2 options)
  const [options, setOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false }
  ]);

  // Load Lessons for Dropdown
  useEffect(() => {
    axios.get('http://127.0.0.1:5080/api/lessons/')
      .then(res => setLessons(res.data))
      .catch(err => console.error(err));
  }, []);

  // 3. Image Upload Logic
  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      return res.data.secure_url; // This is the URL we need!
    } catch (error) {
      console.error("Cloudinary Error:", error);
      alert("Image upload failed");
      return null;
    }
  };

  // 4. Form Submit Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    // A. Upload Image First
    const imageUrl = await handleImageUpload();

    // B. Prepare Data for Backend
    const payload = {
      lesson_id: parseInt(selectedLesson),
      theory_text: theoryText,
      question_text: questionText,
      theory_media_url: imageUrl, // Send the URL (or null)
      options: options.map(opt => ({
        option_text: opt.text,
        is_correct: opt.isCorrect
      }))
    };

    // C. Send to Backend
    try {
      await axios.post('http://127.0.0.1:5080/api/lessons/add-step', payload);
      alert("Content Saved Successfully!");
      // Reset Form
      setTheoryText("");
      setQuestionText("");
      setImageFile(null);
      setOptions([{ text: "", isCorrect: false }, { text: "", isCorrect: false }]);
    } catch (error) {
      console.error(error);
      alert("Failed to save content.");
    } finally {
      setUploading(false);
    }
  };

  // Helper to handle option changes
  const updateOption = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const addOptionField = () => {
    setOptions([...options, { text: "", isCorrect: false }]);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Lesson Step</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Lesson Selector */}
        <div>
          <label className="block font-bold mb-2">Select Lesson</label>
          <select 
            className="w-full p-3 border rounded-lg"
            value={selectedLesson}
            onChange={(e) => setSelectedLesson(e.target.value)}
            required
          >
            <option value="">-- Choose a Lesson --</option>
            {lessons.map(l => (
              <option key={l.id} value={l.id}>{l.title}</option>
            ))}
          </select>
        </div>

        {/* Theory Section */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <label className="block font-bold mb-2 text-blue-800">Theory Note</label>
          <textarea 
            className="w-full p-3 border rounded-lg h-24"
            value={theoryText}
            onChange={(e) => setTheoryText(e.target.value)}
            placeholder="Explain the concept here..."
            required
          />
          
          <label className="block font-bold mt-4 mb-2 text-blue-800">Theory Image (Optional)</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full"
          />
        </div>

        {/* Question Section */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <label className="block font-bold mb-2">Question</label>
          <input 
            type="text"
            className="w-full p-3 border rounded-lg"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="e.g. Solve for x..."
            required
          />

          <label className="block font-bold mt-4 mb-2">Answers</label>
          {options.map((opt, idx) => (
            <div key={idx} className="flex items-center gap-3 mb-2">
              <input 
                type="text" 
                placeholder={`Option ${idx + 1}`}
                className="flex-1 p-2 border rounded"
                value={opt.text}
                onChange={(e) => updateOption(idx, 'text', e.target.value)}
                required
              />
              <input 
                type="checkbox"
                checked={opt.isCorrect}
                onChange={(e) => updateOption(idx, 'isCorrect', e.target.checked)}
                className="w-5 h-5"
              />
              <span className="text-sm">Correct?</span>
            </div>
          ))}
          <button type="button" onClick={addOptionField} className="text-sm text-blue-600 underline">
            + Add another option
          </button>
        </div>

        <button 
          type="submit" 
          disabled={uploading}
          className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          {uploading ? "Uploading Image & Saving..." : "Save Content"}
        </button>
      </form>
    </div>
  );
}