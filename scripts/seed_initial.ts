import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1. Seed Initial Home Page (index)
  // This prevents the 404 on the root URL
  const home = await prisma.page.upsert({
    where: { slug: 'index' },
    update: {},
    create: {
      title: 'Home',
      slug: 'index',
      content: [
        {
          id: 'welcome-section',
          containerWidth: 'boxed',
          style: {
            desktop: {
              padding: { top: '100px', bottom: '100px' },
              backgroundColor: '#f8fafc',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }
          },
          columns: [
            {
              id: 'welcome-col',
              width: '100%',
              style: { desktop: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
              widgets: [
                {
                  id: 'welcome-heading',
                  type: 'heading',
                  props: { text: 'Welcome to your new Builder', level: 'h1' },
                  style: { desktop: { textAlign: 'center', color: '#0f172a', fontSize: '48px', fontWeight: '800' } }
                }
              ]
            }
          ]
        }
      ] as any
    }
  });

  // 2. Seed Global Settings
  const settings = await prisma.globalSettings.upsert({
    where: { id: 'global' },
    update: {},
    create: {
      primaryColor: '#6366f1',
      secondaryColor: '#1e293b',
      fontFamily: 'Inter',
      containerWidth: '1280px'
    }
  });

  console.log('Successfully seeded initial Home page and Global Settings.');
  console.log('Home Page Slug:', home.slug);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
