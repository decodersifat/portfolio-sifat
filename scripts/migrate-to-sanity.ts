import { createClient } from '@sanity/client'
import { projects, professionalExperiences, experiences, articles, openSourceProjects } from '../lib/data'

// Replace this with your actual token
const SANITY_WRITE_TOKEN = process.env.SANITY_WRITE_TOKEN || "sklsCctF4HcyD74M23lpFmiUrgJgIT3KHq23YursZS1sTYp1CsuhILFCKLDxzP4uR4II67yvttn61bngjvk3Yo6RFg5GGLTTT5FoW4p70dnE1ApAZB4bfS2BCMX2vCvHLFl4m3iLVJtX1714fZK25GwPQGCxFsV3aFn583nwJlIQ3Ex6xq7p"

const client = createClient({
  projectId: '407j3bu7',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-04-18',
  token: SANITY_WRITE_TOKEN,
})

async function migrateData() {
  console.log("Starting migration to Sanity...")

  try {
    // 1. Migrate Projects
    console.log("Migrating Projects...")
    for (const p of projects) {
      await client.create({
        _type: 'project',
        title: p.title,
        description: p.description,
        stack: p.stack,
        liveLink: p.liveLink,
        frontendRepo: p.frontendRepo,
        backendRepo: p.backendRepo,
        deployment: p.deployment,
        featured: p.featured,
      })
    }

    // 2. Migrate Professional Experiences
    console.log("Migrating Professional Experiences...")
    for (const exp of professionalExperiences) {
      await client.create({
        _type: 'experience',
        title: exp.title,
        company: exp.company,
        period: exp.period,
        type: exp.type,
        category: 'professional',
        bullets: exp.bullets,
      })
    }

    // 3. Migrate Achievements
    console.log("Migrating Achievements...")
    for (const ach of experiences) {
      await client.create({
        _type: 'experience',
        title: ach.title,
        company: ach.company,
        period: ach.period,
        type: ach.type,
        category: 'achievement',
        bullets: ach.bullets,
      })
    }

    // 4. Migrate Articles
    console.log("Migrating Articles...")
    for (const art of articles) {
      await client.create({
        _type: 'article',
        title: art.title,
        summary: art.summary,
        link: art.link,
        tags: art.tags,
      })
    }

    // 5. Migrate Open Source
    console.log("Migrating Open Source...")
    for (const os of openSourceProjects) {
      await client.create({
        _type: 'openSource',
        name: os.name,
        description: os.description,
        lang: os.lang,
        link: os.link,
      })
    }

    console.log("Migration complete! ✅")
  } catch (error) {
    console.error("Migration failed:", error)
  }
}

migrateData()
