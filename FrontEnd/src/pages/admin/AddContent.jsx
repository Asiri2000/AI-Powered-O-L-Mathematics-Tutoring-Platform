import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileText, Image as ImageIcon, CheckCircle2, Plus, UploadCloud } from 'lucide-react';

export default function AddContent() {
  const navigate = useNavigate();
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
    
    // Quick Validation: Ensure at least one correct answer is selected
    const hasCorrectAnswer = options.some(opt => opt.isCorrect);
    if (!hasCorrectAnswer) {
      alert("Please mark at least one option as the correct answer.");
      return;
    }

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
      // Optionally navigate back: navigate('/admin/lessons');
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
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen bg-[#f8fafc]">
      
      {/* --- TOP NAVIGATION --- */}
      <button 
        onClick={() => navigate('/admin')} 
        className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Admin
      </button>

      {/* --- PAGE HEADER --- */}
      <div className="flex items-center gap-5 mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center shadow-sm">
          <BookOpen className="w-8 h-8 text-green-700" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-[#0f172a] tracking-tight">Add Lesson Content</h1>
          <p className="text-slate-500 text-base mt-1">Create new theory steps and questions for students</p>
        </div>
      </div>

      {/* --- MAIN FORM CARD --- */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION: Lesson Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">
              1. Target Lesson
            </label>
            <div className="relative">
              <select 
                className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none shadow-sm cursor-pointer"
                value={selectedLesson}
                onChange={(e) => setSelectedLesson(e.target.value)}
                required
              >
                <option value="" disabled>-- Select the lesson this belongs to --</option>
                {lessons.map(l => (
                  <option key={l.id} value={l.id}>{l.title}</option>
                ))}
              </select>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* SECTION: Theory */}
          <div className="space-y-5 bg-blue-50/50 p-6 rounded-xl border border-blue-100/50">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                2. Theory Note (Quick Tip)
              </label>
            </div>
            
            <textarea 
              className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm resize-y min-h-[120px]"
              value={theoryText}
              onChange={(e) => setTheoryText(e.target.value)}
              placeholder="Explain the core concept or formula here..."
              required
            />
            
            <div className="mt-4">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
                <ImageIcon className="w-4 h-4" /> Optional Theory Image
              </label>
              <div className="flex items-center gap-4">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors border border-slate-200 rounded-lg bg-white"
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* SECTION: Question & Answers */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                3. Assessment Question
              </label>
            </div>

            <input 
              type="text"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="e.g. Based on the theory above, solve for x..."
              required
            />

            <div className="mt-6">
              <label className="block text-sm font-medium text-slate-600 mb-3">Answer Options</label>
              <div className="space-y-3">
                {options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 focus-within:border-green-400 focus-within:ring-1 focus-within:ring-green-400 transition-all">
                    
                    {/* The Custom Checkbox */}
                    <div className="pl-3 flex items-center">
                      <input 
                        type="checkbox"
                        checked={opt.isCorrect}
                        onChange={(e) => updateOption(idx, 'isCorrect', e.target.checked)}
                        className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer"
                        title="Mark as correct answer"
                      />
                    </div>

                    <input 
                      type="text" 
                      placeholder={`Option ${idx + 1}`}
                      className="flex-1 p-2 bg-transparent border-none focus:ring-0 text-sm"
                      value={opt.text}
                      onChange={(e) => updateOption(idx, 'text', e.target.value)}
                      required
                    />
                    
                    {opt.isCorrect && (
                      <span className="pr-3 text-xs font-bold text-green-600 uppercase tracking-wider">
                        Correct
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <button 
                type="button" 
                onClick={addOptionField} 
                className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors px-2 py-1 rounded-md hover:bg-blue-50"
              >
                <Plus className="w-4 h-4" /> Add another option
              </button>
            </div>
          </div>

          {/* SECTION: Submit Button */}
          <div className="pt-6">
            <button 
              type="submit" 
              disabled={uploading}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {uploading ? (
                <>
                  <UploadCloud className="w-5 h-5 animate-pulse" />
                  Uploading & Saving...
                </>
              ) : (
                "Save Content to Database"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}