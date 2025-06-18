/** @type {import{"drizzle-kit"}.Config} */

export default{
    schema:"./utils/schema.tsx",
    dialect:'postgresql',
    dbCredentials:{
        url:'postgresql://neondb_owner:npg_Ig9nMECc3YTu@ep-divine-cloud-a8k5run4-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
    }
}