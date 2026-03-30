export const INITIAL_DATA = {
  settings: {
    siteName: 'LendFlow',
    metaTitle: 'LendFlow - Fast & Reliable Loans',
    contactEmail: 'support@lendflow.com',
    contactPhone: '(555) 123-4567',
    contactAddress: '123 Financial District, NY 10004',
    adminPassword: 'admin',
    customHeaderText: 'Get fast approvals with transparent rates — apply in minutes.',
    customFooterText: 'Need help? Contact our support team 24/7 for assistance.'
  },
  applications: [],
  users: [
    { id: 1, name: 'Admin User', email: 'admin@lendflow.com', role: 'admin', status: 'active', lastLogin: '2023-10-15T10:30:00Z' }
  ],
  adminAccounts: [
    {
      id: 'admin-1',
      name: 'Admin User',
      username: 'admin',
      email: 'admin@lendflow.com',
      password: 'admin',
      createdAt: new Date().toISOString()
    }
  ],
  cms: {
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        data: {
          title: 'Fast & Reliable Loans for Your Needs',
          subtitle: 'Get approved in minutes with our simple online application process. Competitive rates and flexible terms.',
          ctaText: 'Apply Now',
          ctaLink: '/apply',
          secondaryCtaText: 'Explore Services',
          secondaryCtaLink: '/services',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        }
      },
      {
        id: 'custom-1',
        type: 'custom',
        data: {
          heading: 'Tailored Financial Solutions',
          content: 'We understand that every financial journey is unique. That is why we offer personalized solutions to meet your specific needs.\n\nOur team of experts works closely with you to ensure you get the best rates and terms available in the market.',
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeefa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          imageAlignment: 'right',
          buttonText: 'Learn More',
          buttonLink: '/about',
          secondaryButtonText: '',
          secondaryButtonLink: ''
        }
      },
      {
        id: 'custom-2',
        type: 'custom',
        data: {
          heading: 'Secure & Transparent Process',
          content: 'Security and transparency are at the core of everything we do. From application to funding, you will always know where you stand.\n\nNo hidden fees, no surprises. Just straightforward lending you can trust.',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          imageAlignment: 'left',
          buttonText: 'Apply Now',
          buttonLink: '/apply',
          secondaryButtonText: '',
          secondaryButtonLink: ''
        }
      },
      {
        id: 'howItWorks-1',
        type: 'howItWorks',
        data: {
          heading: 'How It Works',
          subtitle: 'Get your funds in three simple steps.',
          buttonText: 'Start Application',
          buttonLink: '/apply',
          secondaryButtonText: 'Learn More',
          secondaryButtonLink: '/about'
        }
      },
      {
        id: 'testimonials-1',
        type: 'testimonials',
        data: {
          heading: 'What Our Clients Say',
          subtitle: 'Don\'t just take our word for it.',
          buttonText: 'View All Reviews',
          buttonLink: '/about',
          secondaryButtonText: 'Submit Review',
          secondaryButtonLink: '/contact',
          items: [
            { id: 1, name: 'David L.', role: 'Small Business Owner', text: 'The business loan process was incredibly smooth. I had the funds in my account within 48 hours.' },
            { id: 2, name: 'Emily R.', role: 'Homeowner', text: 'They helped me secure a mortgage with a great rate when other banks turned me down.' },
            { id: 3, name: 'Michael T.', role: 'Startup Founder', text: 'Excellent customer service and transparent terms. Highly recommended for any growing business.' }
          ]
        }
      },
      {
        id: 'faq-1',
        type: 'faq',
        data: {
          heading: 'Frequently Asked Questions',
          subtitle: 'Everything you need to know about our lending process.',
          buttonText: 'Contact Support',
          buttonLink: '/contact',
          secondaryButtonText: 'View All FAQs',
          secondaryButtonLink: '/about',
          items: [
            { id: 1, question: 'What are your interest rates?', answer: 'Our interest rates vary depending on the loan type, your credit score, and market conditions. Contact us for a personalized quote.' },
            { id: 2, question: 'How long does the approval process take?', answer: 'For personal loans, approval can be as fast as 24 hours. Mortgages and business loans typically take 1-3 weeks.' },
            { id: 3, question: 'Are there any prepayment penalties?', answer: 'Most of our loan products do not have prepayment penalties, allowing you to pay off your loan early and save on interest.' }
          ]
        }
      },
      {
        id: 'cta-1',
        type: 'cta',
        data: {
          heading: 'Ready to Take the Next Step?',
          subtitle: 'Apply online today and get your funds as soon as tomorrow.',
          buttonText: 'Start Your Application',
          buttonLink: '/apply',
          secondaryButtonText: 'Contact Us',
          secondaryButtonLink: '/contact'
        }
      }
    ]
  },
  legalPages: {
    privacyPolicy: {
      title: 'Privacy Policy',
      content: `<p>Welcome to {{DOMAIN_NAME}} (the 'Site'). We understand that privacy online is important to users of our Site, especially when conducting business. This statement governs our privacy policies with respect to those users of the Site ('Visitors') who visit without transacting business and Visitors who register to transact business on the Site and make use of the various services offered by {{DOMAIN_NAME}} (collectively, 'Services') ('Authorized Customers').</p>
<h3>'Personally Identifiable Information'</h3>
<p>refers to any information that identifies or can be used to identify, contact, or locate the person to whom such information pertains, including, but not limited to, name, address, phone number, fax number, email address, financial profiles, social security number, and credit card information. Personally Identifiable Information does not include information that is collected anonymously (that is, without identification of the individual user) or demographic information not connected to an identified individual.</p>
<h3>What Personally Identifiable Information is collected?</h3>
<p>We may collect basic user profile information from all of our Visitors. We collect the following additional information from our Authorized Customers: the names, addresses, phone numbers and email addresses of Authorized Customers, the nature and size of the business, and the nature and size of the advertising inventory that the Authorized Customer intends to purchase or sell.</p>
<h3>What organizations are collecting the information?</h3>
<p>In addition to our direct collection of information, our third party service vendors (such as credit card companies, clearinghouses and banks) who may provide such services as credit, insurance, and escrow services may collect this information from our Visitors and Authorized Customers. We do not control how these third parties use such information, but we do ask them to disclose how they use personal information provided to them from Visitors and Authorized Customers. Some of these third parties may be intermediaries that act solely as links in the distribution chain, and do not store, retain, or use the information given to them.</p>
<h3>How does the Site use Personally Identifiable Information?</h3>
<p>We use Personally Identifiable Information to customize the Site, to make appropriate service offerings, and to fulfill buying and selling requests on the Site. We may email Visitors and Authorized Customers about research or purchase and selling opportunities on the Site or information related to the subject matter of the Site. We may also use Personally Identifiable Information to contact Visitors and Authorized Customers in response to specific inquiries, or to provide requested information.</p>
<h3>With whom may the information may be shared?</h3>
<p>Personally Identifiable Information about Authorized Customers may be shared with other Authorized Customers who wish to evaluate potential transactions with other Authorized Customers. We may share aggregated information about our Visitors, including the demographics of our Visitors and Authorized Customers, with our affiliated agencies and third party vendors. We also offer the opportunity to 'opt out' of receiving information or being contacted by us or by any agency acting on our behalf.</p>
<h3>How is Personally Identifiable Information stored?</h3>
<p>Personally Identifiable Information collected by {{DOMAIN_NAME}} is securely stored and is not accessible to third parties or employees of {{DOMAIN_NAME}} except for use as indicated above.</p>
<h3>What choices are available to Visitors regarding collection, use and distribution of the information?</h3>
<p>Visitors and Authorized Customers may opt out of receiving unsolicited information from or being contacted by us and/or our vendors and affiliated agencies by responding to emails as instructed, or by contacting us at 4677 Gateway Road, Keizer, OR 97303.</p>
<h3>Are Cookies Used on the Site?</h3>
<p>Cookies are used for a variety of reasons. We use Cookies to obtain information about the preferences of our Visitors and the services they select. We also use Cookies for security purposes to protect our Authorized Customers. For example, if an Authorized Customer is logged on and the site is unused for more than 10 minutes, we will automatically log the Authorized Customer off.</p>
<h3>How does {{DOMAIN_NAME}} use login information?</h3>
<p>{{DOMAIN_NAME}} uses login information, including, but not limited to, IP addresses, ISPs, and browser types, to analyze trends, administer the Site, track a user’s movement and use, and gather broad demographic information.</p>
<h3>What partners or service providers have access to Personally Identifiable Information from Visitors and/or Authorized Customers on the Site?</h3>
<p>{{DOMAIN_NAME}} has entered into and will continue to enter into partnerships and other affiliations with a number of vendors. Such vendors may have access to certain Personally Identifiable Information on a need to know basis for evaluating Authorized Customers for service eligibility. Our privacy policy does not cover their collection or use of this information. Disclosure of Personally Identifiable Information to comply with law. We will disclose Personally Identifiable Information in order to comply with a court order or subpoena or a request from a law enforcement agency to release information. We will also disclose Personally Identifiable Information when reasonably necessary to protect the safety of our Visitors and Authorized Customers.</p>
<h3>How does the Site keep Personally Identifiable Information secure?</h3>
<p>All of our employees are familiar with our security policy and practices. The Personally Identifiable Information of our Visitors and Authorized Customers is only accessible to a limited number of qualified employees who are given a password in order to gain access to the information. We audit our security systems and processes on a regular basis. Sensitive information, such as credit card numbers or social security numbers, is protected by encryption protocols, in place to protect information sent over the Internet. While we take commercially reasonable measures to maintain a secure site, electronic communications and databases are subject to errors, tampering and break-ins, and we cannot guarantee or warrant that such events will not take place and we will not be liable to Visitors or Authorized Customers for any such occurrences.</p>
<h3>How can Visitors correct any inaccuracies in Personally Identifiable Information?</h3>
<p>Visitors and Authorized Customers may contact us to update Personally Identifiable Information about them or to correct any inaccuracies by emailing us at {{DOMAIN_NAME}}.</p>
<h3>Can a Visitor delete or deactivate Personally Identifiable Information collected by the Site?</h3>
<p>We provide Visitors and Authorized Customers with a mechanism to delete/deactivate Personally Identifiable Information from the Site's database by contacting us. However, because of backups and records of deletions, it may be impossible to delete a Visitor's entry without retaining some residual information. An individual who requests to have Personally Identifiable Information deactivated will have this information functionally deleted, and we will not sell, transfer, or use Personally Identifiable Information relating to that individual in any way moving forward.</p>
<h3>What happens if the Privacy Policy Changes?</h3>
<p>We will let our Visitors and Authorized Customers know about changes to our privacy policy by posting such changes on the Site. However, if we are changing our privacy policy in a manner that might cause disclosure of Personally Identifiable Information that a Visitor or Authorized Customer has previously requested not be disclosed, we will contact such Visitor or Authorized Customer to allow such Visitor or Authorized Customer to prevent such disclosure.</p>
<h3>Links</h3>
<p>{{DOMAIN_NAME}} contains links to other web sites. Please note that when you click on one of these links, you are moving to another web site. We encourage you to read the privacy statements of these linked sites as their privacy policies may differ from ours.</p>`
    },
    termsAndConditions: {
      title: 'Terms & Conditions',
      content: `<p><strong>1. BINDING EFFECT.</strong> This is a binding agreement between you and {{DOMAIN_NAME}} ('us', 'we', 'Company'). By using the Internet site located at {{DOMAIN_NAME}} (the 'Site'), you agree to abide by these Terms of Use. If at any time you find these Terms of Use unacceptable, you must immediately leave the Site and cease all use of it.</p>
<p><strong>2. PRIVACY POLICY.</strong> We respect your privacy and permit you to control the treatment of your personal information. A complete statement of our current privacy policy can be found by clicking here. Our privacy policy is expressly incorporated into this Agreement by this reference.</p>
<p><strong>3. GOVERNING LAW.</strong> These Terms of Use shall be construed in accordance with and governed by the laws of California and the United States, without reference to rules regarding conflicts of law. This Site is intended for use by individuals based in the United States of America.</p>
<p><strong>4. MINIMUM AGE.</strong> You must be at least 18 years old to access and participate on this site. You guarantee and warrant you are at least 18 years old and are able to enter into this Agreement from a legal perspective.</p>
<p><strong>5. EBOOK SIGNUPS AND MAILINGS.</strong> You have the option, but not obligation, to sign up and receive a free eBook from us. Should you do so, you are agreeing to receive further emailings from us of a commercial nature.</p>
<p><strong>6. EMAIL COMMUNICATIONS.</strong> When you contact us, you expressly consent and agree to receive email responses from us. These email communications may be commercial or non-commercial in nature. Non-commercial emails may include, but are not limited to, administrative issues and announcements of changes to these Terms, the Privacy Policy or other site documentation.</p>
<p><strong>7. USE OF SOFTWARE.</strong> Company may make certain software available to you from the Site. If you download software from the Site, the software, including all files and images contained in or generated by the software, and accompanying data (collectively, 'Software') are deemed to be licensed to you by Company, for your personal, noncommercial, home use only. Company does not transfer either the title or the intellectual property rights to the Software, and Company retains full and complete title to the Software as well as all intellectual property rights therein. You may not sell, redistribute, or reproduce the Software, nor may you decompile, reverse-engineer, disassemble, or otherwise convert the Software to a human-perceivable form. All trademarks and logos are owned by Company or its licensors and you may not copy or use them in any manner.</p>
<p><strong>8. USER CONTENT.</strong> By posting, downloading, displaying, performing, transmitting, or otherwise distributing information or other content ('User Content') to the site, you are granting Company, its affiliates, officers, directors, employees, consultants, agents, and representatives a permanent, non-exclusive license to use User Content in connection with the operation of the Internet businesses of Company, its affiliates, officers, directors, employees, consultants, agents, and representatives, including without limitation, a right to copy, distribute, transmit, publicly display, publicly perform, reproduce, edit, translate, and reformat User Content. You will not be compensated for any User Content. You agree that Company may publish or otherwise disclose your name in connection with your User Content. By posting User Content on the site, you warrant and represent that you own the rights to the User Content or are otherwise authorized to post, distribute, display, perform, transmit, or otherwise distribute User Content.</p>
<p><strong>9. COMPLIANCE WITH INTELLECTUAL PROPERTY LAWS.</strong> When accessing the site, you agree to respect the intellectual property rights of others. Your use of the site is at all times governed by and subject to laws regarding copyright ownership and use of intellectual property. You agree not to upload, download, display, perform, transmit, or otherwise distribute any information or content (collectively, 'Content') in violation of any third party's copyrights, trademarks, or other intellectual property or proprietary rights. You agree to abide by laws regarding copyright ownership and use of intellectual property, and you shall be solely responsible for any violations of any relevant laws and for any infringements of third party rights caused by any Content you provide or transmit, or that is provided or transmitted using your User ID. The burden of proving that any Content does not violate any laws or third party rights rests solely with you. All Digital Millennium Copyright Act matters are processed pursuant to our DMCA Policy, which you may access via the DMCA link at the bottom of the page.</p>
<p><strong>10. INAPPROPRIATE CONTENT.</strong> You agree not to upload, download, display, perform, transmit, or otherwise distribute any Content that (a) is libelous, defamatory, obscene, pornographic, abusive, or threatening; (b) advocates or encourages conduct that could constitute a criminal offense, give rise to civil liability, or otherwise violate any applicable local, state, national, or foreign law or regulation; (c) advertises or otherwise solicits funds or is a solicitation for goods or services; or (d) provides medical advice to other users. Company reserves the right to terminate your receipt, transmission, or other distribution of any such material using the site, and, if applicable, to delete any such material from its servers. Company intends to cooperate fully with any law enforcement officials or agencies in the investigation of any violation of these Terms or of any applicable laws.</p>
<p><strong>11. COMPLIANCE WITH INTELLECTUAL PROPERTY LAWS.</strong> When accessing the Site, you agree to obey the law and to respect the intellectual property rights of others. Your use of the Site is at all times governed by and subject to laws regarding copyright ownership and use of intellectual property. You agree not to upload, download, display, perform, transmit, or otherwise distribute any information or content (collectively, 'Content') in violation of any third party's copyrights, trademarks, or other intellectual property or proprietary rights. You agree to abide by laws regarding copyright ownership and use of intellectual property, and you shall be solely responsible for any violations of any relevant laws and for any infringements of third party rights caused by any Content you provide or transmit, or that is provided or transmitted using your account. The burden of proving that any Content does not violate any laws or third party rights rests solely with you.</p>
<p><strong>12. NO WARRANTIES.</strong> WE HEREBY DISCLAIM ALL WARRANTIES. WE ARE MAKING THE SITE AVAILABLE 'AS IS' WITHOUT WARRANTY OF ANY KIND. YOU ASSUME THE RISK OF ANY AND ALL DAMAGE OR LOSS FROM USE OF, OR INABILITY TO USE, THE SITE OR THE SERVICE. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE EXPRESSLY DISCLAIM ANY AND ALL WARRANTIES, EXPRESS OR IMPLIED, REGARDING THE SITE, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NONINFRINGEMENT. WE DO NOT WARRANT THAT THE SITE OR THE SERVICE WILL MEET YOUR REQUIREMENTS OR THAT THE OPERATION OF THE SITE OR THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE.</p>
<p><strong>13. LIMITED LIABILITY.</strong> OUR LIABILITY TO YOU IS LIMITED. TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL WE BE LIABLE FOR DAMAGES OF ANY KIND (INCLUDING, BUT NOT LIMITED TO, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, LOST PROFITS, OR LOST DATA, REGARDLESS OF THE FORESEEABILITY OF THOSE DAMAGES) ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SITE OR ANY OTHER MATERIALS OR SERVICES PROVIDED TO YOU BY US. This limitation shall apply regardless of whether the damages arise out of breach of contract, tort, or any other legal theory or form of action.</p>
<p><strong>14. AFFILIATED SITES.</strong> We have no control over and no liability for any third party websites or materials. We work with a number of partners whose Internet sites may be linked with the Site. Because we have no control over the content and performance of these partner and affiliate sites, we make no guarantees about the accuracy, currency, content, or quality of the information provided by such sites, and we assume no responsibility for unintended, objectionable, inaccurate, misleading, or unlawful content that may reside on those sites. Similarly, from time to time in connection with your use of the Site, you may have access to content items (including, but not limited to, websites) that are owned by third parties. You acknowledge and agree that we make no guarantees about, and assume no responsibility for, the accuracy, currency, content, or quality of this third party content, and that, unless expressly provided otherwise, these Terms of Use shall govern your use of any and all third party content.</p>
<p><strong>15. PROHIBITED USES.</strong> We impose certain restrictions on your permissible use of the Site. You are prohibited from violating or attempting to violate any security features of the Site, including, without limitation, (a) accessing content or data not intended for you, or logging onto a server or account that you are not authorized to access; (b) attempting to probe, scan, or test the vulnerability of the Site, or any associated system or network, or to breach security or authentication measures without proper authorization; (c) interfering or attempting to interfere with service to any user, host, or network, including, without limitation, by means of submitting a virus to the Site, overloading, 'flooding,' 'spamming,' 'mail bombing,' 'crashing' or instituting a 'DDOS' attack on the Site; (d) using the Site to send unsolicited e-mail, including, without limitation, promotions, or advertisements for products or services; (e) forging any TCP/IP packet header or any part of the header information in any e-mail or in any posting using the Site; or (f) attempting to modify, reverse-engineer, decompile, disassemble, or otherwise reduce or attempt to reduce to a human-perceivable form any of the source code used by us in providing the Site. Any violation of system or network security may subject you to civil and/or criminal liability.</p>
<p><strong>16. INDEMNITY.</strong> You agree to indemnify us for certain of your acts and omissions. You agree to indemnify, defend, and hold harmless Company, its affiliates, officers, directors, employees, consultants, agents, and representatives from any and all third party claims, losses, liability, damages, and/or costs (including reasonable attorney fees and costs) arising from your access to or use of the Site, your violation of these Terms of Use, or your infringement, or infringement by any other user of your account, of any intellectual property or other right of any person or entity. We will notify you promptly of any such claim, loss, liability, or demand, and will provide you with reasonable assistance, at your expense, in defending any such claim, loss, liability, damage, or cost.</p>
<p><strong>17. COPYRIGHT.</strong> All contents of Site or Service are: Copyright © 2022 {{DOMAIN_NAME}}.</p>
<p><strong>18. SEVERABILITY; WAIVER.</strong> If, for whatever reason, a court of competent jurisdiction finds any term or condition in these Terms of Use to be unenforceable, all other terms and conditions will remain unaffected and in full force and effect. No waiver of any breach of any provision of these Terms of Use shall constitute a waiver of any prior, concurrent, or subsequent breach of the same or any other provisions hereof, and no waiver shall be effective unless made in writing and signed by an authorized representative of the waiving party.</p>
<p><strong>19. NO LICENSE.</strong> Nothing contained on the Site should be understood as granting you a license to use any of the trademarks, service marks, or logos owned by us or by any third party.</p>
<p><strong>20. UNITED STATES USE ONLY.</strong> The Site is controlled and operated by Company from its offices in the State of California. The domain of the website is registered in the United States and the Site is hosted in the United States. The intended audience for this site consists of individuals in the United States only. Company makes no representation that any of the materials or the services to which you have been given access are available or appropriate for use in other locations. Your use of or access to the Site should not be construed as Company's purposefully availing itself of the benefits or privilege of doing business in any state or jurisdiction other than California and the United States.</p>
<p><strong>21. AMENDMENTS.</strong> Company reserves the right to amend these Terms. Should Company seek to make such an amendment, which we determine is material in our sole discretion, we shall:</p>
<p>(a) Provide you notice by email of said change 15 days prior to the change going into force, and</p>
<p>(b) Publish on the home page the fact an amendment will be made.</p>
<p>Should a court of competent jurisdiction rule this Amendment provision invalid, then this Amendment clause shall be terminated as part of this agreement. All amendments to the Terms shall be forward looking.</p>`
    }
  }
};

