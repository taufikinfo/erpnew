import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/hooks/useProfile';
import { useSystemSettings } from '@/hooks/useSystemSettings';
import { PageContainer, PageHeader, PageContent } from '@/components/layout/PageContainer';
import { Settings as SettingsIcon, Shield, Bell, Cog } from 'lucide-react';

const Settings: React.FC = () => {
  const { toast } = useToast();
  const { preferences, updatePreferences, isLoading } = useProfile();
  const { systemSettings, updateSystemSettings, isLoading: isUpdatingSystem } = useSystemSettings();

  // User preferences
  const [userPrefs, setUserPrefs] = useState({
    email_notifications: true,
    push_notifications: false,
    sms_alerts: false,
    login_alerts: true,
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    two_factor_auth: false,
    password_expiry: false,
    company_name: 'Your Company Name',
    currency: 'USD',
  });

  // System settings
  const [systemPrefs, setSystemPrefs] = useState({
    auto_backup: true,
    api_access: false,
    debug_mode: false,
  });

  // Initialize state from data
  useEffect(() => {
    if (preferences) {
      setUserPrefs({
        email_notifications: preferences.email_notifications ?? true,
        push_notifications: preferences.push_notifications ?? false,
        sms_alerts: false,
        login_alerts: true,
        theme: preferences.dark_mode ? 'dark' : 'light',
        language: preferences.language || 'en',
        timezone: preferences.timezone || 'UTC',
        two_factor_auth: false,
        password_expiry: false,
        company_name: 'Your Company Name',
        currency: 'USD',
      });
    }

    if (systemSettings) {
      setSystemPrefs({
        auto_backup: true,
        api_access: false,
        debug_mode: false,
      });
    }
  }, [preferences, systemSettings]);

  const handlePreferencesSave = async () => {
    try {
      await updatePreferences(userPrefs);
      toast({ title: "Success", description: "Preferences updated successfully!" });
    } catch (error: unknown) {
      toast({ title: "Error", description: error instanceof Error ? error.message : "An error occurred", variant: "destructive" });
    }
  };

  const handleSystemSave = async () => {
    try {
      await updateSystemSettings(systemPrefs);
      toast({ title: "Success", description: "System settings updated successfully!" });
    } catch (error: unknown) {
      toast({ title: "Error", description: error instanceof Error ? error.message : "An error occurred", variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader
          title="Settings"
          description="Manage your account settings and preferences"
        />
        <PageContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </PageContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences"
      />

      <PageContent>
        <Tabs defaultValue="preferences" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preferences">
              <Bell className="h-4 w-4 mr-2" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="system">
              <Cog className="h-4 w-4 mr-2" />
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <Switch
                    id="email-notifications"
                    checked={userPrefs.email_notifications}
                    onCheckedChange={(checked) => setUserPrefs(prev => ({ ...prev, email_notifications: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <Switch
                    id="push-notifications"
                    checked={userPrefs.push_notifications}
                    onCheckedChange={(checked) => setUserPrefs(prev => ({ ...prev, push_notifications: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-alerts">SMS Alerts</Label>
                  <Switch
                    id="sms-alerts"
                    checked={userPrefs.sms_alerts}
                    onCheckedChange={(checked) => setUserPrefs(prev => ({ ...prev, sms_alerts: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-alerts">Login Alerts</Label>
                  <Switch
                    id="login-alerts"
                    checked={userPrefs.login_alerts}
                    onCheckedChange={(checked) => setUserPrefs(prev => ({ ...prev, login_alerts: checked }))}
                  />
                </div>
                <Button onClick={handlePreferencesSave}>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <Switch
                    id="two-factor"
                    checked={userPrefs.two_factor_auth}
                    onCheckedChange={(checked) => setUserPrefs(prev => ({ ...prev, two_factor_auth: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password-expiry">Password Expiry</Label>
                  <Switch
                    id="password-expiry"
                    checked={userPrefs.password_expiry}
                    onCheckedChange={(checked) => setUserPrefs(prev => ({ ...prev, password_expiry: checked }))}
                  />
                </div>
                <Button onClick={handlePreferencesSave}>Save Security Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-backup">Auto Backup</Label>
                  <Switch
                    id="auto-backup"
                    checked={systemPrefs.auto_backup}
                    onCheckedChange={(checked) => setSystemPrefs(prev => ({ ...prev, auto_backup: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="api-access">API Access</Label>
                  <Switch
                    id="api-access"
                    checked={systemPrefs.api_access}
                    onCheckedChange={(checked) => setSystemPrefs(prev => ({ ...prev, api_access: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <Switch
                    id="debug-mode"
                    checked={systemPrefs.debug_mode}
                    onCheckedChange={(checked) => setSystemPrefs(prev => ({ ...prev, debug_mode: checked }))}
                  />
                </div>
                <Button onClick={handleSystemSave} disabled={isUpdatingSystem}>
                  Apply System Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </PageContent>
    </PageContainer>
  );
};

export default Settings;
