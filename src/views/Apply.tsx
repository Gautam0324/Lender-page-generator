import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, UploadCloud, ArrowRight, ArrowLeft } from 'lucide-react';
import { getStorageItem, setStorageItem, INITIAL_DATA } from '../store/localStorage';

export default function Apply() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialType = queryParams.get('type') || 'personal';
  const initialAmount = queryParams.get('amount') || '10000';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    ssn: '',
    dob: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    loanType: initialType,
    loanAmount: initialAmount,
    loanPurpose: '',
    employmentStatus: '',
    annualIncome: '',
    idDocument: null as File | null,
    incomeProof: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, [field]: e.target.files![0] }));
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.ssn) newErrors.ssn = 'SSN is required';
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zip) newErrors.zip = 'ZIP code is required';
    } else if (currentStep === 2) {
      if (!formData.loanType) newErrors.loanType = 'Loan type is required';
      if (!formData.loanAmount || isNaN(Number(formData.loanAmount))) newErrors.loanAmount = 'Valid loan amount is required';
      if (!formData.loanPurpose) newErrors.loanPurpose = 'Loan purpose is required';
      if (!formData.employmentStatus) newErrors.employmentStatus = 'Employment status is required';
      if (!formData.annualIncome || isNaN(Number(formData.annualIncome))) newErrors.annualIncome = 'Valid annual income is required';
    } else if (currentStep === 3) {
      // In a real app, we'd validate file uploads. For this demo, we'll make them optional or mock it.
      // if (!formData.idDocument) newErrors.idDocument = 'ID Document is required';
      // if (!formData.incomeProof) newErrors.incomeProof = 'Proof of income is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
    }

    return isValid;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(4)) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        const applications = getStorageItem('applications', INITIAL_DATA.applications);
        const newApplication = {
          id: `APP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          name: `${formData.firstName} ${formData.lastName}`,
          type: formData.loanType.charAt(0).toUpperCase() + formData.loanType.slice(1) + ' Loan',
          amount: Number(formData.loanAmount),
          date: new Date().toISOString().split('T')[0],
          status: 'Pending',
          details: { ...formData } // Store full details
        };
        
        setStorageItem('applications', [newApplication, ...applications]);
        
        // Also add user if not exists (simplified)
        const users = getStorageItem('users', INITIAL_DATA.users);
        const newUser = {
          id: `USR-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          joinDate: new Date().toISOString().split('T')[0],
          status: 'Active'
        };
        setStorageItem('users', [newUser, ...users]);

        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--color-primary)] font-heading mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-8">
            Thank you, {formData.firstName}. Your loan application has been successfully submitted. Our team will review your details and contact you within 24 hours.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-bold hover:bg-[var(--color-primary-light)] transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] font-heading mb-4">Loan Application</h1>
          <p className="text-gray-600">Complete the form below to apply for your loan. It only takes a few minutes.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 z-0"></div>
            <div 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-[var(--color-secondary)] z-0 transition-all duration-300"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
            
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                  step >= s ? 'bg-[var(--color-secondary)] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > s ? <CheckCircle size={20} /> : s}
                </div>
                <span className={`absolute top-12 text-xs font-medium w-24 text-center ${
                  step >= s ? 'text-[var(--color-primary)]' : 'text-gray-400'
                }`}>
                  {s === 1 ? 'Personal Info' : s === 2 ? 'Loan Details' : s === 3 ? 'Documents' : 'Review'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100 mt-16">
          <form onSubmit={handleSubmit}>
            
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-bold text-[var(--color-primary)] font-heading mb-6 border-b pb-4">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-shadow`} placeholder="John" />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-shadow`} placeholder="Doe" />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-shadow`} placeholder="john@example.com" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-shadow`} placeholder="(555) 123-4567" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Social Security Number</label>
                    <input type="password" name="ssn" value={formData.ssn} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-lg border ${errors.ssn ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-shadow`} placeholder="XXX-XX-XXXX" />
                    {errors.ssn && <p className="text-red-500 text-xs mt-1">{errors.ssn}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-lg border ${errors.dob ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-shadow`} />
                    {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-shadow`} placeholder="123 Main St, Apt 4B" />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-shadow`} placeholder="New York" />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-lg border ${errors.state ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-shadow`} placeholder="NY" />
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                    <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-lg border ${errors.zip ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-shadow`} placeholder="10001" />
                    {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Loan Details */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-bold text-[var(--color-primary)] font-heading mb-6 border-b pb-4">Loan & Financial Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Type</label>
                    <select name="loanType" value={formData.loanType} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-lg border ${errors.loanType ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-shadow bg-white`}>
                      <option value="">Select Loan Type</option>
                      <option value="personal">Personal Loan</option>
                      <option value="business">Business Loan</option>
                      <option value="mortgage">Mortgage</option>
                      <option value="auto">Auto Loan</option>
                    </select>
                    {errors.loanType && <p className="text-red-500 text-xs mt-1">{errors.loanType}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Requested Amount ($)</label>
                    <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-lg border ${errors.loanAmount ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-shadow`} placeholder="10000" />
                    {errors.loanAmount && <p className="text-red-500 text-xs mt-1">{errors.loanAmount}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Purpose</label>
                    <textarea name="loanPurpose" value={formData.loanPurpose} onChange={handleInputChange} rows={3} className={`w-full px-4 py-3 rounded-lg border ${errors.loanPurpose ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-shadow`} placeholder="Please briefly describe what you will use the funds for..."></textarea>
                    {errors.loanPurpose && <p className="text-red-500 text-xs mt-1">{errors.loanPurpose}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employment Status</label>
                    <select name="employmentStatus" value={formData.employmentStatus} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-lg border ${errors.employmentStatus ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-shadow bg-white`}>
                      <option value="">Select Status</option>
                      <option value="employed_full">Employed Full-Time</option>
                      <option value="employed_part">Employed Part-Time</option>
                      <option value="self_employed">Self-Employed</option>
                      <option value="retired">Retired</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.employmentStatus && <p className="text-red-500 text-xs mt-1">{errors.employmentStatus}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income ($)</label>
                    <input type="number" name="annualIncome" value={formData.annualIncome} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-lg border ${errors.annualIncome ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-shadow`} placeholder="75000" />
                    {errors.annualIncome && <p className="text-red-500 text-xs mt-1">{errors.annualIncome}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-bold text-[var(--color-primary)] font-heading mb-6 border-b pb-4">Document Upload</h2>
                <p className="text-gray-600 mb-6">Please upload clear copies of the following documents to expedite your application. (Optional for demo)</p>
                
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'idDocument')} accept="image/*,.pdf" />
                    <UploadCloud size={48} className="mx-auto text-[var(--color-secondary)] mb-4" />
                    <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">Government Issued ID</h3>
                    <p className="text-gray-500 text-sm">Driver's License, Passport, or State ID (PDF, JPG, PNG)</p>
                    {formData.idDocument && <p className="mt-4 text-green-600 font-medium flex items-center justify-center"><CheckCircle size={16} className="mr-2" /> {formData.idDocument.name}</p>}
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'incomeProof')} accept="image/*,.pdf" />
                    <UploadCloud size={48} className="mx-auto text-[var(--color-secondary)] mb-4" />
                    <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">Proof of Income</h3>
                    <p className="text-gray-500 text-sm">Recent Pay Stubs, W-2, or Tax Returns (PDF, JPG, PNG)</p>
                    {formData.incomeProof && <p className="mt-4 text-green-600 font-medium flex items-center justify-center"><CheckCircle size={16} className="mr-2" /> {formData.incomeProof.name}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-bold text-[var(--color-primary)] font-heading mb-6 border-b pb-4">Review & Submit</h2>
                
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4 border-b border-gray-200 pb-2">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                    <div><span className="text-gray-500 block">Name</span><span className="font-medium">{formData.firstName} {formData.lastName}</span></div>
                    <div><span className="text-gray-500 block">Email</span><span className="font-medium">{formData.email}</span></div>
                    <div><span className="text-gray-500 block">Phone</span><span className="font-medium">{formData.phone}</span></div>
                    <div><span className="text-gray-500 block">Address</span><span className="font-medium">{formData.address}, {formData.city}, {formData.state} {formData.zip}</span></div>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4 border-b border-gray-200 pb-2">Loan Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-500 block">Loan Type</span><span className="font-medium capitalize">{formData.loanType}</span></div>
                    <div><span className="text-gray-500 block">Amount</span><span className="font-medium">${Number(formData.loanAmount).toLocaleString()}</span></div>
                    <div><span className="text-gray-500 block">Income</span><span className="font-medium">${Number(formData.annualIncome).toLocaleString()}/yr</span></div>
                    <div><span className="text-gray-500 block">Purpose</span><span className="font-medium">{formData.loanPurpose}</span></div>
                  </div>
                </div>

                <div className="flex items-start mt-6">
                  <input type="checkbox" id="terms" className="mt-1 mr-3 w-4 h-4 text-[var(--color-secondary)] focus:ring-[var(--color-secondary)] border-gray-300 rounded" required />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I certify that the information provided is true and correct. I authorize LendFlow to verify my credit history and employment status. I agree to the <a href="/terms-and-conditions" className="text-[var(--color-secondary)] hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-[var(--color-secondary)] hover:underline">Privacy Policy</a>.
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-10 flex justify-between pt-6 border-t border-gray-100">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft size={18} className="mr-2" /> Back
                </button>
              ) : (
                <div></div> // Empty div for flex spacing
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center bg-[var(--color-primary)] text-white px-8 py-3 rounded-lg font-bold hover:bg-[var(--color-primary-light)] transition-colors shadow-md"
                >
                  Continue <ArrowRight size={18} className="ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center bg-[var(--color-secondary)] text-white px-8 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors shadow-md ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'} <CheckCircle size={18} className="ml-2" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
