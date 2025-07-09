import { useEffect, useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useSystemSettings } from "@/hooks/useSystemSettings";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings as SettingsIcon, User, Shield, Bell, Database } from 'lucide-react';
import SettingsSkeleton from '@/components/skeletons/SettingsSkeleton';
import { PageContainer, PageHeader, PageContent } from '@/components/layout/PageContainer';

const Settings = () => {
  const { toast } = useToast();
  const {
    preferences,
    isLoading: isProfileLoading,
    updatePreferences,
    isUpdatingPreferences,
  } = useProfile();
  const {
    systemSettings,
    isLoading: isSystemLoading,
    updateSystemSettings,
    isUpdating: isUpdatingSystem,
  } = useSystemSettings();

  // Notification & Security Preferences
  const [notificationPrefs, setNotificationPrefs] = useState({
    email_notifications: true,
    push_notifications: false,
    sms_alerts: false,
    login_alerts: false,
  });
  const [securityPrefs, setSecurityPrefs] = useState({
    two_factor_auth: false,
    password_expiry: false,
  });

  // System Settings
  const [systemPrefs, setSystemPrefs] = useState({
    auto_backup: true,
    api_access: false,
    debug_mode: false,
  });

  // General Settings
  const [general, setGeneral] = useState({
    company_name: "Your Company Name",
    currency: "USD",
    timezone: "UTC-5 (Eastern)",
    language: "English (US)",
  });

  useEffect(() => {
    if (preferences) {
      setNotificationPrefs((prev) => ({
        ...prev,
        email_notifications: preferences.email_notifications ?? true,
        push_notifications: preferences.push_notifications ?? false,
        sms_alerts: preferences.sms_alerts ?? false,
        login_alerts: preferences.login_alerts ?? false,
      }));
      setSecurityPrefs((prev) => ({
        ...prev,
        two_factor_auth: preferences.two_factor_auth ?? false,
        password_expiry: preferences.password_expiry ?? false,
      }));
      setGeneral((prev) => ({
        ...prev,
        language: preferences.language ?? "English (US)",
        timezone: preferences.timezone ?? "UTC-5 (Eastern)",
        company_name: preferences.company_name ?? "Your Company Name",
        currency: preferences.currency ?? "USD",
      }));
    }
  }, [preferences]);

  useEffect(() => {
    if (systemSettings) {
      setSystemPrefs({
        auto_backup: systemSettings.auto_backup ?? true,
        api_access: systemSettings.api_access ?? false,
        debug_mode: systemSettings.debug_mode ?? false,
      });
    }
  }, [systemSettings]);

  // Helper to get all preferences for update
  const getAllPreferences = () => ({
    ...notificationPrefs,
    ...securityPrefs,
    language: general.language,
    timezone: general.timezone,
    company_name: general.company_name,
    currency: general.currency,
  });

  const handleSaveNotifications = () => {
    updatePreferences(getAllPreferences());
  };

  const handleSaveSecurity = () => {
    updatePreferences(getAllPreferences());
  };

  const handleSaveGeneral = () => {
    updatePreferences(getAllPreferences());
    toast({ title: "Saved", description: "General settings saved." });
  };

  const handleSaveSystem = () => {
    updateSystemSettings({ ...systemPrefs });
  };

  if (isProfileLoading || isSystemLoading) {
    return <SettingsSkeleton />;
  }

  return (
    <PageContainer>
      <PageHeader
        title="Settings"
        description="Manage your system preferences and configurations"
      />

      <PageContent>
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          
          {/* General */}
          <TabsContent value="general" className="space-y-4">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <SettingsIcon className="h-5 w-5 text-blue-600" />
                  <span>General Settings</span>
                </CardTitle>
                <CardDescription>Configure your basic system preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" value={general.company_name} onChange={e => setGeneral(g => ({ ...g, company_name: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Input id="currency" value={general.currency} onChange={e => setGeneral(g => ({ ...g, currency: e.target.value }))} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" value={general.timezone} onChange={e => setGeneral(g => ({ ...g, timezone: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Input id="language" value={general.language} onChange={e => setGeneral(g => ({ ...g, language: e.target.value }))} />
                  </div>
                </div>
                <Button onClick={handleSaveGeneral}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Security */}
          <TabsContent value="security" className="space-y-4">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>Manage your security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <Switch checked={securityPrefs.two_factor_auth} onCheckedChange={checked => setSecurityPrefs(p => ({ ...p, two_factor_auth: checked }))} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Password Expiry</Label>
                    <p className="text-sm text-gray-600">Require password changes every 90 days</p>
                  </div>
                  <Switch checked={securityPrefs.password_expiry} onCheckedChange={checked => setSecurityPrefs(p => ({ ...p, password_expiry: checked }))} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Login Alerts</Label>
                    <p className="text-sm text-gray-600">Get notified of suspicious login attempts</p>
                  </div>
                  <Switch checked={notificationPrefs.login_alerts} onCheckedChange={checked => setNotificationPrefs(p => ({ ...p, login_alerts: checked }))} />
                </div>
                <Button onClick={handleSaveSecurity} disabled={isUpdatingPreferences}>Update Security Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-4">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-yellow-600" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive important updates via email</p>
                  </div>
                  <Switch checked={notificationPrefs.email_notifications} onCheckedChange={checked => setNotificationPrefs(p => ({ ...p, email_notifications: checked }))} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-600">Get real-time browser notifications</p>
                  </div>
                  <Switch checked={notificationPrefs.push_notifications} onCheckedChange={checked => setNotificationPrefs(p => ({ ...p, push_notifications: checked }))} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Alerts</Label>
                    <p className="text-sm text-gray-600">Critical alerts via SMS</p>
                  </div>
                  <Switch checked={notificationPrefs.sms_alerts} onCheckedChange={checked => setNotificationPrefs(p => ({ ...p, sms_alerts: checked }))} />
                </div>
                <Button onClick={handleSaveNotifications} disabled={isUpdatingPreferences}>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* System */}
          <TabsContent value="system" className="space-y-4">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-purple-600" />
                  <span>System Configuration</span>
                </CardTitle>
                <CardDescription>Advanced system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Backup</Label>
                    <p className="text-sm text-gray-600">Automatically backup data daily</p>
                  </div>
                  <Switch checked={systemPrefs.auto_backup} onCheckedChange={checked => setSystemPrefs(p => ({ ...p, auto_backup: checked }))} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>API Access</Label>
                    <p className="text-sm text-gray-600">Allow third-party API access</p>
                  </div>
                  <Switch checked={systemPrefs.api_access} onCheckedChange={checked => setSystemPrefs(p => ({ ...p, api_access: checked }))} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Debug Mode</Label>
                    <p className="text-sm text-gray-600">Enable detailed error logging</p>
                  </div>
                  <Switch checked={systemPrefs.debug_mode} onCheckedChange={checked => setSystemPrefs(p => ({ ...p, debug_mode: checked }))} />
                </div>
                <Button onClick={handleSaveSystem} disabled={isUpdatingSystem}>Apply System Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </PageContent>
    </PageContainer>
  );
};

export default Settings;
        {/* General */}
        <TabsContent value="general" className="space-y-4">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5 text-blue-600" />
                <span>General Settings</span>
              </CardTitle>
              <CardDescription>Configure your basic system preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" value={general.company_name} onChange={e => setGeneral(g => ({ ...g, company_name: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Input id="currency" value={general.currency} onChange={e => setGeneral(g => ({ ...g, currency: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" value={general.timezone} onChange={e => setGeneral(g => ({ ...g, timezone: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input id="language" value={general.language} onChange={e => setGeneral(g => ({ ...g, language: e.target.value }))} />
                </div>
              </div>
              <Button onClick={handleSaveGeneral}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Security */}
        <TabsContent value="security" className="space-y-4">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription>Manage your security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600">Add an extra layer of security</p>
                </div>
                <Switch checked={securityPrefs.two_factor_auth} onCheckedChange={checked => setSecurityPrefs(p => ({ ...p, two_factor_auth: checked }))} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Password Expiry</Label>
                  <p className="text-sm text-gray-600">Require password changes every 90 days</p>
                </div>
                <Switch checked={securityPrefs.password_expiry} onCheckedChange={checked => setSecurityPrefs(p => ({ ...p, password_expiry: checked }))} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Login Alerts</Label>
                  <p className="text-sm text-gray-600">Get notified of suspicious login attempts</p>
                </div>
                <Switch checked={notificationPrefs.login_alerts} onCheckedChange={checked => setNotificationPrefs(p => ({ ...p, login_alerts: checked }))} />
              </div>
              <Button onClick={handleSaveSecurity} disabled={isUpdatingPreferences}>Update Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-yellow-600" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-600">Receive important updates via email</p>
                </div>
                <Switch checked={notificationPrefs.email_notifications} onCheckedChange={checked => setNotificationPrefs(p => ({ ...p, email_notifications: checked }))} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-gray-600">Get real-time browser notifications</p>
                </div>
                <Switch checked={notificationPrefs.push_notifications} onCheckedChange={checked => setNotificationPrefs(p => ({ ...p, push_notifications: checked }))} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>SMS Alerts</Label>
                  <p className="text-sm text-gray-600">Critical alerts via SMS</p>
                </div>
                <Switch checked={notificationPrefs.sms_alerts} onCheckedChange={checked => setNotificationPrefs(p => ({ ...p, sms_alerts: checked }))} />
              </div>
              <Button onClick={handleSaveNotifications} disabled={isUpdatingPreferences}>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        {/* System */}
        <TabsContent value="system" className="space-y-4">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-purple-600" />
                <span>System Configuration</span>
              </CardTitle>
              <CardDescription>Advanced system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto Backup</Label>
                  <p className="text-sm text-gray-600">Automatically backup data daily</p>
                </div>
                <Switch checked={systemPrefs.auto_backup} onCheckedChange={checked => setSystemPrefs(p => ({ ...p, auto_backup: checked }))} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>API Access</Label>
                  <p className="text-sm text-gray-600">Allow third-party API access</p>
                </div>
                <Switch checked={systemPrefs.api_access} onCheckedChange={checked => setSystemPrefs(p => ({ ...p, api_access: checked }))} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Debug Mode</Label>
                  <p className="text-sm text-gray-600">Enable detailed error logging</p>
                </div>
                <Switch checked={systemPrefs.debug_mode} onCheckedChange={checked => setSystemPrefs(p => ({ ...p, debug_mode: checked }))} />
              </div>
              <Button onClick={handleSaveSystem} disabled={isUpdatingSystem}>Apply System Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
