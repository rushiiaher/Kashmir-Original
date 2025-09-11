const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupStorage() {
  try {
    // Create storage bucket
    const { data: bucket, error: bucketError } = await supabase.storage.createBucket('product-images', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
      fileSizeLimit: 5242880 // 5MB
    })

    if (bucketError && !bucketError.message.includes('already exists')) {
      console.error('Error creating bucket:', bucketError)
    } else {
      console.log('✅ Storage bucket created/exists')
    }

    console.log('✅ Storage setup complete!')
  } catch (error) {
    console.error('Setup failed:', error)
  }
}

setupStorage()