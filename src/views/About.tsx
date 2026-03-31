import React from 'react';
import { Shield, Users, Target, Award, Linkedin, Twitter } from 'lucide-react';

export default function About() {
  const team = [
    { id: 1, name: 'Michael Chen', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Sarah Jenkins', role: 'Chief Financial Officer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'David Rodriguez', role: 'Head of Lending', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'Emily Wong', role: 'Customer Success Manager', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-[var(--color-primary)] text-white py-20 lg:py-28 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">About LendFlow</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We're on a mission to democratize access to capital and empower individuals and businesses to achieve their financial goals.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-primary)] font-heading mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded in 2018, LendFlow emerged from a simple observation: the traditional lending process was broken. It was too slow, too opaque, and too rigid for the modern borrower.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We built a platform that leverages technology to streamline the application process, provide transparent terms, and deliver funds quickly. What started as a small team with a big idea has grown into a trusted financial partner for thousands of individuals and businesses nationwide.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we continue to innovate and expand our product offerings, always keeping our core mission at the forefront: making borrowing simple, fair, and accessible to everyone.
              </p>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Team Meeting" className="rounded-2xl shadow-2xl" referrerPolicy="no-referrer" />
              <div className="absolute -bottom-6 -left-6 bg-[var(--color-secondary)] text-white p-6 rounded-xl shadow-lg hidden md:block">
                <p className="text-3xl font-bold font-heading">8+</p>
                <p className="font-medium">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--color-primary)] font-heading mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--color-primary)]">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-primary)] font-heading mb-3">Transparency</h3>
              <p className="text-gray-600">No hidden fees, no confusing jargon. We believe in clear, upfront communication.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--color-secondary)]">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-primary)] font-heading mb-3">Customer First</h3>
              <p className="text-gray-600">Your success is our success. We prioritize your needs and provide exceptional support.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-primary)] font-heading mb-3">Innovation</h3>
              <p className="text-gray-600">We constantly seek better ways to serve you through technology and improved processes.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-primary)] font-heading mb-3">Integrity</h3>
              <p className="text-gray-600">We hold ourselves to the highest ethical standards in every decision we make.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--color-primary)] font-heading mb-4">Meet Our Leadership</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The experienced professionals driving our vision forward.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.id} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img src={member.image} alt={member.name} className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex space-x-3 text-white">
                      <a href="#" className="hover:text-[var(--color-secondary)]"><Linkedin size={20} /></a>
                      <a href="#" className="hover:text-[var(--color-secondary)]"><Twitter size={20} /></a>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-primary)] font-heading">{member.name}</h3>
                <p className="text-[var(--color-secondary)] font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
