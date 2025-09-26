# 🏙️ PingCity Dashboard

A comprehensive municipal administration dashboard built for the Smart India Hackathon (SIH). PingCity Dashboard provides real-time monitoring, issue management, and citizen engagement tools for municipal administrators.

## 🚀 Features

- **📊 Command Center**: Real-time KPIs and municipal performance metrics
- **🎯 Issue Management**: Kanban and table views for citizen-reported issues
- **📈 Analytics Hub**: Comprehensive performance analytics and insights
- **📢 Communication Center**: Announcements, alerts, and citizen communications
- **👥 User Management**: Role-based user administration and permissions
- **🗺️ Interactive Maps**: Geographic visualization of issues and trends
- **🔔 Real-time Notifications**: Live updates on critical municipal activities

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library with shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks
- **API**: Next.js API Routes with mock data

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Soumyodeep-Dey/pingcity-dashboard.git
   cd pingcity-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open the application**
   
   Open [http://localhost:3000](http://localhost:3000) in your browser to access the PingCity Dashboard.

## 📁 Project Structure

```
pingcity-dashboard/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes for data operations
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout component
│   │   └── page.tsx          # Main dashboard page
│   ├── components/            # Reusable React components
│   │   ├── layout/           # Layout components (Header, Sidebar)
│   │   ├── views/            # Main view components
│   │   ├── modals/           # Modal components
│   │   └── ui/               # UI utility components
│   ├── data/                  # Mock data and constants
│   ├── lib/                   # Utility functions
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
├── API_DOCUMENTATION.md       # Comprehensive API documentation
└── README.md                 # Project documentation
```

## 🎯 Municipal Features

### Dashboard Overview
- Live KPI monitoring (response times, resolution rates)
- Trending issues analysis
- Recent activity feed
- Geographic issue distribution

### Issue Management
- Multi-view support (Kanban, Table)
- Priority-based organization
- Department assignment
- Status tracking and updates
- Citizen upvoting system

### Analytics & Reporting
- Department performance metrics
- Citizen satisfaction tracking
- Predictive analytics
- Resource requirement forecasting
- Geographic distribution analysis

### Communication Tools
- Public announcements
- Emergency alerts
- Departmental notifications
- Engagement metrics tracking

## 🔧 Configuration

The application uses mock data for demonstration. To connect to a real backend:

1. Update API routes in `src/app/api/`
2. Replace mock data imports with actual database calls
3. Configure authentication and authorization
4. Set up real-time data synchronization

## 📚 Documentation

- **API Documentation**: See `API_DOCUMENTATION.md` for complete API reference
- **Component Library**: UI components are documented with TypeScript interfaces
- **Deployment Guide**: Ready for deployment on Vercel, Netlify, or similar platforms

## 🤝 Contributing

This project was developed for the Smart India Hackathon. Contributions and improvements are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the Smart India Hackathon submission. Please refer to the competition guidelines for usage terms.

## 👥 Team

Developed by **Team [Your Team Name]** for Smart India Hackathon 2025.

## 📞 Support

For questions and support regarding this SIH project, please contact the development team or refer to the project documentation.

---

**Built with ❤️ for Smart India Hackathon 2025**
