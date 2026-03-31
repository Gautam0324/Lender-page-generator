import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CreditCard, Briefcase, Home as HomeIcon, Car, CheckCircle, Calculator } from 'lucide-react';

const loanData = {
  personal: {
    title: 'Personal Loan',
    icon: <CreditCard size={48} className="text-[var(--color-secondary)]" />,
    description: 'A personal loan provides you with a lump sum of money that you repay in fixed monthly installments over a set period. Whether you need to consolidate debt, cover unexpected expenses, or fund a major purchase, our personal loans offer competitive rates and flexible terms to fit your budget.',
    features: [
      'Loan amounts from $1,000 to $50,000',
      'Fixed interest rates starting at 5.99% APR',
      'Repayment terms from 12 to 60 months',
      'No prepayment penalties',
      'Funds deposited as soon as the next business day'
    ],
    eligibility: [
      'Minimum credit score of 600',
      'Verifiable source of income',
      'U.S. citizen or permanent resident',
      'At least 18 years of age'
    ],
    rates: [
      { term: '12-36 Months', rate: '5.99% - 12.99%' },
      { term: '37-60 Months', rate: '7.99% - 15.99%' },
    ],
    defaultAmount: 10000,
    defaultRate: 8.5,
    defaultTerm: 36
  },
  business: {
    title: 'Business Loan',
    icon: <Briefcase size={48} className="text-[var(--color-secondary)]" />,
    description: 'Fuel your business growth with our tailored financing solutions. Whether you are looking to expand operations, purchase new equipment, or manage cash flow, our business loans provide the capital you need to succeed.',
    features: [
      'Loan amounts from $10,000 to $500,000',
      'Competitive fixed and variable rates',
      'Repayment terms up to 10 years',
      'Dedicated business loan specialist',
      'Flexible repayment options'
    ],
    eligibility: [
      'Minimum 2 years in business',
      'Annual revenue of at least $100,000',
      'Minimum personal credit score of 650',
      'No recent bankruptcies or tax liens'
    ],
    rates: [
      { term: '1-3 Years', rate: '6.50% - 14.00%' },
      { term: '4-10 Years', rate: '8.00% - 18.00%' },
    ],
    defaultAmount: 50000,
    defaultRate: 9.0,
    defaultTerm: 60
  },
  mortgage: {
    title: 'Mortgage / Home Loan',
    icon: <HomeIcon size={48} className="text-[var(--color-secondary)]" />,
    description: 'Make your dream home a reality with our affordable mortgage plans. We offer a variety of home loan options, including conventional, FHA, and VA loans, to help you find the perfect fit for your financial situation.',
    features: [
      'Loan amounts up to $2,000,000',
      'Fixed and adjustable-rate options',
      'Terms of 15, 20, or 30 years',
      'Low down payment options available',
      'Pre-approval in minutes'
    ],
    eligibility: [
      'Minimum credit score of 620 (varies by loan type)',
      'Stable employment history',
      'Debt-to-income ratio below 43%',
      'Sufficient funds for down payment and closing costs'
    ],
    rates: [
      { term: '15-Year Fixed', rate: '5.25% - 6.50%' },
      { term: '30-Year Fixed', rate: '6.00% - 7.25%' },
    ],
    defaultAmount: 300000,
    defaultRate: 6.5,
    defaultTerm: 360 // months
  },
  auto: {
    title: 'Auto Loan',
    icon: <Car size={48} className="text-[var(--color-secondary)]" />,
    description: 'Hit the road faster with quick approvals and low interest rates on new and used auto loans. We make the car buying process simple and straightforward.',
    features: [
      'Financing for new and used vehicles',
      'Loan amounts up to 100% of the vehicle value',
      'Repayment terms up to 84 months',
      'Get pre-approved before you shop',
      'Refinancing options available'
    ],
    eligibility: [
      'Minimum credit score of 580',
      'Proof of income and employment',
      'Valid driver\'s license',
      'Vehicle must meet age and mileage requirements'
    ],
    rates: [
      { term: 'Up to 36 Months', rate: '4.50% - 9.00%' },
      { term: '37-84 Months', rate: '5.50% - 12.00%' },
    ],
    defaultAmount: 25000,
    defaultRate: 6.0,
    defaultTerm: 60
  }
};

export default function LoanDetails() {
  const { type } = useParams<{ type: string }>();
  const data = loanData[type as keyof typeof loanData] || loanData.personal;

  const [amount, setAmount] = useState(data.defaultAmount);
  const [rate, setRate] = useState(data.defaultRate);
  const [term, setTerm] = useState(data.defaultTerm);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    // EMI Calculation Formula: P x R x (1+R)^N / [(1+R)^N-1]
    const p = amount;
    const r = (rate / 100) / 12;
    const n = term;
    
    if (p > 0 && r > 0 && n > 0) {
      const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(emiValue);
    } else {
      setEmi(0);
    }
  }, [amount, rate, term]);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-8 border border-gray-100 flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
          <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-8 flex-shrink-0">
            {data.icon}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] font-heading mb-4">{data.title}</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl leading-relaxed">{data.description}</p>
            <Link
              to={`/apply?type=${type}`}
              className="inline-block bg-[var(--color-secondary)] text-white px-8 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors shadow-md"
            >
              Apply Now
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Features & Eligibility */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-[var(--color-primary)] font-heading mb-6">Key Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {data.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle size={20} className="text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-[var(--color-primary)] font-heading mb-6">Eligibility Criteria</h2>
              <ul className="space-y-3">
                {data.eligibility.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-secondary)] mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interest Rates Table */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-[var(--color-primary)] font-heading mb-6">Interest Rates</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-700">
                      <th className="py-4 px-6 font-semibold border-b border-gray-200 rounded-tl-lg">Loan Term</th>
                      <th className="py-4 px-6 font-semibold border-b border-gray-200 rounded-tr-lg">Interest Rate (APR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.rates.map((rate, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 text-gray-800">{rate.term}</td>
                        <td className="py-4 px-6 text-gray-800 font-medium text-[var(--color-primary)]">{rate.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar - EMI Calculator */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--color-primary-light)] rounded-2xl shadow-lg p-8 text-white sticky top-28">
              <div className="flex items-center mb-6">
                <Calculator size={24} className="text-[var(--color-secondary)] mr-3" />
                <h2 className="text-xl font-bold font-heading">EMI Calculator</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Loan Amount: ${amount.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min={type === 'mortgage' ? 50000 : 1000}
                    max={type === 'mortgage' ? 2000000 : 100000}
                    step={1000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[var(--color-secondary)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Interest Rate: {rate}%
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[var(--color-secondary)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Loan Term: {term} Months
                  </label>
                  <input
                    type="range"
                    min="12"
                    max={type === 'mortgage' ? 360 : 84}
                    step="12"
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[var(--color-secondary)]"
                  />
                </div>

                <div className="mt-8 p-6 bg-gray-800 rounded-xl border border-gray-700 text-center">
                  <p className="text-gray-400 text-sm mb-2">Your Estimated Monthly EMI</p>
                  <p className="text-4xl font-bold text-[var(--color-secondary)] font-heading">
                    ${emi.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <Link
                  to={`/apply?type=${type}&amount=${amount}`}
                  className="block w-full text-center bg-white text-[var(--color-primary)] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors mt-6"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
