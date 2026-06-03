import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PublicNav } from '@/components/layout/public-nav';

export default function PrivacyPage() {
  return (
    <>
      <PublicNav />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: June 2, 2024</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  AI Customer Support (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your
                  information when you use our service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                  <p>We collect information that you provide directly to us, including:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Name and email address</li>
                    <li>Account credentials</li>
                    <li>Profile information</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Usage Information</h3>
                  <p>We automatically collect certain information when you use our service:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Log data and usage statistics</li>
                    <li>Device information</li>
                    <li>Cookies and similar technologies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Content Information</h3>
                  <p>We collect and process:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Knowledge base documents you upload</li>
                    <li>Chat conversations</li>
                    <li>Custom configurations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process your transactions and manage your account</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Analyze usage patterns and trends</li>
                  <li>Detect and prevent fraud and abuse</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We implement appropriate technical and organizational measures to protect your
                  personal information against unauthorized access, alteration, disclosure, or
                  destruction.
                </p>
                <p>Security measures include:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits</li>
                  <li>Access controls and authentication</li>
                  <li>Secure data centers</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  We retain your information for as long as necessary to provide our services and
                  fulfill the purposes outlined in this Privacy Policy. You can request deletion
                  of your account and associated data at any time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Export your data</li>
                  <li>Withdraw consent</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>We use third-party services including:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>OpenAI for AI processing</li>
                  <li>Database hosting providers</li>
                  <li>Analytics services</li>
                </ul>
                <p className="mt-4">
                  These services have their own privacy policies and we encourage you to review them.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p className="mt-2 font-medium text-foreground">
                  coforgedevx@gmail.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
