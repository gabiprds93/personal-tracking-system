import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Skip cleanup for now to avoid transaction issues
  console.log('🧹 Skipping cleanup (MongoDB replica set required for deleteMany)');

  // Create sample badges
  const sampleBadges = [
    {
      name: 'Primera Gota',
      description: 'Completaste tu primer hábito de hidratación',
      icon: '💧',
      category: 'Primeros Pasos',
      requirement: 'Complete first water habit',
      points: 50
    },
    {
      name: 'Atleta Novato',
      description: 'Completaste tu primer entrenamiento',
      icon: '🏃‍♂️',
      category: 'Fitness',
      requirement: 'Complete first exercise habit',
      points: 50
    },
    {
      name: 'Ratón de Biblioteca',
      description: 'Dedicaste tiempo a la lectura',
      icon: '📚',
      category: 'Educación',
      requirement: 'Complete first reading habit',
      points: 50
    },
    {
      name: 'Mente Zen',
      description: 'Comenzaste tu práctica de meditación',
      icon: '🧘‍♀️',
      category: 'Bienestar',
      requirement: 'Complete first meditation habit',
      points: 50
    },
    {
      name: 'Constructor de Hábitos',
      description: 'Creaste tu primer hábito',
      icon: '🎯',
      category: 'Logros',
      requirement: 'Create first habit',
      points: 25
    }
  ];

  console.log('🏅 Creating sample badges...');
  for (const badgeData of sampleBadges) {
    try {
      const badge = await prisma.badge.create({
        data: badgeData
      });
      console.log(`✅ Created badge: ${badge.name}`);
    } catch (error) {
      console.log(`❌ Failed to create badge ${badgeData.name}:`, error);
    }
  }

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

  // Clean up existing user badges to avoid duplicates
  await prisma.userBadge.deleteMany({
    where: { userId: user.id }
  });
  console.log('🧹 Cleaned up existing user badges');

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
      category: 'aprendizaje',
      targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      progress: 25
    },
    {
      title: 'Run a 5K',
      description: 'Complete a 5K run without stopping',
      category: 'salud',
      targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
      progress: 10
    },
    {
      title: 'Read 12 Books This Year',
      description: 'Read one book per month to expand knowledge',
      category: 'personal',
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

  // Assign some badges to the user to show recent achievements
  console.log('🏆 Assigning badges to user...');
  const badges = await prisma.badge.findMany();
  
  // Assign first 3 badges to the user
  for (let i = 0; i < Math.min(3, badges.length); i++) {
    const badge = badges[i];
    if (!badge) continue; // Skip if badge doesn't exist
    
    try {
      await prisma.userBadge.create({
        data: {
          userId: user.id,
          badgeId: badge.id,
          unlockedAt: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)) // Spread over last few days
        }
      });
      console.log(`✅ Assigned badge: ${badge.name}`);
    } catch (error) {
      console.log(`❌ Failed to assign badge ${badge.name}:`, error);
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
