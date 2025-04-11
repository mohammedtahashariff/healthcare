import PageLayout from "@/components/layout/PageLayout";
import { Settings as SettingsIcon, User, Bell, Shield, Database, Globe } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <PageLayout title="Settings">
      <div className="flex items-center mb-6">
        <SettingsIcon className="mr-2 h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">System Settings</h2>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="data">
            <Database className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Data</span>
          </TabsTrigger>
          <TabsTrigger value="system">
            <Globe className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">System</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your user profile information and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="Dr. Jane Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="jane.smith@smartcare.med" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Physician" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue="General Medicine" />
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary-dark">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Control how and when you receive alerts and notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="highPriorityAlerts">High Priority Alerts</Label>
                    <p className="text-sm text-gray-500">Get immediate notifications for urgent alerts</p>
                  </div>
                  <Switch id="highPriorityAlerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="medPriorityAlerts">Medium Priority Alerts</Label>
                    <p className="text-sm text-gray-500">Receive notifications for important but non-urgent alerts</p>
                  </div>
                  <Switch id="medPriorityAlerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="lowPriorityAlerts">Low Priority Alerts</Label>
                    <p className="text-sm text-gray-500">Get notifications for informational alerts</p>
                  </div>
                  <Switch id="lowPriorityAlerts" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="roundReminders">Round Reminders</Label>
                    <p className="text-sm text-gray-500">Get reminders for upcoming patient rounds</p>
                  </div>
                  <Switch id="roundReminders" defaultChecked />
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary-dark">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Other tabs would follow the same pattern */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and authentication methods.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Security settings would go here */}
              <Button className="mt-4 bg-primary hover:bg-primary-dark">Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Control your data and export settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Data settings would go here */}
              <Button className="mt-4 bg-primary hover:bg-primary-dark">Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>
                Configure system-wide settings and defaults.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* System settings would go here */}
              <Button className="mt-4 bg-primary hover:bg-primary-dark">Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
