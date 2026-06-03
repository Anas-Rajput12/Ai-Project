import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  });

  console.log('Created admin user:', admin.email);

  // Create demo user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Demo User',
      password: userPassword,
      role: 'USER',
      emailVerified: new Date(),
    },
  });

  console.log('Created demo user:', user.email);

  // Create sample conversation for demo user
  const conversation = await prisma.conversation.create({
    data: {
      title: 'Welcome Conversation',
      userId: user.id,
      messages: {
        create: [
          {
            role: 'SYSTEM',
            content: 'Welcome to AI Customer Support! How can I help you today?',
          },
          {
            role: 'USER',
            content: 'What are your business hours?',
          },
          {
            role: 'ASSISTANT',
            content: 'Based on the knowledge base, our business hours are Monday to Friday, 9 AM to 5 PM EST.',
            sources: [],
          },
        ],
      },
    },
  });

  console.log('Created sample conversation:', conversation.id);

  // Create sample analytics
  await prisma.usageAnalytics.create({
    data: {
      userId: user.id,
      conversationCount: 1,
      messageCount: 3,
      tokenCount: 150,
      documentsAdded: 0,
    },
  });

  console.log('Created sample analytics');
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
