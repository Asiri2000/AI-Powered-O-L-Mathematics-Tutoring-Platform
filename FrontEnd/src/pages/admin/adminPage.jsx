import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, PlusSquare, Settings, Shield, ArrowRight, Activity } from 'lucide-react';
import { getAllUsers } from '../../api';

function AdminPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    adminCount: 0,
    userCount: 0,
    loading: true
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getAllUsers();
      const adminCount = data.filter(u => u.user_role === 'admin').length;
      const userCount = data.filter(u => u.user_role === 'user').length;
      
      setStats({
        totalUsers: data.length,
        adminCount,
        userCount,
        loading: false
      });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-green-600" />
            <h1 className="text-4xl font-bold text-slate-900">Admin Dashboard</h1>
          </div>
          <p className="text-slate-600">Manage users and monitor platform activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Total Users Card */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <Activity className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="text-slate-600 text-sm font-medium">Total Users</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalUsers}</p>
            <p className="text-xs text-slate-500 mt-2">All registered users</p>
          </div>

          {/* Admin Count Card */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <Activity className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="text-slate-600 text-sm font-medium">Administrators</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">{stats.adminCount}</p>
            <p className="text-xs text-slate-500 mt-2">Admin users</p>
          </div>

          {/* Regular Users Card */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <Activity className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="text-slate-600 text-sm font-medium">Regular Users</h3>
            <p className="text-3xl font-bold text-slate-900 mt-2">{stats.userCount}</p>
            <p className="text-xs text-slate-500 mt-2">Student users</p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Manage Users Button */}
            <button
              onClick={() => navigate('/admin/users')}
              className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg hover:shadow-lg hover:scale-105 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center group-hover:bg-blue-300 transition-colors">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-slate-900">Manage Users</h3>
                  <p className="text-sm text-slate-600">View, edit, and delete users</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Add Content Button */}
            <button
              onClick={() => navigate('/admin/add-content')}
              className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg hover:shadow-lg hover:scale-105 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center group-hover:bg-purple-300 transition-colors">
                  <PlusSquare className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-slate-900">Add Content</h3>
                  <p className="text-sm text-slate-600">Create lesson content</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Settings Button */}
            <button
              onClick={() => alert('Settings coming soon!')}
              className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-lg hover:shadow-lg hover:scale-105 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center group-hover:bg-green-300 transition-colors">
                  <Settings className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-slate-900">Settings</h3>
                  <p className="text-sm text-slate-600">Configure platform settings</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Refresh Stats Button */}
            <button
              onClick={fetchStats}
              className="flex items-center justify-between p-6 bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg hover:shadow-lg hover:scale-105 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center group-hover:bg-orange-300 transition-colors">
                  <Activity className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-slate-900">Refresh Stats</h3>
                  <p className="text-sm text-slate-600">Update dashboard data</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-orange-600 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminPage;