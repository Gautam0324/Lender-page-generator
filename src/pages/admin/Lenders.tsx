import React, { useEffect, useState } from 'react';
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react';
import { getStorageItem } from '../../store/localStorage';

export default function AdminLenders() {
  const session = getStorageItem('admin_session', null);
  const adminUserId = Number(session?.id);

  const [lenders, setLenders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLender, setEditingLender] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    website: '',
    email: '',
    phone: '',
    status: 'active',
    notes: ''
  });

  useEffect(() => {
    if (!adminUserId) return;
    loadLenders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminUserId]);

  const loadLenders = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`/api/lenders?adminUserId=${adminUserId}`);
      const data = await response.json().catch(() => []);
      if (!response.ok) {
        setError(data?.error || 'Failed to load lenders');
        setLenders([]);
        return;
      }
      setLenders(Array.isArray(data) ? data : []);
    } catch {
      setError('Unable to connect to server');
      setLenders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUserId) return;

    try {
      setLoading(true);
      setError('');

      const endpoint = editingLender ? `/api/lenders/${editingLender.id}` : '/api/lenders';
      const method = editingLender ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminUserId,
          ...formData
        })
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(payload?.error || 'Failed to save lender');
        return;
      }

      await loadLenders();
      closeModal();
    } catch {
      setError('Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (lender: any) => {
    setEditingLender(lender);
    setFormData({
      name: lender.name || '',
      website: lender.website || '',
      email: lender.email || '',
      phone: lender.phone || '',
      status: lender.status || 'active',
      notes: lender.notes || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!adminUserId) return;
    if (!window.confirm('Are you sure you want to delete this lender?')) return;

    try {
      setLoading(true);
      setError('');
      const response = await fetch(`/api/lenders/${id}?adminUserId=${adminUserId}`, { method: 'DELETE' });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(payload?.error || 'Failed to delete lender');
        return;
      }
      await loadLenders();
    } catch {
      setError('Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLender(null);
    setFormData({ name: '', website: '', email: '', phone: '', status: 'active', notes: '' });
  };

  const filteredLenders = lenders.filter((l) => {
    const q = searchTerm.toLowerCase();
    return (
      String(l.name || '').toLowerCase().includes(q) ||
      String(l.email || '').toLowerCase().includes(q) ||
      String(l.website || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Lenders</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-[var(--color-secondary)] text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors shadow-sm"
        >
          <Plus size={18} className="mr-2" /> Add Lender
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search lenders by name, website, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Website</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLenders.map((lender) => (
                <tr key={lender.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{lender.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{lender.website || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{lender.email || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{lender.phone || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${lender.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                      {lender.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => handleEdit(lender)} className="text-blue-600 hover:text-blue-900 bg-blue-50 p-1.5 rounded-md" title="Edit">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(lender.id)} className="text-red-600 hover:text-red-900 bg-red-50 p-1.5 rounded-md" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && filteredLenders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No lenders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 font-heading">{editingLender ? 'Edit Lender' : 'Add Lender'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lender Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input type="text" name="website" value={formData.website} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none bg-white">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-secondary)] outline-none resize-none" />
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-light)] font-medium transition-colors">{editingLender ? 'Save Changes' : 'Add Lender'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
