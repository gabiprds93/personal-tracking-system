import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean up existing data
  await prisma.userBadge.deleteMany();
  await prisma.userChallenge.deleteMany();
  await prisma.challengeTask.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.userAnalytics.deleteMany();
  await prisma.note.deleteMany();
  await prisma.milestone.deleteMany();
  await prisma.goal.deleteMany();
  await prisma.habitCompletion.deleteMany();
  await prisma.habit.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned up existing data');

  // Create badges
  const badges = await Promise.all([
    prisma.badge.create({
      data: {
        name: 'First Steps',
        description: 'Complete your first habit',
        icon: '🎯',
        category: 'achievement',
        requirement: 'Complete 1 habit',
        points: 10,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Streak Master',
        description: 'Maintain a 7-day streak',
        icon: '🔥',
        category: 'streak',
        requirement: '7-day streak',
        points: 50,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Goal Crusher',
        description: 'Complete your first goal',
        icon: '🏆',
        category: 'goal',
        requirement: 'Complete 1 goal',
        points: 100,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Consistency King',
        description: 'Complete 30 habits in a month',
        icon: '👑',
        category: 'consistency',
        requirement: '30 habits in 30 days',
        points: 200,
      },
    }),
  ]);

  console.log('🏅 Created badges');

  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 12);
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      username: 'testuser',
      password: hashedPassword,
      firstName: 'Test',
      lastName: 'User',
    },
  });

  console.log('👤 Created test user');

  // Create habits
  const habits = await Promise.all([
    prisma.habit.create({
      data: {
        userId: user.id,
        name: 'Morning Exercise',
        description: '30 minutes of cardio',
        category: 'ejercicio',
        icon: 'dumbbell',
        points: 15,
        difficulty: 2,
        frequency: 'daily',
        targetDays: [],
        streak: 7,
      },
    }),
    prisma.habit.create({
      data: {
        userId: user.id,
        name: 'Read 30 minutes',
        description: 'Read a book or article',
        category: 'aprendizaje',
        icon: 'book',
        points: 10,
        difficulty: 1,
        frequency: 'daily',
        targetDays: [],
        streak: 12,
      },
    }),
    prisma.habit.create({
      data: {
        userId: user.id,
        name: 'Drink 8 glasses of water',
        description: 'Stay hydrated',
        category: 'salud',
        icon: 'droplets',
        points: 5,
        difficulty: 1,
        frequency: 'daily',
        targetDays: [],
        streak: 15,
      },
    }),
    prisma.habit.create({
      data: {
        userId: user.id,
        name: 'Practice coding',
        description: 'Work on a coding project',
        category: 'aprendizaje',
        icon: 'brain',
        points: 20,
        difficulty: 3,
        frequency: 'daily',
        targetDays: [],
        streak: 5,
      },
    }),
    prisma.habit.create({
      data: {
        userId: user.id,
        name: 'Meditation',
        description: '15 minutes of mindfulness',
        category: 'bienestar',
        icon: 'moon',
        points: 12,
        difficulty: 2,
        frequency: 'daily',
        targetDays: [],
        streak: 8,
      },
    }),
    prisma.habit.create({
      data: {
        userId: user.id,
        name: 'Work on goals',
        description: 'Focus on personal and professional goals',
        category: 'productividad',
        icon: 'target',
        points: 18,
        difficulty: 2,
        frequency: 'daily',
        targetDays: [],
        streak: 3,
      },
    }),
  ]);

  console.log('✅ Created habits');

  // Create habit completions for the last 7 days
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Complete some habits randomly
    for (const habit of habits) {
      if (Math.random() > 0.3) { // 70% completion rate
        await prisma.habitCompletion.create({
          data: {
            habitId: habit.id,
            userId: user.id,
            completedAt: date,
            notes: `Completed on ${date.toDateString()}`,
          },
        });
      }
    }
  }

  console.log('📅 Created habit completions');

  // Create goals
  const goals = await Promise.all([
    prisma.goal.create({
      data: {
        userId: user.id,
        title: 'Learn TypeScript',
        description: 'Master TypeScript fundamentals and advanced concepts',
        category: 'Learning',
        targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
        progress: 60,
        status: 'ACTIVE',
        milestones: {
          create: [
            { title: 'Complete TypeScript basics', order: 0, completed: true },
            { title: 'Build a small project', order: 1, completed: true },
            { title: 'Learn advanced patterns', order: 2, completed: false },
            { title: 'Contribute to open source', order: 3, completed: false },
          ],
        },
        notes: {
          create: [
            { userId: user.id, content: 'Making great progress with the basics!' },
            { userId: user.id, content: 'Need to focus more on advanced patterns' },
          ],
        },
      },
    }),
    prisma.goal.create({
      data: {
        userId: user.id,
        title: 'Get in Shape',
        description: 'Lose 10kg and build muscle',
        category: 'Health',
        targetDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 180 days from now
        progress: 30,
        status: 'ACTIVE',
        milestones: {
          create: [
            { title: 'Start regular exercise routine', order: 0, completed: true },
            { title: 'Lose first 5kg', order: 1, completed: false },
            { title: 'Build muscle mass', order: 2, completed: false },
            { title: 'Reach target weight', order: 3, completed: false },
          ],
        },
      },
    }),
  ]);

  console.log('🎯 Created goals');

  // Create a challenge
  const challenge = await prisma.challenge.create({
    data: {
      title: 'January Fitness Challenge',
      description: 'Start the year strong with a fitness challenge',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
      isActive: true,
      tasks: {
        create: [
          { title: 'Complete 20 workouts', target: 20, points: 100, order: 0 },
          { title: 'Drink water daily', target: 31, points: 50, order: 1 },
          { title: 'Track calories', target: 31, points: 30, order: 2 },
        ],
      },
    },
  });

  // User joins the challenge
  await prisma.userChallenge.create({
    data: {
      userId: user.id,
      challengeId: challenge.id,
      progress: 15,
      completed: false,
    },
  });

  console.log('🏁 Created challenge');

  // Award some badges
  await prisma.userBadge.create({
    data: {
      userId: user.id,
      badgeId: badges[0].id, // First Steps
      unlockedAt: new Date(),
    },
  });

  await prisma.userBadge.create({
    data: {
      userId: user.id,
      badgeId: badges[1].id, // Streak Master
      unlockedAt: new Date(),
    },
  });

  console.log('🏅 Awarded badges');

  // Create some analytics data
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    await prisma.userAnalytics.create({
      data: {
        userId: user.id,
        date: date,
        totalPoints: Math.floor(Math.random() * 100) + 50,
        habitsCompleted: Math.floor(Math.random() * 5) + 1,
        goalsCompleted: Math.floor(Math.random() * 2),
        streak: Math.floor(Math.random() * 10) + 1,
        completionRate: Math.floor(Math.random() * 40) + 60,
      },
    });
  }

  console.log('📊 Created analytics data');

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
