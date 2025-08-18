import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Skip cleanup for now to avoid transaction issues
  console.log('🧹 Skipping cleanup (MongoDB replica set required for deleteMany)');

  // Create badges (but skip due to transaction requirements)
  console.log('🏅 Skipping badge creation (MongoDB replica set required)');

  // Check if test user already exists, if not create one
  let user = await prisma.user.findUnique({
    where: { email: 'test@example.com' },
  });

  if (!user) {
    // Create a test user
    const hashedPassword = await bcrypt.hash('password123', 12);
    try {
      user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          username: 'testuser',
          password: hashedPassword,
          firstName: 'Test',
          lastName: 'User',
        },
      });
      console.log('👤 Created test user:', user.email);
    } catch (error) {
      console.log('⚠️ Failed to create test user:', error);
      console.log('📖 Manual setup: Register a user at http://localhost:3000 to test the application');
      return;
    }
  } else {
    console.log('👤 Test user already exists:', user.email);
  }

  // Clean up existing habits for this user to avoid duplicates
  await prisma.habit.deleteMany({
    where: { userId: user.id }
  });
  console.log('🧹 Cleaned up existing habits for user');

  // Clean up existing goals for this user to avoid duplicates  
  await prisma.goal.deleteMany({
    where: { userId: user.id }
  });
  console.log('🧹 Cleaned up existing goals for user');

  // Create sample habits
  const sampleHabits = [
    {
      name: 'Drink Water',
      description: 'Drink at least 8 glasses of water daily',
      category: 'Health',
      icon: '💧',
      points: 10,
      difficulty: 1,
      frequency: 'daily'
    },
    {
      name: 'Exercise',
      description: '30 minutes of physical activity',
      category: 'Fitness',
      icon: '🏃',
      points: 20,
      difficulty: 2,
      frequency: 'daily'
    },
    {
      name: 'Read',
      description: 'Read for at least 20 minutes',
      category: 'Personal Development',
      icon: '📚',
      points: 15,
      difficulty: 2,
      frequency: 'daily'
    },
    {
      name: 'Meditate',
      description: '10 minutes of mindfulness meditation',
      category: 'Mental Health',
      icon: '🧘',
      points: 15,
      difficulty: 2,
      frequency: 'daily'
    },
    {
      name: 'Learn Programming',
      description: 'Practice coding for 1 hour',
      category: 'Education',
      icon: '💻',
      points: 25,
      difficulty: 3,
      frequency: 'daily'
    }
  ];

  console.log('🎯 Creating sample habits...');
  for (const habitData of sampleHabits) {
    try {
      const habit = await prisma.habit.create({
        data: {
          ...habitData,
          userId: user.id
        }
      });
      console.log(`✅ Created habit: ${habit.name}`);
    } catch (error) {
      console.log(`❌ Failed to create habit ${habitData.name}:`, error);
    }
  }

  // Create sample goals
  const sampleGoals = [
    {
      title: 'Learn TypeScript',
      description: 'Master TypeScript fundamentals and advanced concepts',
      category: 'Education',
      targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      progress: 25
    },
    {
      title: 'Run a 5K',
      description: 'Complete a 5K run without stopping',
      category: 'Fitness',
      targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
      progress: 10
    },
    {
      title: 'Read 12 Books This Year',
      description: 'Read one book per month to expand knowledge',
      category: 'Personal Development',
      targetDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      progress: 8
    }
  ];

  console.log('🎯 Creating sample goals...');
  for (const goalData of sampleGoals) {
    try {
      const goal = await prisma.goal.create({
        data: {
          ...goalData,
          userId: user.id
        }
      });
      console.log(`✅ Created goal: ${goal.title}`);
    } catch (error) {
      console.log(`❌ Failed to create goal ${goalData.title}:`, error);
    }
  }

  console.log('✅ Database seeded successfully!');
  console.log('\n📋 Test Account:');
  console.log('Email: test@example.com');
  console.log('Password: password123');
  console.log('\n🔗 You can now start the server and test the API');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
