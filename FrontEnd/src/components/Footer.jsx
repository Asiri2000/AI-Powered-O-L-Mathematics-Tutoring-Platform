import React from 'react';
import {
  BookOpen, Lightbulb, Mail, Phone, MapPin,
  Facebook, Twitter, Linkedin, Github,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <BookOpen className="w-6 h-6 text-slate-600" />
                <Lightbulb className="w-3 h-3 text-green-600 absolute -top-1 right-0 fill-current" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Learning Platform</h3>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Empowering students through AI‑powered mathematics tutoring and personalised learning.
            </p>
          </div>

          {/* Quick Links – match navbar routes */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-500 hover:text-green-600 transition-colors">Home</a></li>
              <li><a href="/generator" className="text-gray-500 hover:text-green-600 transition-colors">Question Generator</a></li>
              <li><a href="/math-tutor" className="text-gray-500 hover:text-green-600 transition-colors">Mathematics Tutor</a></li>
              <li><a href="/lessons" className="text-gray-500 hover:text-green-600 transition-colors">Lesson Companion</a></li>
              <li><a href="/mock-exam" className="text-gray-500 hover:text-green-600 transition-colors">Mock Exam</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-500 hover:text-green-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-500 hover:text-green-600 transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-gray-500 hover:text-green-600 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-500 hover:text-green-600 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-500">
                <Mail className="w-4 h-4 text-green-600 shrink-0" />
                <a href="mailto:support@learningplatform.com" className="hover:text-green-600 transition-colors break-all">
                  support@learningplatform.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-500">
                <Phone className="w-4 h-4 text-green-600 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-gray-500">
                <MapPin className="w-4 h-4 text-green-600 shrink-0" />
                <span>123 Education Ave, Learning City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
            &copy; {currentYear} AI‑Powered Mathematics Tutoring Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-green-600 transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-600 transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-600 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-600 transition-colors" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;