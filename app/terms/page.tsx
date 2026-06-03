import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PublicNav } from '@/components/layout/public-nav';

export default function TermsPage() {
  return (
    <>
      <PublicNav />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: June 2, 2024</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  By accessing and using AI Customer Support (&quot;Service&quot;), you accept and agree to
                  be bound by the terms and provision of this agreement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Use License</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  Permission is granted to temporarily use the Service for personal or commercial purposes.
                  This is the grant of a license, not a transfer of title.
                </p>
                <p>Under this license you may not:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose without authorization</li>
                  <li>Attempt to decompile or reverse engineer any software</li>
                  <li>Remove any copyright or proprietary notations</li>
                  <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. User Accounts</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>When you create an account with us, you must provide accurate and complete information.</p>
                <p>You are responsible for:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Maintaining the security of your account</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Content</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  You retain all rights to the content you upload to the Service. By uploading content,
                  you grant us a license to use, store, and process that content solely to provide the Service.
                </p>
                <p>You agree not to upload content that:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Is illegal or promotes illegal activities</li>
                  <li>Is defamatory, discriminatory, or hateful</li>
                  <li>Violates intellectual property rights</li>
                  <li>Contains malware or harmful code</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Service Availability</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  We strive to provide reliable service but do not guarantee uninterrupted access.
                  We reserve the right to modify or discontinue the Service with or without notice.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Limitations</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  In no event shall AI Customer Support or its suppliers be liable for any damages
                  arising out of the use or inability to use the Service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Pricing and Payment</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  Certain features may require payment. By providing payment information, you agree
                  to pay all charges at the prices in effect for your usage.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Termination</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  We may terminate or suspend your account immediately, without prior notice, for
                  any breach of these Terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  We reserve the right to modify these terms at any time. We will notify users of
                  any changes by posting the new Terms of Service on this page.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>Questions about the Terms of Service should be sent to:</p>
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
