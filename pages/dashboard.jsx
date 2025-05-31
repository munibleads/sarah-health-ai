"use client"

import { useState, useEffect } from 'react';
import { Calendar, Clock, DollarSign, Phone, User, FileText, Eye, Loader2, Heart, ArrowLeft, RefreshCw } from 'lucide-react';
import Head from 'next/head';
import { CallsDataTable } from '../components/calls-data-table';

export default function Dashboard() {
  const [calls, setCalls] = useState([]);
  const [selectedCall, setSelectedCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/list-calls');
      if (!response.ok) {
        throw new Error('Failed to fetch calls');
      }
      const callsData = await response.json();
      setCalls(callsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCallDetails = async (callId) => {
    try {
      setDetailsLoading(true);
      const response = await fetch(`/api/get-call-details?callId=${callId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch call details');
      }
      const details = await response.json();
      setSelectedCall(details);
    } catch (err) {
      setError(err.message);
    } finally {
      setDetailsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount) => {
    if (!amount) return '$0.00';
    return `$${amount.toFixed(4)}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ended':
        return 'bg-emerald-100/80 text-emerald-800 border-emerald-200';
      case 'in-progress':
        return 'bg-blue-100/80 text-blue-800 border-blue-200';
      case 'failed':
        return 'bg-red-100/80 text-red-800 border-red-200';
      default:
        return 'bg-gray-100/80 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e0e7ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '2rem',
          borderRadius: '1.5rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          textAlign: 'center'
        }}>
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-teal-600" />
          <p style={{ color: '#374151', fontWeight: '500' }}>Loading calls...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <title>Call Dashboard - Sarah AI</title>
      </Head>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e0e7ff 100%)',
        position: 'relative'
      }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '25%',
        width: '16rem',
        height: '16rem',
        background: 'linear-gradient(45deg, rgba(167, 139, 250, 0.3), rgba(244, 114, 182, 0.3))',
        borderRadius: '50%',
        filter: 'blur(40px)',
        opacity: 0.7,
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '33%',
        right: '25%',
        width: '16rem',
        height: '16rem',
        background: 'linear-gradient(45deg, rgba(251, 191, 36, 0.3), rgba(249, 115, 22, 0.3))',
        borderRadius: '50%',
        filter: 'blur(40px)',
        opacity: 0.7,
        animation: 'float 8s ease-in-out infinite',
        animationDelay: '2s'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '25%',
        left: '33%',
        width: '16rem',
        height: '16rem',
        background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.3))',
        borderRadius: '50%',
        filter: 'blur(40px)',
        opacity: 0.7,
        animation: 'float 7s ease-in-out infinite',
        animationDelay: '4s'
      }}></div>
      
      <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>
        {/* Header */}
        <div style={{
          position: 'sticky',
          top: '1.5rem',
          zIndex: 50,
          padding: '0 2rem',
          marginBottom: '2rem'
        }}>
          <header style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '2rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            maxWidth: '90rem',
            margin: '0 auto',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              height: '4.5rem',
              padding: '0 2rem'
            }}>
                            {/* Left side - Navigation */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                <a
                  href="/"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.15s ease',
                    padding: '0.625rem 1rem',
                    borderRadius: '0.5rem'
                  }}
                  onMouseEnter={e => {
                    e.target.style.color = '#0f172a';
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.color = '#64748b';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Sarah AI</span>
                </a>
                
                {/* Divider */}
                <div style={{
                  width: '1px',
                  height: '2rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)'
                }}></div>
                
                {/* Title Section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Phone className="w-6 h-6" style={{ color: '#10b981' }} />
                  <h1 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: '#0f172a',
                    margin: 0,
                    letterSpacing: '-0.025em'
                  }}>Call Dashboard</h1>
                </div>
              </div>
              
              {/* Right side - Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                 <div style={{
                   display: 'flex',
                   alignItems: 'center',
                   gap: '0.5rem',
                   padding: '0.5rem 0.875rem',
                   backgroundColor: 'rgba(16, 185, 129, 0.1)',
                   borderRadius: '0.5rem',
                   border: '1px solid rgba(16, 185, 129, 0.2)'
                 }}>
                   <div style={{
                     width: '0.5rem',
                     height: '0.5rem',
                     backgroundColor: '#10b981',
                     borderRadius: '50%',
                     boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.3)'
                   }}></div>
                   <span style={{
                     fontSize: '0.8rem',
                     fontWeight: '600',
                     color: '#059669'
                   }}>{calls.length} Total Calls</span>
                 </div>
                
                                 <button
                   onClick={fetchCalls}
                   style={{
                     background: 'linear-gradient(to right, #10b981, #059669)',
                     color: 'white',
                     padding: '0.625rem 1.25rem',
                     borderRadius: '0.5rem',
                     border: 'none',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '0.5rem',
                     boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                     cursor: 'pointer',
                     transition: 'all 0.15s ease',
                     fontWeight: '600',
                     fontSize: '0.875rem',
                     fontFamily: 'inherit'
                   }}
                   onMouseEnter={e => {
                     e.target.style.background = 'linear-gradient(to right, #059669, #047857)';
                     e.target.style.transform = 'translateY(-1px)';
                     e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                   }}
                   onMouseLeave={e => {
                     e.target.style.background = 'linear-gradient(to right, #10b981, #059669)';
                     e.target.style.transform = 'translateY(0)';
                     e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                   }}
                 >
                   <RefreshCw className="w-4 h-4" />
                   <span>Refresh</span>
                 </button>
                             </div>
             </div>
           </header>
        </div>

        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem 1rem' }}>
          {error && (
            <div style={{
              backgroundColor: 'rgba(254, 226, 226, 0.9)',
              border: '1px solid rgba(248, 113, 113, 0.5)',
              color: '#b91c1c',
              padding: '1.5rem',
              borderRadius: '1rem',
              marginBottom: '2rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              animation: 'pulse 2s infinite'
            }}>
              <p style={{ fontWeight: '500', margin: 0 }}>{error}</p>
            </div>
          )}

          {/* Data Table */}
          <CallsDataTable data={calls} onViewCall={fetchCallDetails} />

          {/* Call Details Modal/Panel */}
          {selectedCall && (
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  Call Details - {selectedCall.id?.slice(-8)}
                </h2>
                <button
                  onClick={() => setSelectedCall(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              {detailsLoading ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-teal-100/80 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
                  </div>
                  <p className="text-gray-600 font-medium">Loading details...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Patient Information */}
                  <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/80 backdrop-blur-md rounded-2xl p-6 border border-emerald-200/50">
                    <h3 className="font-bold text-emerald-800 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Patient Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-semibold text-emerald-700">Name:</span>
                        <span className="ml-2 text-gray-700">{selectedCall.extractedPatientInfo?.name || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-emerald-700">Age:</span>
                        <span className="ml-2 text-gray-700">{selectedCall.extractedPatientInfo?.age || 'N/A'} years</span>
                      </div>
                      <div>
                        <span className="font-semibold text-emerald-700">Symptoms:</span>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedCall.extractedPatientInfo?.symptoms?.map((symptom, index) => (
                            <span key={index} className="bg-emerald-100/80 text-emerald-800 px-3 py-1 rounded-full text-xs">
                              {symptom}
                            </span>
                          )) || <span className="text-gray-500">None reported</span>}
                        </div>
                      </div>
                      <div>
                        <span className="font-semibold text-emerald-700">Risk Factors:</span>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedCall.extractedPatientInfo?.riskFactors?.map((factor, index) => (
                            <span key={index} className="bg-orange-100/80 text-orange-800 px-3 py-1 rounded-full text-xs">
                              {factor}
                            </span>
                          )) || <span className="text-gray-500">None reported</span>}
                        </div>
                      </div>
                      <div>
                        <span className="font-semibold text-emerald-700">Family History:</span>
                        <span className="ml-2">
                          {selectedCall.extractedPatientInfo?.familyHistory?.familyCancerHistory ? (
                            <span className="bg-red-100/80 text-red-800 px-3 py-1 rounded-full text-xs">Cancer history present</span>
                          ) : (
                            <span className="text-gray-500">No cancer history</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Call Metadata */}
                  <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-md rounded-2xl p-6 border border-blue-200/50">
                    <h3 className="font-bold text-blue-800 mb-4">Call Information</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-semibold text-blue-700">Status:</span>
                        <span className="ml-2 text-gray-700">{selectedCall.status}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-blue-700">Duration:</span>
                        <span className="ml-2 text-gray-700">{selectedCall.duration?.minutes || 0}m</span>
                      </div>
                      <div>
                        <span className="font-semibold text-blue-700">Cost:</span>
                        <span className="ml-2 text-gray-700">{formatCurrency(selectedCall.cost)}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-blue-700">Messages:</span>
                        <span className="ml-2 text-gray-700">{selectedCall.messages?.length || 0}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-blue-700">Started:</span>
                        <span className="ml-2 text-gray-700">{formatDate(selectedCall.startedAt)}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-blue-700">Ended:</span>
                        <span className="ml-2 text-gray-700">{formatDate(selectedCall.endedAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Transcript */}
                  {selectedCall.transcript && (
                    <div className="col-span-full bg-gradient-to-r from-gray-50/80 to-slate-50/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50">
                      <h3 className="font-bold text-gray-800 mb-4">Transcript</h3>
                      <div className="bg-white/70 rounded-xl p-4 max-h-64 overflow-y-auto">
                        <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {selectedCall.transcript}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
} 