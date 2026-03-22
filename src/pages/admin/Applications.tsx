import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Trash2, X } from 'lucide-react';
import { getStorageItem, setStorageItem, INITIAL_DATA } from '../../store/localStorage';

export default function AdminApplications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    const apps = getStorageItem('applications', INITIAL_DATA.applications);
    setApplications(apps);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    const updatedApps = applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApps);
    setStorageItem('applications', updatedApps);
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      const updatedApps = applications.filter(app => app.id !== id);
      setApplications(updatedApps);
      setStorageItem('applications', updatedApps);
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || app.status === filterStatus;
    const matchesType = filterType === 'All' || app.type.includes(filterType);
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Loan Applications</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="flex items-center">
            <Filter size={18} className="text-gray-400 mr-2" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="flex items-center">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none bg-white"
            >
              <option value="All">All Loan Types</option>
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
              <option value="Mortgage">Mortgage</option>
              <option value="Auto">Auto</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Applicant Name</th>
                <th className="px-6 py-4 font-medium">Loan Type</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredApps.map((app: any) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{app.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{app.type}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">${app.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{app.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => setSelectedApp(app)} className="text-blue-600 hover:text-blue-900 bg-blue-50 p-1.5 rounded-md" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => handleStatusChange(app.id, 'Approved')} className="text-green-600 hover:text-green-900 bg-green-50 p-1.5 rounded-md" title="Approve">
                        <CheckCircle size={18} />
                      </button>
                      <button onClick={() => handleStatusChange(app.id, 'Rejected')} className="text-red-600 hover:text-red-900 bg-red-50 p-1.5 rounded-md" title="Reject">
                        <XCircle size={18} />
                      </button>
                      <button onClick={() => handleDelete(app.id)} className="text-gray-500 hover:text-gray-700 bg-gray-100 p-1.5 rounded-md" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredApps.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">No applications found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination placeholder */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500">Showing 1 to {filteredApps.length} of {filteredApps.length} entries</span>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-white bg-[var(--color-primary)]">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900 font-heading">Application Details: {selectedApp.id}</h2>
              <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  selectedApp.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  selectedApp.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  Status: {selectedApp.status}
                </span>
                <span className="text-sm text-gray-500">Submitted: {selectedApp.date}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Applicant Info</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium text-gray-900">Name:</span> {selectedApp.name}</p>
                    {selectedApp.details && (
                      <>
                        <p><span className="font-medium text-gray-900">Email:</span> {selectedApp.details.email}</p>
                        <p><span className="font-medium text-gray-900">Phone:</span> {selectedApp.details.phone}</p>
                        <p><span className="font-medium text-gray-900">DOB:</span> {selectedApp.details.dob}</p>
                        <p><span className="font-medium text-gray-900">Address:</span> {selectedApp.details.address}, {selectedApp.details.city}, {selectedApp.details.state} {selectedApp.details.zip}</p>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Loan Request</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium text-gray-900">Type:</span> {selectedApp.type}</p>
                    <p><span className="font-medium text-gray-900">Amount:</span> ${selectedApp.amount.toLocaleString()}</p>
                    {selectedApp.details && (
                      <>
                        <p><span className="font-medium text-gray-900">Purpose:</span> {selectedApp.details.loanPurpose}</p>
                        <p><span className="font-medium text-gray-900">Employment:</span> {selectedApp.details.employmentStatus.replace('_', ' ')}</p>
                        <p><span className="font-medium text-gray-900">Annual Income:</span> ${Number(selectedApp.details.annualIncome).toLocaleString()}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end space-x-3">
                <button onClick={() => handleStatusChange(selectedApp.id, 'Rejected')} className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 font-medium transition-colors">
                  Reject Application
                </button>
                <button onClick={() => handleStatusChange(selectedApp.id, 'Approved')} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors">
                  Approve Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