export const getStorageItem = (key: string, defaultValue: any) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage', error);
    return defaultValue;
  }
};

export const setStorageItem = (key: string, value: any) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error writing to localStorage', error);
  }
};

export const removeStorageItem = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage', error);
  }
};

export const initializeData = () => {
  if (!window.localStorage.getItem('settings')) {
    setStorageItem('settings', INITIAL_DATA.settings);
  }
  if (!window.localStorage.getItem('applications')) {
    setStorageItem('applications', INITIAL_DATA.applications);
  }
  if (!window.localStorage.getItem('users')) {
    setStorageItem('users', INITIAL_DATA.users);
  }
  if (!window.localStorage.getItem('adminAccounts')) {
    setStorageItem('adminAccounts', INITIAL_DATA.adminAccounts);
  }
  if (!window.localStorage.getItem('cms')) {
    setStorageItem('cms', INITIAL_DATA.cms);
  }
  if (!window.localStorage.getItem('legalPages')) {
    setStorageItem('legalPages', INITIAL_DATA.legalPages);
  } else {
    const savedLegalPages = getStorageItem('legalPages', INITIAL_DATA.legalPages);

    const isLegacyPrivacy = String(savedLegalPages?.privacyPolicy?.content || '').includes('Please describe what data you collect');
    const isLegacyTerms = String(savedLegalPages?.termsAndConditions?.content || '').includes('By using this website, you agree to these terms and conditions.');

    const normalizedLegalPages = {
      privacyPolicy: {
        ...INITIAL_DATA.legalPages.privacyPolicy,
        ...(savedLegalPages?.privacyPolicy || {})
      },
      termsAndConditions: {
        ...INITIAL_DATA.legalPages.termsAndConditions,
        ...(savedLegalPages?.termsAndConditions || {})
      }
    };

    if (isLegacyPrivacy) {
      normalizedLegalPages.privacyPolicy = { ...INITIAL_DATA.legalPages.privacyPolicy };
    }
    if (isLegacyTerms) {
      normalizedLegalPages.termsAndConditions = { ...INITIAL_DATA.legalPages.termsAndConditions };
    }

    setStorageItem('legalPages', normalizedLegalPages);
  }
};
