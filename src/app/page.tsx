"use client";

import React, { useState } from 'react';
import { Issue } from '@/types';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { DashboardView } from '@/components/views/DashboardView';
import { IssuesView } from '@/components/views/IssuesView';
import { AnalyticsView, CommunicationView, UsersView } from '@/components/views/OtherViews';
import { IssueDetailModal } from '@/components/modals/IssueDetailModal';
import { ClientOnly } from '@/components/ui/ClientOnly';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [mapView, setMapView] = useState('pins');
  const [issueView, setIssueView] = useState('kanban');
  const notifications = 3;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView mapView={mapView} setMapView={setMapView} />;
      case 'issues':
        return <IssuesView issueView={issueView} setIssueView={setIssueView} setSelectedIssue={setSelectedIssue} />;
      case 'analytics':
        return <AnalyticsView />;
      case 'communication':
        return <CommunicationView />;
      case 'users':
        return <UsersView />;
      default:
        return <DashboardView mapView={mapView} setMapView={setMapView} />;
    }
  };

  return (
    <ClientOnly fallback={
      <div className="flex h-screen bg-zinc-100 items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Loading PingCity Dashboard...</p>
        </div>
      </div>
    }>
      <div className="flex h-screen bg-zinc-100">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header activeTab={activeTab} notifications={notifications} />
          <main className="flex-1 overflow-y-auto">
            {renderContent()}
          </main>
        </div>
        <IssueDetailModal selectedIssue={selectedIssue} setSelectedIssue={setSelectedIssue} />
      </div>
    </ClientOnly>
  );
};

export default Dashboard;
