import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'ChangeThisPassword123!',
    10,
  );

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@quanty.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@quanty.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'Quanty',
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Create contact subjects
  const subjects = [
    { slug: 'website', namePL: 'Strona internetowa', nameEN: 'Website' },
    { slug: 'eshop', namePL: 'Sklep internetowy', nameEN: 'E-commerce' },
    { slug: 'webapp', namePL: 'Aplikacja webowa', nameEN: 'Web Application' },
    { slug: 'mobile', namePL: 'Aplikacja mobilna', nameEN: 'Mobile App' },
    { slug: 'ai', namePL: 'Agent AI', nameEN: 'AI Agent' },
    { slug: 'consulting', namePL: 'Konsultacje', nameEN: 'Consulting' },
    { slug: 'other', namePL: 'Inne', nameEN: 'Other' },
  ];

  for (const [index, subject] of subjects.entries()) {
    const contactSubject = await prisma.contactSubject.upsert({
      where: { slug: subject.slug },
      update: {},
      create: {
        slug: subject.slug,
        order: index,
        translations: {
          create: [
            { language: "PL", name: subject.namePL },
            { language: "EN", name: subject.nameEN },
          ],
        },
      },
    });
    console.log(`✅ Contact subject created: ${subject.slug}`);
  }

  // Create default categories for projects
  const projectCategories = [
    { slug: 'web-development', namePL: 'Strony WWW', nameEN: 'Web Development' },
    { slug: 'ecommerce', namePL: 'E-commerce', nameEN: 'E-commerce' },
    { slug: 'web-apps', namePL: 'Aplikacje Webowe', nameEN: 'Web Applications' },
    { slug: 'mobile-apps', namePL: 'Aplikacje Mobilne', nameEN: 'Mobile Apps' },
    { slug: 'ai-solutions', namePL: 'Rozwiązania AI', nameEN: 'AI Solutions' },
  ];

  for (const category of projectCategories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: {
        slug: category.slug,
        type: 'project',
        translations: {
          create: [
            { language: "PL", name: category.namePL },
            { language: "EN", name: category.nameEN },
          ],
        },
      },
    });
    console.log(`✅ Project category created: ${category.slug}`);
  }

  // Create default categories for blog
  const blogCategories = [
    { slug: 'web-development-blog', namePL: 'Rozwój Web', nameEN: 'Web Development' },
    { slug: 'design', namePL: 'Design', nameEN: 'Design' },
    { slug: 'technology', namePL: 'Technologia', nameEN: 'Technology' },
    { slug: 'ai-ml', namePL: 'AI & ML', nameEN: 'AI & ML' },
    { slug: 'tutorials', namePL: 'Tutoriale', nameEN: 'Tutorials' },
  ];

  for (const category of blogCategories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: {
        slug: category.slug,
        type: 'blog',
        translations: {
          create: [
            { language: "PL", name: category.namePL },
            { language: "EN", name: category.nameEN },
          ],
        },
      },
    });
    console.log(`✅ Blog category created: ${category.slug}`);
  }

  // Create default services
  const services = [
    {
      slug: 'websites',
      icon: 'globe',
      titlePL: '🌐 Strony internetowe',
      titleEN: '🌐 Websites',
      descPL: 'Tworzymy NIESAMOWITE strony, które magnetyzują klientów! Responsywne, szybkie, z pazurem!',
      descEN: 'We create AMAZING websites that magnetize clients! Responsive, fast, with attitude!',
    },
    {
      slug: 'ecommerce',
      icon: 'shopping-cart',
      titlePL: '🛒 Sklepy internetowe',
      titleEN: '🛒 E-commerce',
      descPL: 'Rozwiązania e-commerce, które SPRZEDAJĄ! Pełna integracja płatności i MEGA user experience!',
      descEN: 'E-commerce solutions that SELL! Full payment integration and MEGA user experience!',
    },
    {
      slug: 'web-applications',
      icon: 'code',
      titlePL: '💻 Aplikacje webowe',
      titleEN: '💻 Web Applications',
      descPL: 'Zaawansowane webapps, które rozwiązują problemy i zachwycają użytkowników!',
      descEN: 'Advanced webapps that solve problems and delight users!',
    },
    {
      slug: 'mobile-applications',
      icon: 'smartphone',
      titlePL: '📱 Aplikacje mobilne',
      titleEN: '📱 Mobile Applications',
      descPL: 'Mobilne cuda na iOS i Android! Twoi użytkownicy będą ZACHWYCENI!',
      descEN: 'Mobile wonders for iOS and Android! Your users will be DELIGHTED!',
    },
    {
      slug: 'consulting',
      icon: 'lightbulb',
      titlePL: '💡 Konsultacje IT',
      titleEN: '💡 IT Consulting',
      descPL: 'Doświadczenie + pasja = skuteczne rozwiązania! Pomożemy Ci wybrać najlepszą drogę!',
      descEN: 'Experience + passion = effective solutions! We will help you choose the best path!',
    },
    {
      slug: 'ai-agents',
      icon: 'cpu',
      titlePL: '🤖 Wdrożenia agentów AI',
      titleEN: '🤖 AI Agents Implementation',
      descPL: 'Przyszłość JUŻ JEST! Wdrażamy inteligentne agenty AI, które automatyzują i usprawniają!',
      descEN: 'The future is NOW! We implement intelligent AI agents that automate and improve!',
    },
  ];

  for (const [index, service] of services.entries()) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        slug: service.slug,
        icon: service.icon,
        order: index,
        translations: {
          create: [
            { language: "PL", title: service.titlePL, description: service.descPL },
            { language: "EN", title: service.titleEN, description: service.descEN },
          ],
        },
      },
    });
    console.log(`✅ Service created: ${service.slug}`);
  }

  // Create default settings
  const settings = [
    {
      key: 'site_name',
      valuePL: 'Quanty',
      valueEN: 'Quanty',
    },
    {
      key: 'site_description',
      valuePL: 'Agencja interaktywna - strony www, aplikacje, AI',
      valueEN: 'Interactive agency - websites, applications, AI',
    },
    {
      key: 'contact_email',
      valuePL: 'kontakt@quanty.com',
      valueEN: 'contact@quanty.com',
    },
    {
      key: 'contact_phone',
      valuePL: '+48 123 456 789',
      valueEN: '+48 123 456 789',
    },
    {
      key: 'hero_title',
      valuePL: '🚀 Twoje marzenia, nasza pasja!',
      valueEN: '🚀 Your dreams, our passion!',
    },
    {
      key: 'hero_subtitle',
      valuePL: '✨ Tworzymy cyfrowe arcydzieła, które napędzają sukces! Jesteśmy naładowani energią i gotowi stworzyć coś NIESAMOWITEGO dla Ciebie!',
      valueEN: '✨ We create digital masterpieces that drive success! We are charged with energy and ready to create something AMAZING for you!',
    },
  ];

  for (const setting of settings) {
    await prisma.settings.upsert({
      where: { key: setting.key },
      update: {},
      create: {
        key: setting.key,
        translations: {
          create: [
            { language: "PL", value: setting.valuePL },
            { language: "EN", value: setting.valueEN },
          ],
        },
      },
    });
    console.log(`✅ Setting created: ${setting.key}`);
  }

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
