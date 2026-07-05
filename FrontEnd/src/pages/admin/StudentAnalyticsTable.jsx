import React, { useState, useEffect } from 'react';
import { getAllStudentAnalytics } from '../../api'; // Adjust path if needed
import { Users, AlertCircle, Search, Filter, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Helper function to calculate status and colors
const getStudentStatus = (accuracy, attempts) => {
  if (attempts === 0) return { text: "Not Started", color: "bg-gray-100 text-gray-600" };
  if (accuracy >= 75) return { text: "A - Distinction", color: "bg-green-100 text-green-800" };
  if (accuracy >= 65) return { text: "B - Very Good Pass", color: "bg-blue-100 text-blue-800" };
  if (accuracy >= 55) return { text: "C - Credit Pass", color: "bg-amber-100 text-amber-800" };
  if (accuracy >= 35) return { text: "S - Ordinary Pass", color: "bg-purple-100 text-purple-800" };
  return { text: "W - Weak / Failure", color: "bg-red-100 text-red-800" };
};

export default function StudentAnalyticsTable() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // --- FILTER STATES ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllStudentAnalytics();
        setStudents(data);
      } catch (error) {
        console.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- EXTRACT UNIQUE LISTS FOR DROPDOWNS ---
  const uniqueSchools = ["All", ...new Set(students.map(s => s.school).filter(Boolean))];
  const uniqueStatuses = [
    "All", "Not Started", "A - Distinction", "B - Very Good Pass", 
    "C - Credit Pass", "S - Ordinary Pass", "W - Weak / Failure"
  ];

  // --- APPLY FILTERS ---
  const filteredStudents = students.filter((student) => {
    const accuracy = parseFloat(student.accuracy_percentage || 0);
    const attempts = parseInt(student.total_attempts || 0);
    const status = getStudentStatus(accuracy, attempts).text;

    const matchesSearch = student.username?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSchool = selectedSchool === "All" || student.school === selectedSchool;
    const matchesStatus = selectedStatus === "All" || status === selectedStatus;

    return matchesSearch && matchesSchool && matchesStatus;
  });

  if (loading) return <div className="p-8 text-center text-gray-500 font-medium mt-10">Loading student data...</div>;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen bg-[#f8fafc]">
      
      {/* --- TOP NAVIGATION --- */}
      <button 
        onClick={() => navigate('/admin')} 
        className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Admin
      </button>

      {/* --- PAGE HEADER (Matched to User Management Template) --- */}
      <div className="flex items-center gap-5 mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center shadow-sm">
          <Users className="w-8 h-8 text-green-700" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-[#0f172a] tracking-tight">Student Analytics</h1>
          <p className="text-slate-500 text-base mt-1">View student performance, accuracy, and total attempts</p>
        </div>
      </div>

      {/* --- DETACHED SEARCH & FILTER BAR --- */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search students..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative min-w-[200px]">
            <select 
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="w-full pl-4 pr-10 py-3.5 bg-white border border-gray-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none shadow-sm cursor-pointer"
            >
              {uniqueSchools.map(school => (
                <option key={school} value={school}>{school === "All" ? "Filter by School" : school}</option>
              ))}
            </select>
            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative min-w-[200px]">
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full pl-4 pr-10 py-3.5 bg-white border border-gray-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none shadow-sm cursor-pointer"
            >
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>{status === "All" ? "Filter by Grade" : status}</option>
              ))}
            </select>
            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* --- TABLE CARD --- */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            
            {/* Clean White Table Header */}
            <thead>
              <tr className="bg-white border-b border-gray-100 text-slate-500 text-xs uppercase tracking-widest font-semibold">
                <th className="px-6 py-5">Student</th>
                <th className="px-6 py-5">School</th>
                <th className="px-6 py-5 text-center">Attempts</th>
                <th className="px-6 py-5 text-center">Accuracy</th>
                <th className="px-6 py-5 text-center">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-50">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const accuracy = parseFloat(student.accuracy_percentage || 0);
                  const attempts = parseInt(student.total_attempts || 0);
                  const { text, color } = getStudentStatus(accuracy, attempts);

                  // Extract first letter for the Avatar
                  const initial = student.username ? student.username.charAt(0).toUpperCase() : '?';

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                      
                      {/* Name with Initial Avatar */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm shrink-0">
                            {initial}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 capitalize">{student.username}</p>
                            <p className="text-xs text-slate-500">{student.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* School */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-700 truncate max-w-[220px]">
                          {student.school || "—"}
                        </p>
                      </td>

                      {/* Attempts */}
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                          {attempts}
                        </span>
                      </td>

                      {/* Accuracy */}
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-slate-900 text-sm">{accuracy.toFixed(1)}%</span>
                      </td>

                      {/* Status Pill */}
                      <td className="px-6 py-4 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold inline-flex items-center justify-center gap-1.5 ${color}`}>
                          {accuracy < 35 && attempts > 0 && <AlertCircle className="w-3.5 h-3.5" />}
                          {text}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500 flex-col flex items-center justify-center">
                    <Search className="w-10 h-10 text-slate-300 mb-3" />
                    <p className="text-base font-medium text-slate-600">No students found</p>
                    <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}