import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, BarChart3, Users, Shield } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-800/95"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <Building2 className="h-16 w-16 mx-auto mb-6 text-blue-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Commercial Deal Tracking
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Track your commercial office lease deals through all 10 stages from prospecting to execution.
              Built for JLL teams to manage deal progression efficiently.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-3"
              onClick={() => window.location.href = '/api/login'}
              data-testid="button-login"
            >
              Sign In to Access Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Complete Deal Management
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Everything you need to track commercial real estate deals from start to finish
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <CardTitle>10-Stage Progression</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Track deals through Prospecting, Active Discussions, Site Approved, LOI, IC Approved, 
                In Legal, Executed, and more.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Building2 className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <CardTitle>Deal Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Comprehensive tracking including address, broker, brand (Regus/Spaces), 
                RSF, owner, and detailed notes.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <CardTitle>Team Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Secure access for your JLL team members with role-based permissions 
                and real-time updates.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-slate-100 dark:bg-slate-800 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Shield className="h-16 w-16 mx-auto mb-6 text-slate-600 dark:text-slate-400" />
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Secure Access Required
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            This dashboard requires authentication to protect sensitive deal information. 
            Please sign in with your authorized account to access the system.
          </p>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => window.location.href = '/api/login'}
            data-testid="button-login-secondary"
          >
            Sign In Now
          </Button>
        </div>
      </div>
    </div>
  );
}